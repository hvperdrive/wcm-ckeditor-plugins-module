"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.53")
		.service("ckeditorPluginModuleDefinitions", [

			"DialogService",
			"CKEditorConfig",
			"ckeditorPluginCallToAction",
			"ckeditorPluginImageSlider",
			"ckeditorPluginClassApplier",
			"ckeditorPluginPublicTransportPicker",
			"ckeditorPluginFileUpload",
			"ckeditorPluginVideoDialog",

			function ckeditorPluginModuleDefinitions(
				DialogService,
				CKEditorConfig,
				ckeditorPluginCallToAction,
				ckeditorPluginImageSlider,
				ckeditorPluginClassApplier,
				ckeditorPluginPublicTransportPicker,
				ckeditorPluginFileUpload,
				ckeditorPluginVideoDialog
			) {
				var plugins = {};

				plugins.callToAction = ckeditorPluginCallToAction;
				plugins.imageSlider = ckeditorPluginImageSlider;
				plugins.classApplier = ckeditorPluginClassApplier;
				plugins.publicTransportPicker = ckeditorPluginPublicTransportPicker;
				plugins.fileUpload = ckeditorPluginFileUpload;
				plugins.videoDialog = ckeditorPluginVideoDialog;

				return plugins;
			},
		]);
})();
