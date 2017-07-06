"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_0.0.55")
		.factory("ckeditorPluginVideoDialog", [

			"CKEditorConfigPack",
			"VideoService",

			function ckeditorPluginVideoDialog(
				CKEditorConfig,
				VideoService
			) {
				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["videoDialog"],
						}],
						extraPlugins: "videoDialog",
					},
					plugin: {
						icons: "videoDialog",
						afterInit: function(editor) {
							// Integrate with align commands (justify plugin).
							var align = {
								left: 1,
								right: 1,
								center: 1,
								block: 1,
							};
							var integrate = VideoService.alignCommandIntegrator(editor, "videoDialog");

							for (var value in align) {
								integrate(value);
							}
						},
						init: function(editor) {

							CKEDITOR.dialog.add("videoDialog", function() {
								return {
									title: "Insert a Youtube, Vimeo, Dailymotion URL or embed code",
									minWidth: 400,
									minHeight: 100,
									contents: [{
										id: "tab-basic",
										label: "Basic Settings",
										elements: [{
											type: "text",
											id: "url_video",
											label: "Youtube, Vimeo, Dailymotion URL or embed code",
											validate: CKEDITOR.dialog.validate.notEmpty("Empty!"),
											setup: function(widget) {
												this.setValue(widget.data.url_video);
											},
											commit: function(widget) {
												widget.setData("url_video", this.getValue());
											},
										},
										{
											type: "text",
											id: "width",
											label: "Width (%)",
											validate: CKEDITOR.dialog.validate.notEmpty("Empty!"),
											setup: function(widget) {
												this.setValue(widget.data.width || "100");
											},
											commit: function(widget) {
												var width = parseInt(this.getValue(), 10);

												if (isNaN(width)) {
													width = 100;
												}

												widget.setData("width", width);
											},
										}],
									}],
								};
							});

							if (editor.contextMenu) {
								editor.addMenuGroup("videoGroup");
								editor.addMenuItem("videoEdit", {
									label: "Edit video",
									icon: "/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/film.png",
									command: "videoDialog",
									group: "videoGroup",
								});

								editor.contextMenu.addListener(function(element) {
									if (element.getChild && element.getChild(0).hasClass("wcm-video")) {
										return {
											videoEdit: CKEDITOR.TRISTATE_OFF,
										};
									}
								});
							}

							editor.widgets.add("videoDialog", {
								template: [
									"<div class=\"wcm-video\">",
									"<iframe allowfullscreen=\"allowfullscreen\" frameborder=\"0\" src=\"\" class=\"wcm-video__frame\"></iframe>",
									"</div>",
								].join(""),
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-video");
								},
								downcast: function () {
									var vid = this.element.getChild(0);
									var src = VideoService.getVideoSource(this.data.url_video);

									vid.setAttribute("src", src);

									this.element.setStyles({
										width: (this.data.width || "100") + "%",
										"padding-bottom": (56.25 * (this.data.width || 100) / 100) + "%",
									});

									VideoService.calculateAndPositionMask(this);
								},
								init: function() {
									var vid = this.element.getChild(0);
									var width = this.element.getStyle("width");


									this.setData("url_video", vid.getAttribute("src"));
									this.setData("width", width || 100);

									if (["left", "right"].indexOf(this.element.getStyle("float")) !== -1) {
										this.setData("align", this.element.getStyle("float"));
									} else if (this.element.getStyle("margin") === "auto") {
										this.setData("align", "center");
									}

									this.element.setStyles({
										"position": "relative",
										"height": 0,
									});

									vid.setStyles({
										"position": "absolute",
										"height": "100%",
										"width": "100%",
									});
								},
								data: function() {
									VideoService.calculateAndPositionMask(this);
								},
								styleableElements: "div",
								mask: true,
								dialog: "videoDialog",
							});

							editor.ui.addButton("videoDialog", {
								label: "Insert a Youtube, Vimeo or Dailymotion video",
								command: "videoDialog",
								icon: "/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/film.png",
								hidpi: true,
							});

							editor.addContentsCss("/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/css/videodetector.css");
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
