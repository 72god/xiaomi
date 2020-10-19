var Strategy = (function () {
    var _S = {
        checkWord7T19(value) {
            // 定义正则表达式
            var checkWord7T19 = /^[a-zA-Z_]\w{6,18}$/;
            return checkWord7T19.test(value) ? "" : "请输入长度为7~19位的组合字符，由数字、字母、下划线组成，不能以数字开头"
        },
        checkWord7T16(value) {
            // 定义正则表达式
            var checkWord7T16 = /^[a-zA-Z_0-9]\w{6,15}$/;
            return checkWord7T16.test(value) ? "" : "请输入长度为7~16位的组合字符，由数字、字母、下划线组成，不能以数字开头"
        }
    }
    return {
        // 允许增加更多的正则表达式
        add(name, fn) {
            _S[name] = fn;
        },
        // 使用
        use(name, value) {
            return _S[name](value)
        }
    }
})();