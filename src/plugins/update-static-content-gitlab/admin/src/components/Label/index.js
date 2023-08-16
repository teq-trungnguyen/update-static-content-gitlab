import React from "react";
import { Badge } from "@strapi/design-system";

export default function Label(status) {
  const isSuccess = status === "success";
  const isCancel = status === "canceled";
  const isFailure = status === "failed";

  const BadgeStyles = {
    textColor: "neutral100",
    backgroundColor: isSuccess
      ? "success500"
      : isFailure || isCancel
      ? "danger500"
      : "neutral800",
    minWidth: "100px",
  };

  return <Badge {...BadgeStyles}>{status}</Badge>;
}
