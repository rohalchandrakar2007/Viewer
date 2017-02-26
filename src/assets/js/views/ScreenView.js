"use strict";

var ScreenView = (function() {
    function getElements() {
        return {
            'mainContainer' : '#app'
        };
    }

    function ScreenView(model) {
        this._model = model;

        this._elements = getElements();

        this.registerEvents();
        this.attachListeners();
    }

    ScreenView.prototype = {
        attachListeners : function() {

        },
        buildSkeleton: function(data) {
            var template = [];

            template.push(
                '<div>',
                '</div>'
            );
            template = template.join('');

            $(this._elements.mainContainer).html(template);
        },
        buildView: function() {
            this.setupEnvironment();
            this.showModel();
        },
        setupEnvironment: function() {

        },
        showModel: function (data) {
        }
    }

    return ScreenView;
})();