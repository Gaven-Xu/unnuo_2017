window.unnuo = window.unnuo || {};
(function() {

    function mineSweep(_times) {
        if (typeof _times === 'number' && _times > 0) {
            this.times = _times;
        } else {
            this.times = 0;
        }
        this.container = document.getElementById('mineSweep');
        this.col = 16;
        this.row = 20 * this.times;
        this.mineAmount = 150 * this.times;
        this.array = [];
        this.bombArray = [];

        /**
         * create mine Data Array
         * 2017/3/30 下午2:50:27
         */
        this.createGameData = function() {
            var r = 0,
                c = 0;
            while (r < this.row) {
                this.array[r] = [];
                while (c < this.col) {
                    let mine = new unnuo.Mine(this.sweep);
                    this.array[r][c] = mine;
                    mine.row = r;
                    mine.col = c;
                    this.container.appendChild(mine.htmlDOM);
                    c++;
                }
                c = 0;
                r++;

            }
            r = 0;
            c = 0;
            return this;
        }

        /**
         * create mine position
         * 2017/3/31 下午1:37:38
         */
        this.createMinePosition = function() {
            let times = 0;
            while (times < this.mineAmount) {
                let col = Math.round(Math.random() * (this.col - 1));
                let row = Math.round(Math.random() * (this.row - 1));
                let mine = this.array[row][col];
                if (!mine.isMine) {
                    mine.isMine = true;
                    mine.htmlDOM.className += ' mine-bomb'; // delete
                    this.bombArray.push({
                        row: row,
                        col: col
                    })
                    times++;
                }
            }
            // this.array[this.bombArray[1].row][this.bombArray[1].col].htmlDOM.style.backgroundColor = '#f00';
            return this;
        }

        /**
         * calculate mine amout around this position
         * 2017/3/31 下午1:39:01
         */
        this.calculateAround = function() {
            for (var row = 0; row < this.array.length; row++) {
                for (var col = 0; col < this.array[row].length; col++) {
                    // 遍历中心点
                    let temp = 0;
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
                        this.array[row][col].htmlDOM.innerHTML = temp;
                        this.array[row][col].htmlDOM.className += ' has' + temp;
                    }
                }
            }
            return this;
        }

        this.handle = function() {
            // 给各个点绑定上事件处理器
            console.log('handle');
        }

        this.createGameData().createMinePosition().calculateAround().handle(); //

    }

    mineSweep.prototype.start = function() {
        // 开始方法
    }

    mineSweep.prototype.save = function() {
        // 保存游戏状态
        if (Signed) {
            // 如果已经登录的，保存到服务器
        } else {
            localStorage.setItem('unnnuoMineSweepHistory', JSON.stringify(this.array))
        }
    }

    unnuo.mineSweep = mineSweep;
})()

// new unnuo.mineSweep(1);
