import { GET_ARTICLE_ACTION } from "@Constants/actions/article";

export function getArticleRequest(data) {
  return {
    type: GET_ARTICLE_ACTION.REQUEST,
    payload: data
  };
}
export function getArticleSuccess(data) {
  return { type: GET_ARTICLE_ACTION.SUCCESS, payload: data };
}

/*fetch powerSection Fail*/
export function getArticleFailed(data) {
  return { type: GET_ARTICLE_ACTION.FAILED, payload: data };
}
export function getTypeArticle(data) {
  return { type: GET_ARTICLE_ACTION.FETCH_ARTICLE, payload: data };
}
