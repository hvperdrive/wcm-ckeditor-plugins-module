"use strict";

angular.module("ckeditor-plugins_0.0.53")
    .config([

	"ckeditorPluginsProvider",
	"ckeditorProvider",

	function(ckeditorPluginsProvider) {
		ckeditorPluginsProvider.controls.registerAll();
	},
]);
