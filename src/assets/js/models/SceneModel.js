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
