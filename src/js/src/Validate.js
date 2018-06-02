

    module.exports = {
        isBlank: function(str) {
            return String(str).replace(/(^\s*)|(\s*$)/g, '') === "";
        },
        isIdCard: function(str) {
            return /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        },
        isCellphone: function(str) {
            return /^1(3|4|5|7|8)\d{9}$/.test(str);
        },
        isCurrency: function(str) {
            return /^\d+(\.?\d{1,2})?$/.test(str);
        },
        containChineseChar: function(str) {
            return (/.*[\u4e00-\u9fa5]+.*$/.test(str));
        },
        isChineseName: function(str) {
            return (/^[\u4e00-\u9fa5]{2,4}$/.test(str));
        },

        //6位数数字验证码
        isVlidateCode: function(str) {
            return /^\d{6}$/.test(str);
        },
        isEmail:function(str){
            return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(str);
        }

    };

