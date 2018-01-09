import $ from "jquery";

const bindResetEverythingAction = () => {

    let btnResetEverything = $("#tools-action-reset-everything");

    btnResetEverything.click(() => {
        $("svg#main-svg").trigger("tools-action:reset-everything")
    });

};

export default bindResetEverythingAction;