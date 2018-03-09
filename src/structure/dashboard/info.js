import $ from 'jquery';

const DashboardInfo = (() => {

    let jqCenterSpanSelector = 'span.shapes-center',
        jqCircleRadiusSpanSelector = 'span.area-circle-radius',
        jqParallelogramAreaSpanSelector = 'span.parallelogram-area';

    function updateVertexDivText(vertex, x, y){
        let jqVertexSpan = $("span.vertex-" + vertex);
        jqVertexSpan.text(["x ", x, " | y ", y].join(""));
    }

    function updateParallelogramAreaDivText(base, height, area){
        let jqParallelogramAreaSpan = $(jqParallelogramAreaSpanSelector);
        jqParallelogramAreaSpan.text([
            "B ", parseInt(base, 10), " * H ", parseInt(height, 10), " = ", parseInt(area, 10)
        ].join(""));
    }

    function updateCircleRadiusDivText(radius, area){
        let jqCircleRadiusSpan = $(jqCircleRadiusSpanSelector);
        jqCircleRadiusSpan.text([
            "(√" , parseInt(area, 10), " / π	) = R ", parseInt(radius, 10)
        ].join(""));
    }

    function updateCenterDivText(x, y){
        let jqCenterSpan = $(jqCenterSpanSelector);
        jqCenterSpan.text(["x ", parseInt(x, 10), " | y ", parseInt(y, 10)].join(""));
    }

    function resetDashboardInfoText(){

        let jqVertexSpan = $("span[class*='vertex']"),
            jqCenterSpan = $(jqCenterSpanSelector),
            jqCircleRadiusSpan = $(jqCircleRadiusSpanSelector),
            jqParallelogramAreaSpan = $(jqParallelogramAreaSpanSelector);

        $(jqCenterSpan).text("x 0 | y 0");
        $(jqVertexSpan).text("x 0 | y 0");
        $(jqCircleRadiusSpan).text("0");
        $(jqParallelogramAreaSpan).text("0");
    }

    return {
        updateVertexDivText,
        updateCenterDivText,
        resetDashboardInfoText,
        updateCircleRadiusDivText,
        updateParallelogramAreaDivText
    }

})();

export default DashboardInfo;