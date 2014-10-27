(function(window, document, angular) {

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
angular.module('httpDecelerator.services')
    .provider('httpDecelerator', [function () {

        // Default options
        var options = {
            deceleration: 1000,
            route: '' // A filter. Only routes which match this string will be decelerated
        };
        self = this;

        // Return true if the url is one of the ones we're supposed to decelerate
        skipDeceleration = function (config) {
          if(!config || !config.url) { return true; }
          if(config.url.search(options.route) === -1) {
            console.log('skipDeceleration: ' + config.url + ' doesn\'t contain ' + options.route);
            return true;
          }
          return false;
        };

        /**
         * Provider convenience method to get or set default deceleration
         *
         * @param deceleration
         * @returns {*}
         */
        this.deceleration = function(deceleration, route){
            if(angular.isDefined(deceleration)){
                options.deceleration = deceleration;
                return this;
            }
            return options.deceleration;
        };

        /**
         * Provider convenience method to get or set default route filter
         *
         * @param route
         * @returns {*}
         */
        this.route = function(route){
          if(angular.isDefined(route)){
            options.route = route;
            return this;
          }
          return options.route;
        };

        this.decelerate = function(ms){
            var deceleration = this.deceleration().toString(),
                percentage = 0;
            if(deceleration.indexOf('%') !== -1){
                percentage = parseInt(deceleration.split('%')[0], 10);
                return Math.round(ms * percentage / 100);
            }
            if(deceleration.indexOf('ms') !== -1){
                return parseInt(deceleration.split('ms')[0], 10);
            }
            return parseInt(deceleration, 10);
        };

        /**
         * Factory method
         *
         * @param $timeout
         * @param $rootScope
         * @returns {HttpDecelerator}
         */
        this.$get = function ($q, $log, $timeout) {

            function HttpDeceleratorInterceptor() {

                return {
                    'request': function(config) {
                        if(skipDeceleration(config)) { return config; }
                        $log.log('HttpDecelerator request');
                        config.start = new Date();
                        return config;
                    },
                    'response': function(response) {
                        if(skipDeceleration(response.config)) { return response; }
                        console.dir(response);
                        response.config.end = new Date();
                        response.config.time = response.config.end - response.config.start;
                        $log.log('HttpDecelerator: decelerate response from ' + response.config.url + ' by ' + self.decelerate(response.config.time) + 'ms');
                        return $timeout(function(){
                            return response;
                        }, self.decelerate(response.config.time));
                    },
                    'responseError': function(rejection) {
                        if(skipDeceleration(rejection.config)) { return rejection; }
                        $log.log('HttpDecelerator: decelerate response error by ' + self.deceleration() + 'ms');
                        console.dir(rejection);
                        return $timeout(function(){
                            return $q.reject(rejection);
                        }, self.decelerate(rejection.config.time));
                    }
                };

            }

            return function(deceleration, route){
                self.deceleration(deceleration);
                self.route(route);
                return new HttpDeceleratorInterceptor();
            };

        };

        this.$get.$inject = ['$q', '$log', '$timeout'];


    }]);})(window, document, angular);