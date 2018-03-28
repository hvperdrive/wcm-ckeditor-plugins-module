"use-strict";

(function() {
	angular.module("ckeditor-plugins_1.2.2")
		.factory("ckeditorPluginImageSlider", [

			"CKEditorConfigPack",
			"DialogService",

			function ckeditorPluginImageSlider(
				CKEditorConfigPack,
				DialogService
			) {
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
							var updateWidget = function(images, container) {
								if (!images.length) {
									return;
								}

								function addPrecedingSlash(str) {
									return str ? (str.charAt(0) === "/" ? str : "/" + str) : str;
								}

								container.setHtml(images.map(function(image) {
									var uuid = image.value.original.asset.uuid;
									var copyright = image.value.meta.copyright;
									var description = image.value.meta.description;
									var title = image.value.meta.title;
									var croppedUrl = addPrecedingSlash(image.value.cropped.asset.url);
									var originalUrl = image.value.original.asset.url ? addPrecedingSlash(image.value.original.asset.url) : "/files/download/" + uuid;

									return [
										"<div class=\"wcm-slider__slide\"",
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
									return el.name === "div" && el.hasClass("wcm-slider");
								},
								downcast: function() {
									updateWidget(this.data.images, this.element.getChild(0));
								},
								init: function() {
									var widget = this;
									var data = {
										images: [],
									};
									var newData = null;
									var images = widget.element.getChild(0).getChildren();

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
														url: img.getAttribute("data-original-src"),
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

									widget.on("edit", function() {
										newData = angular.copy(this.data);

										DialogService.openModal({
											templateUrl: CKEditorConfigPack.modulePath + "templates/sliderModal.tpl.html",
											data: newData,
										}).then(function() {
											widget.setData("images", newData.images);
											updateWidget(newData.images, widget.element.getChild(0));
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
