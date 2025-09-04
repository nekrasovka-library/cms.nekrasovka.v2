import React, { useEffect, useRef, useState } from "react";
import { ImageComponent } from "./image.styles.js";
import ImageFile from "./image.file.jsx";
import axios from "axios";

const ImageConstructor = ({
  text,
  blockId,
  height,
  imgIndex = 0,
  borderRadius = 0,
  maxWidth,
  updateImage,
}) => {
  const DEFAULT_IMAGE = `${process.env.REACT_APP_URL}/images/imgfish.jpg`;
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `${process.env.REACT_APP_API}images/upload`,
        formData,
      );

      const newText = [...text];
      newText[imgIndex] = response.data.file.filename;

      updateImage(newText);
    }
  };

  useEffect(() => {
    const isTextArray = Array.isArray(text);
    const images = isTextArray ? text : [text];

    if (text !== null || (isTextArray && images.length > 0)) {
      const img = new Image();
      img.src = `${process.env.REACT_APP_IMAGES_URL}${images[imgIndex]}/medium`;
      img.onload = () => {
        setImage(img.src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImage(DEFAULT_IMAGE);
        setIsLoading(false);
      };
    }
  }, [text]);

  return (
    <ImageComponent
      $borderRadius={borderRadius}
      $height={height}
      $maxWidth={maxWidth}
    >
      <img
        src={isLoading ? DEFAULT_IMAGE : image}
        alt="картинка"
        onClick={handleFileClick}
      />
      <ImageFile
        ref={fileInputRef}
        blockId={blockId}
        handleFileChange={handleFileChange}
      />
    </ImageComponent>
  );
};

export default ImageConstructor;
