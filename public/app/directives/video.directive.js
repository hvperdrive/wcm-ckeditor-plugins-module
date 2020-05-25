angular.module("ckeditor-plugins_2.1.3")
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
                    onClose: "="
				},
				link: function($scope) {
                    $scope.errorMessageService = ErrorMessageService;
                    $scope.confirm = function() {
                        if ($scope.form.$valid) {
                            return $scope.onConfirm();
                        }

                        $scope.form.$setDirty();

                        for (let errorProp in $scope.form.$error) {
                            if (!$scope.form.$error.hasOwnProperty(errorProp))
                                return;

                            for (let error of $scope.form.$error[errorProp]) {
                                if (error.$setDirty) {
                                    error.$setDirty();
                                }
                            }
                        }
                    }

                },
			};
		},
	]);
