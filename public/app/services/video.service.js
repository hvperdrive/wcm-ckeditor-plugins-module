"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_1.1.0")
		.service("VideoService", [

			function VideoService() {
				var API = {};

				API.calculateAndPositionMask = function calculateAndPositionMask(self) {
					// Get mask
					var mask = self.wrapper.getChild(1);

					if (!mask || !self.element || !self.element.isVisible()) {
						return;
					}

					// Set mask to the same height and width of the video
					mask.setStyle("height", self.element.getComputedStyle("padding-bottom"));
					mask.setStyle("width", self.element.getComputedStyle("width"));

					// Set video element floated if aligned left or right
					if (["left", "right"].indexOf(self.data.align) !== -1) {
						self.element.setStyle("float", self.data.align);
						self.element.removeStyle("margin");
					}
					// Make sure mask is also positioned correctly
					if (self.data.align === "left") {
						mask.setStyle("left", "0");
						mask.setStyle("right", "auto");
					}
					if (self.data.align === "right") {
						mask.setStyle("right", "0");
						mask.setStyle("left", "auto");
					}
					if (self.data.align === "center") {
						// Undo float and set margin to auto to center image
						self.element.setStyle("float", "none");
						self.element.setStyle("margin", "auto");
						// Set mask over whole width.
						mask.setStyle("left", "0");
						mask.setStyle("right", "0");
						mask.removeStyle("width");
					}
				};

				API.getFocusedWidget = function getFocusedWidget(editor, type) {
					var widget = editor.widgets.focused;

					if (widget && widget.name === type) {
						return widget;
					}

					return null;
				};

				API.alignCommandIntegrator = function alignCommandIntegrator(editor, type) {
					var execCallbacks = [];

					return function(value) {
						var command = editor.getCommand("justify" + value);

						// Most likely, the justify plugin isn't loaded.
						if (!command) {
							return;
						}

						// This command will be manually refreshed along with
						// other commands after exec.
						execCallbacks.push(function() {
							command.refresh(editor, editor.elementPath());
						});

						if (value in {
							right: 1,
							left: 1,
							center: 1,
						}) {
							command.on("exec", function(evt) {
								var widget = API.getFocusedWidget(editor, type);

								if (widget) {
									widget.setData("align", value);

									// Once the widget changed its align, all the align commands
									// must be refreshed: the event is to be cancelled.
									for (var i = execCallbacks.length; i--;) {
										execCallbacks[i]();
									}

									evt.cancel();
								}
							});
						}

						command.on("refresh", function(evt) {
							var widget = API.getFocusedWidget(editor, type);
							var allowed = {
								right: 1,
								left: 1,
								center: 1
							};

							if (!widget) {
								return;
							}

							this.setState(
								(widget.data.align === value) ? (
									CKEDITOR.TRISTATE_ON
								) : (
									(value in allowed) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
								)
							);

							evt.cancel();
						});
					};
				};

				API.getVideoSource = function(fromUrl) {
					var isAlreadyParseRegExp = /^(https:\/\/www\.youtube\.com\/embed\/|https:\/\/player\.vimeo\.com\/video\/|https:\/\/www\.dailymotion\.com\/embed\/video\/).*$/;

					if (fromUrl.match(isAlreadyParseRegExp)) {
						return fromUrl;
					}

					var respuesta = API.detectar(fromUrl);

					if (respuesta.reproductor === "youtube") {
						return "https://www.youtube.com/embed/" + respuesta.id_video + "?autohide=1&controls=1&showinfo=0";
					}
					if (respuesta.reproductor === "vimeo") {
						return "https://player.vimeo.com/video/" + respuesta.id_video + "?portrait=0";
					}
					if (respuesta.reproductor === "dailymotion") {
						return "https://www.dailymotion.com/embed/video/" + respuesta.id_video;
					}

					return "";
				};

				// Functionality copied from from ckeditor video plugin
				API.detectar = function(url) {
					var id = "";
					var reproductor = "";
					var url_comprobar = ""; // eslint-disable-line

					if (url.indexOf("youtu.be") >= 0) {
						reproductor = "youtube";
						id = url.substring(url.lastIndexOf("/") + 1, url.length);
					}
					if (url.indexOf("youtube") >= 0) {
						reproductor = "youtube";
						if (url.indexOf("</iframe>") >= 0) {
							var fin = url.substring(url.indexOf("embed/") + 6, url.length);

							id = fin.substring(fin.indexOf('"'), 0);
						} else {
							if (url.indexOf("&") >= 0) {
								id = url.substring(url.indexOf("?v=") + 3, url.indexOf("&"));
							} else {
								id = url.substring(url.indexOf("?v=") + 3, url.length);
							}
						}
						url_comprobar = "https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json"; // eslint-disable-line
					}
					if (url.indexOf("vimeo") >= 0) {
						reproductor = "vimeo";
						if (url.indexOf("</iframe>") >= 0) {
							var fin = url.substring(url.lastIndexOf('vimeo.com/"') + 6, url.indexOf(">"));

							id = fin.substring(fin.lastIndexOf("/") + 1, fin.indexOf('"', fin.lastIndexOf("/") + 1));
						} else {
							id = url.substring(url.lastIndexOf("/") + 1, url.length);
						}
						url_comprobar = "http://vimeo.com/api/v2/video/" + id + ".json"; // eslint-disable-line
					}
					if (url.indexOf("dai.ly") >= 0) {
						reproductor = "dailymotion";
						id = url.substring(url.lastIndexOf("/") + 1, url.length);
					}
					if (url.indexOf("dailymotion") >= 0) {
						reproductor = "dailymotion";
						if (url.indexOf("</iframe>") >= 0) {
							var fin = url.substring(url.indexOf("dailymotion.com/") + 16, url.indexOf("></iframe>"));

							id = fin.substring(fin.lastIndexOf("/") + 1, fin.lastIndexOf('"'));
						} else {
							if (url.indexOf("_") >= 0) {
								id = url.substring(url.lastIndexOf("/") + 1, url.indexOf("_"));
							} else {
								id = url.substring(url.lastIndexOf("/") + 1, url.length);
							}
						}
						url_comprobar = "https://api.dailymotion.com/video/" + id; // eslint-disable-line
					}
					return {
						"reproductor": reproductor,
						"id_video": id,
					};
				};

				return API;
			},
		]);
})(window.CKEDITOR);
