import React, { useState } from "react";
import {
  ProjectMainCardAction,
  ProjectMainCardContainer,
  ProjectMainCardPageName,
} from "../project.styles.js";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteInProjectPageRequest,
  updateInProjectPageRequest,
} from "../../../../features/project/projectSlice";
import { fetchPageSuccess } from "../../../../features/page/pageSlice";
import { setSettingsVisibility } from "../../../../features/visibility/visibilitySlice";

const ProjectMainCard = ({ settings, pageId, isPageMain, name, url }) => {
  const [editedState, setEditedState] = useState({});
  const dispatch = useDispatch();
  const parentUrl = settings.parent.url ? `${settings.parent.url}/:` : "";

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
            <Link to={`${pageId}`}>
              <span>{name}</span>
            </Link>
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
            <Link to={`${pageId}`}>
              <span>{parentUrl}</span>
              <span>{url}</span>
            </Link>
            <Icon
              icon="edit"
              type="button"
              onClick={() => setEditedState({ url: "" })}
            />
          </div>
        )}
      </ProjectMainCardPageName>
      <ProjectMainCardAction>
        <div onClick={onSettings}>
          <Icon icon="settings" />
          <span>НАСТРОЙКИ</span>
        </div>
        <div onClick={onDelete}>
          <Icon icon="trash" />
          <span>УДАЛИТЬ</span>
        </div>
      </ProjectMainCardAction>
    </ProjectMainCardContainer>
  );
};

export default ProjectMainCard;
