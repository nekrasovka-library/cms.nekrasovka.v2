import Table from "@rc-component/table";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import Tooltip from "../../../../nekrasovka-ui/Tooltip/tooltip";
import React from "react";
import { ProjectMainCardTableActions } from "../project.styles";
import { deleteInProjectPageRequest } from "../../../../features/project/projectSlice";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import locale from "date-fns/locale/ru";

const CMSTable = ({ tableData, projectId, navigate }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Дата",
      dataIndex: ["blocks", "0", "content", "date"], // Access date from blocks[0]
      key: "date",
      width: "auto",
      render: (text) =>
        text ? format(new Date(text), "dd.MM.yyyy", { locale }) : "",
      onCell: (record) => ({
        onClick: () => {
          navigate(`/projects/${projectId}/${record.id}`, {
            replace: true,
          });
        },
      }),
    },
    {
      title: "Заголовок",
      dataIndex: ["blocks", "0", "content", "title"], // Access title from blocks[0]
      key: "text",
      width: "auto",
      render: (text) => text?.replace(/<[^>]+>/g, ""),
      onCell: (record) => ({
        onClick: () => {
          navigate(`/projects/${projectId}/${record.id}`, {
            replace: true,
          });
        },
      }),
    },
    {
      title: "Описание",
      dataIndex: ["blocks", "0", "content", "text"], // Access title from blocks[0]
      key: "text",
      width: "auto",
      render: (text) => text?.replace(/<[^>]+>/g, ""),
      onCell: (record) => ({
        onClick: () => {
          navigate(`/projects/${projectId}/${record.id}`, {
            replace: true,
          });
        },
      }),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      width: "auto",
      render: (_, record) => {
        return (
          <ProjectMainCardTableActions>
            <Tooltip text="Удалить">
              <Icon
                icon="trash"
                type="button"
                onClick={() =>
                  dispatch(deleteInProjectPageRequest({ id: record.id }))
                }
              />
            </Tooltip>
            <Tooltip text="Дублировать">
              <Icon
                icon="copy"
                type="button"
                onClick={() => {
                  console.log("❗", record.id);
                }}
              />
            </Tooltip>
          </ProjectMainCardTableActions>
        );
      },
    },
  ];

  return <Table columns={columns} data={tableData} />;
};

export default CMSTable;
