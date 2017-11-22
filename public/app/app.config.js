"use strict";

angular.module("ckeditor-plugins_1.0.0")
    .config([

	"ckeditorPluginsProvider",
	"ckeditorProvider",

	function(ckeditorPluginsProvider) {
		ckeditorPluginsProvider.controls.registerAll();
	},
]);
