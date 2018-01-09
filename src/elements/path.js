class Path {

    constructor(pathCoords, svgElem){

        this.svgElem = svgElem;
        this.pathCoords = pathCoords;

        this.id = this.constructor.generateHex();
        this.circles = [];
        this.elements = {
            path : null
        };

        this.create();
    }

    create(){

        this.elements.path = this.svgElem.insert("path", ":first-child");
        this.elements.path
            .attr("id", ["path-", this.id].join(""))
            .attr("class", "path")
            .attr("d", this.pathCoords);

    }

    updatePathCoords(pathCoords){
        this.pathCoords = pathCoords;
        this.elements.path.attr("d", this.pathCoords);
    }

    static generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }

}

export default Path;