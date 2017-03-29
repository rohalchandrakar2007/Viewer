"use strict";

var SceneView = (function() {
    function getElements() {
        return {
            'mainContainer' : '#app'
        };
    }

    function SceneView(model) {
        this._model = model;

        this._elements = getElements();
        
        this.mouseX = 0;
        this.mouseY = 0;
        this._container = document.getElementById("app");
        this._windowHalfX = window.innerWidth / 2;
        this._windowHalfY = window.innerHeight / 2;
        
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 45, this._windowHalfX / this._windowHalfY, 1, 2000 );
        this._lightAmbient;
        this._lightDiretional;
        
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( this._windowHalfX, this._windowHalfY );
        console.log(this._container);
        this._container.appendChild( this._renderer.domElement );

        this.registerEvents();
        this.attachEvents();
        this.attachListeners();
    }

    SceneView.prototype = {
        registerEvents : function() {
            this.windowResized = new Event(this);
            this.onCursorMove = new Event(this);
            this.btnHelloClicked = new Event(this);
        },
        attachEvents : function() {
            var self = this;

            $(window).on('resize', function(e) {
                self.onWindowResize();
            });
            
            $(window).on('mousemove', function(e) {
                self.onMouseMove(e);
            });
        },
        attachListeners: function() {
            var self = this;
        },
        buildSkeleton: function(data) {
<<<<<<< HEAD
            var template = [];

            template.push(
                '<div>',
                '<button id="btnHello">Click</button>',
                '</div>'
            );
            template = template.join('');

            // $(this._elements.mainContainer).html(template);
=======
            this.buildView();
>>>>>>> ecbd14eb4bf962bc296006cebe1586316c09ee3a
        },
        buildView: function() {
            this.setupEnvironment();
            this.animate();
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
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this._camera.aspect = this._windowHalfX / this._windowHalfY;
            this._camera.updateProjectionMatrix();
            this._renderer.setSize( this._windowHalfX, this._windowHalfY );
        },
        onMouseMove:function(event){
            this.mouseX = ( event.clientX - this._windowHalfX ) / 2;
            this.mouseY = ( event.clientY - this._windowHalfY ) / 2;
            this.render();
        },
        animate: function() {
				requestAnimationFrame( this.animate.bind(this) );
				this.render();
        },
        render: function() {
				this._camera.position.x += ( this.mouseX - this._camera.position.x ) * .05;
				this._camera.position.y += ( - this.mouseY - this._camera.position.y ) * .05;
				this._camera.lookAt( this._scene.position );
				this._renderer.render( this._scene, this._camera );
        }
    }

    return SceneView;
})();