"use-strict";

(function() {
	angular.module("ckeditor-plugins_1.1.1")
		.service("ckeditorPluginDefinitionsPack", [

			"ckeditorPluginCallToAction",
			"ckeditorPluginImageSlider",
			"ckeditorPluginVideoDialog",

			function ckeditorPluginDefinitionsPack(
				ckeditorPluginCallToAction,
				ckeditorPluginImageSlider,
				ckeditorPluginVideoDialog
			) {
				var plugins = {};

				plugins.callToAction = ckeditorPluginCallToAction;
				plugins.imageSlider = ckeditorPluginImageSlider;
				plugins.videoDialog = ckeditorPluginVideoDialog;

				return plugins;
			},
		]);
})();
