/*
 * @Author: XiYu
 * @Date: 2021-01-03 16:09:03
 * @LastEditors: XiYu
 * @LastEditTime: 2021-01-05 19:29:07
 * @Description: ...
 */
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;


    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete回调函数
    //不论成功还是失败，都会调用complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})

