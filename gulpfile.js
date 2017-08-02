var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix.sass(
        ['./src/assets/sass/app.scss'],
        'dist/css/app.css'
    );

    mix.scripts(
        [
            // Configs
            './src/assets/js/config/config.js',
            './src/assets/js/config/envConfig.js',

            // Utils
            './src/assets/js/utils/Utils.js',
            './src/assets/js/utils/AjaxUtil.js',
            './src/assets/js/utils/ViewUtil.js',
            './src/assets/js/utils/CameraUtil.js',

            // Services
            './src/assets/js/services/ModelService.js',

            // Custome JS
            './src/assets/js/CustomJS/ControllerMode.js',

            // Models
            './src/assets/js/models/SceneModel.js',

            // Views
            './src/assets/js/views/SceneView.js',

            // Controllers
            './src/assets/js/controllers/SceneController.js',

            // Event
            './src/assets/js/Event.js',

            // Init
            './src/assets/js/init.js',


        ],
        'dist/js/app.js'
    );

    mix.scripts(
        [
            './node_modules/three/build/three.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/three-firstperson-vr-controls/FirstPersonVRControls.js',
            './node_modules/webvr-ui/build/webvr-ui.js',
            './node_modules/webvr-polyfill/build/webvr-polyfill.js',
            './node_modules/webvr-boilerplate/build/webvr-manager.js',
            './node_modules/three/examples/js/loaders/ColladaLoader.js',
            // THREEJS
            './src/assets/vendors/FBXLoader2.js',
            './src/assets/vendors/OBJLoader.js',
            './src/assets/vendors/MTLLoader.js',
            './src/assets/vendors/OrbitControls.js',
            './src/assets/vendors/VREffect.js',
            './src/assets/vendors/VRControls.js'
        ],
        'dist/js/vendors.js'
    );
});
