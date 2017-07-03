"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.54")
		.factory("ckeditorPluginFileUpload", [

			"CKEditorConfig",
			"DialogService",
			"configuration",

			function ckeditorPluginFileUpload(
				CKEditorConfig,
				DialogService,
				configuration
			) {
				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["fileUpload"],
						}],
						extraPlugins: "fileUpload",
					},
					plugin: {
						init: function(editor) {

							editor.addCommand("fileUpload", {
								exec: function() {
									var data = {
										img: null,
									};

									DialogService.openModal({
										templateUrl: "app/templates/fileUploadModal.tpl.html",
										data: data,
									}).then(function() {
										if (data.file && data.file.uuid && data.text) {

											var file = editor.document.createElement("a");

											// Set link text
											file.setHtml(data.text);
											// Set link target
											file.setAttribute("target", "_blank");
											// Set link title (same as link text)
											file.setAttribute("title", data.text);
											// Add custom class so we can set the domain in the BE
											file.setAttribute("class", "file-upload-in-rte");
											// Set link href
											file.setAttribute("href", "/" + configuration.apiPrefix + configuration.apiLevel + "file/download/" + data.file.uuid);

											editor.insertElement(file);
										}
									});
								}
							});

							editor.ui.addButton("fileUpload", {
								label: "Upload file",
								command: "fileUpload",
								toolbar: "insert",
								icon: "/assets/img/ckeditor/file.png",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})();
