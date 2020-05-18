var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', createProxyMiddleware({
    // 代理跨域目标接口
    target: 'http://116.63.165.17:8000',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    // cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
    // cookieDomainRewrite: false  // 可以为false，表示不修改
}));

app.listen(3000,"0.0.0.0");
console.log('Proxy server is listen at port 3000...');