module.exports = {
  "update-static-content-gitlab": {
    enabled: true,
    resolve: "./src/plugins/update-static-content-gitlab",
    config: {
      githubToken: "githubtoken", // accessing personal github token from env file
      owner: "everythinginjs", // owner of the repo
      repo: "vahoora", // name of the repo
      workflowId: "40807041", // workflowId OR filename
      branch: "main", // branch name
      projectId: "1101",
      gitlabToken: "hjB7X9gU7EaamGSqgyLJ",
    },
  },
};
