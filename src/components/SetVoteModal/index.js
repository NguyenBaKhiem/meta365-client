import down_icon from "@Assets/images/arrow-down-token.png";
import busd from "@Assets/images/busd.png";
import clock from "@Assets/images/clock.png";
import close_icon from "@Assets/images/close-modal.png";
import house from "@Assets/images/house.png";
import ucc from "@Assets/images/ucc-token-o.png";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { votingServices } from "@Services/votingServices";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import Countdown from "./CountDown";
import {
  ButtonGroup, Cashback, DateGroup,
  DateInput, Flex, FormGroup, Info,
  LandImage, Modal, ModalBody, ModalHeader, ModalWrapper, Option, PriceInput, ProgressValue, ProgressWrapper, ReversePriceWrapper, ScheduleTitle, TokenOptions, TokenSelect, TotalProgress, VotingDetail, VotingWrapper
} from "./StyledModal";
const SetVoteModal = ({ data, ...props }) => {
  const details = [
    { field: "Map Code", content: data.landCode },
    { field: "Project", content: data.projectName },
    {
      field: "Address",
      content: data.location,
    },
    {
      field: "Số người vote",
      content: data.numOfNft,
    },
    { field: "Purchase price", content: data.price + " UCC" },
  ];
  const [showSelectToken, setShowSelectToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState("BUSD");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [cashbackValue, setCashbackValue] = useState(0);
  const [voteData, setVoteData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".select-token")) {
        setShowSelectToken(false);
      }
    });
    return ()=>{
      window.removeEventListener("click", function () {});
    }
  }, []);

  const handleVoting = () => {
    let now = Date.now() / 1000;
    let start = Date.parse(startTime) / 1000;
    let end = Date.parse(endTime) / 1000;
    let price = 0;
    let cashback = Number((priceValue / data.numOfNft).toFixed(0));
    let unit =
      selectedToken === "BUSD" ? contract.BUSD_ADDRESS : contract.TOKEN_ADDRESS;

    if (end < now) return dispatch(showNotificationError("Invalid Date"));
    if (priceValue < data.numOfNft)
      return dispatch(showNotificationError("Invalid price"));
    let votingData = [start, end - start, price, cashback, unit, 0, true];
    dispatch(loading())
    contract
      .setVoting([data.delegate], [votingData])
      .then((res) => {
        dispatch(showNotificationSuccess("Success"));
        dispatch(unloading());
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        dispatch(showNotificationError("Set Voting Failed"));
        dispatch(unloading())
      });
  };

  const fetchVoting = () => {
    dispatch(loading())
    votingServices
      .getVote(data.delegate)
      .then((res) => {
        dispatch(unloading())
        setVoteData(res);
      })
      .catch((err) => {
        dispatch(unloading())
        console.log(err);
      });
  };

  useEffect(() => {
    if (data.delegate) {
      fetchVoting();
    }
  }, []);

  return (
    <>
      <ModalWrapper>
        <Modal>
          <ModalHeader>
            <Text color={colors.text_header} type="header2">
              Voting
            </Text>
            <img
              src={close_icon}
              alt="close"
              onClick={() => {
                props.onCloseModal("");
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <LandImage src={house} alt="land" />
              <div style={{ width: "100%" }}>
                <Text color={colors.text_header} type="button">
                  {data.landCode}
                </Text>
                <VotingDetail>
                  {details.map((item, index) => {
                    return (
                      <Info key={index}>
                        <Text color={colors.sub_text} type="body2">
                          {item.field}
                        </Text>
                        <Text color={colors.text_header} type="body2">
                          {item.content}
                        </Text>
                      </Info>
                    );
                  })}
                </VotingDetail>
              </div>
            </Flex>

            <ReversePriceWrapper>
              {!data.inVoting && (
                <>
                  <Text color={colors.text_header} type="body">
                    Reserve price
                  </Text>
                  <FormGroup>
                    <PriceInput
                      type="number"
                      onChange={(e) => {
                        setPriceValue(e.target.value);
                        setCashbackValue(
                          (e.target.value / data.numOfNft).toFixed(0)
                        );
                      }}
                    />
                    <TokenSelect
                      className="select-token"
                      onClick={() => {
                        setShowSelectToken(!showSelectToken);
                      }}
                    >
                      <img
                        src={selectedToken === "BUSD" ? busd : ucc}
                        alt="busd"
                      />
                      <Text color={colors.button} type="body">
                        {selectedToken}
                      </Text>
                      <img src={down_icon} alt="icon" />
                      {showSelectToken && (
                        <TokenOptions>
                          <Option
                            onClick={() => {
                              setSelectedToken("BUSD");
                            }}
                          >
                            <img src={busd} alt="token" />
                            <Text color="#F8F9FA" type="button">
                              BUSD
                            </Text>
                          </Option>
                          <Option
                            onClick={() => {
                              setSelectedToken("UCC");
                            }}
                          >
                            <img src={ucc} alt="busd" />
                            <Text color="#F8F9FA" type="button">
                              UCC
                            </Text>
                          </Option>
                        </TokenOptions>
                      )}
                    </TokenSelect>
                  </FormGroup>
                </>
              )}
              <Cashback>
                <Text color={colors.sub_text} type="body">
                  Cashback
                </Text>
                <Text
                  color={colors.accent}
                  type="body"
                  customStyle="font-weight: 700"
                >
                  {data.inVoting ? voteData.cashback : cashbackValue} UCC
                </Text>
              </Cashback>
            </ReversePriceWrapper>

            {data.inVoting ? (
              <>
                <VotingWrapper>
                  <Info>
                    <Text color={colors.new_primary} type="body1">
                      Agreed
                      {((voteData.votes / voteData.numOfNft) * 100).toFixed(0) || 0}%
                    </Text>
                    <Text color={"#D95C74"} type="body1">
                      Disagreed
                      {((voteData.protests / voteData.numOfNft) * 100).toFixed(
                        0
                      ) || 0}
                      %
                    </Text>
                  </Info>
                  <ProgressWrapper>
                    <TotalProgress
                      value={
                        (voteData.votes / voteData.numOfNft) * 100
                          ? (voteData.votes / voteData.numOfNft) * 100
                          : 0
                      }
                      min="0"
                      max="100"
                    />
                    <ProgressValue>
                      <Text color="#EEEEEE" type="body1">
                        {voteData.votes}/{voteData.numOfNft}
                      </Text>
                    </ProgressValue>
                  </ProgressWrapper>
                  <Countdown
                    timeTillDate={data.voteStartTime + data.voteDuration}
                  ></Countdown>
                </VotingWrapper>
                <ButtonGroup>
                  <Button
                    color={colors.background2}
                    width="50%"
                    onClick={() => {
                      props.onCloseModal("delete");
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="#D95C74"
                    width="50%"
                    onClick={() => {
                      props.onCloseModal("stop");
                    }}
                  >
                    Stop voting
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <ScheduleTitle>
                  <img src={clock} alt="clock" />
                  <Text color={colors.text} type="body">
                    Schedule listing
                  </Text>
                </ScheduleTitle>
                <DateGroup>
                  <DateInput>
                    <Text color={colors.text} type="body1">
                      Start date
                    </Text>
                    <input
                      type="datetime-local"
                      onChange={(e) => {
                        setStartTime(e.target.value);
                      }}
                    />
                  </DateInput>
                  <DateInput>
                    <Text color={colors.text} type="body1">
                      End date
                    </Text>
                    <input
                      type="datetime-local"
                      onChange={(e) => {
                        setEndTime(e.target.value);
                      }}
                    />
                  </DateInput>
                </DateGroup>
                <ButtonGroup>
                  <Button color={colors.background2} width="50%" onClick={()=>props.onCloseModal()}>
                    Cancel
                  </Button>
                  <Button
                    color={colors.new_primary}
                    width="50%"
                    onClick={() => {
                      handleVoting();
                    }}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              </>
            )}
          </ModalBody>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default SetVoteModal;
