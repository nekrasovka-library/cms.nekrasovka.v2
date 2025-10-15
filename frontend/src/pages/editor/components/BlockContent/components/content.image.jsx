import React, { useRef } from "react";
import {
  ContentContainer,
  TextInput,
  SettingsLabel,
  TextInputWithIcon,
} from "../block.content.styles";
import ImageFile from "../../Image/image.file";
import axios from "axios";
import Icon from "../../../../../nekrasovka-ui/Icon/icon";

const ImageContent = ({
  label,
  type,
  value,
  arrayValues,
  id,
  isDisabled,
  handleContentChange,
}) => {
  const fileInputRef = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let newValue;

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/images/upload`,
        formData,
      );

      if (id === undefined) {
        newValue = response.data.file.filename;
      } else {
        newValue = [...arrayValues];
        newValue[id] = response.data.file.filename;
      }

      handleContentChange({
        target: { name: type, value: newValue },
      });
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ContentContainer>
      <SettingsLabel>{label}</SettingsLabel>
      <TextInputWithIcon>
        <TextInput
          type="text"
          name={type}
          value={value}
          onChange={handleContentChange}
          disabled={isDisabled}
        />
        <Icon icon={"picture"} type={"button"} onClick={handleFileClick} />
      </TextInputWithIcon>
      <ImageFile ref={fileInputRef} handleFileChange={handleFileChange} />
    </ContentContainer>
  );
};

const Image = ({ label, value, type, tracks, handleContentChange }) => {
  const isValueArray = Array.isArray(value);

  return isValueArray ? (
    Array.from({ length: tracks }).map((_, index) => {
      return (
        <ImageContent
          key={index}
          label={label}
          type={type}
          value={value[index]}
          arrayValues={value}
          id={index}
          handleContentChange={handleContentChange}
        />
      );
    })
  ) : (
    <ImageContent
      label={label}
      type={type}
      value={value}
      handleContentChange={handleContentChange}
    />
  );
};

export default Image;
