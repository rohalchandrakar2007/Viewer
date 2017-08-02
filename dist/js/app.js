var Config = (function () {
    var Config = {
        urlAppName: '/pixum-model-viewer',
        errorMsgClass: 'error-msg',

    };
    return Config;
})();

var EnvConfig = (function () {
    var env;

    switch (window.location.hostname) {
        case 'oobi.proptiger-ws.com':
            env = 'beta';
            break;
        case 'oobi.proptiger.com':
            env = 'prod';
            break;
        default:
            env = 'dev';
            break;

    }

    var EnvConfig = {
        dev: {
            env: env,
            protocol: 'http://',
            apiURL: 'localhost:8888',
            showLogs: true
        },
        beta: {
            env: env,
            protocol: window.location.protocol + '//',
            apiURL: '',
            showLogs: true
        },
        prod: {
            env: env,
            protocol: window.location.protocol + '//',
            apiURL: '',
            showLogs: false
        }
    };

    return EnvConfig[env];

})();

"use strict";

var Util = (function(){
    return {
        // 
    };
})();
"use strict";

var AjaxUtil = (function () {
    return {
        getData: function (url) {
            var self = this;
            var ajaxObj = {
                type: "GET",
                url: url,
                async: true,
                dataType: "json",
                success: function (data) {
                    // register success callback in return promise
                },
                error: function (jqXHR, textStatus, errorThrown) {}
            };

            return $.ajax(ajaxObj);
        },
        getObjMtlFileData: function (__rootPath, __objFileName, __mtlFileName, params) {
            var self = this;
            //var progressCallback = params.progressCallback || false;

            var onLoad = params.onLoad || function defaultOnloadCallback() {

            };
            var onError = params.onError || function defaultErrorCallback() {

            };
            var onProgress = params.onProgress || function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            }

            var manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };

            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath(__rootPath);
            mtlLoader.load(__mtlFileName,
                function (mat) {
                    var loader = new THREE.OBJLoader(manager);
                    loader.setMaterials(mat);
                    loader.setPath(__rootPath);
                    loader.load(__objFileName,
                        onLoad,
                        onProgress,
                        onError
                    );
                }
            );
        },
        getObjFileData: function (__rootPath, __objFileName, params) {
            var self = this;
            //var progressCallback = params.progressCallback || false;

            var onLoad = params.onLoad || function defaultOnloadCallback() {

            };
            var onError = params.onError || function defaultErrorCallback() {

            };
            var onProgress = params.onProgress || function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            }

            var manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };

            var loader = new THREE.OBJLoader(manager);
            loader.setPath(__rootPath);
            loader.load(__objFileName,
                onLoad,
                onProgress,
                onError
            );
        },
        getFbxFileData: function (__filePath, params) {
            var self = this;
            //var progressCallback = params.progressCallback || false;

            var onLoad = params.onLoad || function defaultOnloadCallback() {

            };
            var onError = params.onError || function defaultErrorCallback() {

            };
            var onProgress = params.onProgress || function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            }

            var manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };

            var loader = new THREE.FBXLoader(manager);
            loader.load(__filePath,
                onLoad,
                onProgress,
                onError
            );
        },
        getColladaFileData: function (__filePath, params) {
            var self = this;
            //var progressCallback = params.progressCallback || false;

            var onLoad = params.onLoad || function defaultOnloadCallback() {

            };
            var onError = params.onError || function defaultErrorCallback() {

            };
            var onProgress = params.onProgress || function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            }

            var manager = new THREE.LoadingManager();
            manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };

            var loader = new THREE.ColladaLoader(manager);
            loader.options.convertUpAxis = true;
            loader.load(__filePath,
                onLoad,
                onProgress,
                onError
            );
        },
        makeRequest: function (url, type, data, async) {
            var enableCORS = enableCORS || false;
            var data = (typeof data === 'undefined') ? {} : data;

            var ajaxObj = {
                type: type,
                url: url,
                async: true,
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (data) {
                    // register success callback in return promise
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.log('read error callback for: ' + url);
                    utils.log('error occured ' + errorThrown);
                    return false;
                }
            };

            return $.ajax(ajaxObj);
        },
        getJsonData: function (url, callback) {
            var self = this;
            return $.ajax({
                type: 'GET',
                url: url,
                async: true,
                jsonpCallback: callback,
                contentType: "application/json",
                dataType: "jsonp",
                success: function (data) {
                    // register success callback in return promise
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.log('read json error callback for: ' + url);
                    utils.log('error occured ' + errorThrown);
                    self.handleAjaxErrorDefaultCallback(jqXHR, textStatus, errorThrown);
                }
            });
        }
    };
})();

"use strict";

var ViewUtil = (function () {
    return {
        showModal: function (msg) {
            alert(msg);
        },
        showLoader: function () {
            var template = [];

            template.push(
                '<div id="loader213DSDdsdASD3dds" style="position:absolute;top:0;right:0;bottom:0;left:0;">',
                'Loading...',
                '</div>'
            );
            template = template.join('');

            $(document.body).append(template);
        },
        hideLoader: function () {
            $('#loader213DSDdsdASD3dds').remove();
        },
        getWebVRSettings: function () {
            return {
                /**
                 * webvr-polyfill configuration
                 */
                // Forces availability of VR mode.
                FORCE_ENABLE_VR: true, // Default: false.
                // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
                //K_FILTER: 0.98, // Default: 0.98.
                // How far into the future to predict during fast motion.
                //PREDICTION_TIME_S: 0.040, // Default: 0.040 (in seconds).
                // Flag to disable touch panner. In case you have your own touch controls
                //TOUCH_PANNER_DISABLED: true, // Default: false.
                // Enable yaw panning only, disabling roll and pitch. This can be useful for
                // panoramas with nothing interesting above or below.
                //YAW_ONLY: true, // Default: false.
                // Enable the deprecated version of the API (navigator.getVRDevices).
                //ENABLE_DEPRECATED_API: true, // Default: false.
                // Scales the recommended buffer size reported by WebVR, which can improve
                // performance. Making this very small can lower the effective resolution of
                // your scene.
                BUFFER_SCALE: 0.5, // default: 1.0
                // Allow VRDisplay.submitFrame to change gl bindings, which is more
                // efficient if the application code will re-bind it's resources on the
                // next frame anyway.
                // Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
                // gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
                // and gl.TEXTURE_BINDING_2D for texture unit 0
                // Warning: enabling this might lead to rendering issues.
                //DIRTY_SUBMIT_FRAME_BINDINGS: true // default: false
            };
        },
        getDisplayModes: function () {
            return {
                ORBIT: 1,
                VR: 2,
                FLY: 3
            };
        }
    };
})();

"use strict";

var CameraUtil = (function () {
    return {
        getSceneBoundingBox: function (__scene) {
            var box = null;


            var bBox = {
                min: {
                    x: Infinity,
                    y: Infinity,
                    z: Infinity
                },
                max: {
                    x: -Infinity,
                    y: -Infinity,
                    z: -Infinity
                },
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };

            __scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    var geometry = node.geometry;
                    geometry.computeBoundingBox();
                    var bb = geometry.boundingBox;
                    if (bb.min.x < bBox.min.x) {
                        bBox.min.x = bb.min.x;
                    }
                    if (bb.min.y < bBox.min.y) {
                        bBox.min.y = bb.min.y;
                    }
                    if (bb.min.z < bBox.min.z) {
                        bBox.min.z = bb.min.z;
                    }

                    if (bb.max.x > bBox.max.x) {
                        bBox.max.x = bb.max.x;
                    }
                    if (bb.max.y > bBox.max.y) {
                        bBox.max.y = bb.max.y;
                    }
                    if (bb.max.z > bBox.max.z) {
                        bBox.max.z = bb.max.z;
                    }
                }
            });

            bBox.center.x = (bBox.min.x + bBox.max.x) / 2;
            bBox.center.y = (bBox.min.y + bBox.max.y) / 2;
            bBox.center.z = (bBox.min.z + bBox.max.z) / 2;

            return bBox;


            // uncomment to get
            /*__object3D.traverse(function (obj3D) {
                var geometry = obj3D.geometry;
                if (geometry === undefined) return;
                geometry.computeBoundingBox();
                if (box === null) {
                    box = geometry.boundingBox;
                } else {
                    box.union(geometry.boundingBox);
                }
            });
            console.log(box);
            return box;*/
        }
    };
})();

"use strict";

var ModelService = (function () {
    return {
        getModel: function (id) {
            var url = '';
            return AjaxUtil.getData(url);
        },
        getObjModel: function (__modelConfig, params) {
            var rootpath = EnvConfig.protocol + EnvConfig.apiURL + __modelConfig.rootpath;
            var objfilename = __modelConfig.objfilename;
            return AjaxUtil.getObjFileData(rootpath, objfilename, params);
        },
        getObjMtlModel: function (__modelConfig, params) {
            var rootpath = EnvConfig.protocol + EnvConfig.apiURL + __modelConfig.rootpath;
            var objfilename = __modelConfig.objfilename;
            var mtlfilename = __modelConfig.mtlfilename;
            return AjaxUtil.getObjMtlFileData(rootpath, objfilename, mtlfilename, params);
        },
        getFbxModel: function (__modelConfig, params) {
            var rootpath = EnvConfig.protocol + EnvConfig.apiURL + __modelConfig.rootpath;
            return AjaxUtil.getFbxFileData(rootpath, params);
        },
        getColladaModel: function (__modelConfig, params) {
            var rootpath = EnvConfig.protocol + EnvConfig.apiURL + __modelConfig.rootpath;
            return AjaxUtil.getColladaFileData(rootpath, params);
        }
    };
})();

"use strict"

var ControllerMode = (function () {
    function ControllerMode(__scene, __renderer, __controlsContainerElementClass, __rendererWidth, __rendererHeight) {
        this.scene = __scene;
        this.renderer = __renderer;
        this.controlsContainerClassNmae = __controlsContainerElementClass;
        this.rendererWidth = __rendererWidth;
        this.rendererHeight = __rendererHeight;

        this.vrCamera = null;
        this.orbitCamera = null;
        this.vrEffect = null;
        this.orbitControls = null;
        this.vrControls = null;
        this.vrManager = null;
        this.displayModes = null;
        this.currentDisplatMode = null;
        this.skipSwitchDisplayMode = null;
        this.vrButtonProxi = null;
    }

    ControllerMode.prototype = {
        init: function () {

            // Misc.
            this._skipSwitchDisplayMode = false;
            this.displayModes = ViewUtil.getDisplayModes();
            this.currentDisplatMode = this.displayModes.ORBIT;


            // Camera
            this.orbitCamera = new THREE.PerspectiveCamera(45, this.rendererWidth / this.rendererHeight, 1, 20000);
            this.vrCamera = new THREE.PerspectiveCamera(45, this.rendererWidth / this.rendererHeight, 1, 20000);

            // effect 
            var WebVRConfig = ViewUtil.getWebVRSettings();
            this.vrEffect = new THREE.VREffect(this.renderer);
            this.vrEffect.setSize(this.rendererWidth, this.rendererHeight);

            // controls, camera
            this.orbitControls = new THREE.OrbitControls(this.orbitCamera, this.renderer.domElement);
            this.orbitControls.enableDamping = true;
            this.orbitControls.dampingFactor = 0.25;
            this.orbitControls.rotateSpeed = 0.5;
            //this.orbitControls.momentumDampingFactor = 1.8;

            // smooth Zoom
            //this.orbitControls.constraint.smoothZoom = true;
            //this.orbitControls.constraint.zoomDampingFactor = 0.2;
            //this.orbitControls.constraint.smoothZoomSpeed = 5.0;

            this.vrControls = new THREE.VRControls(this.vrCamera);

            //this.orbitCamera.position.set(100, 50, 100);
            this.orbitControls.update();

            this.vrManager = new WebVRManager(this.renderer, this.vrEffect, {
                hideButton: true
            });

            var self = this;
            $(window).on('vrdisplaypresentchange', function (e) {
                if (!self.skipSwitchDisplayMode) {
                    $(self.controlsContainerClassNmae).removeClass('hide');
                    self.enterOrbitMode();
                } else {
                    self.skipSwitchDisplayMode = false;
                }
            });
        },

        updateOnResize: function () {
            this.rendererWidth = window.innerWidth;
            this.rendererHeight = window.innerHeight;
            switch (this.currentDisplatMode) {

                case this.displayModes.FLY:
                    // update fly controls
                    break;
                case this.displayModes.VR:
                    // update vr controls
                    this.vrCamera.aspect = this.rendererWidth / this.rendererHeight;
                    this.vrCamera.updateProjectionMatrix();
                    this.vrEffect.setSize(this.rendererWidth, this.rendererHeight);
                    break;
                case this.displayModes.ORBIT:
                    // upadate orbit controls
                    this.orbitCamera.aspect = this.rendererWidth / this.rendererHeight;
                    this.orbitCamera.updateProjectionMatrix();
                    this.renderer.setSize(this.rendererWidth, this.rendererHeight);
                    break;
            }
        },

        render: function () {
            //console.log(this.currentDisplatMode);
            switch (this.currentDisplatMode) {

                case this.displayModes.FLY:
                    // update fly controls
                    break;
                case this.displayModes.VR:
                    // update vr controls
                    this.vrControls.update();
                    this.vrManager.render(this.scene, this.vrCamera);
                    break;
                case this.displayModes.ORBIT:
                    // upadate orbit controls
                    //this.orbitControls.update();
                    this.renderer.render(this.scene, this.orbitCamera);
                    break;
            }
        },

        enterVRMode: function () {
            this.vrManager.onVRClick_();
            this.currentDisplatMode = this.displayModes.VR;
        },

        enterOrbitMode: function () {
            this.currentDisplatMode = this.displayModes.ORBIT;
        },

        enterFLYMode: function () {
            this.currentDisplatMode = this.displayModes.FLY;
        },

        getCurrentMode: function () {
            return this.currentDisplatMode;
        },

        getDisplayModes: function () {
            return this.displayModes;
        },

        requestVRMode: function () {
            $(this.controlsContainerClassNmae).addClass('hide');
            this.setSkipSwitchDisplayMode(true);
            this.enterVRMode();
        },

        setSkipSwitchDisplayMode: function (__flag) {
            if (__flag)
                this.skipSwitchDisplayMode = true;
            else
                this.skipSwitchDisplayMode = false;
        }
    }

    return ControllerMode;
})();

"use strict";

var SceneModel = (function () {
    function SceneModel() {
        this.registerEvents();
        this.isMobileDevice = false;
        this.modelConfig = null;
    }

    SceneModel.prototype = {
        registerEvents: function () {
            this.modelLoaded = new Event(this);
        },
        loadModel: function (__sceneConfig) {
            var self = this;
            var modelId = 1;

            var params = {
                'onLoad': function (object) {
                    console.log('onload');
                    self.modelLoaded.notify({
                        'object': object
                    });
                },
                'onError': function () {
                    console.log('onerror');
                },
                'onProgress': function (xhr) {
                    console.log('onprogress');
                }
            };

            var modelObject = null;

            if (__sceneConfig.type === 'obj')
                ModelService.getObjModel(__sceneConfig, params);
            else if (__sceneConfig.type === 'objmtl')
                ModelService.getObjMtlModel(__sceneConfig, params);
            else if (__sceneConfig.type === 'fbx')
                ModelService.getFbxModel(__sceneConfig, params);
            else if (__sceneConfig.type === 'collada')
                ModelService.getColladaModel(__sceneConfig, params);

            return modelObject;
        },
        get3DModelSettings: function () {
            return {

            };
        }
    }

    return SceneModel;
})();

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

"use strict";

var SceneController = (function () {
    function SceneController(view, model) {
        this._view = view;
        this._model = model;

        this.attachViewListeners();
    }

    SceneController.prototype = {
        attachViewListeners: function () {
            var self = this;
        },
        generateTemplate: function () {
            var self = this;
            this._model.isMobileDevice = this.isMobileDevice();

            // check for device specifications
            if (this._model.isMobileDevice) {
                this._view.showMenuControls(0, 1, 0, 1, 0);
            } else {
                this._view.showMenuControls(0, 1, 0, 0, 1);
            }

            // load config file for model
            var configUrl = EnvConfig.protocol + EnvConfig.apiURL + '/src/assets/data/3dmodels/objmtl/model_ID.json';
            AjaxUtil.getData(configUrl).then(
                function (__response) {
                    self._model.modelConfig = __response.tempconfig;
                    self._model.loadModel(__response.tempconfig);
                },
                function (__errMessage) {});
        },
        isMobileDevice: function () {
            var isMobile = false; //initiate as false
            // device detection
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
            return isMobile;
        }

    }

    return SceneController;
})();

"use strict";

var Event = (function(){
    function Event(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    Event.prototype = {
        attach: function(listener) {
            this._listeners.push(listener);
        },
        notify: function(args) {
            var index;

            for (index = 0; index < this._listeners.length; index++) {
                this._listeners[index](this._sender, args);
            }
        }
    };

    return Event;
})();
"use strict";

var sceneModel, sceneController, sceneView;

if (!sceneModel) {
    sceneModel = new SceneModel();
    sceneView = new SceneView(sceneModel);
    sceneController = new SceneController(sceneView, sceneModel);
}

sceneController.generateTemplate();

//# sourceMappingURL=app.js.map
