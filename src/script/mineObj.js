window.unnuo = window.unnuo || {};
(function() {

    /**
     * number {number} mines around
     * isMine {boolean} is mine
     */
    function Mine(callback) {
        this.number = 0;
        this.isMine = false;
        this.row = null;
        this.col = null; // 创建的时候，给它记录位置
        this.htmlDOM = document.createElement('div');
        this.htmlDOM.className = 'mine';

        // this.htmlDOM.addEventListener('click', function() {
        //     if (this.isMine) {
        //         // bomb
        //         var data = {
        //             type: -1,
        //             row: this.row,
        //             col: this.col,
        //             number:this.number
        //         }
        //     } else if (!this.isMine && this.number == 0) {
        //         // 如果不是雷，并且周围没有雷
        //         var data = {
        //             type: 0,
        //             row: this.row,
        //             col: this.col,
        //             number:this.number
        //         }
        //     } else {
        //         // 如果是雷，并且周围有雷
        //         var data = {
        //             type: 1,
        //             row: this.row,
        //             col: this.col,
        //             number:this.number
        //         }
        //     }
        //     callback(data)
        //
        // }.bind(this));

        this.open = function() {

        }
    }

    unnuo.Mine = Mine;

})()
