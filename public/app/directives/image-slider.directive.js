"use strict";

angular.module("ckeditor-plugins_1.2.1")
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
