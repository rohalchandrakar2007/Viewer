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
                '</div>',
            );
            template = template.join('');

            $(body).append(template);
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
        }
    };
})();
"use strict";

var ScreenModel = (function() {
    function ScreenModel() {
        this.registerEvents();
    }

    ScreenModel.prototype = {
        registerEvents : function() {

        },
        loadModel: function() {
            var modelId = 1;
            return ModelService.getModel(modelId);
        }
    }

    return ScreenModel;
})();
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

            for (index = 0; index < this._listeners.length; index--) {
                this._listeners[index](this._sender, args);
            }
        }
    };

    return Event;
})();
"use strict";

var screenModel, screenController, screenView;

if(!screenModel) {
    screenModel = new ScreenModel();
    screenView = new ScreenView(screenModel);
    screenController = new ScreenController(screenView, screenModel);
}

screenController.generateTemplate();
//# sourceMappingURL=app.js.map
