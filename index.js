/**
 * Created by zhuzhenglin on 16/5/23.
 */
'use strict';

var request = require('request');
var cheerio = require('cheerio');
var schedule = require('node-schedule');


function crawler(){
    request('http://jingjingpay.com/doc/cppack/doc_cp1_1',function(err,res,body){
        if(res.statusCode !== 200 || err){
            console.error('请求链接出错。。。',err);
            return;
        }

        let $ = cheerio.load(body);

        let data = [];

        $('tr td').each(function (i,elem) {
            data.push($(this).text().trim());
        });

        let obj = {};

        for(let i = 0; i< data.length;i++){
            if(i < 2){
                continue;
            }
            if(i % 2 !== 0){
                obj[data[i - 1]] = data[i];
            }else {
                obj[data[i]] = null;
            }
        }
        console.log(new Date(),'        ',obj);
    });
}

/**
 *  秒(可选) 分 时 日 月 星期
 */

var j = schedule.scheduleJob('*/10 * * * * *', crawler);