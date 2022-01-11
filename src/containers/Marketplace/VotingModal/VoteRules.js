import Text from "@Components/Text";
import React from "react";
import { colors } from "../../../theme/colors";
import { Rules, VoteRulesBox, VoteRulesTitle, VoteRulesWrapper } from "./StyledVoting";

const VoteRules = () => {
  return (
    <>
      <VoteRulesWrapper>
        <VoteRulesTitle>
          <Text color={colors.new_primary} type="body">Voting Rules</Text>
        </VoteRulesTitle>
        <VoteRulesBox className="rules">
          <Text color={colors.text_header} type="body">
            Vote Rules
          </Text>
          <Rules>
            <li>
              <Text color={colors.text_header} type="body2">
                The land will be divided into NFTs and sell to many users. Once
                an user wants to purchase the land, the current owner will
                create a voting poll.
              </Text>
            </li>
            <li>
              <Text color={colors.text_header} type="body2">
                If 51% of the total users vote Agree, the land will be sold to
                that user. Other users will receive the cashback as the
                proposing price.
              </Text>
            </li>
            <li>
              <Text color={colors.text_header} type="body2">
                Users who do not participate in the voting are considered to
                vote Disagree.
              </Text>
            </li>
          </Rules>
        </VoteRulesBox>
      </VoteRulesWrapper>
    </>
  );
};

export default VoteRules;
