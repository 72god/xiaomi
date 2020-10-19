;
(function () {
    var usernameLock = false;
    var passwordLock = false;
    $('#usernameInp').blur(function () {
        var username = this.value
        console.log(username);
        var str = Strategy.use("checkWord7T16", username);
        if (str) {
            this.style.borderColor = "red";
            alert(str)
            usernameLock = false
            return;
        }
        this.style.borderColor = "green";
        usernameLock = true

    })

    $('#passwordInp').blur(function () {
        var val = this.value
        var str = Strategy.use("checkWord7T16", val);
        if (str) {
            this.style.borderColor = "red";
            alert(str)
            passwordLock = false
            return;
        }
        this.style.borderColor = "green";
        passwordLock = true

        // console.log(str);
        // $.get(url,data,callback,dataType)
    })

    $('#submitBtn').click(function () {
        if (!(usernameLock && passwordLock)) {
            alert("请重新检查")
            return;
        }
        var username = $('#usernameInp').val()
        var password = $('#passwordInp').val()
        $.post("/login", {
            username,
            password
        }, function (data) {
            if (!data.error) {
                $('#usernameInp').val('')
                $('#passwordInp').val('')
                $('#passwordConfirmInp').val('')
                alert("登录成功")
                setTimeout(function () {
                    location.href = "../index.html"
                }, 500)
            } else {
                alert(data.data);
            }
        }, "json")
    })
})();