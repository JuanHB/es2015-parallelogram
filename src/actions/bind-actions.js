import $ from 'jquery';
import State from '../state';
import forOwn from 'lodash/forOwn';

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
        State.circleArea.forEach(removeElement);

        State.resetState();

    }
};
export default bindActions;