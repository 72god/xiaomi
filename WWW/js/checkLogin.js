; (function () {
    // 获取cookie中 isLogin 字段 如果能得到 说明 登录过 如果得不到 说明没有登陆过  跳回登录页面
    var isLogin = QF.getCookie("isLogin")
    if (isLogin) {
       $('#J_siteUserInfo').html("<a href='./html/login.html' class='link'>你好</a><span class='sep'>|</span><a href='' class='link'>退出登录</a>")
    }

    
})();