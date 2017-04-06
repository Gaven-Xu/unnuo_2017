window.unnuo = window.unnuo || {};

(function() {

    function ClassHandle(obj) {

        obj.hasClass = function(cls) {
            if (this.className.indexOf(cls) == -1) {
                return false;
            } else {
                return true;
            }
        };

        obj.addClass = function(cls) {
            if (!this.hasClass(cls)) obj.className += " " + cls;
            return this;
        };

        obj.removeClass = function(cls) {
            if (this.hasClass(cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, '');
            }
            return this;
        };

        obj.toggleClass = function(cls) {
            if (!this.hasClass(cls)) {
                this.addClass(cls);
            } else {
                this.removeClass(cls);
            }
            return this;
        };

        obj.ergodicToggleClass = function(_classname, _time) {
            var self = this;
            if (self.length&&typeof _time === 'number') {
                clearInterval(menuOutInterval);
                var i = 0;
                var menuOutInterval = setInterval(function() {
                    if (i < self.length) {
                        var item = unnuo.uno(self[i]);
                        item.toggleClass(_classname);
                        i++;
                    } else if (i == self.length) {
                        clearInterval(menuOutInterval);
                        i = 0;
                    }
                }, _time)
            }
        }

    }

    function uno(obj) {

        if (typeof obj == 'string') {
            var target = document.getElementById(obj);
        } else {
            var target = obj;
        }
        //
        ClassHandle(target);
        // AjaxHandle(target);
        return target;

    }

    unnuo.uno = uno;

})();

(function() {

    var menuBtn = unnuo.uno(document.querySelector('#Nav>.menu-btn'));
    var menuContent = unnuo.uno(document.querySelector('#Nav>.menu-content'));
    var menuItems = unnuo.uno(document.querySelectorAll('#Nav .menu-item'));

    menuBtn.addEventListener('click', function() {
        // MenuBtn.toggleClass('menu-btn');
        menuBtn.toggleClass('menu-btn-expand');
        menuContent.toggleClass('menu-content-expand');
        menuItems.ergodicToggleClass('out', 100);
    })

})();
