"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_0.0.53")
		.factory("ckeditorPluginClassApplier", [

			function ckeditorPluginModuleDefinitions() {
				return {
					meta: {
						toolbar: [{
							name: "basicstyles",
							items: ["classApplier"],
						}],
						extraPlugins: "classApplier",
					},
					plugin: {
						init: function(editor) {

							CKEDITOR.dialog.add("classApplierDialog", function() {
								return {
									title: "Add inline class",
									minWidth: 400,
									minHeight: 75,
									contents: [{
										id: "class",
										label: "Class",
										elements: [{
											type: "text",
											id: "value",
											label: "Class name",
											validate: CKEDITOR.dialog.validate.notEmpty("Class name cannot be empty!"),
										}],
									}],
									onOk: function() {
										var dialog = this;
										var style = new CKEDITOR.style({
											attributes: {
												class: dialog.getValueOf("class", "value"),
											},
										});

										editor.applyStyle(style);
									}
								};
							});

							editor.addCommand("classApplier", new CKEDITOR.dialogCommand("classApplierDialog"));

							editor.ui.addButton("classApplier", {
								label: "Apply class to selection",
								command: "classApplier",
								toolbar: "insert",
								icon: "/assets/img/ckeditor/tag.png",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
