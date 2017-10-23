"use strict";

angular.module("ckeditor-plugins_0.0.58")
    .config([

	"ckeditorPluginsProvider",
	"ckeditorProvider",

	function(ckeditorPluginsProvider) {
		ckeditorPluginsProvider.controls.registerAll();
	},
]);
