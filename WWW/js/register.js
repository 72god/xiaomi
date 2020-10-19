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
        // this.style.borderColor = "green";
        // console.log(str);
        // $.get(url,data,callback,dataType)
        $.get("/checkusername", {
            username
        }, function (data) {
            console.log(data);
            // console.log(this);
            if (!data.error) {
                usernameLock = true;
                $('#usernameInp').css("borderColor", "green");
            } else {
                usernameLock = false;
                $('#usernameInp').css("borderColor", "red");
                alert(data.data)

            }
        }, "json")
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
        // console.log(str);
        // $.get(url,data,callback,dataType)
    })
    $('#passwordConfirmInp').blur(function () {
        var val = $('#passwordInp').val()
        var val1 = $('#passwordConfirmInp').val()
        var str = Strategy.use("checkWord7T16", val);
        if (str) {
            this.style.borderColor = "red";
            alert(str)
            passwordLock = false
            return;
        }
        // this.style.borderColor = "green";
        this.style.borderColor = val === val1 ? "green" : "red";
        if (val !== val1) {
            alert("两次密码不一致")
        }
        passwordLock = val === val1;
        console.log(usernameLock, passwordLock);
    })
    $('#submitBtn').click(function () {
        if (!(usernameLock && passwordLock)) {
            alert("请重新检查")
            return;
        }
        var username = $('#usernameInp').val()
        var password = $('#passwordInp').val()
        console.log(username, password);
        $.post("/register", {
            username,
            password
        }, function (data) {
            if (!data.error) {
                $('#usernameInp').val('')
                $('#passwordInp').val('')
                $('#passwordConfirmInp').val('')
                alert("注册成功")
                setTimeout(function () {
                    location.href = "./login.html"
                }, 500)
            } else {
                alert(data.data);
            }
        }, "json")
    })
})();