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