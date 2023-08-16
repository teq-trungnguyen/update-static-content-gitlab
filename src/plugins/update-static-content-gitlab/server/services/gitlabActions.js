"use strict";

const buildPluginConfig = require("../utils/buildPluginConfig");
const axios = require("axios").default;

async function history() {
  const config = buildPluginConfig(strapi);
  try {
    const res = await axios.get(`${config.gitlabUrlApi}/pipelines`, {
      headers: {
        "PRIVATE-TOKEN": config.gitlabToken,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function trigger() {
  const config = buildPluginConfig(strapi);
  try {
    const date = new Date();
    const unixTime = Math.round(date.getTime() / 1000);
    console.log(
      `${config.gitlabUrlApi}?tag_name=${config.tagName}-${unixTime}&ref=${config.branch}`,
    );
    const res = await axios.post(
      `${config.gitlabUrlApi}/repository/tags?tag_name=${config.tagName}-${unixTime}&ref=${config.branch}`,
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

async function getLogs(jobId) {
  const config = buildPluginConfig(strapi);
  try {
    console.log(config);
    // const res = await axios.get(
    //   `https://api.github.com/repos/${config.owner}/${config.repo}/actions/runs/${jobId}/logs`,
    //   {
    //     headers: {
    //       Accept: "application/vnd.github+json",
    //       Authorization: `token ${config.githubToken}`,
    //     },
    //   },
    // );
    // return res.request.res.responseUrl;
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
  getLogs,
};
