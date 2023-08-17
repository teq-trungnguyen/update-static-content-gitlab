const pluginId = require("../../utils/pluginId");
const { NotFoundError, ForbiddenError } = require("@strapi/utils").errors;
// TODO fix variable declarations
module.exports = {
  history: async (ctx) => {
    const response = await strapi
      .plugin(pluginId)
      .service("gitlabActions")
      .history();
    if (response && response.data) {
      return (ctx.body = response.data);
    }
    if (response.status === 404 && response.statusText == "Not Found") {
      throw new NotFoundError("Not Found");
    } else if (
      response.status === 401 &&
      response.statusText == "Unauthorized"
    ) {
      throw new ForbiddenError("Unauthorized");
    }
  },
  trigger: async (ctx) => {
    const response = await strapi
      .plugin(pluginId)
      .service("gitlabActions")
      .trigger();
    if (response && response.data) {
      return (ctx.body = response.data);
    }
    if (response.status === 404 && response.statusText == "Not Found") {
      throw new NotFoundError("Not Found");
    } else if (
      response.status === 401 &&
      response.statusText == "Unauthorized"
    ) {
      throw new ForbiddenError("Unauthorized");
    }
  },
};
