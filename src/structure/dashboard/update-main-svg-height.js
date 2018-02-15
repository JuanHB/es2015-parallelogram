import $ from 'jquery';

const updateMainSvgHeight = () => {

    let jqWindow = $(window),
        jqMainSvgElem = $("svg#main-svg");

    let doUpdate = () => {
        let windowHeight = jqWindow.height();
        jqMainSvgElem
            .css({ 'min-height' : windowHeight / 2 });
    };

    doUpdate();

    jqWindow
        .resize(doUpdate);

};

export default updateMainSvgHeight;