import avatar from "@Assets/images/avatar.png";
import close_icon_image from "@Assets/images/close-blog-image.png";
import copy_icon from "@Assets/images/copy.png";
import photo from "@Assets/images/photo.png";
import close_icon from "@Assets/images/X.png";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { uploadServices } from "@Services";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlignCenter } from "../../components/AdminTable/StyledAdminTable";
import Button from "../../components/Button";
import { colors } from "../../theme/colors";
import {
  AddImage,
  CopyIcon,
  CoverWrapper,
  ImagePreview, ImgClose, ImgCover, InputImage, ModalHeader,
  ModalWrapper,
  ProfileInfo
} from "./StyledBlog";

const ModalCover = (props) => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imagesAttachment, setImagesAttachment] = useState("");
  const onChangeFile = (arr) => {
    const formData = new FormData();
    Object.values(arr).forEach((item) => {
      formData.append("file", item);
    });
    dispatch(loading())
    uploadServices
      .uploadSingle(formData)
      .then((res) => {
        dispatch(unloading())
        if (res.code === 403 || res.code === 401) {
          navigate("/403");
          return dispatch(showNotificationError(res.message));
        }
        dispatch(showNotificationSuccess("Upload success."));
        setImagesAttachment(res.url);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showNotificationError("Upload failed."));
        dispatch(unloading())
      });
  };

  return (
    <>
      <ModalWrapper>
        <CoverWrapper>
          <ModalHeader>
            
            <Text color={colors.text_header} type={"header2"}>
              CHOOSE COVER
            </Text>
            <img
              src={close_icon}
              height="14px"
              style={{ cursor: "pointer", position:"absolute",right:"0" }}
              onClick={() => {
                props.onCloseModal();
              }}
              alt=""
            />
          </ModalHeader>
          <ProfileInfo>
            <img src={avatar} alt="" />
            <div>
              <Text color={colors.accent} type={"body1"}>
                {account.fullName}
              </Text>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {account.address.slice(0, 5) +
                    "..." +
                    account.address.slice(account.address.length - 5)}
                </Text>
                <CopyIcon src={copy_icon} />
              </AlignCenter>
            </div>
          </ProfileInfo>
          {!imagesAttachment ? (
            <label name="photo" htmlFor="upload-photo" style={{ width: "100%" }}>
              <InputImage
                type="file"
                id="upload-photo"
                onChange={(e) => onChangeFile(e.target.files)}
              />
              <AddImage>
                <span style={{ width: "100%" }}>Add image cover</span>
                <div htmlFor="upload-photo">
                  <img src={photo} alt="" />
                </div>
              </AddImage>
            </label>
          ) : (
            <ImagePreview>
              <ImgCover>
                <img width="100%" src={imagesAttachment} alt="cover" />
              </ImgCover>

              <ImgClose>
                <img
                  src={close_icon_image}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setImagesAttachment("");
                  }}
                  alt=""
                />
              </ImgClose>
            </ImagePreview>
          )}
          <div style={{ marginTop: "20px" }}>
            <Button
              width={"100%"}
              color={colors.primary}
              disabled={!imagesAttachment}
              onClick={() => {
                props.nextStep(); props.onCloseModal();
                props.setCover(imagesAttachment);
              }}
            >
              <Text
                style={{ margin: "0px" }}
                type={"body"}
                color={colors.text_header}
              >
                NEXT
              </Text>
            </Button>
          </div>
        </CoverWrapper>
      </ModalWrapper>
    </>
  );
};

export default ModalCover;
