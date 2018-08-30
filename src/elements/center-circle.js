import ElementsUtils from '../utils/elements'

class CenterCircle {

    constructor(x, y, r, elemSvg){
        this.r = r;
        this.x = x;
        this.y = y;
        this.elemSvg = elemSvg;

        this.id = ElementsUtils.generateHex();
        this.textPosCorrection = { x : 0, y : -15 };
        this.elements = {
            group: null, circle: null, text: null
        };

        this.create();

    }

    create(){

        this.elements.group  = this.elemSvg.append("g");
        this.elements.circle = this.elements.group.append("circle");
        this.elements.text   = this.elements.group.append("text");

        let { x, y, r, id, elements, textPosCorrection } = this,
            { group, circle, text } = elements;

        group
            .attr("id", ["center-circle-",this.id].join(""));

        circle
            .attr("class", "center-circle")
            .attr("r", r)
            .attr("cx", x)
            .attr("cy", y);

        text
            .attr("class", "text")
            .attr("x", x + textPosCorrection.x)
            .attr("y", y + textPosCorrection.y);

        this.updateTextValue();
    }

    updateCircleCoordinates(cx, cy){

        this.x = cx;
        this.y = cy;

        this.elements.circle
            .attr("cx", this.x)
            .attr("cy", this.y);

    }

    updateTextCoordinates(x, y){

        let { elements, textPosCorrection } = this;

        elements.text
            .attr("x", x + textPosCorrection.x )
            .attr("y", y + textPosCorrection.y );

        this.updateTextValue();
    }

    updateTextValue(){

        let { x, y, elements } = this;

        elements.text
            .text([
                "x ", parseInt(x, 10), " | ",
                "y ", parseInt(y, 10)
            ].join(""));
    }

}

export default CenterCircle;