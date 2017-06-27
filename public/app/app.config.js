angular.module('ckeditor-plugins_0.0.50')
    .config([

        'ckeditorPluginsProvider',
        'ckeditorProvider',

        function(ckeditorPluginsProvider, ckeditorProvider) {
            ckeditorPluginsProvider.controls.registerAll();
        }
    ]);
