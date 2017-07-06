"use-strict";

(function() {
	angular.module("ckeditor-plugins_0.0.55")
		.service("ckeditorPluginDefinitions", [

			"DialogService",
			"CKEditorConfig",
			"ckeditorPluginCallToAction",
			"ckeditorPluginImageSlider",
			"ckeditorPluginClassApplier",
			"ckeditorPluginPublicTransportPicker",
			"ckeditorPluginFileUpload",
			"ckeditorPluginVideoDialog",
			"ckeditorPluginChangelog",

			function ckeditorPluginDefinitions(
				DialogService,
				CKEditorConfig,
				ckeditorPluginCallToAction,
				ckeditorPluginImageSlider,
				ckeditorPluginClassApplier,
				ckeditorPluginPublicTransportPicker,
				ckeditorPluginFileUpload,
				ckeditorPluginVideoDialog,
				ckeditorPluginChangelog
			) {
				var plugins = {};

				plugins.callToAction = ckeditorPluginCallToAction;
				plugins.imageSlider = ckeditorPluginImageSlider;
				plugins.classApplier = ckeditorPluginClassApplier;
				plugins.publicTransportPicker = ckeditorPluginPublicTransportPicker;
				plugins.fileUpload = ckeditorPluginFileUpload;
				plugins.videoDialog = ckeditorPluginVideoDialog;
				plugins.changelog = ckeditorPluginChangelog;

				return plugins;
			},
		]);
})();
