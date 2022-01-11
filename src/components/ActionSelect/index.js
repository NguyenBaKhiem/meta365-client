import dots_icon from "@Assets/images/dots.png";
import more_icon from "@Assets/images/more.png";
import breakpoints from "@Theme/breakpoints";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import SetVoteModal from "../SetVoteModal";
import ConfirmVotingModal from "../SetVoteModal/ConfirmVotingModal";
import { Option, OptionList, SelectWrapper, ShowIcon } from "./StyledSelected";

const ActionSelect = (props) => {
  const account = useSelector(state => state.account)
  const [showAction, setShowAction] = useState(false);
  const belowSM = useMedia(breakpoints.sm);
  const [showVoting, setShowVoting] = useState("");
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".action-btn")) {
        setShowAction(false);
      }
    });
    return () => {
      window.removeEventListener("click", function () {});
    };
  }, []);

  return (
    <>
      <SelectWrapper>
        <div className="action-btn">
          {belowSM ? (
            <ShowIcon
              src={more_icon}
              onClick={() => setShowAction(!showAction)}
            />
          ) : (
            <ShowIcon
              src={dots_icon}
              onClick={() => setShowAction(!showAction)}
            />
          )}
        </div>

        {showAction && (
          <OptionList>
            {props.isBlog ? (
              <Option
                onClick={() => {
                  props.setIsEdit(true);
                  props.setShowDraftEdit(true);
                }}
              >
                Edit
              </Option>
            ) : (
              <Link to={`edit/${props.id}`}>
                <Option>Edit</Option>
              </Link>
            )}
            {props.isBlog ? (
              <Option
                onClick={() => {
                  props.setIsDelete(true);
                }}
              >
                Delete
              </Option>
            ) : (
              <Option onClick={() => props.handleDelete(props.id)}>
                Delete
              </Option>
            )}
            {props.isBlog && props.isShowPin && (
              <Option
                onClick={() => {
                    props.setIsPinToTop(true);
                }}
              >
                {!props.isPin ? "Pin to" : "Unpin to"}
              </Option>
            )}

            {/* <Option>Draft</Option>

            <Option>Pin to</Option> */}
            {props.hasVoting && account.role==="godAccount" && (
              <Option
                onClick={() => {
                  setShowVoting("voting");
                }}
              >
                Voting
              </Option>
            )}
            {props.hasDraft && (
              <Option
                onClick={() => {
                  props.setShowDraft();
                }}
              >
                Draft
              </Option>
            )}
          </OptionList>
        )}

        {showVoting === "voting" && (
          <SetVoteModal onCloseModal={setShowVoting} data={props.voteData} />
        )}
        {showVoting === "delete" && (
          <ConfirmVotingModal
            onCloseModal={setShowVoting}
            isDelete={true}
            data={props.voteData}
          />
        )}
        {showVoting === "stop" && (
          <ConfirmVotingModal
            onCloseModal={setShowVoting}
            isDelete={false}
            data={props.voteData}
          />
        )}
      </SelectWrapper>
    </>
  );
};

export default ActionSelect;
