# HTTP decelerator for AngularJS

A lightweight HTTP interceptor for AngularJS that allows you to slow down HTTP responses provided by `$http`.

Features:

- Plug and play: requires no changes to your code!
- Supports milliseconds e.g. slow down HTTP responses by 2000ms
- Supports percentages e.g. slow down HTTP responses by 300%
- Logs deceleration to the console for debugging purposes

## Why use it?

During development of your AngularJS application it is often hard to see how your application deals with slow HTTP responses.

Example: a loader shown when a form is posting data is not working correctly but you can't see it because the response gets in too quickly and the loader is hidden too fast.

HTTP decelerator conveniently allows you to simulate a slow connection without changing your own code so you can control the speed of the responses.

## Installation

First install the package using Bower:

```sh
$ bower install angular-http-decelerator
```

then include the file in your scripts:

```html
<script src="/path-to-bower/angular-http-decelerator/dist/angular-http-decelerator.js"></script>
```

and finally add the module to your AngularJS application:

```javascript
angular.module('yourApp', ['httpDecelerator'])
```

## Decelerate requests

To decelerate requests, add `httpDecelerator` to `$httpProvider.interceptors` like this:

```javascript
angular.module('yourApp')
    .config([ '$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['httpDecelerator', function(httpDecelerator){
            return httpDecelerator();
        }]);
    }]);
```

By default, HTTP decelerator will decelerate all HTTP responses by 1000ms, but you can easily change this behavior.

Use milliseconds:

```javascript
$httpProvider.interceptors.push(['httpDecelerator', function(httpDecelerator){

    // Decelerate responses by 500ms
    // A response that originally takes 80ms, will now take 580ms
    // A response that originally takes 150ms, will now take 650ms
    return httpDecelerator(500);

    // You can also use a string with 'ms' for easier reading
    return httpDecelerator('500ms');
}]);
```

Use percentages:

```javascript
$httpProvider.interceptors.push(['httpDecelerator', function(httpDecelerator){

    // Decelerate responses by 300%
    // A response that originally takes 80ms, will now take 320ms (80ms + (300% * 80ms))
    // A response that originally takes 150ms, will now take 600ms (150ms + (300% * 150ms))
    return httpDecelerator('300%');
}]);
```

Optionally, you can include a filter to only decelerate certain routes:

```javascript
$httpProvider.interceptors.push(['httpDecelerator', function(httpDecelerator){
    return httpDecelerator(1000, 'api/users'); // This will only decelerate routes which match the string 'api/users'
}]);
```

This parameter is matched using [`String.prototype.search`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search), so you can use a string, number or regular expression.



## History

### v2.0.0

- Refactor distribution names for better compatibility with official angular packages

### v1.1.0

- Add support for percentages
- Add support for strings with 'ms' for easier reading

### v1.0.0

- Used in production so bump to v1.0.0

### v0.3.0

- Refactor as provider
- Add more detailed logging

### v0.2.0

- Add deceleration logging

### v0.1.0

- Initial working version

## License
MIT