import React, { useState } from "react";
import pluginPermissions from "../../permissions";
import {
  BaseHeaderLayout,
  Link,
  Typography,
  TextButton,
  Button,
  Table,
  Thead,
  Tbody,
  VisuallyHidden,
  Tr,
  Th,
} from "@strapi/design-system";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import { ArrowLeft, Plus, Refresh } from "@strapi/icons";
import pluginId from "../../../../utils/pluginId";
import useFormattedLabel from "../../hooks/useFormattedLabel";
import Guard from "../../components/Guard";
import PageWrapper from "../../components/PageWrapper";
import useFetchData from "../../hooks/useFetchData";
import CustomRow from "../../components/CustomRow";
import axios from "../../utils/axiosInstance";
import ToastMsg from "../../components/ToastMsg";

const THEAD_ITEMS = [
  "Run Number",
  "Workflow Name",
  "Status",
  "Creation Date",
  "Duration",
  <VisuallyHidden key="actions" />,
];

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.trigger}>
    <HomePage />
  </CheckPagePermissions>
);

const HomePage = () => {
  // Hooks
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState({});
  const [toastToggle, setToastToggle] = useState(false);

  const { errors, fetchedData, isLoading, setRefetch } = useFetchData({
    url: `/${pluginId}/gitlab-actions-history`,
    method: "GET",
  });

  // Translations
  const TITLE = useFormattedLabel("plugin.title");
  const HEADER_TITLE = useFormattedLabel("plugin.headers.title");
  const HEADER_SUBTITLE = useFormattedLabel("plugin.headers.subtitle");
  const PRIMARY_ACTION_BUTTON = useFormattedLabel("plugin.buttons.primary");
  const TOAST_SUCCESS_TITLE = useFormattedLabel("plugin.toast.success.title");
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel(
    "plugin.toast.success.description",
  );

  const TOAST_FAILURE_NOTFOUND_TITLE = useFormattedLabel(
    "plugin.toast.failure.notfound.title",
  );
  const TOAST_FAILURE_NOTFOUND_DESCRIPTION = useFormattedLabel(
    "plugin.toast.failure.notfound.description",
  );
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel(
    "plugin.toast.failure.unknown.title",
  );
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    "plugin.toast.failure.unknown.description",
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.title",
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.description",
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel(
    "permission.toast.message",
  );
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel(
    "permission.toast.title",
  );
  const SEE_MORE_BUTTON = useFormattedLabel("button.seeMore");
  const REFRESH_BUTTON = useFormattedLabel("button.refresh");
  const BACK_BUTTON = useFormattedLabel("button.back");

  // Callbacks
  async function triggerGitlabActions() {
    try {
      setLoadingTriggerButton(true);
      await axios(`/${pluginId}/gitlab-actions-trigger`, {
        method: "POST",
      });
      setToastMsg({
        variant: "success",
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<Refresh />}
            onClick={() => {
              setRefetch({});
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error) {
      console.error("error: ", error.response);
      if (
        error.response.data.error?.status === 422 &&
        error.response.data.error?.name === "UnprocessableEntityError"
      ) {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: (
            <Link
              isExternal
              href="https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow"
            >
              {SEE_MORE_BUTTON}
            </Link>
          ),
        });
      } else if (
        error.response.data.error?.status === 403 &&
        error.response.data.error?.name === "ForbiddenError"
      ) {
        setToastMsg({
          variant: "danger",
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
      } else if (
        error.response.data.error?.status === 404 &&
        error.response.data.error?.name === "NotFoundError"
      ) {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_NOTFOUND_TITLE,
          message: TOAST_FAILURE_NOTFOUND_DESCRIPTION,
        });
      } else {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_UNKNOWN_TITLE,
          message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
        });
      }
      setToastToggle(true);
    } finally {
      setLoadingTriggerButton(false);
    }
  }

  const isAccessDenied =
    errors?.message === "ACCESS_DENIED" &&
    errors?.type === "ROLES_AND_PERMISSIONS";
  return (
    <>
      <PageWrapper
        isLoading={isLoading}
        baseHeaderLayout={
          <BaseHeaderLayout
            title={HEADER_TITLE}
            subtitle={HEADER_SUBTITLE}
            navigationAction={
              <Link to="/" startIcon={<ArrowLeft />}>
                {BACK_BUTTON}
              </Link>
            }
            primaryAction={
              <Button
                onClick={triggerGitlabActions}
                variant="default"
                size="L"
                disabled={isAccessDenied ? true : false}
                loading={loadingTriggerButton}
                startIcon={<Plus />}
              >
                {PRIMARY_ACTION_BUTTON}
              </Button>
            }
          />
        }
        pageTitle={TITLE}
      >
        {toastToggle && (
          <ToastMsg
            {...toastMsg}
            closeToastHandler={() => setToastToggle(false)}
          />
        )}
        <Guard errors={errors}>
          <Table colCount={6} rowCount={21}>
            <Thead>
              <Tr>
                {THEAD_ITEMS.map((title, i) => (
                  <Th key={i}>
                    <Typography variant="sigma">{title}</Typography>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {fetchedData.length > 0 &&
                fetchedData.map(
                  ({ id, status, ref, updated_at, created_at }, index) => {
                    return (
                      <CustomRow
                        toastMsg={toastMsg}
                        setToastMsg={setToastMsg}
                        toastToggle={toastToggle}
                        setToastToggle={setToastToggle}
                        key={id}
                        id={id}
                        status={status}
                        name={ref}
                        run_number={index + 1}
                        updated_at={updated_at}
                        created_at={created_at}
                      />
                    );
                  },
                )}
            </Tbody>
          </Table>
        </Guard>
      </PageWrapper>
    </>
  );
};

export default ProtectedPage;
