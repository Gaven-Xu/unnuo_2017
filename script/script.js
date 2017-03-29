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

    /**
     * check if this num is in this.result
     * @param  {number} num number to check
     * @return boolen       true for in ; false for not in
     */
    main.prototype.checkNumber = function (num) {
        for (var i = 0; i < this.result.length; i++) {
            if (this.result[i] == num) {
                return true;
            } else {}
        }
        return false;
    };

    main.prototype.getNNumber = function () {
        while (this.result.length < this.n) {
            var num = this.getRandomNumber();
            if (!this.checkNumber(num) && num > this.min && num < this.max) {
                this.result.push(num);
            } else {}
        }

        return this.result;
    };

    ucai.Random = main;
})()(function (str) {
    var _str = str;
    console.log(_str);
})('456');