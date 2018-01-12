import * as d3 from 'd3';

class Circle {

    constructor(x, y, r, svgElem){

        this.r = r;
        this.x = x;
        this.y = y;

        this.svgElem = svgElem;

        this.id = this.constructor.generateHex();
        this.paths = [];
        this.circleBefore = null;
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

        let textElem = this.elements.text,
            groupElem = this.elements.group,
            circleElem = this.elements.circle;

        let dragStart = () => {

            let circleBefore = this.circleBefore;

            groupElem
                .raise();

            circleElem
                .classed( "circle-active", true )
                .attr("cx", 0)
                .attr("cy", 0);

            textElem
                .attr("x", this.textPosCorrection.x)
                .attr("y", this.textPosCorrection.y);

            this.setGroupTranslate([this.x, this.y]);

            if(circleBefore){

                let circleBeforeTextElem = circleBefore.elements.text,
                    circleBeforeGroupElem = circleBefore.elements.group,
                    circleBeforeCircleElem = circleBefore.elements.circle;

                circleBeforeGroupElem
                    .raise();

                circleBeforeCircleElem
                    .classed( "circle-active", true )
                    .attr("cx", 0)
                    .attr("cy", 0);

                circleBeforeTextElem
                    .attr("x", circleBefore.textPosCorrection.x)
                    .attr("y", circleBefore.textPosCorrection.y);

                circleBefore.setGroupTranslate([circleBefore.x, circleBefore.y]);

            }

        };

        let dragMove = () => {

            const circleBefore = this.circleBefore;

            this.x += d3.event.dx;
            this.y += d3.event.dy;

            this.setGroupTranslate([this.x, this.y]);

            groupElem.dispatch("circle-group-drag-move", { detail : this } );

            if(circleBefore){

                let circleBeforeGroupElem = circleBefore.elements.group;

                circleBefore.x += d3.event.dx;
                circleBefore.y += d3.event.dy;

                circleBefore.setGroupTranslate([circleBefore.x, circleBefore.y]);

                circleBeforeGroupElem.dispatch("circle-group-drag-move", { detail : circleBefore });

            }

        };

        let dragEnd = () =>{

            const circleBefore = this.circleBefore;

            circleElem
                .classed("circle-active", false)
                .attr("cx", this.x)
                .attr("cy", this.y);

            textElem
                .attr("x", this.x + this.textPosCorrection.x)
                .attr("y", this.y + this.textPosCorrection.y);

            this.setGroupTranslate(null);

            if(circleBefore){
                let circleBeforeCircleElem = circleBefore.elements.circle,
                    circleBeforeTextElem = circleBefore.elements.text;

                circleBeforeCircleElem
                    .classed("circle-active", false)
                    .attr("cx", circleBefore.x)
                    .attr("cy", circleBefore.y);

                circleBeforeTextElem
                    .attr("x", circleBefore.x + circleBefore.textPosCorrection.x)
                    .attr("y", circleBefore.y + circleBefore.textPosCorrection.y);

                circleBefore.setGroupTranslate(null);
            }
        };

        groupElem
            .call(d3.drag()
                .on("start", dragStart)
                .on("drag", dragMove)
                .on("end", dragEnd)
            );
    }

    setGroupTranslate(positionArray){

        let translateString = positionArray ? "translate("+positionArray+")" : null;
        this.elements.group
            .attr("transform", translateString);

        this.updateTextValue();

    }

    updateTextValue(){
        this.elements.text.text(["x ", this.x, " | y ", this.y].join(""));
    }

    static generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }


}

export default Circle;