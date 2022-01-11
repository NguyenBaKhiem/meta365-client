import house from "@Assets/images/house.png";
import Text from "@Components/Text";
import { articleServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useMedia } from "react-use";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  BannerContent,
  BannerWrapper,
  Content,
  ContentHeader,
  ContentTitle,
  ContentWrap,
  ContentWrapHeader,
  HeaderNews,
  ImgSlide,
  NewsCard,
  NewsGrid,
  NewsImg,
  NewsWrapper,
  Slide,
  SwapSlide,
} from "./StyledNews";
const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsDataHeader, setNewsDataHeader] = useState();
  const [articlePinTop, setArticlePinTop] = useState();
  const belowSM = useMedia(breakpoints.sm);
  const [activeSlide, setActiveSlide] = useState(0);
  const convertHTML = (data) => {
    if (data.indexOf("&lt;") != -1 || data.indexOf("&gt;") != -1) {
      data = data.replaceAll("&gt;", ">");
      data = data.replaceAll("&lt;", "<");
      return data;
    } else {
      return data;
    }
  };
  const fetchArticle = () => {
    articleServices.getPublicArticles().then((res) => {
      setNewsData(res.results);
      setNewsDataHeader(res.results[activeSlide]);
      articlePinOnTop(res.results);
    });
  };
  const articlePinOnTop = (data) => {
    let articlePinOnTop = [];
    if (data.length > 0) {
      data.map((item) => {
        if (item.pinOnTop) {
          articlePinOnTop.push(item);
        }
      });
    }
    setArticlePinTop(articlePinOnTop);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => {
      setActiveSlide(current);
      if (articlePinTop) {
        let newData = articlePinTop[current];
        newData.content = slideContent(articlePinTop[current].content);
        setNewsDataHeader(newData);
      }
    },
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  function slideContent(data) {
    let index;
    data = convertHTML(data);
    if (data.indexOf("</p>") != -1) {
      index = data.indexOf("</p>");
      data = data.slice(0, index);
    } else {
      data = data.slice(0, data.length);
    }
    return data;
  }

  return (
    <>
      <NewsWrapper>
        <div className="container">
          <BannerWrapper>
            <Link to={`/news/${newsDataHeader ? newsDataHeader._id : ""}`}>
              <HeaderNews>
                <SwapSlide>
                  <Slide>
                    <Slider {...settings}>
                      {articlePinTop &&
                        articlePinTop.map((item, index) => (
                          <div key={index}>
                            <ImgSlide
                              src={
                                item.cover === "no-image" ? house : item.cover
                              }
                            />
                          </div>
                        ))}
                    </Slider>
                  </Slide>
                </SwapSlide>

                <ContentWrapHeader>
                  <Text color={colors.sub_text} type={"body2"}>
                    {newsDataHeader
                      ? moment(newsDataHeader.updatedAt).format(
                          "DD/MM/YYYY, h:mm a"
                        )
                      : "23 Sep 2021"}
                  </Text>
                  <Text color={colors.text} type={"header2"}>
                    {newsDataHeader ? newsDataHeader.title : ""}
                  </Text>
                  <ContentHeader
                    id="ContentDetail"
                    dangerouslySetInnerHTML={{
                      __html: newsDataHeader
                        ? slideContent(newsDataHeader.content)
                        : "",
                    }}
                  ></ContentHeader>
                  <Text color={colors.new_primary} type={"button"}>
                    Read more
                  </Text>
                </ContentWrapHeader>
              </HeaderNews>
            </Link>
            <BannerContent></BannerContent>
          </BannerWrapper>
          <NewsGrid>
            {newsData.map((item, index) => {
              let content = slideContent(item.content);
              return (
                <Link to={`/news/${item._id}`} key={index}>
                  <NewsCard key={index}>
                    {belowSM && (
                      <NewsImg
                        src={item.cover === "no-image" ? house : item.cover}
                      />
                    )}

                    <ContentWrap style={{ padding: "0" }}>
                      <Text color={colors.sub_text} type={"body2"}>
                        {moment(item.updatedAt).format("DD/MM/YYYY, h:mm a")}
                      </Text>
                      <ContentTitle>{item.title}</ContentTitle>
                      <Content
                        dangerouslySetInnerHTML={{ __html: content }}
                      ></Content>
                      <div style={ !belowSM?  { position: "absolute", bottom:"15px" }:{}}>
                        <Text color={colors.new_primary} type={"body"}>
                          Read more
                        </Text>
                      </div>
                    </ContentWrap>

                    {!belowSM && (
                      <NewsImg
                        src={item.cover === "no-image" ? house : item.cover}
                      />
                    )}
                  </NewsCard>
                </Link>
              );
            })}
          </NewsGrid>
        </div>
      </NewsWrapper>
    </>
  );
};

export default NewsList;
