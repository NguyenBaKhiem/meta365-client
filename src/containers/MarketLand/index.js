import filter from "@Assets/images/filter.png";
import Button from "@Components/Button";
import Card from "@Components/Card";
import Search from "@Components/Search";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError
} from "@Redux/actions/notification";
import { landServices } from "@Services/landServices";
import { projectServices } from "@Services/projectServices";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { utils } from "@Utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce, useMedia } from "react-use";
import { changeLand } from "../../redux/actions/land";
import { NoData } from "../Marketplace/StyledMarketplace";
import Filter from "../MyLand/Filter";
import LoadingCard from "../MyLand/LoadingCard";
import { ButtonFilter, Main, PageHeading } from "../MyLand/StyledMyLand";
import {
  Amount,
  InfoDetail,
  InfoHeader,
  MarketGrid,
  MarketplaceWrapper,
  SearchWrap
} from "./StyledMarketLand";


const MarketLand = () => {
  const [landData, setLandData] = useState([]);
  const belowSM = useMedia(breakpoints.sm);
  const [lastElement, setLastElement] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [landType, setLandType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [landQuery, setLandQuery] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const dispatch = useDispatch();

  const sortList = [
    { name: "Price: Low to High", sortField: "price:asc" },
    { name: "Price: High to Low", sortField: "price:desc" },
    { name: "Oldest", sortField: "updatedAt:asc" },
    { name: "New", sortField: "updatedAt:desc" },
  ];
  const dataFilter = [
    {
      id: "single",
      name: "Single lands",
    },
    {
      id: "bundle",
      name: "Bundles",
    },
    {
      id: "voting",
      name: "Voting",
    },
  ];
  const [debouncedValue, setDebouncedValue] = useState("");
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    500,
    [searchValue]
  );

  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    onSearchName();
  }, [debouncedValue, landType]);

  useEffect(() => {
    let query = "";
    if (landType === "") {
      query = {
        ...landQuery,
        page: pageNum,
      };
      fetchLandsScroll(query);
      setLandQuery(query);
    } else {
      query = {
        ...landQuery,
        page: pageNum,
        type: landType,
      };
      fetchLandsScroll(query);
      setLandQuery(query);
    }
  }, [pageNum]);

  const fetchLandsScroll = (filter) => {
    dispatch(loading());
    landServices
      .getLands(filter)
      .then((res) => {
        dispatch(unloading());
        let all = new Set([...landData, ...res.results]);
        setTotalResults(res.totalResults);
        setLandData([...all]);
      })
      .catch((err) => {
        dispatch(unloading());
        console.log(err);
      });
  };


  const fetchAllProjects = (filter = {}) => {
    dispatch(loading());
    projectServices
      .getProjects(filter)
      .then((res) => {
        dispatch(unloading());
        setProjectsData(res.results);
      })
      .catch((err) => {
        dispatch(unloading());
        console.log(err);
      });
  };
  const filterProjects = (arr) => {
    setPageNum(1);
    landData.length = 0;
    delete landQuery.page;
    let searchQuery = {};
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      searchQuery = { projectIds: projects };
      fetchLandsScroll({ ...landQuery, ...searchQuery });
      setLandQuery({ ...landQuery, ...searchQuery });
    } else {
      delete landQuery.projectIds;
      fetchLandsScroll({ ...landQuery });
    }
  };
  const sortLands = (field) => {
    setPageNum(1);
    landData.length = 0;
    delete landQuery.page;
    const sortQuery = { ...landQuery, sortBy: field };
    fetchLandsScroll(sortQuery);
    setLandQuery({ ...landQuery, sortBy: field });
  };
  const onSearchName = async () => {
    landData.length = 0;
    setPageNum(1);
    delete landQuery.page;
    if(!debouncedValue) delete landQuery.landCode
    let searchQuery = debouncedValue ? { landCode: debouncedValue } : {};
    const landTypeQuery = landType ? { type: landType } : {};
    fetchLandsScroll({...landQuery, ...searchQuery, ...landTypeQuery });
    setLandQuery({ ...searchQuery, ...landTypeQuery });
    
  };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );
  const handleMinMax = () => {
    landData.length = 0;
    setPageNum(1);
    delete landQuery.page;
    if (minPrice <= maxPrice) {
      const query = {
        ...landQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      };
      if (landType === "") {
        fetchLandsScroll(query);
        setLandQuery(query);
      } else {
        fetchLandsScroll({ ...query, types: landType });
        setLandQuery({ ...query, types: landType });
      }
    } else {
      dispatch(showNotificationError("Invalid Input Price"));
    }
  };
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

  const handleType = (type) => {
    landData.length = 0;
    setPageNum(1);
    delete landQuery.page;
    let query = "";
    if (type !== "") {
      query = {
        ...landQuery,
        type: type,
      };
      fetchLandsScroll(query);
      setLandQuery(query);
    }
    if (type === "") {
      delete landQuery.type;
      fetchLandsScroll({ ...landQuery });
    }
  };

  const checkOnLoad = () => {
    return pageNum * 10 < totalResults;
  };
  return (
    <>
      <MarketplaceWrapper>
        <div
          style={
            belowSM && !showFilter
              ? { display: "none" }
              : { display: "block", width: "300px" }
          }
        >
          <Filter
            filterByProject={true}
            filterByPrice={true}
            filterByStatus={true}
            projectsData={projectsData}
            filterProjects={filterProjects}
            handleMin={setMinPrice}
            handleMax={setMaxPrice}
            filterPrice={handleMinMax}
            onClose={setShowFilter}
            data={dataFilter}
            handleClick={(type) => {
              handleType(type);
            }}
            name="land"
          />
        </div>

        <Main>
          <SearchWrap>
            <PageHeading>
              <h2>Market Lands</h2>
            </PageHeading>
            <Search
              search={true}
              sort={true}
              val={searchValue}
              onSearch={setSearchValue}
              onSort={sortLands}
              sortList={sortList}
            />
          </SearchWrap>

          {belowSM && (
            <ButtonFilter onClick={() => setShowFilter(!showFilter)}>
              <div>
                <img src={filter} alt="" />
              </div>
              <span>Filter</span>
            </ButtonFilter>
          )}
          {landData && landData.length > 0 ? (
            <div style={{ marginTop: "20px" }}>
              <MarketGrid>
                {landData &&
                  landData.map((item, index) => {
                    return (
                      <Card image={item.thumbnail} key={index}>
                        <InfoHeader>
                          <Text type={"button"} color={colors.text_header}>
                            {`${item.landCode}`}
                          </Text>
                          <Amount>
                            <Text type={"body2"} color={colors.accent}>
                              {item.numOfNft + "NFT"}
                            </Text>
                          </Amount>
                        </InfoHeader>
                        <InfoDetail>
                          <Text type={"body2"} color={colors.sub_text}>
                            Price
                          </Text>
                          <Text type={"body2"} color={colors.text}>
                            {utils.toDollar(item.price)}
                          </Text>
                        </InfoDetail>
                        <InfoDetail>
                          <Text type={"body2"} color={colors.sub_text}>
                            Project
                          </Text>
                          <Text type={"body2"} color={colors.text}>
                            {item.projectName}
                          </Text>
                        </InfoDetail>
                        <Link to={`/marketplace`} style={{ marginTop: "6px" }}>
                          <Button
                            width={"100%"}
                            style={{ marginTop: "20px" }}
                            color={colors.new_button}
                            onClick={() =>
                              dispatch(changeLand({ landId: item.id }))
                            }
                          >
                            SHOW NFTS
                          </Button>
                        </Link>
                      </Card>
                    );
                  })}
                {checkOnLoad() &&
                  [...Array(10)].map((x, i) =>
                    i === 9 ? (
                      <div ref={setLastElement} key={i}>
                        <LoadingCard i={i} />
                      </div>
                    ) : (
                      <div key={i}>
                        <LoadingCard i={i} />
                      </div>
                    )
                  )}
              </MarketGrid>
            </div>
          ) : (
            <NoData>
              <Text color={colors.text_header} type="button">
                No items to display
              </Text>
            </NoData>
          )}
        </Main>
      </MarketplaceWrapper>
    </>
  );
};

export default MarketLand;
