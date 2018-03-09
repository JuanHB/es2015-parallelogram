import $ from 'jquery';
import debounce from 'lodash/debounce';
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
        .resize(debounce(doUpdate, 300));

};

export default updateMainSvgHeight;