import hide_icon from "@Assets/images/blue-close-faq.png";
import show_icon from "@Assets/images/blue-open-faq.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import React, { useState } from "react";
import {
  Answer, EndFaq, EndFaqContent, EndFaqHeader, FAQLayout,
  FAQWrapper,
  Flex,
  Icon,
  QuestionBox,
  Title
} from "./StyledFAQ";

const FAQ = () => {
  const [question, setQuestion] = useState(0);
  const [questionActive, setQuestionActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleClick = (index) => {
    let newQuestionActive = [...questionActive];
    newQuestionActive[index] = !newQuestionActive[index];
    setQuestionActive(newQuestionActive);
  };
  let styleAnswerOpen = {
    maxHeight: "500px",
    opacity: "1",
    zIndex:0
  };
  let styleAnswerClose = {
    maxHeight: "0px",
    opacity: 0,
    zIndex:0,
    overFlow:"hidden"

  };
  let styleFlex = {
    display : "flex",
    flexDirection: "column" ,

  }
  

  return (
    <>
      <FAQWrapper>
        <div className="container">
          <FAQLayout>
            <div style={styleFlex}>
              <Title>
                <Text color={colors.text} type={"header3"}>
                  General questions
                </Text>
              </Title>
              <QuestionBox style={{zIndex:"0"}} onClick={() => handleClick(0)}>
                <Flex>
                  <Text
                    style={{ transition: ".5s" }}
                    color={
                      !questionActive[0] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What is Meta365?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[0]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[0]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[0] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Meta365 is a virtual dimension and the exact replica of our
                    real world, where users can own and operate a portfolio of
                    high-quality development properties in Metaverses.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"1"}} onClick={() => handleClick(1)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[1] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What are the advantages of NFT in the process of asset
                    digitalization?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[1]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[1]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[1] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Digitizing assets as NFT brings about many the advantages,
                    including:
                  </Text>
                  <ul>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Easy to manage and execute transactions
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Publish transparent procedures
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Engage all targets
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Simplify and minimize the process of ownership and real
                        estate investment
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Own or co-own simultaneously multiple assets
                      </Text>
                    </li>
                  </ul>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"2"}} onClick={() => handleClick(2)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[2] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What solutions does Meta365 offer?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[2]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[2]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[2] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Meta365 offers multiple real-life solutions, including real
                    estate property tokenization, Metaverse transaction,
                    Contract for Deed (CFD), NFT/VR Marketplace, and independent
                    operation.
                  </Text>
                </Answer>
              </QuestionBox>

              <QuestionBox style={{zIndex:"3"}} onClick={() => handleClick(3)}>
                <Flex>
                  <Text color={
                      !questionActive[3] ? colors.text : colors.new_primary } type={"button"}>
                    What can users benefit from Meta365?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[3]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[3]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[3] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Meta365 shifts people’s minds to another dimension of
                    virtual real estate, where users can easily perceive the
                    reality and simultaneously access the correct information to
                    bring about the transparency and unlimited merging ability
                    of a property, short transaction time, negotiation sessions
                    in VR.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"4"}} onClick={() => handleClick(4)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[4] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What are the opportunities when using Meta365?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[4]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[4]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[4] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    By integrating multiple advanced technologies in its
                    operating system, Meta365 has completely turned the online
                    economy into a virtual one, making a great impact on the
                    real world, as it has helped pave the way for Metaverse and
                    widen the testing scale of NFTs in business.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"5"}} onClick={() => handleClick(5)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[5] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What are the technologies used in Meta365?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[5]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[5]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    
                  ></Icon>
                </Flex>
                <Answer
                  style={questionActive[5] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Applied NFT, advanced image processor and AR/VR 360
                    technology, Meta365 has created a special Metaverse for real
                    estate, supporting advisors in consulting for potential
                    clients and helping users to have an authentic experience in
                    virtual real estate anywhere.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"6"}} onClick={() => handleClick(6)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[6] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What are the characteristics of Meta365’s image processor?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !question[6]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    onClick={() => {
                      setQuestion(7);
                    }}
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      question[6]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    
                  />
                </Flex>
                <Answer
                  style={questionActive[6] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    The characteristics of Meta365 image processor include:
                  </Text>
                  <ul>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Vibrant and authentic experience
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Reliable and exact images of the real world
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Unique, iconic and cannot be copied
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Live feature through Live Camera
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Encourage curiosity of potential buyers
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Prioritize user experience
                      </Text>
                    </li>
                    <li>
                      <Text color={colors.sub_text} type={"body1"}>
                        Users can find information by themselves without
                        cramping details
                      </Text>
                    </li>
                  </ul>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"7"}} onClick={() => handleClick(7)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[7] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What is Meta365 Land?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[7]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[7]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[7] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    Meta365 Land are the real estate properties in Meta365 and
                    operate on smart contracts of Binance under the form of
                    NFTs. Upon investing in a real estate project, Meta365
                    platform allows users to assess and analyze the property’s
                    potential directly.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"8"}} onClick={() => handleClick(8)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[8] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What is the UCC Token?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[8]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[8]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[8] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    UCC Token is the native token that governs the ecosystem of
                    Meta365. The UCC token represents the growth and quality of
                    users within the Metaverse. The process of purchasing or
                    depositing properties will speed up if users own the UCC
                    token. This particular process can last as long as the
                    latest owner wants to exchange his/her NFT to the real
                    property. The exchange fee will be divided among UCC
                    holders.
                  </Text>
                </Answer>
              </QuestionBox>
              <QuestionBox style={{zIndex:"9"}} onClick={() => handleClick(9)}>
                <Flex>
                  <Text
                    color={
                      !questionActive[9] ? colors.text : colors.new_primary
                    }
                    type={"button"}
                  >
                    What is a Contract for Deed (CFD)?
                  </Text>
                  <Icon
                    src={show_icon}
                    style={
                      !questionActive[9]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                  <Icon
                    src={hide_icon}
                    style={
                      questionActive[9]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </Flex>
                <Answer
                  style={questionActive[9] ? styleAnswerOpen : styleAnswerClose}
                >
                  <Text color={colors.sub_text} type={"body1"}>
                    CFD allows users to order the exchange rate of an item
                    without actually owning it. One of the significant benefits
                    of CFD is that users can make profits on a daily basis
                    regardless of the fluctuation of the rate itself, as
                    typically, CFD transactions do not have a certain time
                    frame.
                  </Text>
                </Answer>
              </QuestionBox>
            </div>
            <EndFaq>
              <EndFaqHeader>
                <Text color={"#F5F5F5"} type={"header-faq"}>
                  Still have a question?
                </Text>
              </EndFaqHeader>
              <EndFaqContent>
                <Text color={colors.sub_text} type={"body-faq"}>
                  If you find answer to your question in our FAQ, you can always
                  contact us.
                </Text>
                <Text color={colors.sub_text} type={"body"}>
                  We will answer to you shortly
                </Text>
              </EndFaqContent>
            </EndFaq>
          </FAQLayout>
        </div>
      </FAQWrapper>
    </>
  );
};

export default FAQ;
