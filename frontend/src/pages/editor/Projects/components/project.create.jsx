import React, { useEffect, useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  Form,
  ButtonGroup,
  Button,
  FormTitle,
  FormTemplate,
  FormTemplateCard,
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../projects.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplatesRequest } from "../../../../features/templates/templatesSlice";
import { DEFAULT_IMAGE, INITIAL_FORM } from "../projects.constants";
import Transition from "../../components/Transition/transition";
import { AnimatePresence } from "framer-motion";
import { createProjectRequest } from "../../../../features/projects/projectsSlice";

const ProjectCreate = ({ handleClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isFormDataEmpty, setIsFormDataEmpty] = useState(true);
  const templates = useSelector(({ templates }) => templates);
  const dispatch = useDispatch();

  const handleCreateProject = () => {
    dispatch(createProjectRequest({ ...formData }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    handleCreateProject();
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchTemplatesRequest());

    return () => setFormData(INITIAL_FORM);
  }, [dispatch]);

  useEffect(() => {
    if (!!formData.name) setIsFormDataEmpty(false);
  }, [formData]);

  return (
    <ModalOverlay>
      <ModalContent>
        <FormTitle>Новый проект</FormTitle>
        <Form>
          <RadiusContainer>
            <SettingsLabel>Название проекта</SettingsLabel>
            <RadiusInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </RadiusContainer>
          <RadiusContainer>
            <SettingsLabel>Адрес проекта</SettingsLabel>
            <RadiusInput
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </RadiusContainer>
          <RadiusContainer>
            <SettingsLabel>Выберите шаблон</SettingsLabel>
            {templates.status === "loading" && <div>Получаем шаблоны...</div>}
            {templates.status === "failed" && <div>{templates.error}</div>}
            <AnimatePresence mode="wait">
              <Transition key={templates.status === "succeeded"}>
                <FormTemplate>
                  {templates.items.map((template) => (
                    <FormTemplateCard
                      key={template.id}
                      $isFormCardSelected={formData.templateId === template.id}
                      onClick={() =>
                        setFormData({ ...formData, templateId: template.id })
                      }
                    >
                      <div>
                        <img
                          src={`${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h4>{template.title}</h4>
                        <p>{template.text}</p>
                      </div>
                    </FormTemplateCard>
                  ))}
                </FormTemplate>
              </Transition>
            </AnimatePresence>
          </RadiusContainer>
          <ButtonGroup>
            <Button type="button" className="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button
              type="button"
              disabled={isFormDataEmpty}
              className="primary"
              onClick={handleSubmit}
            >
              Создать
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectCreate;
