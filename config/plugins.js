module.exports = {
  "update-static-content-gitlab": {
    enabled: true,
    resolve: "./src/plugins/update-static-content-gitlab",
    config: {
      gitlabUrlApi: "https://git.teqnological.asia/api/v4/projects/1101",
      branch: "main",
      projectId: "1101",
      gitlabToken: "hjB7X9gU7EaamGSqgyLJ",
      tagName: "release-dev",
    },
  },
};
