module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.status = 401);
    }

    try {
      const userUpdateRes = await strapi.db
        .query("plugin::users-permissions.user")
        .update({
          where: { id: ctx.state.user.id },
          data: ctx.request.body,
        })
        .then((res) => {
          ctx.body = "OK";
          ctx.status = 200;
        });
    } catch (err) {
      ctx.body = err
    }
  };

    plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/user/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
}