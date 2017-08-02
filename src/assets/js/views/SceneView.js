"use strict";

var SceneView = (function () {
    function getElements() {
        return {
            'mainContainer': '#app',
            'modelContainer': '.model-container .model',
            'controlsContainer': '.controls',
            'animationControls': '.animation-controls',
            'helpControl': '.control.help',
            'settingControl': '.control.settings',
            'vrModeControl': '.control.vr',
            'fullScreenControl': '.control.fullscreen',
            'animPlayerKnob': '.knob', // take translation values
            'animPlayerBar': '.bar'
        };
    }

    function SceneView(model) {
        this._model = model;

        this._elements = getElements();

        this._scene = null;
        this._renderer = null;
        this._windowWidth = $(this._elements.mainContainer).width(); //window.innerWidth;
        this._windowHeight = $(this._elements.mainContainer).height(); //window.innerHeight;
        this._barWidth = null;
        this._knobPosition = null;
        this._lightAmbient = null;
        this._lightDiretional = null;
        this._controllerMode = null;

        this._mixers = [];
        this._actions = [];
        this._clock = null;
        this._playingAnimationIndex = null;

        this._sceneDatum = null;
        this._initOrbitCamPos = null;
        this._sceneBoundingBox = null;
        this._sceneCenter = null;

        this.registerEvents();
        this.attachModelListeners();

        console.log('bar width :' + $(this._elements.animPlayerKnob).position().left);
    }

    SceneView.prototype = {
        registerEvents: function () {
            this.windowResized = new Event(this);
            this.mouseMoving = new Event(this);
        },
        attachEvents: function () {
            var self = this;

            $(window).on('resize', function (e) {
                self.onWindowResize();
                self.windowResized.notify();
            });

            $(this._elements.helpControl).on('click', function (e) {
                self.handleHelpButtonClick();
            });

            $(this._elements.settingControl).on('click', function (e) {
                self.handleSettingsButtonClick();
            });

            $(this._elements.vrModeControl).on('click', function (e) {
                self.handleVRButtonClick();
            });

            $(this._elements.fullScreenControl).on('click', function (e) {
                self.handleFullScreenButtonClick();
            });
        },
        attachModelListeners: function () {
            var self = this;
            this._model.modelLoaded.attach(function (sender, args) {
                console.log("print");
                console.log(args);
                self.buildSkeleton();
                self.showModel(args);

            });
        },
        buildSkeleton: function () {
            this.buildView();
            this.attachEvents();
        },
        buildView: function () {
            this.initScene();
            this.setupEnvironment();
            this.animate();
        },
        initScene: function () {
            this._scene = new THREE.Scene();
            this._barWidth = $(this._elements.animPlayerBar).width();
            this._knobPosition = $(this._elements.animPlayerKnob).position().left;
            this._playingAnimationIndex = 0;

            this._clock = new THREE.Clock();
            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            this._renderer.setClearColor(0x000000, 0);
            this._renderer.setPixelRatio(window.devicePixelRatio);
            $(this._renderer.domElement).addClass('model-canvas');
            this._renderer.setSize(this._windowWidth, this._windowHeight);
            $(this._elements.modelContainer).append(this._renderer.domElement);


            this._controllerMode = new ControllerMode(this._scene, this._renderer, this._elements.controlsContainer, this._windowWidth, this._windowHeight);
            this._controllerMode.init();
        },
        setupEnvironment: function () {
            this._lightAmbient = new THREE.AmbientLight(0x444444);
            this._scene.add(this._lightAmbient);

            this._lightDirectional = new THREE.DirectionalLight(0xffeedd);
            this._lightDirectional.position.set(0, 0, 1).normalize();
            this._scene.add(this._lightDirectional);
        },
        showModel: function (object) {
            var type = this._model.modelConfig.type;
            var geometry = null;
            if (type === 'obj')
                this._scene.add(object.object);
            else if (type === 'objmtl')
                this._scene.add(object.object);
            else if (type === 'fbx') {
                console.log(object.object);
                console.log(object.object.toJSON());
                if (object.object.animations.length > 0) {
                    object.object.mixer = new THREE.AnimationMixer(object.object);
                    console.log(object.object.mixer);

                    this._mixers.push(object.object.mixer);
                    var action = object.object.mixer.clipAction(object.object.animations[1]);

                    console.log(action._clip);
                    action.play();

                }

                this._scene.add(object.object);
            } else if (type === 'collada') {
                console.log(object.object);
                var objectL = object.object.scene;
                mixer = new THREE.AnimationMixer(objectL);
                this._mixers.push(mixer);
                objectL.traverse(function (child) {
                    if (child instanceof THREE.SkinnedMesh) {
                        var clip = THREE.AnimationClip.parseAnimation(child.geometry.animation, child.geometry.bones);
                        mixer.clipAction(clip, child).play();
                    }
                });
                this._scene.add(objectL);
            }
            this.postModelLoadSettings();
        },
        postModelLoadSettings: function () {
            console.log("called...");
            this._sceneBoundingBox = CameraUtil.getSceneBoundingBox(this._scene);

            console.log(this._sceneBoundingBox);

            this._controllerMode.orbitControls.target.set(this._sceneBoundingBox.center.x, this._sceneBoundingBox.center.y, this._sceneBoundingBox.center.z);
            //this._controlsDefault.target.set(this._sceneBoundingBox.center.x, this._sceneBoundingBox.center.y, this._sceneBoundingBox.center.z);
            var center = new THREE.Vector3(this._sceneBoundingBox.center.x, this._sceneBoundingBox.center.y, this._sceneBoundingBox.center.z);
            var high = new THREE.Vector3(this._sceneBoundingBox.max.x, this._sceneBoundingBox.max.y, this._sceneBoundingBox.max.z);
            high.sub(high, center);
            high.setLength(high.length() * 3);
            high.addVectors(center, high);
            //this._cameraDefault.position.set(center.x, center.y, center.z);
            this._controllerMode.orbitCamera.position.set(high.x, high.y, high.z);
            this._controllerMode.orbitControls.update();
        },
        onWindowResize: function () {
            this._controllerMode.updateOnResize();
        },
        animate: function (timestamp) {
            requestAnimationFrame(this.animate.bind(this));
            if (this._mixers.length > 0) {
                for (var i = 0; i < this._mixers.length; i++) {
                    //console.log(this._mixers[i]);
                    this._mixers[i].update(this._clock.getDelta());
                }
            }

            this.render(timestamp);
        },
        render: function (timestamp) {
            this._controllerMode.render();
        },
        showMenuControls: function (__animationcontroles, __help, __settings, __vrMode, __fullscreen) {
            if (__animationcontroles == 0) {
                $(this._elements.animationControls).addClass('hide');
            } else {
                $(this._elements.animationControls).removeClass('hide');
            }


            if (__help == 0) {
                $(this._elements.helpControl).addClass('hide');
            } else {
                $(this._elements.helpControl).removeClass('hide');
            }


            if (__settings == 0) {
                $(this._elements.settingControl).addClass('hide');
            } else {
                $(this._elements.settingControl).removeClass('hide');
            }

            if (__vrMode == 0) {
                $(this._elements.vrModeControl).addClass('hide');
            } else {
                $(this._elements.vrModeControl).removeClass('hide');
            }

            if (__fullscreen == 0) {
                $(this._elements.fullScreenControl).addClass('hide');
            } else {
                $(this._elements.fullScreenControl).removeClass('hide');
            }
        },

        handleHelpButtonClick: function () {
            //switch help overlay on or off
            console.log("help button click...");
        },
        handleSettingsButtonClick: function () {
            //switch help overlay on or off
            console.log("settings button click...");
        },
        handleVRButtonClick: function () {
            //switch help overlay on or off
            console.log("vr button click...");
            this._controllerMode.requestVRMode();
        },
        handleFullScreenButtonClick: function () {
            //switch help overlay on or off
            console.log("fullscreen button click...");
            this.fullscreen();
        },
        fullscreen: function () {
            console.log($(this._elements.modelContainer));
            if ($(this._elements.modelContainer).requestFullscreen) {
                $(this._elements.modelContainer).requestFullscreen();
            } else if ($(this._elements.modelContainer).msRequestFullscreen) {
                $(this._elements.modelContainer).msRequestFullscreen();
            } else if ($(this._elements.modelContainer).mozRequestFullScreen) {
                $(this._elements.modelContainer).mozRequestFullScreen();
            } else if ($(this._elements.modelContainer).webkitRequestFullscreen) {
                $(this._elements.modelContainer).webkitRequestFullscreen();
            }
        }
    }

    return SceneView;
})();
