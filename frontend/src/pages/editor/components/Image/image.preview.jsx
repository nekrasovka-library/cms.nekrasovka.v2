import React, { useEffect, useState } from "react";
import { ImageComponent } from "./image.styles.js";

const ImageConstructor = ({
  text,
  height,
  imgIndex = 0,
  borderRadius = 0,
  maxWidth,
}) => {
  const DEFAULT_IMAGE = `${process.env.REACT_APP_URL}/images/imgfish.jpg`;
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isTextArray = Array.isArray(text);
    const images = isTextArray ? text : [text];

    if (text !== null || (isTextArray && images.length > 0)) {
      const img = new Image();
      img.src = `${process.env.REACT_APP_API}/images/${images[imgIndex]}`;
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
      <img src={isLoading ? DEFAULT_IMAGE : image} alt="картинка" />
    </ImageComponent>
  );
};

export default ImageConstructor;
