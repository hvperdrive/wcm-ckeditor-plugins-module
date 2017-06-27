'use strict';

(function() {
    angular.module('ckeditor-plugins_0.0.50')
        .provider('ckeditorPlugins', [

            '$provide',

            function ckeditorPluginsProvider($provide) {

                var registerAll = function registerAll(cb) {
                    $provide.decorator('ckeditorService', [

                        '$delegate',
                        'ckeditorPluginModuleDefinitions',

                        function(ckeditorService, ckeditorPluginModuleDefinitions) {
                            _.forEach(ckeditorPluginModuleDefinitions, function(plugin, name) {
                                ckeditorService.activatePlugin(name, plugin.plugin, plugin.meta);
                            });

                            return ckeditorService;
                        }
                    ]);
                };

                this.controls = {
                    registerAll: registerAll
                };

                this.$get = function get() {
                    return this.controls;
                };

            }
        ]);
})();
