"use strict";

var ModelService = (function(){
    return {
        getModel: function(id) {
            var url = '';
            return AjaxUtil.getData(url);
        }
    };
})();