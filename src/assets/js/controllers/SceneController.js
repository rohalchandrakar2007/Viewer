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

            self._view.btnHelloClicked.attach(function(sender, args) {
                self._view.hello('Hello Rohal');
            });
        },
        generateTemplate: function() {
            var self = this;
            self._view.buildSkeleton();
            // ViewUtil.showLoader();
            
            // this._model.loadModel().then(
            //     function(response) { // Success
            //         var data = response.data;
            //         self._view.buildSkeleton(data);
            //         ViewUtil.hideLoader();
            //     },
            //     function(response) { // Fail
            //     }
            // );

        }
    }

    return SceneController;
})();