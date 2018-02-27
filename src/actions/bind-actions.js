import $ from 'jquery';
import State from '../state';
import forOwn from 'lodash/forOwn';
import dashboardInfo from '../structure/dashboard/info';

const bindActions = () => {

    let mainSvgElem = $("svg#main-svg");
    let actionsToBind = [
        { event : "tools-action:reset-everything", action : doToolsActionResetEverything }
    ];

    actionsToBind.forEach((action) => mainSvgElem.on(action.event, action.action));

    function doToolsActionResetEverything(){

        let removeElement = (elemObj) => forOwn(elemObj.elements, (element) => { element.remove() }) ;

        State.paths.forEach(removeElement);
        State.circles.forEach(removeElement);
        State.areaCircle.forEach(removeElement);
        State.centerCircle.forEach(removeElement);

        State.resetState();

        dashboardInfo.resetVertexDivText();

    }
};
export default bindActions;