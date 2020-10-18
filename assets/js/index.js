$(function () {

    getUserInfo()


    //调用用户的基本数据信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 请求头2配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }

    // 渲染头像图片 文本和上传图片选择一个展示
    function renderAvatar(user) {
        // 1 获取用户的名称
        var name = user.nickname || user.username
        // 2 设置欢迎的文本
        $("#welcome").html('欢迎&nbsp;&nbsp' + name)
        // 3 渲染图片头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('text-avatar').hide()

        } else {
            // 3.2获取文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('text-avatar').html(first).show()

        }

    }

    // var layer = layui.layer
    // 实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除本地库存中的token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/log.html'

            //   关闭询问框
            layer.close(index);
        })
    })


    // // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function(res) {
    //     // console.log('执行了 complete 回调：')
    //     // console.log(res)
    //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // 1. 强制清空 token
    //         localStorage.removeItem('token')
    //         // 2. 强制跳转到登录页面
    //         location.href = '/login.html'
    //     }
    // }




})