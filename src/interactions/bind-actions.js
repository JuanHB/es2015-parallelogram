import * as d3 from 'd3';
import { Circle, Path } from './elements';

const bindActions = () => {

    let d3MainSvgElem = d3.select("svg#main-svg");

    let circles = [];
    let circleRadius = 11;
    let newCircle, lastCircle, lastPath, newPath;

    function createCircleOnClick() {

        let cx = d3.event.offsetX,
            cy = d3.event.offsetY,
            target = d3.select(d3.event.target);

        if( target.attr('id') === 'main-svg' && circles.length < 3 ){

            let circle = new Circle( cx, cy, circleRadius, d3MainSvgElem, circles.length );
            circles.push(circle);

            lastCircle = newCircle;
            newCircle = circle;

            if(lastCircle){

                let pathCoords = [
                    "M" + lastCircle.x, lastCircle.y,
                    "L" + newCircle.x, newCircle.y,
                    "Z"
                ].join(" ");

                lastPath = newPath;
                newPath = new Path(pathCoords, d3MainSvgElem);


                lastCircle.paths.push(newPath);
                newCircle.paths.push(newPath);

                newPath.circles.push(lastCircle, newCircle)

            }

            console.log(lastCircle, newCircle);
            console.log(lastPath, newPath);


            /*let firstCircle  = circles[0],
                secondCircle = circles[1],
                thirdCircle  = circles[2];

            if(secondCircle){

                let pathCoords = [
                    "M" + firstCircle.x, firstCircle.y,
                    "L" + secondCircle.x, secondCircle.y,
                    "Z"
                ].join(" ");

                let path = new Path(pathCoords, d3MainSvgElem);

                firstCircle.paths.push(path);
                secondCircle.paths.push(path);

                path.circles.push(firstCircle, secondCircle)

            }

            if(thirdCircle){

                let pathCoords = [
                    "M" + secondCircle.x, secondCircle.y,
                    "L" + thirdCircle.x, thirdCircle.y,
                    "Z"
                ].join(" ");

                let path = new Path(pathCoords, d3MainSvgElem);

            }*/

            circle.elements.group.on("circle-group-drag", updatePathCoords);
        }

    }

    function updatePathCoords(){
        let eventCircle = d3.event.detail;
        console.log(eventCircle)
    }

    d3MainSvgElem
        .on('click', createCircleOnClick);

};

export default bindActions;