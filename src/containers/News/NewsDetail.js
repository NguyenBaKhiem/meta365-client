import house from "@Assets/images/house.png";
import Text from "@Components/Text";
import { articleServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMedia } from "react-use";
import {
  BannerImg, Content,
  ContentDetail,
  ContentTitle, ContentWrap,
  DetailContent, NewsImg,
  NewsWrapper,
  SuggestionCard,
  SuggestionGrid,
  SuggestionNews
} from "./StyledNews";

const NewsDetail = () => {
  let { newsId } = useParams();
  const belowSM = useMedia(breakpoints.sm);
  const navigate = useNavigate();
  const [checkedNoData, setCheckedNoData] = useState(false);
  const [articleDetail, setArticleDetail] = useState({});
  const [article, setArticle] = useState();

  const [srcImg, setSrcImg] = useState();
  const convertHTML = (data) => {
    if (data) {
      if (data.indexOf("&lt;") != -1 || data.indexOf("&gt;") != -1) {
        data = data.replaceAll("&gt;", ">");
        data = data.replaceAll("&lt;", "<");
        return data;
      } else {
        return data;
      }
    }
  };
  function getImageFromContent(data) {
    let index = data.indexOf("src=");
    let indexEnd = data.indexOf("width", index);
    data = data.slice(index + 5, indexEnd - 2);
    return data;
  }
  const fetchArticleById = (id) => {
    articleServices
      .getPublicDetailArticle(id)
      .then((res) => {
        res.content = convertHTML(res.content);
        let Img = getImageFromContent(res.content);
        setSrcImg(Img);
        setArticleDetail(res);
      })
      .catch((error) => {
        setCheckedNoData(true);
        navigate("/no-data");
      });
  };
  const fetchArticle = (limit) => {
    articleServices.getPublicArticles({ limit }).then((res) => {
      res.content = convertHTML(res.content);
      setArticle(res.results);
    });
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchArticleById(newsId);
    fetchArticle(2);
  }, [newsId]);
  function slideContent(data) {
    let index;
    data = convertHTML(data);
    if (data) {
      if (data.indexOf("</p>") != -1) {
        index = data.indexOf("</p>");
        data = data.slice(0, index);
      } else {
        data = data.slice(0, data.length);
      }
    }
    return data;
  }
  return (
    <>
      <NewsWrapper>
        <div className="container">
          <BannerImg
            src={
              articleDetail.cover === "no-image" ? house : articleDetail.cover
            }
          />
          <DetailContent>
            <Text color={colors.sub_text} type={"body2"}>
              {articleDetail
                ? moment(articleDetail.updatedAt).format("DD/MM/YYYY, h:mm a")
                : ""}
            </Text>
            <Text color={colors.text} type={"header2"}>
              {articleDetail ? articleDetail.title : ""}
            </Text>
            <ContentDetail
              // id="ContentDetail"
              dangerouslySetInnerHTML={{
                __html: articleDetail ? convertHTML(articleDetail.content) : "",
              }}
            />
          </DetailContent>
          <Text color={colors.text} type={"header2"}>
            Maybe you will like
          </Text>
          <SuggestionNews>
            <SuggestionGrid>
              {article &&
                article.map((item, index) => {
                  let content = slideContent(item.content);
                  return (
                    <Link to={`/news/${item._id}`} key={index}>
                      <SuggestionCard>
                        {belowSM && <NewsImg src={item.cover} />}

                        <ContentWrap style={{ padding: "0" }}>
                          <Text color={colors.sub_text} type={"body2"}>
                            {moment(item.updatedAt).format(
                              "DD/MM/YYYY, h:mm a"
                            )}
                          </Text>
                          <ContentTitle>{item.title}</ContentTitle>
                          <br />
                          <Content
                            dangerouslySetInnerHTML={{
                              __html: content,
                            }}
                          ></Content>
                          <br />
                          <div
                            style={
                              !belowSM
                                ? { position: "absolute", bottom: "15px" }
                                : {}
                            }
                          >
                            <Text color={colors.new_primary} type={"body"}>
                              Read more
                            </Text>
                          </div>
                        </ContentWrap>
                        {!belowSM && <NewsImg src={item.cover} />}
                      </SuggestionCard>
                    </Link>
                  );
                })}
            </SuggestionGrid>
          </SuggestionNews>
        </div>
      </NewsWrapper>
    </>
  );
};

export default NewsDetail;
