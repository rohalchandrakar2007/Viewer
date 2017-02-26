"use strict";

var ScreenModel = (function() {
    function ScreenModel() {
        this.registerEvents();
    }

    ScreenModel.prototype = {
        registerEvents : function() {

        },
        loadModel: function() {
            var modelId = 1;
            return ModelService.getModel(modelId);
        }
    }

    return ScreenModel;
})();