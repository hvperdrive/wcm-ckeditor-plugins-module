"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_1.3.0")
		.factory("ckeditorPluginVideoDialog", [

			"CKEditorConfigPack",
            "VideoService",
            "DialogService",

			function ckeditorPluginVideoDialog(
				CKEditorConfig,
                VideoService,
                DialogService
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
                            var updateWidget = function(vidEl, widgetEl, wrapperEl, data) {
                                var src = VideoService.getVideoSource(data.videoUrl);
                                var transcriptionFile = data.transcriptionFile;

                                if (vidEl.getAttribute('src') !== src) {
                                    vidEl.setAttribute("src", src);
                                }

                                widgetEl.setAttribute("data-transcription-uuid", _.get(transcriptionFile, "uuid") || "");
                                widgetEl.setAttribute("data-transcription-src", "/files/download/" + _.get(transcriptionFile, "uuid") || "");
                                widgetEl.setAttribute("data-transcription-name", _.get(transcriptionFile, "name") || "");
                                widgetEl.setAttribute("data-transcription-title", _.get(transcriptionFile, "meta.title") || "");
                                widgetEl.setAttribute("data-transcription-description", _.get(transcriptionFile, "meta.description") || "");

                                widgetEl.setStyles({
                                    width: (data.width || "100") + "%",
                                    "padding-bottom": 56.25 * (data.width || 100) / 100 + "%"
                                });

                                VideoService.calculateAndPositionMask(wrapperEl, widgetEl, data);
                            };

                            var getWidthAsNumber = function(w) {
                                var result = parseInt(w);

                                if (isNaN(result)) {
                                    return 100;
                                }

                                return result
                            };

							editor.widgets.add("videoDialog", {
								template: [
                                    "<div class=\"wcm-video\"",
                                        " data-transcription-uuid=\"\"",
                                        " data-transcription-src=\"\"",
                                        " data-transcription-name=\"\"",
                                        " data-transcription-title=\"\"",
                                        " data-transcription-description=\"\"",
                                    ">",
                                        "<iframe",
                                            " allowfullscreen=\"allowfullscreen\"",
                                            " frameborder=\"0\"",
                                            " src=\"\"",
                                            " class=\"wcm-video__frame\"",
                                        "></iframe>",
                                    "</div>",
                                ].join(""),
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-video");
								},
								downcast: function() {
									updateWidget(this.element.getChild(0), this.element, this.wrapper, this.data);
								},
								init: function() {
                                    var widget = this;
									var vid = widget.element.getChild(0);
                                    var width = getWidthAsNumber(this.data.width);
                                    var transcriptionFile = {
                                        uuid: widget.element.getAttribute('data-transcription-uuid'),
                                        name: widget.element.getAttribute('data-transcription-name'),
                                        meta: {
                                            title: widget.element.getAttribute('data-transcription-title'),
                                            description: widget.element.getAttribute('data-transcription-description')
                                        }
                                    };

                                    widget.setData('videoUrl', vid.getAttribute('src'));
                                    widget.setData('transcriptionFile', transcriptionFile.uuid ? transcriptionFile : null);
                                    widget.setData('width', width || 100);

									if (["left", "right"].indexOf(widget.element.getStyle("float")) !== -1) {
										widget.setData("align", widget.element.getStyle("float"));
									} else if (widget.element.getStyle("margin") === "auto") {
										widget.setData("align", "center");
									}

									widget.element.setStyles({
										"position": "relative",
										"height": 0,
									});

									vid.setStyles({
										"position": "absolute",
										"height": "100%",
										"width": "100%",
                                    });

                                    widget.on("edit", function() {
                                        newData = angular.copy(widget.data || {});

                                        DialogService.openModal({
                                            templateUrl: CKEditorConfig.modulePath + "templates/videoModal.tpl.html",
                                            data: newData,
                                        }).then(function() {
                                            widget.setData("videoUrl", newData.videoUrl);
                                            widget.setData('transcriptionFile', newData.transcriptionFile);
                                            widget.setData('width', newData.width);
                                            updateWidget(widget.element.getChild(0), widget.element, widget.wrapper, newData);
                                            editor.fire("change");
                                        });
                                    });
								},
								data: function() {
									VideoService.calculateAndPositionMask(this.wrapper, this.element, this.data);
								},
								styleableElements: "div",
                                mask: true,
							});

							editor.ui.addButton("videoDialog", {
								label: "Insert a Youtube, Vimeo or Dailymotion video",
								command: "videoDialog",
								icon: CKEditorConfig.assetsDirPath + "img/film.png",
								hidpi: true,
							});

							editor.addContentsCss(CKEditorConfig.assetsDirPath + "css/videodetector.css");
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
