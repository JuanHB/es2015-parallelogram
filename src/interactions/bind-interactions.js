import * as d3 from 'd3';
import { Circle, Path, CircleArea } from '../elements';
import State from '../state';
import math from './math';

const bindInteractions = () => {

    let d3MainSvgElem = d3.select("svg#main-svg"),
        d3PathsGroup = d3MainSvgElem.select("g#paths-group"),
        _circleRadius = 11;

    function createCircleOnClick() {

        const circles = State.circles;
        let target = d3.select(d3.event.target);

        if( target.attr('id') === 'main-svg' && circles.length < 3){

            doCircleCreation();

            if(circles.length === 3){

                let vertexA = circles[0],
                    vertexB = circles[1],
                    vertexC = circles[2];

                let oppositeSumX = vertexA.x + vertexC.x,
                    oppositeSumY = vertexA.y + vertexC.y;

                let vertexD = {
                    x : oppositeSumX - vertexB.x,
                    y : oppositeSumY - vertexB.y
                };

                doCircleCreation(vertexD.x, vertexD.y);
                doCircleAreaCreation();

                let pCenter = math.getParallelogramCenter();

                d3MainSvgElem
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", pCenter.x)
                    .attr("cy", pCenter.y)
                    .attr("fill", "black")

            }
        }

        function doCircleCreation(cx, cy){

            cx = cx || d3.event.offsetX;
            cy = cy || d3.event.offsetY;

            const circle = new Circle( cx, cy, _circleRadius, d3MainSvgElem);
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
                State.newPath = new Path(pathCoords, d3PathsGroup);
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
                    State.newPath = new Path(pathCoords, d3PathsGroup);
                    State.paths.push(State.newPath);

                    State.newPath.circles.push(State.newCircle, vertexA);
                    State.newCircle.paths.push(State.newPath);

                    vertexA.paths.push(State.newPath);
                    vertexA.circleBefore = State.newCircle;

                }
            }

            circle.elements.group.on("circle-group-drag-move", updatePathCoordsOnCircleDrag);
        }

    }

    function doCircleAreaCreation(){

        let pathsGroupBBox = d3PathsGroup.node().getBBox();
        let groupCenter = {
            x : pathsGroupBBox.x + (pathsGroupBBox.width / 2),
            y : pathsGroupBBox.y + (pathsGroupBBox.height / 2)
        };

        let groupTopLeftCorner = {
            x : pathsGroupBBox.x + pathsGroupBBox.width,
            y : pathsGroupBBox.y
        };

        let a = groupCenter.x - groupTopLeftCorner.x;
        let b = groupCenter.y - groupTopLeftCorner.y;
        let r = Math.sqrt( a*a + b*b ); // * Math.PI / 180;

        let circleArea = new CircleArea(groupCenter.x, groupCenter.y, r, d3MainSvgElem);
        State.circleArea.push(circleArea);
    }

    function updateCircleArea(){

        const circleArea = State.circleArea[0];

        let pathsGroupBBox = d3PathsGroup.node().getBBox();
        let groupCenter = {
            x : pathsGroupBBox.x + (pathsGroupBBox.width / 2),
            y : pathsGroupBBox.y + (pathsGroupBBox.height / 2)
        };

        let groupTopLeftCorner = {
            x : pathsGroupBBox.x + pathsGroupBBox.width,
            y : pathsGroupBBox.y
        };

        let a = groupCenter.x - groupTopLeftCorner.x;
        let b = groupCenter.y - groupTopLeftCorner.y;
        let r = Math.sqrt( a*a + b*b );

        circleArea.updateCircleCoordinates(groupCenter.x, groupCenter.y, r)

    }
    
    function getParallelogramArea() {

    }

    function updatePathCoordsOnCircleDrag(){

        const eventCircle = d3.event.detail;

        eventCircle.paths.forEach((path) => {
            let pathCircles = path.circles;
            let newPathCoords = [
                "M" + pathCircles[0].x, pathCircles[0].y,
                "L" + pathCircles[1].x, pathCircles[1].y,
                "Z"
            ].join(" ");
            path.updatePathCoords(newPathCoords);
        });

        if(State.circleArea.length){
            updateCircleArea();
        }
    }

    d3MainSvgElem
        .on('click', createCircleOnClick);

};

export default bindInteractions;