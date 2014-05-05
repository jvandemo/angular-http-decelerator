// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('httpDecelerator.config', [])
    .value('httpDeceleratorConfig', {
        debug: true
    });

// Modules
angular.module('httpDecelerator.services', []);
angular.module('httpDecelerator',
    [
        'httpDecelerator.config',
        'httpDecelerator.services'
    ]);
