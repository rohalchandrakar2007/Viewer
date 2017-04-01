"use strict";

var SceneController = (function() {
    function SceneController(view, model) {
        this._view = view;
        this._model = model;

        this.attachViewListeners();
    }

    SceneController.prototype = {
        attachViewListeners : function() {
            var self = this;
        },
        generateTemplate: function() {
            var self = this;
            this._model.loadModel();
            self._view.buildSkeleton();
        }
    }

    return SceneController;
})();