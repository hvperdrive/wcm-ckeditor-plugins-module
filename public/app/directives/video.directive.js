angular.module("ckeditor-plugins_2.3.0")
	.directive("rteVideo", [
		"CKEditorConfigPack",
		"ErrorMessageService",

		function(CKEditorConfigPack, ErrorMessageService) {
			return {
				templateUrl: CKEditorConfigPack.modulePath + "/directives/video.html",
				replace: true,
				restrict: "E",
				scope: {
					videoUrl: "=",
					transcriptionFile: "=",
					width: "=",
					onConfirm: "=",
					onClose: "=",
				},
				link: function($scope) {
					$scope.errorMessageService = ErrorMessageService;
					$scope.confirm = function() {
						if ($scope.form.$valid) {
							return $scope.onConfirm();
						}

						$scope.form.$setDirty();

						_.forEach($scope.form.$error, function(errorEls, key) {
							if (!$scope.form.$error.hasOwnProperty(key)) {
								return;
							}

							_.forEach(errorEls, function(errorElement) {
								if (errorElement.$setDirty) {
									errorElement.$setDirty();
								}
							});
						});
					};

				},
			};
		},
	]);
