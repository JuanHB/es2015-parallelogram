import * as d3 from 'd3';

class Circle {

    constructor(x, y, r, svgElem){

        this.r = r;
        this.x = x;
        this.y = y;

        this.svgElem = svgElem;

        this.id = this.constructor.generateHex();
        this.paths = [];
        this.elements = {
            group : null, circle : null, text : null
        };
        this.textPosCorrection = { x : 0, y : -20 };
        this.create();

    }

    create(){

        // creating svg elements using d3js
        this.elements.group  = this.svgElem.append("g");
        this.elements.text   = this.elements.group.append("text");
        this.elements.circle = this.elements.group.append("circle");

        // set initial attributes for each element
        this.elements.group
            .attr( "id", [ "circle-group-", this.id ].join(""));

        this.elements.circle
            .attr("class", "circle")
            .attr("r", this.r)
            .attr("cx", this.x)
            .attr("cy", this.y);

        this.elements.text
            .attr("class", "text")
            .attr("x", this.x + this.textPosCorrection.x)
            .attr("y", this.y + this.textPosCorrection.y);

        this.updateTextValue();
        this.bindGroupDrag();

    }

    bindGroupDrag(){

        let group = this.elements.group,
            circle = this.elements.circle,
            text = this.elements.text;

        let dragStart = () => {

            group
                .raise();

            circle
                .classed( "circle-active", true )
                .attr("cx", 0)
                .attr("cy", 0);

            text
                .attr("x", this.textPosCorrection.x)
                .attr("y", this.textPosCorrection.y);

            this.updateTextValue();
            this.setGroupTranslate([this.x, this.y]);

        };

        let dragMove = () => {

            this.x += d3.event.dx;
            this.y += d3.event.dy;

            this.updateTextValue();
            this.setGroupTranslate([this.x, this.y]);


            group.dispatch("circle-group-drag", { detail : this } );
        };

        let dragEnd = () =>{
            circle
                .classed("circle-active", false)
                .attr("cx", this.x)
                .attr("cy", this.y);

            text
                .attr("x", this.x + this.textPosCorrection.x)
                .attr("y", this.y + this.textPosCorrection.y);

            this.updateTextValue();
            this.setGroupTranslate(null);
        };

        group
            .call(d3.drag()
                .on("start", dragStart)
                .on("drag", dragMove)
                .on("end", dragEnd)
            );
    }

    setGroupTranslate(positionArray){

        let group = this.elements.group,
            translateString = positionArray ? "translate("+positionArray+")" : null;
        group
            .attr("transform", translateString);

    }

    updateTextValue(){
        this.elements.text.text(["x ", this.x, " | y ", this.y].join(""));
    }

    static generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }


}

export default Circle;