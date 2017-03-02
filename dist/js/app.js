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
            apiURL: '',
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
            var url = '/src/assets/data/3dmodels/obj/male02.obj';
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
            //return ModelService.getModel(modelId);
            
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
            self._view.initModel();
            // ViewUtil.showLoader();
            
            // this._model.loadModel();
            
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
