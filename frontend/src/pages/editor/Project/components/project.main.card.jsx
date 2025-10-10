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
import { apiCreateGroupedPage } from "../../../../features/page/pageApi";

const ProjectMainCard = ({
  settings,
  pageId,
  isPageMain,
  name,
  url,
  tableData,
  type,
}) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editedState, setEditedState] = useState({});
  const [isTable, setIsTable] = useState(false);
  const parentUrl = settings.parent.url ? `${settings.parent.url}/:` : "";
  const tableButtonName = tableData?.length > 0 ? tableData[0].name : "";

  const handleGroup = () => {
    // const page_type = type ? 0 : 1;
    //
    // setIsTable(!!page_type);
    // dispatch(
    //   updateInProjectPageRequest({
    //     id: pageId,
    //     type: page_type,
    //   }),
    // );
  };

  const handleCreatePage = () => {
    if (tableData.length === 0) return;

    const params = {
      url: tableData[0].url,
      styles: tableData[0].styles,
      settings: tableData[0].settings,
      name: tableData[0].name,
      type: tableData[0].type,
      projectId,
    };

    apiCreateGroupedPage({ payload: params }).then((res) => {
      navigate(`/projects/${projectId}/${res}`, {
        replace: true,
      });
    });
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
              {type ? (
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
              {type ? (
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
              {!type && (
                <Icon
                  icon="edit"
                  type="button"
                  onClick={() => setEditedState({ url: "" })}
                />
              )}
            </div>
          )}
        </ProjectMainCardPageName>
        <ProjectMainCardGroup $isActive={!!type}>
          <div onClick={handleGroup}>
            <span>ГРУППА СТРАНИЦ</span>
          </div>
        </ProjectMainCardGroup>
        <ProjectMainCardAction>
          <div onClick={onSettings}>
            <Icon icon="settings" />
            <span>НАСТРОЙКИ</span>
          </div>
          {!type && (
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
            onClick={handleCreatePage}
          >
            Добавить {tableButtonName}
          </Button>
          {tableData?.length > 0 && (
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
