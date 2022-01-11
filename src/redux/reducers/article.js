import { GET_ARTICLE_ACTION } from "@Constants/actions/article";

const defaultState = {
    results: [],
    page: 1,
    limit: 1, 
    totalPages: 1, 
    totalResults: 0, 
    errorMessage: null,
    typeFetchArticle:""
};

const getArticles = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTICLE_ACTION.SUCCESS:
          return { ...state, ...action.payload};
        case GET_ARTICLE_ACTION.FAILED:
          return { ...state, ...defaultState, errorMessage: action.payload };
        case GET_ARTICLE_ACTION.FETCH_ARTICLE:
          return { ...state, typeFetchArticle: action.payload };
        default:
          return state;
      }
};
export default getArticles;
