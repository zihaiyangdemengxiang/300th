$(function () {
    // 点击注册账号
    $("#long-box1").on("click", function () {
        $('.longin-box').hide()
        $('.reg-box').show()

    })

    $("#reg-box2").on('click', function () {
        $('.longin-box').show()
        $('.reg-box').hide()
    })


    //  从layui中获取form方法
    var form = layui.form

    // 从form.verify（）函数中自定义规则
    form.verify({
        // 自定义一个ped的效验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿密码框的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则返回一个提示消息米，密码不一致
            var pwd = $('.reg-box [name = password]')
                .val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

})
var layer = layui.layer
// 监听注册表单的提交
$('#form-reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
        username: $('#form-reg [name=username]').val(),
        password: $('#form-reg [name=password]').val()
    }

    $.post('/api/reguser', data, function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }

        layer.msg('注册成功');
    })
    // 模拟人的点击事件
    $('#long-box1').click()
})
// 监听登录按钮的提交
$("#form_login").submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/api/login',
        // 快速获取表单内的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("登录失败!")
            }
            layer.msg('登录成功');
            // console.log(res.token);
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            // localStorage.setItem('token', res.token)
            // // 跳转到后台主页
            location.href = '/index.html'
        }
    })

})

