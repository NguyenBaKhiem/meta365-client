import ucc_token from "@Assets/images/ucc-token.png";
import ActionSelect from "@Components/ActionSelect";
import Button from "@Components/Button";
import StatusTag from "@Components/StatusTag";
import Text from "@Components/Text";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loading, unloading } from "@Redux/actions/loading";
import { useMedia } from "react-use";
import { landServices } from "../../services/landServices";
import {
  AlignCenter, Center,
  Checkbox, FlexRight
} from "./StyledAdminLand";

const TableNFT = (props) => {
  const [nftData, setNftData] = useState([])
  const [numPage, setNumPage] = useState(1);
  const dispatch = useDispatch()
  const getLandNft = (filter) => {
    dispatch(loading());
    landServices
      .getNftsByLand(props.id, { ...filter })
      .then((res) => {
        dispatch(unloading());
        let all = new Set([...nftData, ...res.results]);
        setNftData([...all]);
      })
      .catch((err) => {
        dispatch(unloading());
        console.log(err);
      });
  };

  useEffect(() => {
    getLandNft({ page: numPage });
  }, [numPage]);

  return (
    <>
    <tr className="subitem">
      <td colSpan={5} style={{ display: "table-cell" }}>
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>
                  <Text color={colors.white} type="body2">
                    #
                  </Text>
                </th>
                <th style={{ width: "15%" }}>
                  <Text color={colors.white} type="body2">
                    NFT Code
                  </Text>
                </th>
                <th style={{ width: "20%" }}>
                  <Text color={colors.white} type="body2">
                    Owner address
                  </Text>
                </th>
                <th style={{ width: "15%" }}>
                  <Center>
                    <Text color={colors.white} type="body2">
                      Status
                    </Text>
                  </Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {nftData &&
                nftData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Text color="#DAD8D8" type="body2">
                          {item.rank}
                        </Text>
                      </td>
                      <td>
                        <Text color="#DAD8D8" type="body2">
                          {item.id}
                        </Text>
                      </td>
                      <td>
                        <Text color="#DAD8D8" type="body2">
                          {item.owner}
                        </Text>
                      </td>
                      <td>
                        <Center>
                         <StatusTag status={item.status} />
                        </Center>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
          >
            <Button
              width="100px"
              color="#166CF6"
              onClick={() => setNumPage((i) => i + 1)}
            >
              <Text color="white">Show More</Text>
            </Button>{" "}
          </div>
        </div>
      </td>
      <td></td>
    </tr>
  </>
  )
}

const MarketItem = ({ landData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const navigate = useNavigate();
  const [landDetail, setLandDetail] = useState(landData);
  const [showAllNft, setShowAllNft] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLandDetail(landData);
  }, [landData]);

  const deleteLand = (ids) => {
    dispatch(loading());
    landServices
      .deleteLands({ids: [ids]})
      .then((res) => {
        dispatch(unloading());
        if(res.code===403) {
          return(
            dispatch(showNotificationError(res.message)),
            navigate("/403")
          )
        }
        dispatch(showNotificationSuccess("Deleted"))
        window.location.reload()
      })
      .catch((error) => {
        dispatch(unloading());
      });
  };

  return (
    <>
      {belowSM ? (
        <>
          <tr
            style={
              showAllNft
                ? { backgroundColor: "#171735" }
                : { backgroundColor: "#1E2027" }
            }
          >
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <>
                <AlignCenter>
                  <Text color={colors.text_header} type={"body2"}>
                    {landDetail.projectName}
                  </Text>
                </AlignCenter>
                <Text color={colors.text_body} type={"body2"}>
                  {landDetail.landCode}
                </Text>
              </>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <StatusTag status={landDetail.status} />
               
              </AlignCenter>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <img
                  src={ucc_token}
                  alt="meta365"
                  style={{ marginRight: "8px" }}
                />
                <Text color={colors.text_header} type={"body1"}>
                  {landDetail.price}
                </Text>
              </AlignCenter>
            </td>
            <td>
              <FlexRight>
                <ActionSelect
                  id={landDetail.id}
                  hasVoting={true}
                  voteData={landDetail}
                />
              </FlexRight>
            </td>
          </tr>
          {showAllNft && (
            <TableNFT id={landDetail.id}/>
          )}
        </>
      ) : (
        <>
          <tr
            style={
              showAllNft
                ? { backgroundColor: "#171735" }
                : { backgroundColor: "#1E2027" }
            }
          >
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <Checkbox type="checkbox" />
                <Text color={colors.text_header} type={"body1"}>
                  {landDetail.projectName}
                </Text>
              </AlignCenter>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <Text color={colors.text_body} type={"body1"}>
                  {landDetail.landCode}
                </Text>
              </AlignCenter>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <img
                  src={ucc_token}
                  alt="meta365"
                  style={{ marginRight: "8px" }}
                />
                <Text color={colors.accent} type={"body1"}>
                  {landDetail.price}
                </Text>
              </AlignCenter>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {moment(landDetail.createdAt).format("DD/MM/YYYY")}
                </Text>
              </AlignCenter>
            </td>
            <td
              onClick={() => {
                setShowAllNft(!showAllNft);
              }}
            >
              <Center>
                 <StatusTag status={landDetail.status}  />
              </Center>
            </td>
            <td>
              <Center>
                <ActionSelect
                  id={landDetail.id}
                  hasVoting={true}
                  voteData={landDetail}
                  handleDelete={(ids) => deleteLand(ids)}
                />
              </Center>
            </td>
          </tr>
          {showAllNft && (
            <TableNFT id={landDetail.id}/>
          )}
        </>
      )}
    </>
  );
};

export default MarketItem;