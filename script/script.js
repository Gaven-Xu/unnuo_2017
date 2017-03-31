'use strict';

window.unnuo = window.unnuo || {};
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

    unnuo.Random = main;
})();

window.unnuo = window.unnuo || {};
(function () {

    function getMultiRandomNumber() {
        if (arguments.length == 2) {}
    }
})();

window.unnuo = window.unnuo || {};
(function () {

    /**
     * number {number} mines around
     * isMine {boolean} is mine
     */
    function Mine(callback) {
        this.number = 0;
        this.isMine = false;
        this.opened = false;
        this.row = null;
        this.col = null; // 创建的时候，给它记录位置
        this.htmlDOM = document.createElement('div');
        this.htmlDOM.className = 'mine';
        this.className = '';
    }

    unnuo.Mine = Mine;
})();

window.unnuo = window.unnuo || {};
(function () {

    function mineSweep(_times, _container, _newBtn, _saveBtn) {

        var history = JSON.parse(localStorage.getItem('unnnuoMineSweepHistory'));

        if (history) {
            this.times = history.times;
            this.bombArray = history.bombArray;
            this.openedAmount = history.opendAmount;
            this.canplay = history.canplay;
        } else if (typeof _times != 'number' || _times <= 0) {
            return console.log('game init error');
        } else {
            this.times = _times;
            this.bombArray = [];
            this.opendAmount = 0;
            this.canplay = true;
        }
        this.array = [];
        this.container = document.getElementById(_container);
        this.newBtn = document.getElementById(_newBtn);
        this.saveBtn = document.getElementById(_saveBtn);
        this.col = 20;
        this.row = 20 * this.times;
        this.mineAmount = 55 * this.times;
        this.AMOUNT = this.col * this.row;

        /**
         * create mine Data Array
         * 2017/3/30 下午2:50:27
         */
        this.createGameData = function () {
            for (var r = 0; r < this.row; r++) {
                this.array[r] = [];
                for (var c = 0; c < this.col; c++) {
                    var mine = new unnuo.Mine();
                    this.array[r][c] = mine;
                    mine.row = r;
                    mine.col = c;
                }
            }
            return this;
        };

        this.createHistoryGameData = function () {
            for (var r = 0; r < this.row; r++) {
                this.array[r] = [];
                for (var c = 0; c < this.col; c++) {
                    var mine = new unnuo.Mine();
                    this.array[r][c] = history.array[r][c];
                    mine.htmlDOM.className = history.array[r][c].className;
                    this.array[r][c].htmlDOM = mine.htmlDOM;
                    if (this.array[r][c].opened) {
                        this.array[r][c].htmlDOM.innerHTML = this.array[r][c].number;
                    }
                }
            }
            return this;
        };

        /**
         * create mine position
         * 2017/3/31 下午1:37:38
         */
        this.createMinePosition = function () {
            var times = 0;
            while (times < this.mineAmount) {
                var col = Math.round(Math.random() * (this.col - 1));
                var row = Math.round(Math.random() * (this.row - 1));
                var mine = this.array[row][col];
                if (!mine.isMine) {
                    mine.isMine = true;
                    mine.htmlDOM.className += ' mine-bomb'; // delete
                    this.bombArray.push({
                        row: row,
                        col: col
                    });
                    times++;
                }
            }
            // this.array[this.bombArray[1].row][this.bombArray[1].col].htmlDOM.style.backgroundColor = '#f00';
            return this;
        };

        /**
         * calculate mine amout around this position
         * 2017/3/31 下午1:39:01
         */
        this.calculateAround = function () {
            for (var row = 0; row < this.array.length; row++) {
                for (var col = 0; col < this.array[row].length; col++) {
                    // 遍历中心点
                    var temp = 0;
                    if (this.array[row][col] && !this.array[row][col].isMine) {
                        // 如果中心点存在，并且不是雷，则计算周边的雷数量，并设置中心的的innerHTML
                        for (var i = -1; i < 2; i++) {
                            if (this.array[row + i]) {
                                for (var j = -1; j < 2; j++) {
                                    // 遍历周围检测点
                                    if (this.array[row + i][col + j] && this.array[row + i][col + j].isMine) {
                                        // 如果检测点存在，并且为雷，并且检测点不是中心点
                                        temp++;
                                    }
                                }
                            }
                        }
                        this.array[row][col].number = temp;
                    }
                }
            }
            return this;
        };

        this.sweep = function (point) {
            if (point.isMine) {
                // bomb
                alert('Game Over');
                this.canplay = false;
            } else {

                point.opened = true;
                this.opendAmount++;
                if (this.opendAmount + this.mineAmount >= this.AMOUNT) {
                    console.log('Success');
                    this.canplay = false;
                }

                point.htmlDOM.innerHTML = point.number;
                point.htmlDOM.className += ' opened has' + point.number;
                // 增加扫雷成功之后的方法，更改样式，添加特效

                if (point.number == 0) {
                    // 如果不是雷，并且周围没有雷
                    for (var i = -1; i < 2; i++) {
                        if (this.array[point.row + i]) {
                            for (var j = -1; j < 2; j++) {
                                if (this.array[point.row + i][point.col + j] && !this.array[point.row + i][point.col + j].opened) {
                                    this.sweep(this.array[point.row + i][point.col + j]);
                                }
                            }
                        }
                    }
                }
            }
        };

        /**
         * 给各个点绑定上事件处理器
         * 2017/3/31 下午2:53:31
         */
        this.handle = function () {
            var _this = this;

            // 给各个点绑定上事件处理器
            for (var row = 0; row < this.array.length; row++) {
                var _loop = function _loop() {
                    var point = _this.array[row][col];
                    _this.array[row][col].htmlDOM.addEventListener('click', function () {
                        if (this.canplay) {
                            this.sweep(point);
                        }
                    }.bind(_this));
                };

                for (var col = 0; col < this.array[row].length; col++) {
                    _loop();
                }
            }
            return this;
        };

        this.render = function () {
            for (var r = 0; r < this.row; r++) {
                for (var c = 0; c < this.col; c++) {
                    this.container.appendChild(this.array[r][c].htmlDOM);
                }
            }
        };

        this.newBtn.onclick = function () {
            // 开始方法
            alert('New Game');
            this.container.innerHTML = '';
            localStorage.removeItem('unnnuoMineSweepHistory');
            this.createGameData().createMinePosition().calculateAround().handle().render();
        }.bind(this);

        this.saveBtn.onclick = function () {
            // 保存游戏状态
            // var insertData =
            for (var r = 0; r < this.row; r++) {
                for (var c = 0; c < this.col; c++) {
                    this.array[r][c].className = this.array[r][c].htmlDOM.className;
                }
            }
            localStorage.setItem('unnnuoMineSweepHistory', JSON.stringify({
                times: this.times,
                array: this.array,
                bombArray: this.bombArray,
                openedAmount: this.opendAmount,
                canplay: this.canplay
            }));
        }.bind(this);

        if (history) {
            // this.createHistoryGameData().createMinePosition().calculateAround().handle().render();
            this.createHistoryGameData().handle().render();
        } else {
            this.createGameData().createMinePosition().calculateAround().handle().render();
        }
    }

    unnuo.mineSweep = mineSweep;
})();
new unnuo.mineSweep(1, 'mineSweep', 'new', 'save');