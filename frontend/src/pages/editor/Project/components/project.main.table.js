import Table from "@rc-component/table";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import Tooltip from "../../../../nekrasovka-ui/Tooltip/tooltip";
import React from "react";
import {
  ProjectMainCardStatus,
  ProjectMainCardStatusContent,
  ProjectMainCardTableActions,
} from "../project.styles";
import format from "date-fns/format";
import locale from "date-fns/locale/ru";

const CMSTable = ({
  tableData,
  projectId,
  navigate,
  handleCopyPage,
  handleDeletePage,
  handlePageSettings,
}) => {
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
      key: "title",
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
      title: "Статус",
      dataIndex: "settings",
      key: "status",
      width: "auto",
      render: (text) => {
        return (
          <ProjectMainCardStatus>
            {Object.entries(text)
              .filter(([f]) => f !== "parent")
              .map(([key, value]) => {
                return (
                  <Tooltip text={key}>
                    <ProjectMainCardStatusContent $isActive={!!value}>
                      <div />
                    </ProjectMainCardStatusContent>
                  </Tooltip>
                );
              })}
          </ProjectMainCardStatus>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      width: "auto",
      render: (_, record) => {
        return (
          <ProjectMainCardTableActions>
            <Tooltip text="Настройки">
              <Icon
                icon="settings"
                type="button"
                onClick={() =>
                  handlePageSettings(record.id, {
                    ...record.settings,
                  })
                }
              />
            </Tooltip>
            <Tooltip text="Удалить">
              <Icon
                icon="trash"
                type="button"
                onClick={() => handleDeletePage(record.id)}
              />
            </Tooltip>
            <Tooltip text="Дублировать">
              <Icon
                icon="copy"
                type="button"
                onClick={() => handleCopyPage(record)}
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
