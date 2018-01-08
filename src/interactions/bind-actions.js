import * as d3 from 'd3';
import { Circle, Path } from './elements';

const bindActions = () => {

    let d3MainSvgElem = d3.select("svg#main-svg"),
        _circles = [],
        _circleRadius = 11,
        _newCircle, _lastCircle, _lastPath, _newPath;

    function createCircleOnClick() {

        let target = d3.select(d3.event.target);

        if( target.attr('id') === 'main-svg' && _circles.length < 3){

            doCircleCreation();

            if(_circles.length === 3){

                let vertexA = _circles[0],
                    vertexB = _circles[1],
                    vertexC = _circles[2];

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
            _circles.push(circle);

            _lastCircle = _newCircle;
            _newCircle = circle;

            if(_lastCircle){

                let pathCoords = [
                    "M" + _lastCircle.x, _lastCircle.y,
                    "L" + _newCircle.x, _newCircle.y,
                    "Z"
                ].join(" ");

                _lastPath = _newPath;
                _newPath = new Path(pathCoords, d3MainSvgElem);

                _lastCircle.paths.push(_newPath);
                _newCircle.paths.push(_newPath);

                _newPath.circles.push(_lastCircle, _newCircle);

                if(_circles.length === 4){

                    let vertexA = _circles[0];

                    let pathCoords = [
                        "M" + _newCircle.x, _newCircle.y,
                        "L" + vertexA.x, vertexA.y,
                        "Z"
                    ].join(" ");

                    _lastPath = _newPath;
                    _newPath = new Path(pathCoords, d3MainSvgElem);

                    _newPath.circles.push(_newCircle, vertexA);
                    vertexA.paths.push(_newPath);
                    _newCircle.paths.push(_newPath);
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

export default bindActions;