(function() {
	angular.module("ckeditor-plugins_2.2.1")
		.factory("ckeditorPluginImageSlider", [

			"CKEditorConfigPack",
			"DialogService",

			function ckeditorPluginImageSlider(
				CKEditorConfigPack,
				DialogService
			) {
				var updateWidget = function(data, element) {
					if (!_.get(data, "images.length")) {
						return;
					}

					var container = element.getChild(0);
					var type = data.type || "slider";
					var wrapperClass = "wcm-" + type;
					var containerClass = "wcm-" + type + "__images";
					var slideClass = type === "gallery" ? "wcm-gallery__item" : "wcm-slider__slide";

					function addPrecedingSlash(str) {
						return str ? (str.charAt(0) === "/" ? str : "/" + str) : str;
					}

					element.$.className = wrapperClass;
					container.$.className = containerClass;

					container.setHtml(_.map(data.images, function(image) {
						var uuid = _.get(image, "value.original.asset.uuid", "");
						var copyright = _.get(image, "value.meta.copyright", "");
						var description = _.get(image, "value.meta.description", "");
						var title = _.get(image, "value.meta.title", "");
						var croppedUrl = addPrecedingSlash(_.get(image, "value.crops.default.asset.url", ""));
						var originalUrl = _.get(image, "value.original.asset.url", "") ? addPrecedingSlash(_.get(image, "value.original.asset.url", "")) : "/files/download/" + uuid;

						return [
							"<div class=\"" + slideClass + "\"",
							"style=\"background-image: url('" + croppedUrl + "');\"",
							"data-src=\"" + croppedUrl + "\"",
							"data-uuid=\"" + uuid + "\"",
							"data-original-src=\"" + originalUrl + "\"",
							"data-copyright=\"" + copyright + "\"",
							"data-description=\"" + description + "\"",
							"data-title=\"" + title + "\"",
							"></div>",
						].join(" ");
					}).join(""));
				};

				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["imageSlider"],
						}],
						extraPlugins: "imageSlider",
					},
					plugin: {
						init: function(editor) {
							editor.widgets.add("imageSlider", {
								template: [
									"<div class=\"wcm-slider\">",
									"<div class=\"wcm-slider__images\">", // eslint-disable-line
									"<div class=\"wcm-slider__slide\" data-placeholder=\"true\" style=\"background-image: url('" + CKEditorConfigPack.assetsDirPath + "img/image.png');\"></div>", // eslint-disable-line
									"</div>", // eslint-disable-line
									"</div>",
								].join(""),
								allowedContent: "div[data-*]",
								upcast: function(el) {
									return el.name === "div" && (
										el.hasClass("wcm-slider") ||
										el.hasClass("wcm-gallery")
									);
								},
								downcast: function() {
									updateWidget(this.data, this.element);
								},
								init: function() {
									var widget = this;
									var data = {
										images: [],
									};
									var typeOptions = [
										{ value: "slider", label: "Slider" },
										{ value: "gallery", label: "Gallery" },
									];
									var newData = null;
									var images = widget.element.getChild(0).getChildren();

									data.type = widget.element.hasClass("wcm-slider") ? typeOptions[0].value : typeOptions[1].value;

									function removePrecedingSlash(str) {
										return str ? (str.charAt(0) === "/" ? str.slice(1) : str) : str;
									}

									for (var i = 0; i < images.count(); i += 1) {
										var img = images.getItem(i);

										if (img.getAttribute("data-placeholder")) {
											continue;
										}

										data.images.push({
											value: {
												cropped: {
													asset: {
														url: removePrecedingSlash(img.getAttribute("data-src")),
													},
												},
												crops: {
													default: {
														asset: {
															url: removePrecedingSlash(img.getAttribute("data-src")),
														},
													},
												},
												meta: {
													copyright: img.getAttribute("data-copyright"),
													description: img.getAttribute("data-description"),
													title: img.getAttribute("data-title"),
												},
												original: {
													asset: {
														url: removePrecedingSlash(img.getAttribute("data-original-src")),
														uuid: img.getAttribute("data-uuid"),
													},
												},
											},
										});
									}

									// quickfix for error (needs fix in core)
									if (!data.images.length) {
										data.images = [{
											value: {},
										}];
									}

									widget.setData("images", data.images);
									widget.setData("type", data.type);

									widget.on("edit", function() {
										newData = angular.copy(this.data);
										newData.typeOptions = typeOptions;

										DialogService.openModal({
											templateUrl: CKEditorConfigPack.modulePath + "templates/sliderModal.tpl.html",
											data: newData,
										}).then(function() {
											widget.setData("images", newData.images);
											widget.setData("type", newData.type);
											updateWidget(newData, widget.element);
											editor.fire("change");
										});
									});
								},
							});

							editor.ui.addButton("imageSlider", {
								label: "Add an image slider",
								command: "imageSlider",
								toolbar: "insert",
								icon: CKEditorConfigPack.assetsDirPath + "img/slider.png",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})();
