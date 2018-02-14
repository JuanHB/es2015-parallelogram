import * as d3 from 'd3';
import ElementsUtils from '../utils/elements';

class VertexCircle {

    constructor(x, y, r, svgElem){

        this.r = r;
        this.x = x;
        this.y = y;
        this.svgElem = svgElem;

        this.id = ElementsUtils.generateHex();
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

        let { x, y, r, id, textPosCorrection, elements } = this;
        let { group, circle, text } = elements;

        // set initial attributes for each element
        group
            .attr( "id", [ "vertex-circle-group-", id ].join(""));

        circle
            .attr("class", "circle")
            .attr("r", r)
            .attr("cx", x)
            .attr("cy", y);

        text
            .attr("class", "text")
            .attr("x", x + textPosCorrection.x)
            .attr("y", y + textPosCorrection.y);

        this.updateTextValue();
        this.bindGroupDrag();

    }

    bindGroupDrag(){

        let { group, circle, text } = this.elements;

        let dragStart = () => {

            let { x, y, textPosCorrection, circleBefore } = this;

            group
                .raise();

            circle
                .classed( "circle-active", true )
                .attr("cx", 0)
                .attr("cy", 0);

            text
                .attr("x", textPosCorrection.x)
                .attr("y", textPosCorrection.y);

            this.setGroupTranslate([x, y]);

            if(circleBefore){

                let { group, circle, text } = circleBefore.elements;
                let { x, y, textPosCorrection } = circleBefore;

                group
                    .raise();

                circle
                    .classed( "circle-active", true )
                    .attr("cx", 0)
                    .attr("cy", 0);

                text
                    .attr("x", textPosCorrection.x)
                    .attr("y", textPosCorrection.y);

                circleBefore.setGroupTranslate([x, y]);

            }

        };

        let dragMove = () => {

            const circleBefore = this.circleBefore;

            this.x += d3.event.dx;
            this.y += d3.event.dy;

            this.setGroupTranslate([this.x, this.y]);

            group.dispatch("vertex-circle-group-drag-move", { detail : this } );

            if(circleBefore){

                let circleBeforeGroupElem = circleBefore.elements.group;

                circleBefore.x += d3.event.dx;
                circleBefore.y += d3.event.dy;

                circleBefore.setGroupTranslate([circleBefore.x, circleBefore.y]);

                circleBeforeGroupElem.dispatch("vertex-circle-group-drag-move", { detail : circleBefore });

            }

        };

        let dragEnd = () =>{

            const circleBefore = this.circleBefore;
            let { x, y, textPosCorrection } = this;

            circle
                .classed("circle-active", false)
                .attr("cx", x)
                .attr("cy", y);

            text
                .attr("x", x + textPosCorrection.x)
                .attr("y", y + textPosCorrection.y);

            this.setGroupTranslate(null);

            if(circleBefore){

                let { circle, text } = circleBefore.elements;
                let { x, y, textPosCorrection } = circleBefore;

                circle
                    .classed("circle-active", false)
                    .attr("cx", x)
                    .attr("cy", y);

                text
                    .attr("x", x + textPosCorrection.x)
                    .attr("y", y + textPosCorrection.y);

                circleBefore.setGroupTranslate(null);
            }
        };

        group
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


}

export default VertexCircle;