'use strict';

window.ucai = window.ucai || {};

(function () {

    // 传入一个参数n。生成n个1-31的随机数，且不重复
    function main(_n, _min, _max) {
        this.n = _n;
        this.min = _min;
        this.max = _max;
        this.result = [];
    }

    main.prototype.getRandomNumber = function () {
        return Math.random() * this.max;
    };

    main.prototype.checkNumber = function (num) {
        for (var i = 0; i < this.result.length; i++) {
            this.result[i] = num;
        }
    };

    main.prototype.getNNumber = function () {
        for (var i = 0; i < this.n; i++) {
            // this.result.push(this.getRandomNumber())
        }
    };
})()(function (str) {
    var _str = str;
    console.log(_str);
})('456');