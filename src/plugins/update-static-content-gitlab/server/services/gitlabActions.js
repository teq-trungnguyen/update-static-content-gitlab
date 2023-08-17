"use strict";

const buildPluginConfig = require("../utils/buildPluginConfig");
const axios = require("axios").default;
async function history() {
  const config = buildPluginConfig(strapi);
  try {
    const res = await axios.get(
      `${config.gitlabUrlApi}/${config.projectId}/pipelines`,
      {
        headers: {
          "PRIVATE-TOKEN": config.gitlabToken,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
    return {
      status: err.response.status,
      statusText: err.response.statusText,
    };
  }
}

async function trigger() {
  const config = buildPluginConfig(strapi);
  try {
    const date = new Date();
    const unixTime = Math.round(date.getTime() / 1000);
    const res = await axios.post(
      `${config.gitlabUrlApi}/${config.projectId}/repository/tags?tag_name=${config.tagName}-${unixTime}&ref=${config.branch}`,
      null,
      {
        headers: {
          "PRIVATE-TOKEN": config.gitlabToken,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
    return {
      status: err.response.status,
      statusText: err.response.statusText,
    };
  }
}

module.exports = {
  history,
  trigger,
};
