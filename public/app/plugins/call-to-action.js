"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_0.0.55")
		.factory("ckeditorPluginCallToAction", [

			"CKEditorConfigPack",

			function ckeditorPluginCallToAction(CKEditorConfigPack) {
				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["callToAction"],
						}],
						extraPlugins: "callToAction",
					},
					plugin: {
						init: function(editor) {
							CKEDITOR.dialog.add("callToAction", function() {
								return {
									title: "Add a Call to Action",
									minWidth: 400,
									minHeight: 75,
									contents: [{
										id: "title",
										label: "Title",
										elements: [{
											type: "text",
											id: "title",
											label: "Title",
											validate: CKEDITOR.dialog.validate.notEmpty("Title cannot be empty!"),
											setup: function(widget) {
												this.setValue(widget.data.title);
											},
											commit: function(widget) {
												widget.setData("title", this.getValue());
											},
										}],
									}, {
										id: "cta",
										label: "Call to Action",
										elements: [{
											type: "text",
											id: "label",
											label: "Label",
											validate: CKEDITOR.dialog.validate.notEmpty("Label cannot be empty!"),
											setup: function(widget) {
												this.setValue(widget.data.label);
											},
											commit: function(widget) {
												widget.setData("label", this.getValue());
											},
										}, {
											type: "text",
											id: "url",
											label: "Url",
											validate: CKEDITOR.dialog.validate.notEmpty("Url cannot be empty!"),
											setup: function(widget) {
												this.setValue(widget.data.url);
											},
											commit: function(widget) {
												widget.setData("url", this.getValue());
											},
										}, {
											type: "text",
											id: "description",
											label: "Description",
											setup: function(widget) {
												this.setValue(widget.data.description);
											},
											commit: function(widget) {
												widget.setData("description", this.getValue());
											},
										}],
									}],
								};
							});

							editor.widgets.add("callToAction", {
								template: [
									"<div class=\"wcm-cta\">",
										"<h3 class=\"wcm-cta__title\">Title</h3>", // eslint-disable-line
										"<a class=\"wcm-cta__action\" href=\"href\" title=\"description\">Call to Action</a>", // eslint-disable-line
									"</div>",
								].join(""),
								upcast: function(el) {
									return el.name === "div" && el.hasClass("m-cta");
								},
								downcast: function() {
									var title = this.element.getChild(0);
									var cta = this.element.getChild(1);

									title.setText(this.data.title);
									cta.setText(this.data.label);
									cta.setAttribute("href", this.data.url);
									cta.setAttribute("title", this.data.description);
								},
								init: function() {
									var title = this.element.getChild(0);
									var cta = this.element.getChild(1);

									this.setData("title", title.getText());
									this.setData("label", cta.getText());
									this.setData("url", cta.getAttribute("href"));
									this.setData("description", cta.getAttribute("title"));
								},
								dialog: "callToAction",
							});

							editor.ui.addButton("callToAction", {
								label: "Add a Call to Action item",
								command: "callToAction",
								toolbar: "insert",
								icon: "/assets/modules/" + CKEditorConfigPack.name + "_" + CKEditorConfigPack.version + "/img/cta.png",
								hidpi: true,
							});

							editor.addContentsCss("/assets/modules/" + CKEditorConfigPack.name + "_" + CKEditorConfigPack.version + "/css/style.css");
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
