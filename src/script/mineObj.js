window.unnuo = window.unnuo || {};
(function() {

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

})()
