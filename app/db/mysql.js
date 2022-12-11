/*
 * @Author: your name
 * @Date: 2020-12-07 09:39:49
 * @LastEditTime: 2022-06-09 11:47:09
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/db/mysql.js
 */
import mysql from "mysql";

import { MYSQL_CONF } from "../config/index";

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF);
// 统一执行 sql 的函数  文档 https://github.com/mysqljs/mysql
const exec = async function () {
  const parameter = arguments;
  return await new Promise((resolve, reject) => {
    connection.query(...parameter, (err, result) => {
      // console.log('err=',err)
      // console.log('result=',result)
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export { connection, exec };
