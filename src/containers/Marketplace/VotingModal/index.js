import close_icon from "@Assets/images/close-modal.png";
import { loading, unloading } from "@Redux/actions/loading";
import { votingServices } from "@Services";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Countdown from "./CountDown";
import {
  Flex, FormWrapper, GroupButton, Info, LandImage, Modal, ModalBody, ModalHeader, ModalWrapper, ProgressValue, ProgressWrapper, TotalProgress, VotingDetail, VotingWrapper
} from "./StyledVoting";
import VoteRules from "./VoteRules";
import Text from "@Components/Text";

const VotingModal = ({ data, ...props }) => {
  const dispatch = useDispatch()
  const details = [
    { field: "Map Code", content: data.landCode },
    { field: "Project ID", content: data.delegate },
    {
      field: "Investor",
      content: data.totalOwner,
    },
    {
      field: "Address",
      content: data.location,
    },
  ];
  const [isVoted, setIsVoted] = useState(false);
  const [voteData, setVoteData] = useState({});
  const account = useSelector((state) => state.account);
  const fetchVote = async () => {
    dispatch(loading())
    const res = await votingServices.getVote(data.delegate);
    for (let item of res.votesDetail) {
      if (item.who.toLowerCase() === account.address) {
        setIsVoted(true);
        break;
      }
    }
    setVoteData(res);
  };

  fetchVote().then(dispatch(unloading())).catch(dispatch(unloading()))
  
  useEffect(() => {
    if (data) {
      fetchVote();
    }
  }, []);
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };
  return (
    <>
      <ModalWrapper>
        <Modal>
          <ModalHeader>
            <Text color={colors.text_header} type="header2">
              Vote
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
              <LandImage src={data.thumbnail} alt="land" />
              <div>
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
            <VotingWrapper>
              <Info>
                <Text color={colors.new_primary} type="body1">
                  Agreed
                  {((voteData.votes / voteData.numOfNft) * 100).toFixed(0)}%
                </Text>
                <Text color={"#D95C74"} type="body1">
                  Disagreed
                  {((voteData.protests / voteData.numOfNft) * 100).toFixed(0)}%
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
            <FormWrapper>
              <VoteRules />
              <Info>
                <Text color={colors.sub_text} type="body">
                  Purchase price
                </Text>
                <Text
                  color={colors.text_header}
                  type="body"
                  customStyle="font-weight: 700;"
                >
                  {voteData ? voteData.cashback * voteData.numOfNft : 0}{" "}
                  {CheckTypePrice(data)}
                </Text>
              </Info>
              <Info>
                <Text color={colors.sub_text} type="body">
                  Cashback
                </Text>
                <Text
                  color={colors.accent}
                  type="body"
                  customStyle="font-weight: 700;"
                >
                  {voteData ? voteData.cashback : 0} {CheckTypePrice(data)}
                </Text>
              </Info>
              <GroupButton>
                {isVoted ? (
                  <Button color={colors.new_button} disabled={true}>
                    Voted
                  </Button>
                ) : (
                  <>
                    <Button
                      color={colors.background2}
                      className="disagree"
                      onClick={() => {
                        props.onCloseModal("disagree");
                      }}
                    >
                      Disagree
                    </Button>
                    <Button
                      color={colors.new_button}
                      onClick={() => {
                        props.onCloseModal("agree");
                      }}
                    >
                      Agree
                    </Button>
                  </>
                )}
              </GroupButton>
            </FormWrapper>
          </ModalBody>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default VotingModal;
