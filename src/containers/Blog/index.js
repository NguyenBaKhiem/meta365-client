import ban_icon from "@Assets/images/ban.png";
import ActionSelect from "@Components/ActionSelect";
import AdminFilter from "@Components/AdminFilter";
import AdminTable from "@Components/AdminTable";
import Button from "@Components/Button";
import Notification from "@Components/Notification";
import StatusTag from "@Components/StatusTag";
import Text from "@Components/Text";
import {
  showNotificationError, showNotificationSuccess, showNotificationWarning
} from "@Redux/actions/notification";
import { articleServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import AddNewBlog from "./AddNewBlog";
import EditBlog from "./EditBlog";
import ModalConfirm from "./ModalConfirm";
import ModalCover from "./ModalCover";
import ModalEdit from "./ModalEdit";
import {
  AlignCenter, Center, FlexRight, NoData, TextTitle, Title
} from "./StyledBlog";

const PAGE_SIZE = 20;

const Blog = () => {
  const belowSM = useMedia(breakpoints.sm);
  const dispatch = useDispatch();
  const [articleData, setArticleData] = useState([]);
  const [articleDetail, setArticleDetail] = useState({});
  const article = useSelector((state) => state.article);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogQuery, setBlogQuery] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isDeleteBlog, setIsDeleteBlog] = useState(false);
  const notification = useSelector((state) => state.notification);
  const [showDraft, setShowDraft] = useState(false);
  const [showDraftEdit, setShowDraftEdit] = useState(false);
  const [isPinToTop, setIsPinToTop] = useState(false);
  const [cover, setCover] = useState("");
  const { isShow } = notification;
  const fetchArticles = (filter = {}) => {
    setLoading(true);

    articleServices
      .getArticles({ limit: PAGE_SIZE, ...filter })
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setArticleData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const changePage = (page) => {
    fetchArticles({ page });
    setPage(page);
  };
  const onSearchArticle = async (e) => {
    const searchQuery = e.target.value
      ? {
          title: e.target.value,
        }
      : {};
    setBlogQuery(searchQuery);
    fetchArticles(searchQuery);
  };

  const publicBlog = async (data) => {
    await articleServices
      .postArticle({ ...data, cover: cover })
      .then((res) => {
        if (res.code === 400)
          return dispatch(showNotificationError("Input Invalid"));
        if (res.code === 401)
          return dispatch(showNotificationError("Unauthorized"));
        if (data.status === "private")
          dispatch(showNotificationWarning("Article drafted"));
        else dispatch(showNotificationSuccess("Add article success"));
        setShowModal(false);
      })
      .catch((error) => {
        dispatch(showNotificationError("Add article failed"));
      });
    if (article.typeFetchArticle === "") fetchArticles();
    else fetchArticles({ status: article.typeFetchArticle });
  };
  const updateBlog = async (data) => {
    if (cover === "") {
      setCover("no-image");
    }
    let dataUpdate = {
      title: data.title,
      content: data.content,
      updatedAt: new Date().now,
      status: data.status,
      cover: `${cover === "" ? articleDetail.cover : cover}`,
    };
    await articleServices
      .updateArticleById(data.id, dataUpdate)
      .then((res) => {
        if (res.code === 400)
          return dispatch(showNotificationError("Input Invalid"));
        if (res.code === 401)
          return dispatch(showNotificationError("Unauthorized"));

        if (data.status === "private")
          dispatch(showNotificationWarning("Article drafted"));
        else dispatch(showNotificationSuccess("Update article success"));
        setShowModalEdit(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showNotificationError("Update article failed"));
      });

    if (article.typeFetchArticle === "") fetchArticles();
    else fetchArticles({ status: article.typeFetchArticle });
  };
  const pinToTopBlog = async (id, data) => {
    await articleServices
      .updateArticleById(id, { pinOnTop: data })
      .then((res) => {
        setIsPinToTop(false);
        if (res.code === 400)
          return dispatch(showNotificationError("Input Invalid"));
        if (res.code === 401)
          return dispatch(showNotificationError("Unauthorized"));
        if (data) {
          dispatch(showNotificationSuccess("Pin  article success"));
        } else {
          dispatch(showNotificationSuccess("Unpin article success"));
        }

        if (article.typeFetchArticle === "") fetchArticles();
        else fetchArticles({ status: article.typeFetchArticle });
      })
      .catch((error) => {
        console.log(error);
        dispatch(showNotificationError("Pin article failed"));
      });
  };
  const deleteBlog = async (id) => {
    await articleServices
      .deleteArticleById(id)
      .then((res) => {
        dispatch(showNotificationSuccess("Deleted article success"));
        setIsDelete(false);
        setIsDeleteBlog(false);
      })
      .catch((error) => {
        dispatch(showNotificationError("Deleted article failed"));
      });
    if (article.typeFetchArticle === "") fetchArticles();
    else fetchArticles({ status: article.typeFetchArticle });
  };
  const moveToTrash = async (id, data) => {
    await articleServices
      .updateArticleById(id, data)
      .then((res) => {
        dispatch(showNotificationSuccess("Article move trash "));
        setIsDelete(false);
      })
      .catch((error) => {
        dispatch(showNotificationError("Deleted article failed"));
      });
    if (article.typeFetchArticle === "") fetchArticles();
    else fetchArticles({ status: article.typeFetchArticle });
  };
  useEffect(() => {
    if (articleDetail && isDeleteBlog && articleDetail.status === "deleted") {
      deleteBlog(articleDetail.id);
    }
  }, [isDeleteBlog, articleDetail]);
  useEffect(() => {
    if (articleDetail && isDelete) {
      if (articleDetail.status !== "deleted" && !isDeleteBlog) {
        moveToTrash(articleDetail.id, { status: "deleted", pinOnTop: false });
      }
    }
  }, [isDelete]);
  useEffect(() => {
    if (article.typeFetchArticle === "") fetchArticles();
    else {
      fetchArticles({ status: article.typeFetchArticle });
    }
  }, [article.typeFetchArticle]);
  useEffect(() => {
    if (articleDetail && isPinToTop) {
      pinToTopBlog(articleDetail.id, !articleDetail.pinOnTop);
    }
  }, [isPinToTop]);
  return (
    <>
      <AlignCenter style={{ marginBottom: "32px", marginTop: "30px" }}>
        <Title>Blog</Title>
        <div>
          {isShow && <Notification />}
          <Button
            width={"112px"}
            color={colors.primary}
            onClick={() => {
              setShowDraft(true);
            }}
          >
            Add new
          </Button>
        </div>
      </AlignCenter>
      <AdminFilter onSearch={onSearchArticle} />
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Title
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Author
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Date
                  </Text>
                </AlignCenter>
              </th>
              <th style={{ textAlign: "center" }}>
                <Text color={colors.text_header} type={"button"}>
                  Status
                </Text>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articleData.length > 0 ? (
              articleData.map((article, index) => {
                if (belowSM)
                  return (
                    <tr key={index}>
                      <td>
                        <AlignCenter>
                          <TextTitle>
                            <Text color={colors.text_header} type={"body1"}>
                              {article.title}
                            </Text>
                          </TextTitle>
                        </AlignCenter>
                        <Text color={colors.text_body} type={"body2"}>
                          {moment(article.updatedAt).format("DD/MM/YYYY")}
                        </Text>
                      </td>
                      <td>
                        <Center>
                          <StatusTag status={article.status} />
                        </Center>
                      </td>
                      <td>
                        <Text color={colors.accent} type={"body2"}>
                          {article.author ?? "ADMIN"}
                        </Text>
                      </td>

                      <td>
                        <FlexRight
                          onClick={() => {
                            setArticleDetail(article);
                          }}
                        >
                          <ActionSelect
                            isBlog={true}
                            setIsEdit={setIsEdit}
                            setIsDelete={setIsDelete}
                            isPin={article.pinOnTop ? true : false}
                            isShowPin={
                              articleDetail.status === "public" ? true : false
                            }
                            setIsPinToTop={setIsPinToTop}
                            setShowDraftEdit={setShowDraftEdit}
                            setShowModal={() => {
                              setShowModalEdit(true);
                            }}
                          />
                        </FlexRight>
                      </td>
                    </tr>
                  );
                return (
                  <tr key={index}>
                    <td>
                      <AlignCenter>
                        <TextTitle>
                          <Text color={colors.text_header} type={"body1"}>
                            {article.title}
                          </Text>
                        </TextTitle>
                      </AlignCenter>
                    </td>
                    <td>
                      <Text color={colors.text_header} type={"body1"}>
                        {article.author ?? "ADMIN"}
                      </Text>
                    </td>
                    <td>
                      <Text color={colors.text_header} type={"body1"}>
                        Last Modified <br />
                        {moment(article.updatedAt).format("DD/MM/YYYY, h:mm a")}
                      </Text>
                    </td>
                    <td>
                      <Center>
                        <StatusTag status={article.status} />
                      </Center>
                    </td>
                    <td>
                      <FlexRight
                        onClick={() => {
                          setArticleDetail(article);
                        }}
                      >
                        <ActionSelect
                          isBlog={true}
                          setIsEdit={setIsEdit}
                          setIsDelete={setIsDelete}
                          isPin={article.pinOnTop ? true : false}
                          isShowPin={
                            articleDetail.status === "public" ? true : false
                          }
                          setIsPinToTop={setIsPinToTop}
                          setShowDraftEdit={setShowDraftEdit}
                          setShowModal={() => {
                            setShowModalEdit(true);
                          }}
                        />
                      </FlexRight>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData>
                    <img src={ban_icon} alt="met365" />
                    <Text color={colors.text_body} type="button">
                      No items to display
                    </Text>
                  </NoData>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTable>
      {showModal && (
        <AddNewBlog
          show={showModal}
          onCloseModal={() => {
            setShowModal(false);
          }}
          onSave={publicBlog}
        />
      )}
      {showDraftEdit && (
        <ModalEdit
          imgCover={articleDetail.cover}
          onCloseModal={() => {
            setShowDraftEdit(false);
          }}
          setCover={(e) => setCover(e)}
          nextStep={() => {
            setShowModalEdit(true);
            setShowDraftEdit(false);
          }}
        />
      )}
      {showModalEdit && (
        <EditBlog
          articleDetail={articleDetail}
          show={showModal}
          onCloseModal={() => {
            setShowModalEdit(false);
          }}
          onUpdate={updateBlog}
        />
      )}
      {articleDetail.status === "deleted" && isDelete && (
        <ModalConfirm
          onCloseModal={(value) => {
            setIsShowConfirm(value);
            setIsDelete(value);
          }}
          setIsDeleteBlog={(value) => {
            setIsDeleteBlog(value);
          }}
          titleBlogDelete={articleDetail.title}
        />
      )}
      {showDraft && (
        <ModalCover
          onCloseModal={() => setShowDraft(false)}
          nextStep={() => setShowModal(true)}
          setCover={(e) => setCover(e)}
        />
      )}
    </>
  );
};

export default Blog;
