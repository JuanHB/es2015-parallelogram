import * as d3 from 'd3';
import { Circle, Path } from '../elements';
import State from '../state';

const bindInteractions = () => {

    let d3MainSvgElem = d3.select("svg#main-svg"),
        _circleRadius = 11,
        _newCircle, _lastCircle, _lastPath, _newPath;

    function createCircleOnClick() {

        let target = d3.select(d3.event.target);

        if( target.attr('id') === 'main-svg' && State.circles.length < 3){

            doCircleCreation();

            if(State.circles.length === 3){

                let vertexA = State.circles[0],
                    vertexB = State.circles[1],
                    vertexC = State.circles[2];

                let oppositeSumX = vertexA.x + vertexC.x,
                    oppositeSumY = vertexA.y + vertexC.y;

                let vertexD = {
                    x : oppositeSumX - vertexB.x,
                    y : oppositeSumY - vertexB.y
                };

                doCircleCreation(vertexD.x, vertexD.y);

            }
        }

        function doCircleCreation(cx, cy){

            cx = cx || d3.event.offsetX;
            cy = cy || d3.event.offsetY;

            let circle = new Circle( cx, cy, _circleRadius, d3MainSvgElem);
            State.circles.push(circle);

            State.lastCircle = State.newCircle;
            State.newCircle = circle;

            if(State.lastCircle){

                let pathCoords = [
                    "M" + State.lastCircle.x, State.lastCircle.y,
                    "L" + State.newCircle.x, State.newCircle.y,
                    "Z"
                ].join(" ");

                State.lastPath = State.newPath;
                State.newPath = new Path(pathCoords, d3MainSvgElem);
                State.paths.push(State.newPath);

                State.lastCircle.paths.push(State.newPath);
                State.newCircle.paths.push(State.newPath);

                State.newPath.circles.push(State.lastCircle, State.newCircle);

                if(State.circles.length === 4){

                    let vertexA = State.circles[0];

                    let pathCoords = [
                        "M" + State.newCircle.x, State.newCircle.y,
                        "L" + vertexA.x, vertexA.y,
                        "Z"
                    ].join(" ");

                    State.lastPath = State.newPath;
                    State.newPath = new Path(pathCoords, d3MainSvgElem);
                    State.paths.push(State.newPath);

                    State.newPath.circles.push(State.newCircle, vertexA);
                    vertexA.paths.push(State.newPath);
                    State.newCircle.paths.push(State.newPath);
                }
            }
            circle.elements.group.on("circle-group-drag", updatePathCoordsOnCircleDrag);
        }

    }

    function updatePathCoordsOnCircleDrag(){

        let eventCircle = d3.event.detail;

        eventCircle.paths.forEach((path) => {
            let pathCircles = path.circles;
            let newPathCoords = [
                "M" + pathCircles[0].x, pathCircles[0].y,
                "L" + pathCircles[1].x, pathCircles[1].y,
                "Z"
            ].join(" ");
            path.updatePathCoords(newPathCoords);
        });

    }

    d3MainSvgElem
        .on('click', createCircleOnClick);

};

export default bindInteractions;