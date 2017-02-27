"use strict";

var SceneModel = (function() {
    function SceneModel() {
        this.registerEvents();
    }

    SceneModel.prototype = {
        registerEvents : function() {

        },
        loadModel: function() {
            var modelId = 1;
            return ModelService.getModel(modelId);
        }
    }

    return SceneModel;
})();