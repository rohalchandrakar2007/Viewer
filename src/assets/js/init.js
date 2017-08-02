"use strict";

var sceneModel, sceneController, sceneView;

if (!sceneModel) {
    sceneModel = new SceneModel();
    sceneView = new SceneView(sceneModel);
    sceneController = new SceneController(sceneView, sceneModel);
}

sceneController.generateTemplate();
