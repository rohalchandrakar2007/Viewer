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