$(function() {
        //调用getUserInfo()获取用户基本信息
        getUserInfo();

        var layer = layui.layer
            //点击按钮，实现退出功能
        $('#btnLogout').on('click', function() {
            // console.log('ok');
            //提示用户是否退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地存储的token
                localStorage.removeItem('token')
                    //重新跳转到登录界面
                location.href = '/login.html'
                    //关闭confirm询问框
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     // Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar()渲染用户头像
            renderAvatar(res.data)

        },
        //不论成功还是失败都会调用此函数
        // complete: function(res) {
        //     // //在complete回调函数中，可以使用res.responsejson拿到服务器响应回来的数据
        //     // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     //     //强制清空token
        //     //     localStorage.removeItem('token')
        //     //         //强制跳转到login界面
        //     //     location.href = '/login.html'
        //     // }
        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avtar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avtar').html(first).show()
    }
}