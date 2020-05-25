"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_1.3.0")
		.factory("ckeditorPluginCallToAction", [

			"CKEditorConfigPack",

			function ckeditorPluginCallToAction(CKEditorConfigPack) {
				function getProtocolFromHref(href) {
					if (!href || href.indexOf(":") < 0) {
						return "";
					}

					var matches = href.match(/^.*:\/\/|mailto/);

					return matches && matches.length ? matches[0] : "";
				}

				function getUrlFromHref(href) {
					if (!href) {
						return "";
					}

					var matches = href.match(/(^.*:\/\/|mailto)(.*)/);

					return matches && matches.length ? matches[2] : href;
				}

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
											type: "select",
											id: "protocol",
											label: "Protocol",
											default: "",
											items: [
												[ "local", "" ],
												["https://"],
												["http://"],
												["mailto:"],
											],
											setup: function(widget) {
												this.setValue(widget.data.protocol);
											},
											commit: function(widget) {
												widget.setData("protocol", this.getValue());
											},
										}, {
											type: "select",
											id: "target",
											label: "Target",
											validate: CKEDITOR.dialog.validate.notEmpty("Target cannot be empty!"),
											default: "_blank",
											items: [
												["Blank (default)", "_blank"],
												["Self", "_self"],
											],
											setup: function(widget) {
												this.setValue(widget.data.target);
											},
											commit: function(widget) {
												widget.setData("target", this.getValue());
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
											type: "textarea",
											inputStyle: "min-height: 75px",
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
									"<a class=\"wcm-cta__action\" href=\"href\" title=\"description\" target=\"_blank\">Call to Action</a>", // eslint-disable-line
									"</div>",
								].join(""),
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-cta");
								},
								downcast: function() {
									var title = this.element.getChild(0);
									var cta = this.element.getChild(1);

									title.setText(this.data.title);
									cta.setText(this.data.label);
									cta.setAttribute("href", this.data.protocol + this.data.url);
									cta.setAttribute("data-cke-saved-href", this.data.protocol + this.data.url);
									cta.setAttribute("title", this.data.description);
									cta.setAttribute("target", this.data.target);
								},
								init: function() {
									var title = this.element.getChild(0);
									var cta = this.element.getChild(1);

									this.setData("title", title.getText());
									this.setData("label", cta.getText());
									this.setData("url", getUrlFromHref(cta.getAttribute("href")));
									this.setData("protocol", getProtocolFromHref(cta.getAttribute("href")));
									this.setData("description", cta.getAttribute("title") || "");
									this.setData("target", cta.getAttribute("target") || "_blank");
								},
								dialog: "callToAction",
							});

							editor.ui.addButton("callToAction", {
								label: "Add a Call to Action item",
								command: "callToAction",
								toolbar: "insert",
								icon: CKEditorConfigPack.assetsDirPath + "img/cta.png",
								hidpi: true,
							});

							editor.addContentsCss(CKEditorConfigPack.assetsDirPath + "css/style.css");
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
