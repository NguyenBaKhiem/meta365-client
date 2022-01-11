import { LOADING } from "@Constants/actions/loading";

export function loading() {
  return {
    type: LOADING.SHOW_LOADING,
  };
}

export function unloading() {
  return {
    type: LOADING.HIDE_LOADING,
  };
}
