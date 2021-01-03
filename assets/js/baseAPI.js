$.ajaxPrefilter(function (options) {
    console.log(otpions.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(option.url);
})
