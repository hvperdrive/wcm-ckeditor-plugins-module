angular.module('ckeditor-plugins_0.0.24')
    .config([

        'ckeditorPluginsProvider',
        'ckeditorProvider',

        function(ckeditorPluginsProvider, ckeditorProvider) {
            ckeditorPluginsProvider.controls.registerAll();
        }
    ]);
