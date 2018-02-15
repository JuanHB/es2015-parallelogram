import ElementsUtils from '../utils/elements';
class AreaCircle {

    constructor(x, y, r, elemSvg){

        this.x = x;
        this.y = y;
        this.r = r;

        this.id = ElementsUtils.generateHex();
        this.elemSvg = elemSvg;
        this.elements = { group: null, circle : null, text: null };
        this.textPosCorrection = { x : 0, y : -20 };

        this.create();
    }

    create(){

        this.elements.group  = this.elemSvg.append("g");
        this.elements.circle = this.elements.group.append("circle");
        this.elements.text   = this.elements.group.append("text");

        let { x, y, r, id, elements} = this,
            { group, circle, text } = elements;

        group
            .attr("id", ["group-area-circle-", id].join(""));

        circle
            .attr("class", "circle-area")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", r);

        text
            .attr("class", "text");

        this.updateTextValueAndPos();

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

    updateTextValueAndPos(){

        let { r, elements, textPosCorrection } = this,
            { text, circle } = elements,
            cBBox = circle.node(0).getBBox(),
            textPos = {
                x : ((textPosCorrection.x + cBBox.x) + (cBBox.width / 2)),
                y : (textPosCorrection.y + cBBox.y)
            };

        text
            .text([ "R ", parseInt(r, 10) ].join(""))
            .attr("x", textPos.x)
            .attr("y", textPos.y);
    }

}

export default AreaCircle;