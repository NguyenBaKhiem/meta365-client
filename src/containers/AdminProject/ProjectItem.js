import ucc_token from "@Assets/images/ucc-token.png";
import ActionSelect from "@Components/ActionSelect";
import StatusTag from "@Components/StatusTag";
import Text from "@Components/Text";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import { projectServices } from "../../services/projectServices";
import DeleteModal from "./DeleteModal";
import {
  AlignCenter, Center, FlexRight
} from "./StyledAdminProject";

const LandItem = ({ add, itemData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const deleteProjects = (ids) => {
    setLoading(true);
    projectServices
      .deleteProjects({ids: [ids]})
      .then((res) => {
        if(res.code===403) {
          return(
            dispatch(showNotificationError(res.message)),
            navigate("/403")
          )
        }
        setLoading(false); 
        dispatch(showNotificationSuccess("Deleted"))
        window.location.reload()
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (add) setShowDetail(true);
  }, []);
  return (
    <>
      {belowSM ? (
        <tr>
          <td>
            <AlignCenter>
              <Text color={colors.text_body} type={"body2"}>
                {itemData.name}
              </Text>
            </AlignCenter>
            <Text color={colors.text_body} type={"body2"}>
              {itemData.investor}
            </Text>
          </td>
          <td>
            <Center>
              <StatusTag status={itemData.status} />
            </Center>
          </td>
          <td>
            <AlignCenter>
              <img
                src={ucc_token}
                alt="meta365"
                style={{ marginRight: "8px" }}
              />
              <Text color={colors.accent} type={"body2"}>
              {itemData.totalInvestment}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <FlexRight>
              <ActionSelect showEdit={() => setShowDetail(true)} />
            </FlexRight>
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            <AlignCenter>
              <Text color={colors.text_header} type={"body1"}>
                {itemData.name}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <AlignCenter>
              <Text color={colors.text_header} type={"body1"}>
                {add ? "---" : `${itemData.investor}`}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <AlignCenter>
              <img
                src={ucc_token}
                alt="meta365"
                style={{ marginRight: "8px" }}
              />
              <Text color={colors.text_header} type={"body1"}>
                {itemData.totalInvestment}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <Center>
              <StatusTag status={itemData.status} />
            </Center>
          </td>
          <td>
            <Center>
              <ActionSelect id={itemData.id} handleDelete={()=>setShowDelete(true)}  />
            </Center>
          </td>
        </tr>
      )}
      {
        showDelete && <DeleteModal onCloseModal={()=>{setShowDelete(false)}} onDelete={()=>deleteProjects(itemData.id)} />
      }
    </>
  );
};

export default LandItem;
