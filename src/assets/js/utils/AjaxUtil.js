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