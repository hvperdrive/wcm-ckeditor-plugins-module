angular.module("ckeditor-plugins_2.1.3")
	.directive("rteVideo", [
		"CKEditorConfigPack",

		function(CKEditorConfigPack) {
			return {
				templateUrl: CKEditorConfigPack.modulePath + "/directives/video.html",
				replace: true,
				restrict: "E",
				scope: {
                    videoUrl: "=",
                    transcriptionFile: "=",
                    onConfirm: "=",
                    onClose: "="
				},
				link: function($scope) {
                    $scope.$watch("transcriptionUrl", (nv, ov) => {
                        console.log(nv, ov);
                    })
				},
			};
		},
	]);
