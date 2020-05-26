"use strict";

angular.module("ckeditor-plugins_2.2.0")
	.config([

		"ckeditorPluginsProvider",
		"ckeditorProvider",

		function(ckeditorPluginsProvider) {
			ckeditorPluginsProvider.controls.registerAll();
		},
	]);
