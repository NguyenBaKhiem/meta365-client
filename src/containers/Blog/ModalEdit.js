import avatar from "@Assets/images/avatar.png";
import close_icon_image from "@Assets/images/close-blog-image.png";
import copy_icon from "@Assets/images/copy.png";
import photo from "@Assets/images/photo.png";
import close_icon from "@Assets/images/X.png";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { uploadServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import { AlignCenter } from "../../components/AdminTable/StyledAdminTable";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import {
  AddImage,
  CopyIcon,
  CoverWrapper,
  ImagePreview, ImgClose, ImgCover, InputImage, ModalHeader,
  ModalWrapper,
  ProfileInfo
} from "./StyledBlog";
const ModalEdit = (props) => {
  const navigate = useNavigate()
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imagesAttachment, setImagesAttachment] = useState("");
  const [checkEditCover, setCheckEditCover] = useState(false);
  const [imgCover, setImgCover] = useState(props.imgCover);


  const onChangeFile = (arr) => {
      setCheckEditCover(true);
      setImgCover("Update");
    const formData = new FormData();
    Object.values(arr).forEach((item) => {
      formData.append("file", item);
    });
    uploadServices
      .uploadSingle(formData)
      .then((res) => {
        if (res.code === 403 || res.code === 401) {
          navigate("/403");
          return dispatch(showNotificationError(res.message)); 
        }
        dispatch(showNotificationSuccess("Upload success."));
        setImagesAttachment(res.url);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showNotificationError("Upload failed."));
        setLoading(false);
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
                Account #1
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
         
          {imgCover ==="no-image"  && !imagesAttachment ? (
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
                {imgCover !=="no-cover" && !checkEditCover && <img width="100%" src={ imgCover} alt="cover" /> }
                {checkEditCover && <img width="100%" src={ imagesAttachment} alt="cover" /> }
              </ImgCover>

              <ImgClose>
                <img
                  src={close_icon_image}
                  height="20px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setImagesAttachment("");
                    setImgCover("no-image");
                    setCheckEditCover(true);
                  }}
                  alt=""
                />
              </ImgClose>
            </ImagePreview>
          )})
          <div style={{ marginTop: "20px" }}>
            <Button
              width={"100%"}
              color={colors.primary}
              disabled={(!imagesAttachment && checkEditCover) || imgCover ==="no-image" }
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

export default ModalEdit;
