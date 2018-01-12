// import * as d3 from 'd3';

class CircleArea {

    constructor(x, y, r, elemSvg){

        this.x = x;
        this.y = y;
        this.r = r;

        this.elemSvg = elemSvg;

        this.id = this.constructor.generateHex();

        this.elements = {
            circle : null
        };

        this.create();
    }

    create(){
        this.elements.circle = this.elemSvg.append("circle");
        this.elements.circle
            .attr("class", "circle-area")
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", this.r)
    }

    updateCircleCoordinates(cx, cy, r){

        this.x = cx;
        this.y = cy;
        this.r = r;

        this.elements.circle
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", this.r);

    }

    static generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }

}

export default CircleArea;