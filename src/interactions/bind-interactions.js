import * as d3 from 'd3';
import { VertexCircle, VertexPath, AreaCircle, CenterCircle } from '../elements';
import State from '../state';
import math from '../utils/math';
import dashboardInfo from '../structure/dashboard/info';

const bindInteractions = () => {

    let d3MainSvgElem = d3.select("svg#main-svg"),
        d3PathsGroup  = d3MainSvgElem.select("g#paths-group"),
        _circleRadius = 11;

    function createVertexCircleOnClick() {

        let circles = State.circles;
        let target = d3.select(d3.event.target);

        if( target.attr('id') === 'main-svg' && circles.length < 3){

            doVertexCircleCreation();

            let vertex = {
                a : circles[0],
                b : circles[1],
                c : circles[2],
                d : null
            };

            if(circles.length === 3){

                let {a, b, c} = vertex;
                let oppositeSumX = a.x + c.x,
                    oppositeSumY = a.y + c.y;

                vertex.d = {
                    x : oppositeSumX - b.x,
                    y : oppositeSumY - b.y
                };

                doVertexCircleCreation(vertex.d.x, vertex.d.y);
                doAreaCircleCreation();

                let pCenter = math.getParallelogramCenter();
                doCenterCircleCreation(pCenter.x, pCenter.y);

            }

            updateDashboardInfo();
        }

        function doVertexCircleCreation(cx, cy){

            cx = cx || d3.event.offsetX;
            cy = cy || d3.event.offsetY;

            const circle = new VertexCircle( cx, cy, _circleRadius, d3MainSvgElem);
            circles.push(circle);

            State.lastCircle = State.newCircle;
            State.newCircle = circle;

            if(State.lastCircle){

                State.newCircle.circleBefore = State.lastCircle;

                let pathCoords = [
                    "M" + State.lastCircle.x, State.lastCircle.y,
                    "L" + State.newCircle.x, State.newCircle.y,
                    "Z"
                ].join(" ");

                State.lastPath = State.newPath;
                State.newPath = new VertexPath(pathCoords, d3PathsGroup);
                State.paths.push(State.newPath);

                State.lastCircle.paths.push(State.newPath);
                State.newCircle.paths.push(State.newPath);

                State.newPath.circles.push(State.lastCircle, State.newCircle);

                if(circles.length === 4){

                    const vertexA = circles[0];

                    let pathCoords = [
                        "M" + State.newCircle.x, State.newCircle.y,
                        "L" + vertexA.x, vertexA.y,
                        "Z"
                    ].join(" ");

                    State.lastPath = State.newPath;
                    State.newPath = new VertexPath(pathCoords, d3PathsGroup);
                    State.paths.push(State.newPath);

                    State.newPath.circles.push(State.newCircle, vertexA);
                    State.newCircle.paths.push(State.newPath);

                    vertexA.paths.push(State.newPath);
                    vertexA.circleBefore = State.newCircle;

                }
            }

            circle.elements.group.on("vertex-circle-group-drag-move", updatePathCoordsOnCircleDrag);
        }

    }

    function doAreaCircleCreation(){
        let {x, y, r} = calcAreaCircleCoordinates(),
            areaCircle = new AreaCircle(x, y, r, d3MainSvgElem);
        State.areaCircle.push(areaCircle);
        dashboardInfo.updateCircleRadiusDivText(r);
    }

    function calcAreaCircleCoordinates(){

        let parallelogramArea = getParallelogramArea(),
            pathsGroupBBox = d3PathsGroup.node().getBBox(),
            r = Math.sqrt(parallelogramArea / Math.PI),
            x = pathsGroupBBox.x + (pathsGroupBBox.width / 2),
            y = pathsGroupBBox.y + (pathsGroupBBox.height / 2);

        return { x, y, r }
    }

    function doCenterCircleCreation(cx, cy){
        let centerCircle = new CenterCircle(cx, cy, 3, d3MainSvgElem);
        State.centerCircle.push(centerCircle);
        dashboardInfo.updateCenterDivText(cx, cy);
    }

    function getParallelogramArea() {
        let circles = State.circles,
            sortedByY = [...circles]
                .sort((a, b) => {
                    if(a.y < b.y) return -1;
                    if(a.y > b.y) return 1;
                    return 0;
                });

        const getDist = (p1, p2) => {
            return Math.hypot(p2.x - p1.x, p2.y - p1.y)
        };

        let basePoints = [ sortedByY[2], sortedByY[3] ],
            heightPoints = [ sortedByY[0], sortedByY[2] ],
            base = getDist(basePoints[0], basePoints[1]),
            height = getDist(heightPoints[0], heightPoints[1]),
            area = base * height;

        dashboardInfo.updateParallelogramAreaDivText(base, height, area);

        return area;
    }

    function updateCenterCircle(){
        let { x, y } = math.getParallelogramCenter(),
            centerCircle = State.centerCircle[0];

        centerCircle.updateTextCoordinates(x, y);
        centerCircle.updateCircleCoordinates(x, y);
        dashboardInfo.updateCenterDivText(x, y);
    }

    function updateAreaCircle(){

        let {x, y, r} = calcAreaCircleCoordinates();
        const areaCircle = State.areaCircle[0];

        areaCircle.updateCircleCoordinates(x, y, r);
        areaCircle.updateTextValueAndPos();
        dashboardInfo.updateCircleRadiusDivText(r);

    }

    function updatePathCoordsOnCircleDrag(){

        const eventCircle = d3.event.detail;

        eventCircle.paths.forEach((path) => {
            let pathCircles = path.circles,
                newPathCoords = [
                    "M" + pathCircles[0].x, pathCircles[0].y,
                    "L" + pathCircles[1].x, pathCircles[1].y,
                    "Z"
                ].join(" ");
            path.updatePathCoords(newPathCoords);
        });

        if(State.areaCircle.length){
            updateAreaCircle();
            updateCenterCircle();
        }

        updateDashboardInfo();
    }

    function updateDashboardInfo(){

        let circles = State.circles;
        let vertexCircles = ['a', 'b', 'c', 'd'].map((letter, i) => {
            return { letter, vertex: circles[i] };
        });

        vertexCircles.forEach((vertexCircle) => {
            let { letter, vertex } = vertexCircle;
            if(vertex) {
                let { x, y } = vertex;
                dashboardInfo.updateVertexDivText(letter, x, y);
            }
        });
    }

    d3MainSvgElem
        .on('click', createVertexCircleOnClick);

};

export default bindInteractions;