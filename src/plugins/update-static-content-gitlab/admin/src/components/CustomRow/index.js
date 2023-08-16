import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  IconButtonGroup,
  Tr,
  Td,
} from "@strapi/design-system";
import { differenceInMilliseconds, formatRelative } from "date-fns";
import { Eye, ExternalLink } from "@strapi/icons";
import PropTypes from "prop-types";
import Label from "../Label";
import pluginId from "../../../../utils/pluginId";
import axios from "../../utils/axiosInstance";
export default function CustomRow({
  id,
  status,
  name,
  run_number,
  updated_at,
  created_at,
}) {
  const msDiffResult = differenceInMilliseconds(
    new Date(updated_at),
    new Date(created_at),
  );
  console.log(name, msDiffResult);
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

  return (
    <>
      <Tr aria-rowindex={id}>
        <Td>{run_number}</Td>
        <Td>{name}</Td>
        <Td>{status ? Label(status) : "-"}</Td>
        <Td>{creationDate}</Td>
        <Td>{`${mins ? mins + "m" : ""} ${secs.toFixed(0)}s`}</Td>
      </Tr>
    </>
  );
}

CustomRow.propTypes = {
  id: PropTypes.number,
  conclusion: PropTypes.string,
  name: PropTypes.string,
  run_number: PropTypes.number,
  run_started_at: PropTypes.string,
  updated_at: PropTypes.string,
  created_at: PropTypes.string,
};
