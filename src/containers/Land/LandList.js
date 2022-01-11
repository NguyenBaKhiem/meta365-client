import ban_icon from "@Assets/images/ban.png";
import Search from "@Components/Search";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import { projectServices } from "@Services";
import { colors } from "@Theme/colors";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "react-use";
import { ProjectContext } from "./context/ProjectContext";
import {
  Card, LandFlex, LandGrid, LandWrapper, Loading,
  NoData
} from "./StyledLand";

const LandList = () => {
  const [page, setPage] = useState(1);
  const [landData, setLandData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { project, setProject } = useContext(ProjectContext);
  const [searchValue, setSearchValue] = useState("");
  const [lastElement, setLastElement] = useState(null);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [projectQuery, setProjectQuery] = useState({});
  const [totalResults, setTotalResults] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },

    500,
    [searchValue]
  );

  useEffect(() => {
    fetchProject({ ...projectQuery, page: pageNum });
  }, [pageNum]);

  const fetchProject = (filter = {}) => {
    dispatch(loading());
    projectServices
      .getProjects({ limit: 10, ...filter, sortBy: "createdAt:desc" })
      .then((res) => {
        const { totalPages, page, results, totalResults } = res;
        dispatch(unloading());
        let all = new Set([...landData, ...results]);
        setLandData([...all]);
        setTotalPages(totalPages);
        setTotalResults(totalResults);
        setPage(page);
      })
      .catch((error) => {
        dispatch(unloading());
      });
  };
  useEffect(() => {
    fetchProject();
  }, []);

  const onSearchName = async () => {
    landData.length = 0;
    setPageNum(1);
    delete projectQuery.page;
    let searchQuery = debouncedValue ? { name: debouncedValue } : {};
    fetchProject(searchQuery);
    if (debouncedValue) setProjectQuery(searchQuery);
  };

  useEffect(() => {
    onSearchName();
  }, [debouncedValue]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const checkOnLoad = () => {
    return pageNum * 10 < totalResults;
  };

  return (
    <>
      <LandWrapper>
        <div className="container">
          <Search
            sort={false}
            onSearch={setSearchValue}
            search={true}
            val={searchValue}
          />
          <div style={{ marginTop: "20px" }}>
            {landData && landData.length > 0 ? (
              <LandGrid>
                {landData.map((prj, index) => {
                  return (
                    <Link
                      to={`/land/${prj.path}`}
                      key={index}
                      onClick={() => {
                        setProject(prj);
                        localStorage.setItem(
                          "selectedProject",
                          JSON.stringify(prj)
                        );
                      }}
                    >
                      <Card>
                        <img src={prj.image} alt="meta365" />
                        <LandFlex className="detail">
                          <div>
                            <Text type={"header2"} color={colors.text_header}>
                              {prj.name}
                            </Text>
                            <Text type={"button"} color={colors.text_body}>
                              {prj.description}
                            </Text>
                          </div>
                        </LandFlex>
                      </Card>
                    </Link>
                  );
                })}
                {checkOnLoad() &&
                  [...Array(2)].map((x, i) => (
                    <div key={i} ref={setLastElement}>
                      <Card i={i}>
                        <Loading />
                        <LandFlex className="detail"></LandFlex>
                      </Card>
                    </div>
                  ))}
              </LandGrid>
            ) : (
              <NoData>
                <img src={ban_icon} alt="met365" />
                <Text color={colors.text_body} type="button">
                  No land to display
                </Text>
              </NoData>
            )}
          </div>
        </div>
      </LandWrapper>
    </>
  );
};

export default LandList;
