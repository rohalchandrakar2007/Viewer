"use strict";

var SceneController = (function() {
    function SceneController(view, model) {
        this._view = view;
        this._model = model;

        this.attachListeners();
    }

    SceneController.prototype = {
        attachListeners : function() {
            var self = this;
            
            self._model.modelLoaded.attach(function(sender, args){
                self._view.showModel(args);
            });
        },
        generateTemplate: function() {
            var self = this;
            this._model.loadModel();
            self._view.buildSkeleton();
        }
    }

    return SceneController;
})();