"use strict";

var CameraUtil = (function () {
    return {
        getSceneBoundingBox: function (__scene) {
            var box = null;


            var bBox = {
                min: {
                    x: Infinity,
                    y: Infinity,
                    z: Infinity
                },
                max: {
                    x: -Infinity,
                    y: -Infinity,
                    z: -Infinity
                },
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };

            __scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    var geometry = node.geometry;
                    geometry.computeBoundingBox();
                    var bb = geometry.boundingBox;
                    if (bb.min.x < bBox.min.x) {
                        bBox.min.x = bb.min.x;
                    }
                    if (bb.min.y < bBox.min.y) {
                        bBox.min.y = bb.min.y;
                    }
                    if (bb.min.z < bBox.min.z) {
                        bBox.min.z = bb.min.z;
                    }

                    if (bb.max.x > bBox.max.x) {
                        bBox.max.x = bb.max.x;
                    }
                    if (bb.max.y > bBox.max.y) {
                        bBox.max.y = bb.max.y;
                    }
                    if (bb.max.z > bBox.max.z) {
                        bBox.max.z = bb.max.z;
                    }
                }
            });

            bBox.center.x = (bBox.min.x + bBox.max.x) / 2;
            bBox.center.y = (bBox.min.y + bBox.max.y) / 2;
            bBox.center.z = (bBox.min.z + bBox.max.z) / 2;

            return bBox;


            // uncomment to get
            /*__object3D.traverse(function (obj3D) {
                var geometry = obj3D.geometry;
                if (geometry === undefined) return;
                geometry.computeBoundingBox();
                if (box === null) {
                    box = geometry.boundingBox;
                } else {
                    box.union(geometry.boundingBox);
                }
            });
            console.log(box);
            return box;*/
        }
    };
})();
