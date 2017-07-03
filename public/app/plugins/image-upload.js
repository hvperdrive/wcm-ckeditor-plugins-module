"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.53")
		.factory("ckeditorPluginImageUpload", [

			"CKEditorConfig",
			"DialogService",

			function ckeditorPluginModuleDefinitions(
				CKEditorConfig,
				DialogService
			) {
				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["imageUpload"],
						}],
						extraPlugins: "imageUpload",
					},
					plugin: {
						init: function(editor) {

							editor.addCommand("imageUpload", {
								exec: function() {
									var data = {
										img: null,
									};

									DialogService.openModal({
										templateUrl: "app/templates/imageUploadModal.tpl.html",
										data: data,
									}).then(function() {
										if (data.img.cropped && data.img.cropped.asset) {

											var image = editor.document.createElement("img");

											// Add custom class so we can set the domain in the BE
											image.setAttribute("class", "file-upload-in-rte");
											image.setAttribute("src", "/" + data.img.cropped.asset.url);
											image.setAttribute("style", "width: 100%");

											editor.insertElement(image);
										}
									});
								}
							});

							editor.ui.addButton("imageUpload", {
								label: "Upload image",
								command: "imageUpload",
								toolbar: "insert",
								icon: "image",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})();

