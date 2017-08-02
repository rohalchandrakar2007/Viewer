"use strict"

var ControllerMode = (function () {
    function ControllerMode(__scene, __renderer, __controlsContainerElementClass, __rendererWidth, __rendererHeight) {
        this.scene = __scene;
        this.renderer = __renderer;
        this.controlsContainerClassNmae = __controlsContainerElementClass;
        this.rendererWidth = __rendererWidth;
        this.rendererHeight = __rendererHeight;

        this.vrCamera = null;
        this.orbitCamera = null;
        this.vrEffect = null;
        this.orbitControls = null;
        this.vrControls = null;
        this.vrManager = null;
        this.displayModes = null;
        this.currentDisplatMode = null;
        this.skipSwitchDisplayMode = null;
        this.vrButtonProxi = null;
    }

    ControllerMode.prototype = {
        init: function () {

            // Misc.
            this._skipSwitchDisplayMode = false;
            this.displayModes = ViewUtil.getDisplayModes();
            this.currentDisplatMode = this.displayModes.ORBIT;


            // Camera
            this.orbitCamera = new THREE.PerspectiveCamera(45, this.rendererWidth / this.rendererHeight, 1, 20000);
            this.vrCamera = new THREE.PerspectiveCamera(45, this.rendererWidth / this.rendererHeight, 1, 20000);

            // effect 
            var WebVRConfig = ViewUtil.getWebVRSettings();
            this.vrEffect = new THREE.VREffect(this.renderer);
            this.vrEffect.setSize(this.rendererWidth, this.rendererHeight);

            // controls, camera
            this.orbitControls = new THREE.OrbitControls(this.orbitCamera, this.renderer.domElement);
            this.orbitControls.enableDamping = true;
            this.orbitControls.dampingFactor = 0.25;
            this.orbitControls.rotateSpeed = 0.5;
            //this.orbitControls.momentumDampingFactor = 1.8;

            // smooth Zoom
            //this.orbitControls.constraint.smoothZoom = true;
            //this.orbitControls.constraint.zoomDampingFactor = 0.2;
            //this.orbitControls.constraint.smoothZoomSpeed = 5.0;

            this.vrControls = new THREE.VRControls(this.vrCamera);

            //this.orbitCamera.position.set(100, 50, 100);
            this.orbitControls.update();

            this.vrManager = new WebVRManager(this.renderer, this.vrEffect, {
                hideButton: true
            });

            var self = this;
            $(window).on('vrdisplaypresentchange', function (e) {
                if (!self.skipSwitchDisplayMode) {
                    $(self.controlsContainerClassNmae).removeClass('hide');
                    self.enterOrbitMode();
                } else {
                    self.skipSwitchDisplayMode = false;
                }
            });
        },

        updateOnResize: function () {
            this.rendererWidth = window.innerWidth;
            this.rendererHeight = window.innerHeight;
            switch (this.currentDisplatMode) {

                case this.displayModes.FLY:
                    // update fly controls
                    break;
                case this.displayModes.VR:
                    // update vr controls
                    this.vrCamera.aspect = this.rendererWidth / this.rendererHeight;
                    this.vrCamera.updateProjectionMatrix();
                    this.vrEffect.setSize(this.rendererWidth, this.rendererHeight);
                    break;
                case this.displayModes.ORBIT:
                    // upadate orbit controls
                    this.orbitCamera.aspect = this.rendererWidth / this.rendererHeight;
                    this.orbitCamera.updateProjectionMatrix();
                    this.renderer.setSize(this.rendererWidth, this.rendererHeight);
                    break;
            }
        },

        render: function () {
            //console.log(this.currentDisplatMode);
            switch (this.currentDisplatMode) {

                case this.displayModes.FLY:
                    // update fly controls
                    break;
                case this.displayModes.VR:
                    // update vr controls
                    this.vrControls.update();
                    this.vrManager.render(this.scene, this.vrCamera);
                    break;
                case this.displayModes.ORBIT:
                    // upadate orbit controls
                    //this.orbitControls.update();
                    this.renderer.render(this.scene, this.orbitCamera);
                    break;
            }
        },

        enterVRMode: function () {
            this.vrManager.onVRClick_();
            this.currentDisplatMode = this.displayModes.VR;
        },

        enterOrbitMode: function () {
            this.currentDisplatMode = this.displayModes.ORBIT;
        },

        enterFLYMode: function () {
            this.currentDisplatMode = this.displayModes.FLY;
        },

        getCurrentMode: function () {
            return this.currentDisplatMode;
        },

        getDisplayModes: function () {
            return this.displayModes;
        },

        requestVRMode: function () {
            $(this.controlsContainerClassNmae).addClass('hide');
            this.setSkipSwitchDisplayMode(true);
            this.enterVRMode();
        },

        setSkipSwitchDisplayMode: function (__flag) {
            if (__flag)
                this.skipSwitchDisplayMode = true;
            else
                this.skipSwitchDisplayMode = false;
        }
    }

    return ControllerMode;
})();
