import { takeLatest, put, call } from "@redux-saga/core/effects";
import { GET_ARTICLE_ACTION } from "@Constants/actions/article";
import {
  getArticleFailed,
  getArticleSuccess
} from "@Redux/actions/article";
import { articleServices } from "@Services";

export const articleSagas = [
  takeLatest(GET_ARTICLE_ACTION.REQUEST, getArticleRequest)
];

function* getArticleRequest(params) {
  try {
    const response = yield call(articleServices.getArticles, params);
    let { error, data } = response;
    if (error) {
      yield put(getArticleFailed(data));
      return;
    }
    yield put(getArticleSuccess(data));
  } catch (ex) {
    console.error(ex);
    yield put(getArticleFailed(ex.message));
  }
}
