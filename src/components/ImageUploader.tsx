import React, { useState, useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  CloudUploadOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "../pages/layout/styles.css";

const ImageUploader = ({ onChangeImage, value, type }: any) => {
  const [images, setImages] = useState(value);
  const maxNumber = 69;

  useEffect(() => {
    if (value) {
      setImages(value);
    }
  }, [value]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
    onChangeImage(imageList);
  };

  return (
    <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        dragProps,
      }) => (
        <div
          className={`upload__image-wrapper ${
            type == "profile" ? "profile" : "session"
          }`}
        >
          {imageList.length < 1 && (
            <div
              className="image-wrapper"
              onClick={onImageUpload}
              {...dragProps}
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined size={50} />
              </p>
              <b>Click to upload</b>
              <p
                style={{
                  display: type == "session" ? "inline-block" : "block",
                  marginLeft: "0.5rem",
                  color: type == "session" ? "white" : "#757575",
                  marginTop: type == "profile" ? 0 : "",
                  marginBottom: 0,
                }}
                className="ant-upload-hint"
              >
                or drag and drop
              </p>
              {type == "session" && (
                <p className="ant-upload-hint">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              )}
            </div>
          )}
          &nbsp;
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image?.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <CloseOutlined onClick={() => onImageRemove(index)} />
                <EditOutlined onClick={() => onImageUpdate(index)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
