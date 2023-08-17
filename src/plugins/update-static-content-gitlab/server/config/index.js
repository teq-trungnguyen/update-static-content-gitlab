"use strict";

module.exports = {
  default: {},
  validator({ gitlabUrlApi, projectId, branch, gitlabToken, tagName }) {
    if (gitlabUrlApi && typeof gitlabUrlApi !== "string") {
      throw new Error(
        "`gitlabUrlApi` key in yout plugin config has to be a string",
      );
    }
    if (projectId && typeof projectId !== "string") {
      throw new Error(
        "`projectId` key in your plugin config has to be a string",
      );
    }
    if (branch && typeof branch !== "string") {
      throw new Error("`branch` key in your plugin config has to be a string");
    }
    if (gitlabToken && typeof gitlabToken !== "string") {
      throw new Error(
        "`gitlabToken` key in your plugin config has to be an string",
      );
    }
    if (tagName && typeof tagName !== "string") {
      throw new Error("`tagName` key in your plugin config has to be a string");
    }
  },
};
