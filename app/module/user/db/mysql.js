/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2021-09-26 14:43:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/server/app/module/user/db/mysql.js
 */
import mysql from "mysql";
import { MYSQL_CONF } from "../config/index";

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF);

// 统一执行 sql 的函数
const exec = async (sql) => {
  return await new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export { connection, exec };
