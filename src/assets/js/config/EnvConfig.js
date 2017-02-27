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
