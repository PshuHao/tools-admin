// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 80 // dev port
module.exports = {
    publicPath: process.env.VUE_APP_BASE_URL, // 根地址，默认/
    outputDir: 'dist', // 打包目录
    assetsDir: 'assets', // 静态资源目录
    lintOnSave: true,
    productionSourceMap: false, // 建议生产关闭
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: port,
        https: false,
        // hotOnly: true,
        proxy: {
            '/test': {
                target: 'http://10.10.10:8887',
                changeOrigin: true,
                pathRewrite: {
                    '^/test': '/test'
                }
            }
        }
    },
    // 别名
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    }
}