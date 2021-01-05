/*
 * @Author: XiYu
 * @Date: 2021-01-05 09:34:56
 * @LastEditors: XiYu
 * @LastEditTime: 2021-01-05 11:17:59
 * @Description:后台首页
 */
$(function () {
    let layer = layui.layer;

    getUserInfo();

    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的token
            localStorage.removeItem('token');
            //重新跳转到登录页
            location.href = '/login.html';

            //关闭confirm询问框
            layer.close(index);
        });
    })

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers 就是请求头配置对象
            //设置http协议的请求头
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            },
        })
    }

    // 渲染用户的头像
    function renderAvatar(user) {
        // 1. 获取用户的名称
        var name = user.nickname || user.username
        // 2. 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar')
                .html(first)
                .show()
        }
    }
})
