"use strict";

var ScreenController = (function() {
    function ScreenController(view, model) {
        this._view = view;
        this._model = model;

        this.attachListeners();
    }

    ScreenController.prototype = {
        attachListeners : function() {

        },
        generateTemplate: function() {
            var self = this;
            ViewUtil.showLoader();
            
            this._model.loadModel().then(
                function(response) { // Success
                    var data = response.data;
                    self._view.buildSkeleton(data);
                    ViewUtil.hideLoader();
                },
                function(response) { // Fail
                }
            );

        }
    }

    return ScreenController;
})();