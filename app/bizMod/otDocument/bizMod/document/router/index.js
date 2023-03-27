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
import Sockets from "../sockets";

class router {
  constructor(app, server, parentRouter, socketRoute) {
    this.app = app;
    this.server = server;
    this.router = parentRouter;
    this.socketRoute = socketRoute;
    this.sockets = new Sockets(server);
    this.init();
  }
  createRouter() {
    this.threeLevelRoute = new KoaRoute({
      prefix: "/document" // 给路由统一加个前缀：
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

  // socket
  addSockets() {
    this.socketRoute(
      "/socket/document",
      ({ request, socket, head, params }) => {
        this.sockets.document({ request, socket, head, params });
      }
    );
  }

  // 添加路由
  addRouters() {
    // // 注册路由
    // this.login();
    // this.query();
    // this.create();
    // this.edit();
    // this.verifyToken();
    // this.verifyCode();
    // this.router.use(this.threeLevelRoute.routes()); //挂载二级路由
    // new DocumentRouter(this.app, this.twoLevelRoute, this.socketRoute);
  }
  init() {
    // 创建路由
    this.createRouter();
    // 添加中间件
    this.middleware();
    // 添加路由
    // this.addRouters();

    // 初始化Socket
    // this.initSocket(this.server);
    // 添加 socket
    this.addSockets();
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
