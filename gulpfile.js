var elixir = require('laravel-elixir');

elixir(function(mix){
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
            
            // Services
            './src/assets/js/services/ModelService.js',
            
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
        ],
        'dist/js/vendors.js'
    );
});