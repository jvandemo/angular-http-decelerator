'use strict';

describe('httpDecelerator', function() {

    var dependencies = [];

    function hasModule(dependency) {
        return dependencies.indexOf(dependency) >= 0;
    }

    // Get module as variable to extract dependencies
    beforeEach(function() {
        dependencies = angular.module('httpDecelerator').requires;
    });

    // Load module
    beforeEach(module('httpDecelerator'));

    it('should load config module', function() {
        expect(hasModule('httpDecelerator.config')).to.be.ok;
    });

    it('should load services module', function() {
        expect(hasModule('httpDecelerator.services')).to.be.ok;
    });

});
