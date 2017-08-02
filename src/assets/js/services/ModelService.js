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
