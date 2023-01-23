/*
 * @Author: your name
 * @Date: 2020-12-24 16:21:28
 * @LastEditTime: 2022-06-08 19:48:47
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsServer/app/bizMod/set/bizMod/user/router/index.js
 */
import KoaRoute from "koa-router"; // koa 路由中间件

import { verifyToken } from "@/redis";

import controller from "../controller";

class router {
  constructor(app, parentRouter) {
    this.app = app;
    this.router = parentRouter;
    this.init();
  }
  createRouter() {
    this.threeLevelRoute = new KoaRoute({
      prefix: "/user" // 给路由统一加个前缀：
    });
    return this.threeLevelRoute;
  }
  middleware() {
    // 处理404
    // this.app.use('/user',function* (next) {
    //     try {
    //         yield* next;
    //     } catch (e) {
    //         this.status = 500;
    //         this.body = '500';
    //     }
    //     if (parseInt(this.status) === 404) {
    //         this.body = '404';
    //     }
    // });
  }
  // 添加路由
  addRouters() {
    // // 注册路由
    this.login();
    this.query();
    this.create();
    this.edit();
    this.verifyToken();
    this.verifyCode();
    this.router.use(this.threeLevelRoute.routes()); //挂载二级路由
    // console.log('初始化user mysql 表')
  }
  init() {
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    // this.addRouters();
  }
  query() {
    // 添加 接口
    this.threeLevelRoute.get("/query", controller.query);
  }
  create() {
    // 添加 接口
    this.threeLevelRoute.post("/register", controller.create);
  }
  edit() {
    // 添加 接口
    this.threeLevelRoute.post("/edit", controller.edit);
  }
  login() {
    // 添加 接口
    // controller.a
    // this.threeLevelRoute.post("/login", controller.login);
  }
  verifyToken() {
    //检查token
    this.threeLevelRoute.post("/verifyToken", async (ctx) => {
      var parameter = ctx.request.body; // 获取请求参数

      await verifyToken(parameter.token)
        .then((data) => {
          ctx.response.body = {
            code: 200,
            data,
            message: "检查成功"
          };
        })
        .catch(() => {
          ctx.response.body = {
            code: 200,
            data: {},
            message: "token已失效"
          };
        });
    });
  }
  verifyCode() {
    // 添加 接口
    // this.threeLevelRoute.get("/getVerifyCode", controller.verifyCode);
  }
}

export default router;
