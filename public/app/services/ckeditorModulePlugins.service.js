'use-strict';

(function(CKEDITOR) {
    angular.module('ckeditor-plugins_0.0.24')
        .service('ckeditorPluginModuleDefinitions', [

            'DialogService',
            'CKEditorConfig',

            function ckeditorPluginModuleDefinitions(DialogService, CKEditorConfig) {
                var plugins = {};

                plugins.callToAction = {
                    meta: {
                        toolbar: [{
                            name: "insert",
                            items: ["callToAction"]
                        }],
                        extraPlugins: "callToAction"
                    },
                    plugin: {
                        init: function(editor) {
                            CKEDITOR.dialog.add("callToAction", function(editor) {
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
                                            }
                                        }]
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
                                            }
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
                                            }
                                        }, {
                                            type: "text",
                                            id: "description",
                                            label: "Description",
                                            setup: function(widget) {
                                                this.setValue(widget.data.description);
                                            },
                                            commit: function(widget) {
                                                widget.setData("description", this.getValue());
                                            }
                                        }]
                                    }]
                                };
                            });

                            editor.widgets.add("callToAction", {
                                template: [
                                    "<div class=\"wcm-cta\">",
                                        "<h3 class=\"wcm-cta__title\">Title</h3>", // eslint-disable-line
                                        "<a class=\"wcm-cta__action\" href=\"href\" title=\"description\">Call to Action</a>", // eslint-disable-line
                                    "</div>"

                                ].join(""),
                                upcast: function(el) {
                                    return el.name === "div" && el.hasClass("m-cta");
                                },
                                downcast: function(el) {
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
                                dialog: "callToAction"
                            });

                            editor.ui.addButton("callToAction", {
                                label: "Add a Call to Action item",
                                command: "callToAction",
                                toolbar: "insert",
                                icon: "/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/cta.png",
                                hidpi: true
                            });

                            editor.addContentsCss("/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/css/style.css")
                        }
                    }
                };

                plugins.imageSlider = {
                    meta: {
                        toolbar: [{
                            name: "insert",
                            items: ["imageSlider"]
                        }],
                        extraPlugins: "imageSlider"
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
                                    var uuid = image.original.asset.uuid;
                                    var croppedUrl = addPrecedingSlash(image.cropped.asset.url);
                                    var originalUrl = image.original.asset.url ? addPrecedingSlash(image.original.asset.url) : "/files/download/" + uuid;

                                    return "<div class=\"wcm-slider__slide\" style=\"background-image: url('" + croppedUrl + "');\" data-src=\"" + croppedUrl + "\" data-uuid=\"" + uuid + "\" data-original-src=\"" + originalUrl + "\"></div>";
                                }).join(""));
                            };

                            editor.widgets.add("imageSlider", {
                                template: [
                                    "<div class=\"wcm-slider\">",
                                        "<div class=\"wcm-slider__images\">", // eslint-disable-line
                                            "<div class=\"wcm-slider__slide\" data-placeholder=\"true\" style=\"background-image: url('/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/image.png');\"></div>", // eslint-disable-line
                                        "</div>", // eslint-disable-line
                                    "</div>"

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
                                        images: []
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
                                            cropped: {
                                                asset: {
                                                    url: removePrecedingSlash(img.getAttribute("data-src"))
                                                }
                                            },
                                            original: {
                                                asset: {
                                                    url: img.getAttribute("data-original-src"),
                                                    uuid: img.getAttribute("data-uuid")
                                                }
                                            }
                                        });
                                    }

                                    widget.setData("images", data.images);

                                    widget.on("edit", function() {
                                        newData = angular.copy(data);
                                        DialogService.openModal({
                                            templateUrl: CKEditorConfig.modulePath + "templates/sliderModal.tpl.html",
                                            data: newData
                                        }).then(function() {
                                            widget.setData("images", newData.images);
                                            updateWidget(newData.images, widget.element.getChild(0));
                                            editor.fire("change");
                                        });
                                    });
                                }
                            });

                            editor.ui.addButton("imageSlider", {
                                label: "Add an image slider",
                                command: "imageSlider",
                                toolbar: "insert",
                                icon: "/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/slider.png",
                                hidpi: true
                            });
                        }
                    }
                };

                return plugins;
            }
        ]);
})(window.CKEDITOR);
