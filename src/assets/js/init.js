"use strict";

var screenModel, screenController, screenView;

if(!screenModel) {
    screenModel = new ScreenModel();
    screenView = new ScreenView(screenModel);
    screenController = new ScreenController(screenView, screenModel);
}

screenController.generateTemplate();