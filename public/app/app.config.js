"use strict";

angular.module("ckeditor-plugins_1.1.0")
    .config([

	"ckeditorPluginsProvider",
	"ckeditorProvider",

	function(ckeditorPluginsProvider) {
		ckeditorPluginsProvider.controls.registerAll();
	},
]);
