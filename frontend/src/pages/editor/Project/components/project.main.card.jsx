import React, { useState } from "react";
import {
  ProjectMainCardAction,
  ProjectMainCardContainer,
  ProjectMainCardPage,
  ProjectMainCardPageName,
  ProjectMainCardTable,
  Button,
  ProjectMainCardGroup,
} from "../project.styles.js";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteInProjectPageRequest,
  updateInProjectPageRequest,
} from "../../../../features/project/projectSlice";
import { fetchPageSuccess } from "../../../../features/page/pageSlice";
import { setSettingsVisibility } from "../../../../features/visibility/visibilitySlice";
import CMSTable from "./project.main.table";
import axios from "axios";

const ProjectMainCard = ({
  settings,
  pageId,
  isPageMain,
  name,
  url,
  tableData,
}) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editedState, setEditedState] = useState({});
  const [isTable, setIsTable] = useState(false);
  const parentUrl = settings.parent.url ? `${settings.parent.url}/:` : "";

  const getTableData = () => {};

  const handleGroup = () => {
    // const page_type = settings.page_type ? 0 : 1;
    //
    // setIsTable(!!page_type);
    // dispatch(
    //   updateInProjectPageRequest({
    //     id: pageId,
    //     settings: { ...settings, page_type },
    //   }),
    // );
    //
    // if (!!page_type) {
    //   getTableData();
    // }
  };

  const handleCreateBlock = () => {
    // navigate(`/projects/${projectId}/${pageId}`, {
    //   replace: true,
    // });
  };

  const onType = async () => {
    setIsTable(!isTable);
  };

  const onClose = () => {
    setEditedState({});
  };

  const onSave = () => {
    dispatch(updateInProjectPageRequest({ id: pageId, ...editedState }));
    onClose();
  };

  const onSettings = () => {
    dispatch(fetchPageSuccess({ id: pageId, settings }));
    dispatch(setSettingsVisibility());
  };

  const onDelete = () => {
    dispatch(deleteInProjectPageRequest({ id: pageId }));
  };

  const onChange = (e) => {
    setEditedState({ [e.target.name]: e.target.value });
  };

  return (
    <ProjectMainCardContainer>
      <ProjectMainCardPage>
        <ProjectMainCardPageName>
          {isPageMain ? <Icon icon="home" /> : <div style={{ width: 15 }} />}
          {editedState["name"] !== undefined ? (
            <div>
              <input
                autoFocus
                name="name"
                value={editedState.name || name}
                onChange={onChange}
              />
              <Icon icon="save" type="button" onClick={onSave} />
              <Icon icon="closeMenu" type="button" onClick={onClose} />
            </div>
          ) : (
            <div>
              {settings.page_type ? (
                <span onClick={onType}>{name}</span>
              ) : (
                <Link to={`${pageId}`}>
                  <span>{name}</span>
                </Link>
              )}

              <Icon
                icon="edit"
                type="button"
                onClick={() => setEditedState({ name: "" })}
              />
            </div>
          )}
        </ProjectMainCardPageName>
        <ProjectMainCardPageName>
          {editedState["url"] !== undefined ? (
            <div>
              <span>{parentUrl}</span>
              <input
                autoFocus
                name="url"
                value={editedState.url || url}
                onChange={onChange}
              />
              <Icon icon="save" type="button" onClick={onSave} />
              <Icon icon="closeMenu" type="button" onClick={onClose} />
            </div>
          ) : (
            <div>
              {settings.page_type ? (
                <div onClick={onType}>
                  <span>{parentUrl}</span>
                  <span>id</span>
                </div>
              ) : (
                <Link to={`${pageId}`}>
                  <span>{parentUrl}</span>
                  <span>{url}</span>
                </Link>
              )}
              {!settings.page_type && (
                <Icon
                  icon="edit"
                  type="button"
                  onClick={() => setEditedState({ url: "" })}
                />
              )}
            </div>
          )}
        </ProjectMainCardPageName>
        <ProjectMainCardGroup $isActive={!!settings.page_type}>
          <div onClick={handleGroup}>
            <span>ГРУППА СТРАНИЦ</span>
          </div>
        </ProjectMainCardGroup>
        <ProjectMainCardAction>
          <div onClick={onSettings}>
            <Icon icon="settings" />
            <span>НАСТРОЙКИ</span>
          </div>
          {!settings.page_type && (
            <div onClick={onDelete}>
              <Icon icon="trash" />
              <span>УДАЛИТЬ</span>
            </div>
          )}
        </ProjectMainCardAction>
      </ProjectMainCardPage>
      {isTable && (
        <ProjectMainCardTable>
          <Button
            type="button"
            className="secondary"
            onClick={handleCreateBlock}
          >
            Добавить
          </Button>
          {tableData && (
            <CMSTable
              tableData={tableData}
              pageId={pageId}
              projectId={projectId}
              navigate={navigate}
            />
          )}
        </ProjectMainCardTable>
      )}
    </ProjectMainCardContainer>
  );
};

export default ProjectMainCard;
