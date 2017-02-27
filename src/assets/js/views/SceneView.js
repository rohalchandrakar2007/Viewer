"use strict";

var SceneView = (function() {
    function getElements() {
        return {
            'mainContainer' : '#app',
            'btnHello' : '#btnHello'
        };
    }

    function SceneView(model) {
        this._model = model;

        this._elements = getElements();

        this.registerEvents();
        this.attachListeners();
    }

    SceneView.prototype = {
        registerEvents : function() {
            this.windowResized = new Event(this);
            this.btnHelloClicked = new Event(this);
        },
        attachListeners : function() {
            var self = this;

            $(window).on('resize', function(e) {
                // self.onWindowResize();
                self.windowResized.notify();
            });

            $(self._elements.mainContainer).on('click', self._elements.btnHello, function() {
                self.btnHelloClicked.notify();
            });
        },
        buildSkeleton: function(data) {
            var template = [];

            template.push(
                '<div>',
                '<button id="btnHello">Click</button>',
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
        },
        onWindowResize: function() {

        },
        hello: function(msg) {
            ViewUtil.showModal(msg);
        }
    }

    return SceneView;
})();