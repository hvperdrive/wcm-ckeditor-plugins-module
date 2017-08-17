"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.55")
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
