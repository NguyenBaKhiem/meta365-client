import { all } from "redux-saga/effects";
import { articleSagas } from "./article";
import { accountSagas } from "./account";

export default function* rootSaga() {
  yield all([ ...accountSagas]);
}
