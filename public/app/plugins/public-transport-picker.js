"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.53")
		.factory("ckeditorPluginPublicTransportPicker", [

			"CKEditorConfigService",

			function ckeditorPluginModuleDefinitions(CKEditorConfigService) {
				return {
					meta: {
						toolbar: [{
							name: "publicTransportBar",
							items: ["publicTransportPicker"],
						}],
						extraPlugins: "publicTransportPicker",
					},
					plugin: {
						init: function(editor) {
							editor.addContentsCss("https://cdn.brandplatform.be/sna/dist/latest/css/ov-icons.min.css");

							editor.ui.addRichCombo("publicTransportPicker", {
								label: "Add public transport line",
								command: "publicTransportPicker",
								toolbar: "publicTransportBar",
								allowedContent: "span[class]",
								hidpi: true,

								init: function() {
									var styles = document.createElement("style");

									styles.innerHTML = "li {" +
											"font-family: sans-serif, Arial, Verdana;" +
											"font-size: 14px;" +
											"list-style-type: none;" +
										"}" +
										"li a {" +
											"color: #333;" +
											"text-decoration: none;" +
										"}";

									document.querySelector("iframe.cke_panel_frame").contentWindow.document.head.appendChild(styles);
									// we have to append the styles like this because the combobox options are shown in a different iframe than the ckeditor parent

									var publicTransportLines = angular.copy(CKEditorConfigService.publicTransportLines);
									var _this = this;

									_.forEach(publicTransportLines, function(publicTransportLine) { // add the values to the dropdown
										_this.add(JSON.stringify(publicTransportLine), publicTransportLine.name, publicTransportLine.name);
									});
								},

								onClick: function(publicTransportLine) {
									publicTransportLine = JSON.parse(publicTransportLine);
									editor.insertHtml("<span class=\"" + publicTransportLine.icon + "\">&nbsp;</span>");
								},
							});
						},
					},
				};
			},
		]);
})();
