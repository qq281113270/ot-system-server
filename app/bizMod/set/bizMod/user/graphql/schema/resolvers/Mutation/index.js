import Controller from "@/bizMod/set/bizMod/user/controller";

export const createUser = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  // 新增用户
  const data = await Controller.create(ctx, next, parameter);

  return {
    code: 200,
    message: "用户创建成功",
    ...data
  };
};

// 编辑用户
export const editUser = async (root, parameter, source, fieldASTs) => {
  const { ctx, next } = root;
  const { request, response } = ctx;
  const { id } = parameter || {};

  // 新增用户
  const data = await Controller.edit(ctx, next, parameter);

  return {
    code: 200,
    message: "用户创建成功",
    ...data
  };
};
