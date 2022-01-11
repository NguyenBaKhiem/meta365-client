import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const BannerWrapper = styled.div`
    position: relative;
    height: 642px;
    background-color: ${colors.second_bg};
    margin-bottom: 48px;
    border-radius: 24px;    
    @media ${breakpoints.sm} {
        display: none;
    }
`;
export const BannerImg = styled.img`
    width: 100%;
    height: 642px;
    object-fit: cover;
    border-radius: 24px;
    @media ${breakpoints.sm} {
        height: 173px;
    }
`;
export const BannerContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;
export const ContentWrap = styled.div`
    width: 50%;
    padding-bottom: 18px;
    z-index: 2;
    @media ${breakpoints.sm} {
        width: 100%;
    }
`;
export const ContentWrapHeader = styled.div`
    width: 50%;
    background: rgba(18, 26, 56, 0.8);
    overflow-wrap: anywhere;
    width:507px;
    position: absolute;
    opacity: 0.8;
    left : 68px;
    top:360px;
    padding : 16px 24px;
    border-radius: 24px;
    backdrop-filter: blur(15px);
    @media ${breakpoints.sm} {
        width: 100%;
    }
`;
export const NewsWrapper = styled.div`
    display: flex;
    justify-content: center;
  padding-bottom: 120px;
`;
export const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
    @media ${breakpoints.sm} {
        grid-template-columns: 1fr;
        grid-gap:0px;
    }
`;
export const NewsCard = styled.div`
    display:flex;
    justify-content: space-between;
    background: ${colors.third_bg};
    border-radius: 16px;
    padding: 24px;
    height: 100%;
    backdrop-filter: blur(15px);
    position: relative;
    @media ${breakpoints.sm} {
        background-color: transparent;
        justify-content: center;
        flex-direction: column;
    }
`;
export const NewsImg = styled.img`
    width: 40%;
    aspect-ratio: 1/0.7;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 24px;
    /* display: none; */
    @media ${breakpoints.sm} {
        display: block;
        width: 100%;

    }
`;
export const DetailContent = styled.div`
    margin: 48px 0;
`;
export const SuggestionNews = styled.div`
    margin-top: 32px;
    @media ${breakpoints.xs}{
        overflow-x: scroll;
        width : 90vw;
    }
`;
export const SuggestionGrid = styled.div`
    display: flex;
    gap: 24px;
    a{
        flex: 1 1 100%;
    }
    @media ${breakpoints.xs} {
        margin-bottom: 10px;
    }
`;
export const SuggestionCard = styled(NewsCard)`
    @media ${breakpoints.sm} {
        background-color: ${colors.third_bg};
    }
    @media ${breakpoints.xs} {
        width: 70vw;

    }
`;
export const Content = styled.p`
    text-overflow: ellipsis;
    max-width:420px;        
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #C0C0C0;
    p, span{
        font-style: normal !important;
        font-weight: normal !important;
        font-size: 14px !important;
        line-height: 22px !important;
        color: #C0C0C0 !important;
        background: none !important;
    }
    img,table {
        display:none;
    }

    
    @media ${breakpoints.xs} {
        max-width:80vw;
        margin-bottom: 0px;
    }
    @media ${breakpoints.sm} {
        max-width:80vw;
        margin-bottom: 0px;
    }
`;
export const ContentHeader = styled.div`
    text-overflow: ellipsis;
    max-width:420px;        
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #C0C0C0;
    margin-bottom :10px;
    
    @media ${breakpoints.xs} {
        max-width:80vw;
        
    }
    @media ${breakpoints.sm} {
        max-width:80vw;

    }
`;
export const ContentTitle = styled.div`
    text-overflow: ellipsis;
    max-width:420px;        
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #F6F9FF;
    margin-bottom :10px;
    
`;
export const ContentDetail = styled.div`
        color:${colors.sub_text} !important;
        line-height: 24px;  
`;
export const Slide = styled.div`
    ul{
        right: -382px;
        bottom: 8px;
        opacity: 1;
    }
`;
export const ImgSlide = styled.img`
    height : 642px;
    width : 100%;
    object-fit: cover;
    border-radius: 24px;
    
`;
export const SwapSlide = styled.div`
    z-index:1;
`;
export const HeaderNews = styled.div`
    position : relative;

`;