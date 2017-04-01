"use strict";

var SceneView = (function() {
    function getElements() {
        return {
            'mainContainer'  : '#app',
            'modelContainer' : '.model-container .model',
        };
    }

    function SceneView(model) {
        this._model = model;

        this._elements = getElements();
        
        this._scene = null;
        this._camera = null;
        this._renderer = null;
        this._mouseX = 0;
        this._mouseY = 0;
        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;
        
        this._lightAmbient = null;
        this._lightDiretional = null;

        this.registerEvents();
        this.attachEvents();
        this.attachModelListeners();
    }

    SceneView.prototype = {
        registerEvents : function() {
            this.windowResized = new Event(this);
            this.mouseMoving = new Event(this);
        },
        attachEvents : function() {
            var self = this;

            $(window).on('resize', function(e) {
                self.onWindowResize();
                self.windowResized.notify();
            });
            
            $(window).on('mousemove', function(e) {
                self.onMouseMove(e);
                self.mouseMoving.notify();
            });
        },
        attachModelListeners: function() {
            var self = this;

            self._model.modelLoaded.attach(function(sender, args){
                self.showModel(args);
            });
        },
        buildSkeleton: function(data) {
            // this.initControls();
            this.buildView();
        },
        buildView: function() {
            this.initScene();
            this.setupEnvironment();
            this.animate();
        },
        initScene: function() {
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera( 45, this._windowWidth / this._windowHeight, 1, 2000 );
            
            this._renderer = new THREE.WebGLRenderer();
            this._renderer.setPixelRatio( window.devicePixelRatio );
            $(this._renderer.domElement).addClass('model-canvas');
            this._renderer.setSize( this._windowWidth, this._windowHeight );
            $(this._elements.modelContainer).append( this._renderer.domElement );
        },
        setupEnvironment: function() {
            this._lightAmbient = new THREE.AmbientLight( 0x444444 );
            this._scene.add( this._lightAmbient );
            
            this._camera.position.z = 250;
            
            this._lightDirectional = new THREE.DirectionalLight( 0xffeedd );
            this._lightDirectional.position.set( 0, 0, 1 ).normalize();
            this._scene.add( this._lightDirectional );
        },
        showModel: function (object) {
            this._scene.add(object.object);
        },
        onWindowResize: function() {
            this._windowWidth = window.innerWidth;
            this._windowHeight = window.innerHeight;
            this._camera.aspect = this._windowWidth / this._windowHeight;
            this._camera.updateProjectionMatrix();
            this._renderer.setSize( this._windowWidth, this._windowHeight );
        },
        onMouseMove:function(event){
            this._mouseX = ( event.clientX - this._windowWidth ) / 2;
            this._mouseY = ( event.clientY - this._windowHeight ) / 2;
            this.render();
        },
        animate: function() {
			requestAnimationFrame( this.animate.bind(this) );
			this.render();
        },
        render: function() {
			this._camera.position.x += ( this._mouseX - this._camera.position.x ) * .05;
			this._camera.position.y += ( - this._mouseY - this._camera.position.y ) * .05;
			this._camera.lookAt( this._scene.position );
			this._renderer.render( this._scene, this._camera );
        }
    }

    return SceneView;
})();