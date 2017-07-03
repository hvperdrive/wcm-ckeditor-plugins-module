"use strict";

angular.module("ckeditor-plugins_0.0.54")
    .provider("CKEditorConfig", [
	function membersConfig() {

		this.API = {
			name: "ckeditor-plugins",
			version: "0.0.54",
			basePath: "app/modules/",
			assetsBasePath: "/assets/modules/",
		};

		this.API.moduleVersionName = this.API.name + "_" + this.API.version;
		this.API.modulePath = this.API.basePath + this.API.moduleVersionName + "/";
		this.API.assetsPath = this.API.assetsBasePath + this.API.moduleVersionName + "/";

		this.$get = function get() {
			return this.API;
		};
	},
]);
