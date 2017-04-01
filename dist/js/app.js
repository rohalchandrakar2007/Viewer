var Config = (function () {
    var Config = {
        urlAppName: '/pixum-model-viewer',
        errorMsgClass: 'error-msg'
    };
    return Config;
})();
var EnvConfig = (function () {
    var env;

    switch(window.location.hostname) {
        case 'oobi.proptiger-ws.com':
            env = 'beta';
            break;
        case 'oobi.proptiger.com':
            env = 'prod';
            break;
        default :
            env = 'dev';
            break;

    }

    var EnvConfig = {
        dev: {
            env: env,
            protocol: 'http://',
            apiURL: 'localhost/00sandbox/pixum/model-viewer',
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

var AjaxUtil = (function(){
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
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.log('read error callback for: ' + url);
                    utils.log('error occured ' + errorThrown);
                    self.handleAjaxErrorDefaultCallback(jqXHR, textStatus, errorThrown);
                }
            };

            return $.ajax(ajaxObj);
        },
        getObjFileData: function (url,params) {
            var self = this;
            //var progressCallback = params.progressCallback || false;
            
            var onLoad = params.onLoad || function defaultOnloadCallback () {
                
            };
            var onError = params.onError || function defaultErrorCallback () {
                
            };
            var onProgress = params.onProgress || function (xhr) {
                if ( xhr.lengthComputable ) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log( Math.round(percentComplete, 2) + '% downloaded' );
                }
            }
            
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
            };
            
            var loader = new THREE.OBJLoader( manager );
            loader.load( url,
                onLoad,
                onProgress,
                onError
            );
            
            
        },
        makeRequest: function (url, type, data, async) {
            var enableCORS = enableCORS || false;
            var data  = (typeof data === 'undefined') ? {} : data;

            var ajaxObj = {
                type        : type,
                url         : url,
                async       : true,
                dataType    : "json",
                data        : JSON.stringify(data),
                contentType : "application/json",
                success     : function (data) {
                    // register success callback in return promise
                },
                error       : function (jqXHR, textStatus, errorThrown) {
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

var ViewUtil = (function(){
    return {
        showModal: function(msg) {
            alert(msg);
        },
        showLoader: function() {
            var template = [];

            template.push(
                '<div id="loader213DSDdsdASD3dds" style="position:absolute;top:0;right:0;bottom:0;left:0;">',
                    'Loading...',
                '</div>'
            );
            template = template.join('');

            $(document.body).append(template);
        },
        hideLoader: function() {
            $('#loader213DSDdsdASD3dds').remove();
        }
    };
})();
"use strict";

var ModelService = (function(){
    return {
        getModel: function(id) {
            var url = '';
            return AjaxUtil.getData(url);
        },
        getObjModel: function(id,params) {
            var url = EnvConfig.protocol + EnvConfig.apiURL + '/src/assets/data/3dmodels/obj/male02.obj';
            return AjaxUtil.getObjFileData(url, params);
        }
    };
})();
"use strict";

var SceneModel = (function() {
    function SceneModel() {
        this.registerEvents();
        
    }

    SceneModel.prototype = {
        registerEvents : function() {
            this.modelLoaded = new Event(this);
        },
        loadModel: function() {
            var self = this;
            var modelId = 1;
            
            var params = {
                'onLoad' : function(object) {
                    console.log('onload');
                    self.modelLoaded.notify({'object':object});
                },
                'onError' : function() {
                    console.log('onerror');
                },
                'onProgress' :  function(xhr) {
                    console.log('onprogress');
                }
            };
            
            return ModelService.getObjModel(modelId, params);
        }
    }

    return SceneModel;
})();
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
"use strict";

var SceneController = (function() {
    function SceneController(view, model) {
        this._view = view;
        this._model = model;

        this.attachViewListeners();
    }

    SceneController.prototype = {
        attachViewListeners : function() {
            var self = this;
        },
        generateTemplate: function() {
            var self = this;
            this._model.loadModel();
            self._view.buildSkeleton();
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

if(!sceneModel) {
    sceneModel = new SceneModel();
    sceneView = new SceneView(sceneModel);
    sceneController = new SceneController(sceneView, sceneModel);
}

sceneController.generateTemplate();
//# sourceMappingURL=app.js.map
