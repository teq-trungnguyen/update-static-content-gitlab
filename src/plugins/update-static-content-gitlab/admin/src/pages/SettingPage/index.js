import React from "react";
import pluginId from "../../../../utils/pluginId";
import pluginPermissions from "../../permissions";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import { BaseHeaderLayout, Stack, Typography } from "@strapi/design-system";
import useFetchData from "../../hooks/useFetchData";
import useFormattedLabel from "../../hooks/useFormattedLabel";
import Guard from "../../components/Guard";
import TextField from "../../components/TextField";
import PageWrapper from "../../components/PageWrapper";

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingPage />
  </CheckPagePermissions>
);

const SettingPage = () => {
  // Hooks
  const { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: "GET",
  });
  const { branch, gitlabToken, projectId, gitlabUrlApi, tagName } = fetchedData;

  // Translations
  const PAGE_TITLE = useFormattedLabel("settings.pagetitle");
  const HEADER_TITLE = useFormattedLabel("settings.headers.title");
  const HEADER_SUBTITLE = useFormattedLabel("settings.headers.subtitle");

  const GITLAB_TOKEN = useFormattedLabel("settings.fields.gitlabtoken");
  const PROJECT_ID = useFormattedLabel("settings.fields.projectid");
  const GITLAB_URL_API = useFormattedLabel("settings.fields.gitlaburlapi");
  const TAG_NAME = useFormattedLabel("settings.fields.tagname");
  const BRANCH = useFormattedLabel("settings.fields.branch");

  const HINT_GITLAB_TOKEN = useFormattedLabel(
    "settings.fields.hint.gitlabtoken",
  );
  const HINT_PROJECT_ID = useFormattedLabel("settings.fields.hint.projectid");
  const HINT_GITLAB_URL_API = useFormattedLabel(
    "settings.fields.hint.gitlaburlapi",
  );
  const HINT_TAG_NAME = useFormattedLabel("settings.fields.hint.tagname");
  const HINT_BRANCH = useFormattedLabel("settings.fields.hint.branch");

  const PLACEHOLDER_GITLAB_TOKEN = useFormattedLabel(
    "settings.fields.placeholder.gitlabtoken",
  );
  const PLACEHOLDER_PROJECT_ID = useFormattedLabel(
    "settings.fields.placeholder.projectid",
  );
  const PLACEHOLDER_GITLAB_URL_API = useFormattedLabel(
    "settings.fields.placeholder.gitlaburlapi",
  );
  const PLACEHOLDER_TAG_NAME = useFormattedLabel(
    "settings.fields.placeholder.tagname",
  );
  const PLACEHOLDER_BRANCH = useFormattedLabel(
    "settings.fields.placeholder.branch",
  );
  return (
    <PageWrapper
      isLoading={isLoading}
      baseHeaderLayout={
        <BaseHeaderLayout title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />
      }
      pageTitle={PAGE_TITLE}
    >
      <Guard errors={errors}>
        <Stack spacing={6}>
          <TextField
            label={GITLAB_TOKEN}
            aria-label={GITLAB_TOKEN}
            name="gitlabToken"
            value={gitlabToken || PLACEHOLDER_GITLAB_TOKEN}
            disabled
            required
            HintMessage={
              <Typography variant="omega">{HINT_GITLAB_TOKEN}</Typography>
            }
          />
          <TextField
            label={PROJECT_ID}
            aria-label={PROJECT_ID}
            name="projectId"
            value={projectId || PLACEHOLDER_PROJECT_ID}
            disabled
            required
            HintMessage={
              <Typography variant="omega">{HINT_PROJECT_ID}</Typography>
            }
          />
          <TextField
            label={TAG_NAME}
            aria-label={TAG_NAME}
            name="tagName"
            value={tagName || PLACEHOLDER_TAG_NAME}
            disabled
            required
            HintMessage={
              <Typography variant="omega">{HINT_TAG_NAME}</Typography>
            }
          />
          <TextField
            label={GITLAB_URL_API}
            aria-label={GITLAB_URL_API}
            name="gitlabUrlApi"
            value={gitlabUrlApi || PLACEHOLDER_GITLAB_URL_API}
            disabled
            required
            HintMessage={
              <Typography variant="omega">{HINT_GITLAB_URL_API}</Typography>
            }
          />
          <TextField
            label={BRANCH}
            aria-label={BRANCH}
            name="branch"
            value={branch || PLACEHOLDER_BRANCH}
            disabled
            required
            HintMessage={<Typography variant="omega">{HINT_BRANCH}</Typography>}
          />
        </Stack>
      </Guard>
    </PageWrapper>
  );
};

export default ProtectedPage;
