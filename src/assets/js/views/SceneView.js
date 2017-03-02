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
        this.attachEvents();
        this.attachListeners();
    }

    SceneView.prototype = {
        registerEvents : function() {
            this.windowResized = new Event(this);
            this.btnHelloClicked = new Event(this);
        },
        attachEvents : function() {
            var self = this;

            $(window).on('resize', function(e) {
                // self.onWindowResize();
                self.windowResized.notify();
            });

            $(self._elements.mainContainer).on('click', self._elements.btnHello, function() {
                self.btnHelloClicked.notify();
            });
        },
        attachListeners: function() {
            var self = this;
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
        initModel: function () {
            var self = this;
            var params = {
                'onLoad' : function(object) {
                    console.log('onload');
                    self.showModel(model);
                },
                'onError' : function() {
                    console.log('onerror');
                },
                'onProgress' :  function(xhr) {
                    console.log('onprogress');
                }
            };
            
            return ModelService.getObjModel(1, params);
        },
        showModel: function (model) {

        },
        onWindowResize: function() {

        },
        hello: function(msg) {
            ViewUtil.showModal(msg);
        }
    }

    return SceneView;
})();