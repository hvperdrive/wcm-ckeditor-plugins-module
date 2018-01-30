"use strict";

(function() {
	angular.module("ckeditor-plugins_1.1.0")
		.provider("ckeditorPlugins", [

			"$provide",

			function ckeditorPluginsProvider($provide) {

				var registerAll = function registerAll() {
					$provide.decorator("ckeditorService", [

						"$delegate",
						"ckeditorPluginDefinitionsPack",

						function(ckeditorService, ckeditorPluginDefinitionsPack) {
							_.forEach(ckeditorPluginDefinitionsPack, function(plugin, name) {
								ckeditorService.activatePlugin(name, plugin.plugin, plugin.meta);
							});

							return ckeditorService;
						},
					]);
				};

				this.controls = {
					registerAll: registerAll,
				};

				this.$get = function get() {
					return this.controls;
				};

			},
		]);
})();
