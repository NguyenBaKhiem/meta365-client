import calendar_icon from "@Assets/images/calendar.png";
import checked_icon from "@Assets/images/checkedbox.png";
import close_icon from "@Assets/images/close-modal.png";
import dots_icon from "@Assets/images/dots.png";
import ucc_token from "@Assets/images/ucc-token.png";
import unchecked_icon from "@Assets/images/uncheckedbox.png";
import upload_icon from "@Assets/images/upload.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import {
  showNotificationError,
  showNotificationSuccess,
} from "@Redux/actions/notification";
import { uploadServices } from "@Services";
import { projectServices } from "@Services/projectServices";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  AlignCenter,
  CheckboxPolicy,
  EditForm,
  FileAttach,
  FileAttachGrid,
  FileAttachInput,
  FileInput,
  FileName,
  FilePreview,
  FormGroup,
  ImageView,
  TableWrapper,
  Title,
  UploadIcon,
} from "./StyledAdminProject";

const ProjectForm = ({ projectData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [checkbox, setCheckbox] = useState(false);
  const [imagesAttachment, setImagesAttachment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [ver, setVer] = useState(true);
  const [projectDetail, setProjectDetail] = useState({
    name: "",
    description: "description",
    image: [], //imagesUrl[0].url
    location: "",
    media: "",
    totalArea: 0,
    totalInvestment: 0,
    // type: projectDetail.type,
    commencementDate: moment(new Date()).format("YYYY-MM-DD"),
    finishedDate: moment(new Date()).format("YYYY-MM-DD"),
    developmentUnit: "",
    investor: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.action === "edit") {
      setProjectDetail(projectData);
    }
  }, [projectData]);

  const validateMedia = () => {
    var url = document.getElementById("media").value;
    var regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (url !== "") {
      return regexp.test(url);
    }
  };

  const onChangeFile = (arr) => {
    const formData = new FormData();
    Object.values(arr).forEach((item) => {
      formData.append("file", item);
    });
    uploadServices
      .upload(formData)
      .then((res) => {
        if (res.code === 403 || res.code === 401) {
          navigate("/403");
          return dispatch(showNotificationError(res.message)); 
        }
        dispatch(showNotificationSuccess("Upload success."));
        res.forEach((i) => {
          setImagesUrl((prevState) => [...prevState, i]);
        });
        setLoading(false);
      })
      .catch((error) => {
        dispatch(showNotificationError("Upload failed."));
        setLoading(false);
      });

    for (let item of arr) {
      setImagesAttachment((prevState) => [...prevState, item]);
    }
  };

  const removeFile = (file) => {
    let updateList = imagesAttachment.filter((item, index) => index !== file);
    let updateUrl = imagesUrl.filter((item, index) => index !== file);
    setImagesAttachment(updateList);
    setImagesUrl(updateUrl);
  };
  const handleCancel = () => {
    navigate("/admin/project");
  };
  const checkVerify = (data) => {
    setVer(true);
    for (let property in data) {
      if (!data[property]) {
        if (document.getElementById(property))
          document.getElementById(property).style.borderColor = "red";
      } else {
        if (document.getElementById(property))
          document.getElementById(property).style.borderColor = "#8e8ea1";
      }
      if (document.getElementById("image")) {
        if (!data.image.length)
          document.getElementById("image").style.background = "red";
        else document.getElementById("image").style.background = "#334b6c";
      }
    }
    for (let property in data) {
      if (!data[property] || !data.image.length) setVer(false);
    }
  };

  useEffect(() => {
    if (submit) checkVerify(projectDetail);
  }, [projectDetail]);

  useEffect(() => {
    if (imagesUrl.length)
      setProjectDetail({ ...projectDetail, image: imagesUrl[0].url });
  }, [imagesUrl]);

  const updateProject = () => {
    if (!checkbox)
      return dispatch(
        showNotificationError("Agree terms and conditions of the contract")
      );
    setSubmit(true);
    checkVerify(projectDetail);
    const dataUpdate = { ...projectDetail };
    delete dataUpdate.id;
    delete dataUpdate.author;
    delete dataUpdate.path;
    dataUpdate.totalArea = parseFloat(dataUpdate.totalArea)
    dataUpdate.totalInvestment = parseFloat(dataUpdate.totalInvestment)
    if (checkbox && ver) {
      if (!validateMedia())
        return dispatch(showNotificationError("Invalid media field"));
      projectServices
        .updateProjectById(projectData.id, dataUpdate)
        .then((res) => {
          if (res.code === 403) {
            return (
              dispatch(showNotificationError(res.message)), navigate("/403")
            );
          }
          if (res.code === 400) {
            dispatch(showNotificationError("Invalid Input"));
            return;
          }
          navigate("/admin/project");
          return dispatch(showNotificationSuccess("Update success"));
        })
        .catch((err) => {
          return dispatch(showNotificationError(err.message));
        });
    } else {
      dispatch(showNotificationError("Verify Input"));
    }
  };

  const addNewProject = async () => {
    if (!checkbox)
      return dispatch(
        showNotificationError("Agree terms and conditions of the contract")
      );
    projectDetail.totalArea = parseFloat(projectDetail.totalArea);
    projectDetail.totalInvestment = parseFloat(projectDetail.totalInvestment);
    setSubmit(true);
    checkVerify(projectDetail);
    if (checkbox && ver) {
      if (!validateMedia())
        return dispatch(showNotificationError("Invalid media field"));
      projectServices
        .postProject(projectDetail)
        .then((res) => {
          if (res.code === 403) {
            return (
              dispatch(showNotificationError(res.message)), navigate("/403")
            );
          }
          if (res.code === 400) {
            dispatch(showNotificationError("Invalid Input"));
            return;
          }
          dispatch(showNotificationSuccess("Add new project success"));
          navigate("/admin/project");
        })
        .catch((err) => {
          dispatch(showNotificationError("Add new project failed"));
        });
    } else {
      dispatch(showNotificationError("Verify Input"));
    }
  };

  return (
    <>
      <TableWrapper>
        <table>
          <tbody>
            {belowSM ? (
              <tr>
                <td>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"body2"}>
                      {projectDetail
                        ? projectDetail.name.length > 10
                          ? projectDetail.name.slice(0, 5) +
                            "..." +
                            projectDetail.name.slice(
                              projectDetail.name.length - 5
                            )
                          : projectDetail.name
                        : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"body2"}>
                    {projectDetail ? projectDetail.investor : "---"}
                  </Text>
                </td>
                <td>
                  <AlignCenter>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"body1"}>
                      {projectDetail ? projectDetail.totalInvestment : "---"}
                    </Text>
                  </AlignCenter>
                </td>
              </tr>
            ) : (
              <tr>
                <td style={{ borderTopLeftRadius: "10px" }}>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"button"}>
                      {projectDetail
                        ? projectDetail.name.length > 10
                          ? projectDetail.name.slice(0, 5) +
                            "..." +
                            projectDetail.name.slice(
                              projectDetail.name.length - 5
                            )
                          : projectDetail.name
                        : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {projectDetail ? projectDetail.investor : "---"}
                  </Text>
                </td>
                <td>
                  <AlignCenter style={{ justifyContent: "center" }}>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"button"}>
                      {projectDetail ? projectDetail.totalInvestment : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {projectDetail ? projectDetail.totalArea : "---"}
                  </Text>
                </td>
                <td style={{ borderTopRightRadius: "10px" }}>
                  <AlignCenter>
                    <img src={dots_icon} alt="meta365" />
                  </AlignCenter>
                </td>
              </tr>
            )}

            <tr>
              <td colSpan="5" style={{ padding: "0", textAlign: "left" }}>
                <EditForm>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Project
                    </Text>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter Project"
                      value={(projectDetail && projectDetail.name) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          name: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Location
                    </Text>
                    <input
                      type="text"
                      id="location"
                      placeholder="Enter Location"
                      value={(projectDetail && projectDetail.location) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          location: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FileAttach>
                    <Title>Attached Files</Title>
                    <FileAttachGrid>
                      {props.action === "add" ? (
                        <>
                          <FileInput
                            id="attach-images"
                            type="file"
                            multiple
                            onChange={(e) => {
                              onChangeFile(e.target.files);
                            }}
                          />
                          <label htmlFor="attach-images">
                            <FileAttachInput id="image">
                              <UploadIcon>
                                <img src={upload_icon} alt="meta365" />
                              </UploadIcon>
                              <div>
                                <Text color={colors.text_header} type="button">
                                  Upload Image
                                </Text>
                                <Text color={colors.accent} type="body1">
                                  JPG, PNG
                                </Text>
                              </div>
                            </FileAttachInput>
                          </label>
                          {imagesAttachment &&
                            imagesAttachment.map((item, index) => {
                              return (
                                <FilePreview key={index}>
                                  <AlignCenter>
                                    <UploadIcon>
                                      <img
                                        className="preview"
                                        src={URL.createObjectURL(item)}
                                        alt="meta365"
                                      />
                                    </UploadIcon>
                                    <div>
                                      <Text
                                        color={colors.text_header}
                                        type="button"
                                      >
                                        <FileName>{item.name}</FileName>
                                      </Text>
                                      <Text color={colors.accent} type="body1">
                                        {item.size / 1000} KB
                                      </Text>
                                    </div>
                                  </AlignCenter>
                                  <img
                                    src={close_icon}
                                    alt="meta365"
                                    onClick={() => {
                                      removeFile(index);
                                    }}
                                  />
                                </FilePreview>
                              );
                            })}
                        </>
                      ) : (
                        <>
                          <ImageView>
                            <img
                              src={projectDetail && projectDetail.image}
                              alt="meta365"
                            />
                          </ImageView>
                        </>
                      )}
                    </FileAttachGrid>
                  </FileAttach>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Investor
                    </Text>
                    <input
                      id="investor"
                      type="text"
                      placeholder="Enter Investor"
                      value={(projectDetail && projectDetail.investor) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          investor: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Developer
                    </Text>
                    <input
                      id="developmentUnit"
                      type="text"
                      placeholder="Enter Developer"
                      value={
                        (projectDetail && projectDetail.developmentUnit) || ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          developmentUnit: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Area
                    </Text>
                    <input
                      id="totalArea"
                      type="number"
                      placeholder="Enter Area "
                      value={(projectDetail && projectDetail.totalArea) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          totalArea: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Commencement
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      id="commencementDate"
                      type="date"
                      value={
                        (projectDetail &&
                          moment(projectDetail.commencementDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          commencementDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Complete Year
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      id="finishedDate"
                      type="date"
                      value={
                        (projectDetail &&
                          moment(projectDetail.finishedDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          finishedDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Investment
                    </Text>
                    <input
                      id="totalInvestment"
                      type="number"
                      placeholder="Enter Investment"
                      style={{ color: "#00B67F" }}
                      value={
                        (projectDetail && projectDetail.totalInvestment) || ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          totalInvestment: e.target.value,
                        });
                      }}
                    />
                    <div className="icon">
                      <AlignCenter>
                        <img src={ucc_token} alt="meta365" width="26px" />
                      </AlignCenter>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Media
                    </Text>
                    <input
                      id="media"
                      type="url"
                      placeholder="Enter media"
                      style={{ color: "#00B67F" }}
                      value={(projectDetail && projectDetail.media) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          media: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <div></div>
                  <AlignCenter>
                    {checkbox ? (
                      <CheckboxPolicy
                        src={checked_icon}
                        alt="meta365"
                        onClick={() => {
                          setCheckbox(false);
                        }}
                      />
                    ) : (
                      <CheckboxPolicy
                        src={unchecked_icon}
                        alt="meta365"
                        onClick={() => {
                          setCheckbox(true);
                        }}
                      />
                    )}
                    <Text color={"#8E8EA1"} type={"body1"}>
                      Agree to terms and conditions of the contract.
                    </Text>
                  </AlignCenter>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button width="50%" disable onClick={handleCancel}>
                      <Text color="#8E8EA1" type={"button"}>
                        Cancel
                      </Text>
                    </Button>
                    <Button
                      color={colors.primary}
                      width="50%"
                      onClick={() => {
                        props.action === "edit"
                          ? updateProject()
                          : addNewProject();
                      }}
                    >
                      <Text color={colors.text_header} type={"button"}>
                        Submit
                      </Text>
                    </Button>
                  </div>
                </EditForm>
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default ProjectForm;
