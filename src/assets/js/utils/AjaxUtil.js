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
