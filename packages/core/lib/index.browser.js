(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.core = factory());
})(this, (function () { 'use strict';

    var addTwo = function (a, b) { return a + b; };
    var minus = function (a, b) { return a - b; };

    var Tracert = /** @class */ (function () {
        function Tracert(opts) {
        }
        Tracert.prototype.sayHi = function () {
            console.log("hello,world");
        };
        return Tracert;
    }());

    function bootstrap(options) {
        var opts = options || {};
        var tracert = new Tracert(opts);
        if (!window.tiangong_tracert) {
            window.tiangong_tracert = tracert;
        }
        return tracert;
    }
    var tracert = bootstrap();

    console.log(addTwo(100, 200), minus(200, 100));

    return tracert;

}));
//# sourceMappingURL=index.browser.js.map
