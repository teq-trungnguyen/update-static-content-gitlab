/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
// import PropTypes from 'prop-types';
import {
  Layout,
  ContentLayout,
  HeaderLayout,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TFooter,
  BaseCheckbox,
  Typography,
  ActionLayout,
  Box,
  Tag,
  VisuallyHidden,
  Avatar,
  Flex,
  IconButton,
} from "@strapi/design-system";
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,
} from "@strapi/design-system/v2";
import {
  Plus,
  Pencil,
  ExclamationMarkCircle,
  Apps,
  Trash,
  Play,
} from "@strapi/icons";
import Label from "../../components/Label";
import axios from "axios";
import { auth } from "@strapi/helper-plugin";
import useFetchData from "../../hooks/useFetchData";
import pluginId from "../../../../utils/pluginId";

const HomePage = () => {
  const [listTags, setListTags] = useState(null);
  const links = [
    {
      id: 1,
      label: "Addresses",
      icon: <ExclamationMarkCircle />,
      to: "/address",
    },
    {
      id: 2,
      label: "Categories",
      to: "/category",
    },
    {
      id: 3,
      label: "Cities",
      icon: <Apps />,
      to: "/city",
      active: true,
    },
    {
      id: 4,
      label: "Countries",
      to: "/country",
    },
  ];
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entry = {
    cover: "https://avatars.githubusercontent.com/u/3874873?v=4",
    description: "Chez Léon is a human sized Parisian",
    create_date: "Cuu voi",
    contact: "Leon Lafrite",
  };
  const entries = [];
  for (let i = 0; i < 5; i++) {
    entries.push({
      ...entry,
      id: i,
    });
  }
  const create_date = new Date();

  // const triggerDeploy = async () => {
  //   try {
  //     const date = new Date();
  //     const unixTime = Math.round(date.getTime() / 1000);
  //     const CI_PROJECT_ID = 1101;
  //     const GITLAB_TOKEN = "hjB7X9gU7EaamGSqgyLJ";
  //     const DEPLOY_URL = `https://git.teqnological.asia/api/v4/projects/${CI_PROJECT_ID}/repository/tags`;
  //     const DEPLOY_TAG_NAME = "release-dev";
  //     const DEPLOY_BRANCH = "main";
  //     const res = await axios.post(
  //       `${DEPLOY_URL}?tag_name=${DEPLOY_TAG_NAME}-${unixTime}&ref=${DEPLOY_BRANCH}`,
  //       null,
  //       {
  //         headers: {
  //           "PRIVATE-TOKEN": GITLAB_TOKEN,
  //         },
  //       },
  //     );
  //     console.log("triggerDeploy", res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const listHistory = async () => {
    try {
      const CI_PROJECT_ID = 1101;
      const GITLAB_TOKEN = "hjB7X9gU7EaamGSqgyLJ";
      const DEPLOY_URL = `https://git.teqnological.asia/api/v4/projects/${CI_PROJECT_ID}/repository/tags`;
      const res = await axios.get(`${DEPLOY_URL}`, null, {
        headers: {
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
      });
      console.log("listHistory: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  // const { errors, fetchedData, isLoading, setRefetch } = useFetchData({
  //   url: `https://git.teqnological.asia/api/v4/projects/1101/repository/tags`,
  //   method: "GET",
  // });
  // console.log(errors);
  // console.log(fetchedData);
  // console.log(isLoading);

  const { errors, isLoading, fetchedData } = useFetchData({
    url: `/${pluginId}/config`,
    method: "GET",
  });

  console.log(errors);
  console.log(isLoading);
  console.log(fetchedData);
  return (
    <Layout
      sideNav={
        <SubNav ariaLabel="Builder sub nav">
          <SubNavHeader
            searchable
            value=""
            onClear={() => {}}
            onChange={() => {}}
            label="Builder"
            searchLabel="Search..."
          />
          <SubNavSections>
            <SubNavSection
              label="Collection Type"
              collapsable
              badgeLabel={links.length.toString()}
            >
              {links.map((link) => (
                <SubNavLink to={link.to} active={link.active} key={link.id}>
                  {link.label}
                </SubNavLink>
              ))}
            </SubNavSection>
            <SubNavSection
              label="Single xType"
              collapsable
              badgeLabel={links.length.toString()}
            >
              <SubNavLinkSection label="Default">
                {links.map((link) => (
                  <SubNavLink to={link.to} key={link.id}>
                    {link.label}
                  </SubNavLink>
                ))}
              </SubNavLinkSection>
            </SubNavSection>
          </SubNavSections>
        </SubNav>
      }
    >
      <>
        <HeaderLayout
          primaryAction={
            <Button onClick={listHistory} startIcon={<Play />}>
              Trigger
            </Button>
          }
          title="Update static content"
          subtitle="Rebuild and deploy your site manually"
          as="h2"
        />
        {/* <ActionLayout
          startActions={
            <>
              {Array(20)
                .fill(null)
                .map((_, index) => (
                  <Box paddingTop={2} key={index}>
                    <Tag key={index} icon={<Plus aria-hidden />}>
                      Hello world {index}
                    </Tag>
                  </Box>
                ))}
            </>
          }
          endActions={
            <>
              <Button size="M" variant="tertiary">
                Settings
              </Button>
              <Button size="M" variant="tertiary">
                Settings
              </Button>
            </>
          }
        /> */}
        <ContentLayout>
          <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
            <Thead>
              <Tr>
                <Th>
                  <BaseCheckbox aria-label="Select all entries" />
                </Th>
                <Th>
                  <Typography variant="sigma">RUN NUMBER</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">WORKFLOW NAME</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">STATUS</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">CREATE DATE</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">DURATION</Typography>
                </Th>
                <Th>More</Th>
                <Th>More</Th>
                <Th>More</Th>
                <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.map((entry) => (
                <Tr key={entry.id}>
                  <Td>
                    <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Avatar src={entry.cover} alt={entry.contact} />
                  </Td>
                  <Td>{Label("success")}</Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {create_date.toISOString()}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.contact}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.description}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.description}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.description}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => console.log("edit")}
                        label="Edit"
                        icon={<Pencil />}
                      />
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => console.log("edit")}
                          label="Delete"
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ContentLayout>
      </>
    </Layout>
  );
};

export default HomePage;
