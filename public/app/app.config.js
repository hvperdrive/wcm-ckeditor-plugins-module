"use strict";

angular.module("ckeditor-plugins_1.2.2")
	.config([

		"ckeditorPluginsProvider",
		"ckeditorProvider",

		function(ckeditorPluginsProvider) {
			ckeditorPluginsProvider.controls.registerAll();
		},
	]);
