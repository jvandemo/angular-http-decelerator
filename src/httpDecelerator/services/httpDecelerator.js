angular.module('httpDecelerator.services')
    .provider('httpDecelerator', [function () {

        // Default options
        var options = {
            deceleration: 1000
        };
        self = this;

        /**
         * Provider convenience method to get or set default deceleration
         *
         * @param deceleration
         * @returns {*}
         */
        this.deceleration = function(deceleration){
            if(angular.isDefined(deceleration)){
                options.deceleration = deceleration;
                return this;
            }
            return options.deceleration;
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
                        $log.log('HttpDecelerator request');
                        config.start = new Date();
                        return config;
                    },
                    'response': function(response) {
                        console.dir(response);
                        response.config.end = new Date();
                        response.config.time = response.config.end - response.config.start;
                        $log.log('HttpDecelerator: decelerate response from ' + response.config.url + ' by ' + self.decelerate(response.config.time) + 'ms');
                        return $timeout(function(){
                            return response;
                        }, self.decelerate(response.config.time));
                    },
                    'responseError': function(rejection) {
                        $log.log('HttpDecelerator: decelerate response error by ' + self.deceleration() + 'ms');
                        console.dir(rejection);
                        return $timeout(function(){
                            return $q.reject(rejection);
                        }, self.decelerate(rejection.config.time));
                    }
                };

            }

            return function(deceleration){
                self.deceleration(deceleration);
                return new HttpDeceleratorInterceptor();
            };

        };

        this.$get.$inject = ['$q', '$log', '$timeout'];


    }]);