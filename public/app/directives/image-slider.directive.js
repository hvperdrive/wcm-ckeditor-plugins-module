"use strict";

angular.module("ckeditor-plugins_0.0.58")
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

					$scope.addImage = function addImage() {
						$scope.images.push({
							src: "",
						});
					};

					$scope.removeImage = function removeImage(index) {
						$scope.images.splice(index, 1);
					};

					$scope.moveImage = function moveImage(index, factor) {
						$scope.images.splice(index + factor, 0, $scope.images.splice(index, 1)[0]);
					};
				},
			};
		},
	]);
