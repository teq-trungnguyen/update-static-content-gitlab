"use strict";

const protectedValue = require("./protectedValue");
const getPluginConfig = require("./getPluginConfig");

function buildPluginConfig(strapi, isValueProtected = false) {
  const getPluginConfigByKey = getPluginConfig(strapi);
  console.log("getPluginConfigByKey: ", getPluginConfigByKey);
  return {
    gitlabToken: isValueProtected
      ? protectedValue(getPluginConfigByKey("gitlabToken")?.trim())
      : getPluginConfigByKey("gitlabToken")?.trim(),
    projectId: getPluginConfigByKey("projectId")?.trim(),
    gitlabUrlApi: getPluginConfigByKey("gitlabUrlApi")?.trim(),
    branch: getPluginConfigByKey("branch")?.trim(),
    tagName: getPluginConfigByKey("tagName")?.trim(),
  };
}

module.exports = buildPluginConfig;
