/*
 * @Author: liwenjing
 * @Description: 利用node实现一个爬取网站图片的功能。
 * 这里以昵图网某一页面：http://www.nipic.com/photo/jingguan/ziran/index.html为例，
 * 将网站图片<img src="http://static.nipic.com/images/grey.gif" data-src="http://pic275.nipic.com/pic/20200317/31173827_201436195652_4.jpg"  alt="粉蓝调的海面" />
 * 通过node保存到本地
 * 
 * @Date: 2020-03-25 16:49:55
 * @LastEditors: liwenjing
 * @LastEditTime: 2020-03-26 11:00:56
 * @LastEditDetails: 
 */
const http  = require('http')
const fs = require('fs')

http.get('http://www.nipic.com/photo/jingguan/ziran/index.html',(res) => {
    var data = ''
    res.on('data',(a) => {
        data += a.toString()
    })
    res.on('end',() => {
        let reg = /<img src=".*?" data-src="(.+?)"  alt=".*?" \/>/img
        let result = []
        let arr = []
        while(result = reg.exec(data)){
            arr.push(result[1])
        }
        fs.mkdir('./file',() => {
            let index = 0
            let timer = setInterval(() => {
                getImg(arr[index])
                index ++
                if(index >= arr.length){
                    clearInterval(timer)
                }
            }, 0)
            // arr.forEach((v,k) => {
            //     ((k) => {
            //         setInterval(() => {
            //             getImg(v)
            //         },2000)
            //     })(k)
            // })
        })
    })
})
function getImg(url){
    let time = new Date().getTime()
    http.get(url,(res) => {
        res.pipe(fs.createWriteStream('./file/' + time + '.jpg'))
    })
}