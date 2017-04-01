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