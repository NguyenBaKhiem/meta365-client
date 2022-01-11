import calendar_icon from "@Assets/images/calendar.png";
import checked_icon from "@Assets/images/checkedbox.png";
import close_icon from "@Assets/images/close-modal.png";
import ucc_token from "@Assets/images/ucc-token.png";
import unchecked_icon from "@Assets/images/uncheckedbox.png";
import upload_icon from "@Assets/images/upload.png";
import Button from "@Components/Button";
import StatusTag from "@Components/StatusTag";
import Text from "@Components/Text";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { uploadServices } from "@Services";
import { landServices } from "@Services/landServices";
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
  Center,
  CheckboxPolicy, EditForm,
  FileAttach,
  FileAttachGrid,
  FileAttachInput,
  FileInput,
  FileName,
  FilePreview, FormGroup,
  ImageView,
  TableWrapper,
  Title,
  UploadIcon
} from "./StyledAdminLand";

const LandForm = ({ landData = {}, ...props }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [imagesAttachment, setImagesAttachment] = useState([]);
  const [landDetail, setLandDetail] = useState({
    projectId: "",
    direction: "",
    landCode: "",
    landBlockCode: "",
    squares: 0,
    ratio: "",
    location: "",
    images: [],
    thumbnail: "thumbnail",
    ownershipCerDate: moment(new Date()).format("YYYY-MM-DD"),
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    ownershipCerProvider: "",
    landUseTerm: moment(new Date()).format("YYYY-MM-DD"),
    landUseType: "",
    landUsePurpose: "",
    landUseOriginal: "",
    legal: "",
    price: 0,
    // author: landDetail.author,
    status: 1,
    numOfNft: 1,
  });
  const [allProjects, setAllProjects] = useState(null);
  const [landProject, setLandProject] = useState(null);
  const belowSM = useMedia(breakpoints.sm);
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const dispatch = useDispatch();
  const [ver, setVer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.action === "edit") {
      setLandDetail(landData);
      if (allProjects) {
        let project = allProjects.filter((item) => {
          return item.id === landData.projectId;
        });
        setLandProject(project[0]);
      }
    }
  }, [landData]);

  useEffect(() => {
    getAllProjects();
  }, []);
  const handleCancel = () => {
    navigate("/admin/land");
  };
  const onChangeFile = (arr) => {
    const formData = new FormData();
    Object.values(arr).forEach((item) => {
      formData.append("file", item);
    });

    uploadServices
      .upload(formData)
      .then((res) => {
        if (res.code === 403) {
          navigate("/403");
          return dispatch(showNotificationError(res.message))
        }
        dispatch(showNotificationSuccess("Upload success."));
        res.forEach((i) => {
          setImagesUrl((prevState) => [...prevState, i.url]);
        });
        setLoading(false);
      })
      .catch((error) => {
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

  useEffect(() => {
    setLandDetail({
      ...landDetail,
      images: imagesUrl,
      thumbnail: imagesUrl[0],
    });
  }, [imagesUrl]);

  const getAllProjects = async () => {
    projectServices
      .getProjects()
      .then((res) => {
        setAllProjects(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
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
      if (document.getElementById("images")) {
        if (!data.images.length)
          document.getElementById("images").style.background = "red";
        else document.getElementById("images").style.background = "#334b6c";
      }
    }
    for (let property in data) {
      if (!data[property] || !data.images.length) setVer(false);
    }
  };

  useEffect(() => {
    if (submit) checkVerify(landDetail);
  }, [landDetail]);

  const updateLand = async () => {
    if (!checkbox)
      return dispatch(
        showNotificationError("Agree terms and conditions of the contract")
      );
    setSubmit(true);
    checkVerify(landDetail);
    const dataUpdate = { ...landDetail };
    delete dataUpdate.projectId;
    delete dataUpdate.landBlockCode;
    // delete dataUpdate.landCode;
    delete dataUpdate.images;
    delete dataUpdate.thumbnail;
    delete dataUpdate.numOfNft;
    delete dataUpdate.type;
    delete dataUpdate.delegate;
    delete dataUpdate.id;
    dataUpdate.price = parseFloat(dataUpdate.price)
    dataUpdate.squares = parseFloat(dataUpdate.squares)
    if (checkbox && ver) {
      landServices
        .updateLandById(landData.id, dataUpdate)
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
          dispatch(showNotificationSuccess("Update success"));
          navigate("/admin/land");
        })
        .catch((err) => {
          console.log(err); // to-do: toast message
          dispatch(showNotificationError("Update fail"));
        });
    } else {
      dispatch(showNotificationError("Verify Input"));
    }
  };

  const addLand = async () => {
    if (!checkbox)
      return dispatch(
        showNotificationError("Agree terms and conditions of the contract")
      );
    if (landDetail.numOfNft > 1) {
      setLandDetail({ ...landDetail, type: 2 });
    } else setLandDetail({ ...landDetail, type: 1 });
    landDetail.price = parseFloat(landDetail.price)
    landDetail.squares = parseFloat(landDetail.squares)
    landDetail.numOfNft = Number(landDetail.numOfNft)
    setSubmit(true);
    checkVerify(landDetail);
    if (checkbox && ver) {
      landServices
        .postLand(landDetail)
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
          dispatch(showNotificationSuccess("Add Land Success"));
          navigate("/admin/land");
        })
        .catch((err) => {
          dispatch(showNotificationError("Add Land Failed"));
        });
    } else {
      dispatch(showNotificationError("Verify Input"));
    }
  };

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Project
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Land Code
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Starting Price
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Date of Commencement
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Status
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {belowSM ? (
              <tr>
                <td>
                  <>
                    <AlignCenter>
                      <Text color={colors.text_header} type={"body2"}>
                        ---
                      </Text>
                    </AlignCenter>
                    <Text color={colors.text_body} type={"body2"}>
                      {landDetail
                        ? landDetail.landCode.length > 10
                          ? landDetail.landCode.slice(0, 5) +
                            "..." +
                            landDetail.landCode.slice(
                              landDetail.landCode.length - 5
                            )
                          : landDetail.landCode
                        : "---"}
                    </Text>
                  </>
                </td>
                <td>
                  {landDetail ? (
                    <>
                      <Center>
                        <StatusTag status={landDetail.status} />
                      </Center>
                    </>
                  ) : (
                    <Text color={colors.text_header} type={"button"}>
                      ---
                    </Text>
                  )}
                </td>
                <td>
                  <AlignCenter>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"body1"}>
                      {landDetail ? landDetail.price : "---"}
                    </Text>
                  </AlignCenter>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"button"}>
                      {landProject ? landProject.name : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {landDetail
                      ? landDetail.landCode.length > 10
                        ? landDetail.landCode.slice(0, 5) +
                          "..." +
                          landDetail.landCode.slice(
                            landDetail.landCode.length - 5
                          )
                        : landDetail.landCode
                      : "---"}
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
                      {landDetail ? landDetail.price : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {landDetail
                      ? moment(landDetail.createdAt).format("DD/MM/YYYY")
                      : "---"}
                  </Text>
                </td>
                <td>
                  {landDetail ? (
                    <>
                      <Center>
                        <StatusTag status={landDetail.status} />
                      </Center>
                    </>
                  ) : (
                    <Text color={colors.text_header} type={"button"}>
                      ---
                    </Text>
                  )}
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
                    <select
                      id="projectId"
                      disabled={props.action === "edit" ? true : false}
                      value={(landDetail && landDetail.projectId) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          projectId: e.target.value,
                        });
                      }}
                    >
                      <option value="">Choose project</option>
                      {allProjects &&
                        allProjects.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Land Code
                    </Text>
                    <input
                      id="landCode"
                      type="text"
                      placeholder="123-456789"
                      disabled={false}
                      value={(landDetail && landDetail.landCode) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landCode: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FileAttach>
                    <Title>Attach File</Title>
                    <FileAttachGrid>
                      {props.action === "add" ? (
                        <div>
                          <FileInput
                            id="attach-images"
                            type="file"
                            multiple
                            onChange={(e) => {
                              onChangeFile(e.target.files);
                            }}
                          />
                          <label htmlFor="attach-images">
                            <FileAttachInput id="images">
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
                                  <AlignCenter style={{ gap: "24px" }}>
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
                        </div>
                      ) : (
                        <>
                          {landDetail &&
                            landDetail.images?.map((item, index) => {
                              return (
                                <ImageView key={index}>
                                  <img src={item} alt="meta365" />
                                </ImageView>
                              );
                            })}
                          {/* {landDetail.images.map((landImg) => {
                            <ImageView>
                              <img
                                src={landDetail && landDetail.images}
                                alt="meta365"
                              />
                            </ImageView>;
                          })} */}
                        </>
                      )}
                    </FileAttachGrid>
                  </FileAttach>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Starting Price
                    </Text>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      style={{ color: "#00B67F" }}
                      value={(landDetail && landDetail.price) || ""}
                      onChange={(e) => {
                        setLandDetail({ ...landDetail, price: e.target.value });
                      }}
                    />
                    <div className="icon">
                      <AlignCenter>
                        <img src={ucc_token} alt="meta365" />
                        <Text color={colors.text_header} type="button">
                          UCC
                        </Text>
                      </AlignCenter>
                    </div>
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
                      id="startDate"
                      type="date"
                      value={
                        (landDetail &&
                          moment(landDetail.startDate).format("YYYY-MM-DD")) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          startDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Address
                    </Text>
                    <input
                      id="location"
                      type="text"
                      placeholder="Enter address"
                      value={(landDetail && landDetail.location) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          location: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Direction
                    </Text>
                    <select
                      id="direction"
                      value={(landDetail && landDetail.direction) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          direction: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select direction</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                      <option value="North">North</option>
                      <option value="Northeast">Northeast</option>
                      <option value="Southeast">Southeast</option>
                      <option value="Northwest">Northwest</option>
                      <option value="Southwest">Southwest</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Area
                    </Text>
                    <input
                      id="squares"
                      type="number"
                      placeholder="Enter area"
                      value={(landDetail && landDetail.squares) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          squares: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Rate
                    </Text>
                    <input
                      id="ratio"
                      type="text"
                      placeholder="Enter rate"
                      value={(landDetail && landDetail.ratio) || ""}
                      onChange={(e) => {
                        setLandDetail({ ...landDetail, ratio: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Land Parcel Code
                    </Text>
                    <input
                      id="landBlockCode"
                      type="text"
                      placeholder="Enter land parcel Code"
                      value={(landDetail && landDetail.landBlockCode) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landBlockCode: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Legal Document
                    </Text>
                    <select
                      id="legal"
                      value={(landDetail && landDetail.legal) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          legal: e.target.value,
                        });
                      }}
                    >
                      <option value="">Legal foundation</option>
                      <option value="Land Use Rights Certificate">
                        Land Use Rights Certificate
                      </option>
                      <option value="House ownership certificate">
                        House ownership certificate
                      </option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Issued on
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      id="ownershipCerDate"
                      type="date"
                      value={
                        (landDetail &&
                          moment(landDetail.ownershipCerDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          ownershipCerDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Issued at
                    </Text>
                    <input
                      id="ownershipCerProvider"
                      type="text"
                      placeholder="Enter issue department"
                      value={
                        (landDetail && landDetail.ownershipCerProvider) || ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          ownershipCerProvider: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Form of Use
                    </Text>
                    <input
                      id="landUseType"
                      type="text"
                      placeholder="Enter form of use here"
                      value={(landDetail && landDetail.landUseType) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseType: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Time of Use
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      id="landUseTerm"
                      type="date"
                      value={
                        (landDetail &&
                          moment(landDetail.landUseTerm).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseTerm: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Land Use Purpose
                    </Text>
                    <input
                      id="landUsePurpose"
                      type="text"
                      placeholder="Enter land use purpose"
                      value={(landDetail && landDetail.landUsePurpose) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUsePurpose: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Land Use Origin
                    </Text>
                    <input
                      id="landUseOriginal"
                      type="text"
                      placeholder="Enter origin of land use"
                      value={(landDetail && landDetail.landUseOriginal) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseOriginal: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Number of NFTs
                    </Text>
                    <input
                      id="numOfNft"
                      type="number"
                      placeholder="Enter number of NFTs"
                      disabled={props.action === "edit" ? true : false}
                      value={(landDetail && landDetail.numOfNft) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          numOfNft: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <div />
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
                        props.action === "edit" ? updateLand() : addLand();
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

export default LandForm;
