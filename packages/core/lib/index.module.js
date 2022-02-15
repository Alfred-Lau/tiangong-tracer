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

export { tracert as default };
//# sourceMappingURL=index.module.js.map
