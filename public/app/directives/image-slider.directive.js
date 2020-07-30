angular.module("ckeditor-plugins_2.3.0")
	.directive("imageSlider", [
		"CKEditorConfigPack",

		function(CKEditorConfigPack) {
			return {
				templateUrl: CKEditorConfigPack.modulePath + "/directives/image-slider.html",
				replace: true,
				restrict: "E",
				scope: {
					images: "=",
				},
				link: function($scope) {
					$scope.assetsPath = CKEditorConfigPack.assetsDirPath;
				},
			};
		},
	]);
