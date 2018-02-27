import $ from 'jquery';

const DashboardInfo = (() => {

    function updateVertexDivText(vertex, x, y){
        let jqVertexSpan = $("span.vertex-" + vertex);
        jqVertexSpan.text(["x ", x, " | y ", y].join(""));
    }

    function updateParallelogramAreaDivText(base, height, area){
        let jqParallelogramAreaSpan = $('span.parallelogram-area');
        jqParallelogramAreaSpan.text([
            parseInt(base, 10), " x ", parseInt(height, 10), " = ", parseInt(area, 10)
        ].join(""));
    }

    function updateCircleRadiusDivText(radius){
        let jqCircleRadiusSpan = $('span.area-circle-radius');
        jqCircleRadiusSpan.text(parseInt(radius, 10));
    }

    function updateCenterDivText(x, y){
        let jqCenterSpan = $('span.shapes-center');
        jqCenterSpan.text(["x ", parseInt(x, 10), " | y ", parseInt(y, 10)].join(""));
    }

    function resetVertexDivText(){
        let jqVertexSpan = $("span[class*='vertex']");
        jqVertexSpan.text("x 0 | y 0");
    }

    return {
        resetVertexDivText,
        updateVertexDivText,
        updateCenterDivText,
        updateCircleRadiusDivText,
        updateParallelogramAreaDivText
    }

})();

export default DashboardInfo;