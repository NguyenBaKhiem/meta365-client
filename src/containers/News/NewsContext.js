import { createContext } from "react";
export const NewsContext = createContext({
  news: {},
  setNew: () => null
});
