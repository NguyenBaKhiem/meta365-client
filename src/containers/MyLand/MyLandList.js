import filter from "@Assets/images/filter.png";
import Search from "@Components/Search";
import { loading, unloading } from "@Redux/actions/loading";
import { nftServices } from "@Services/nftServices";
import breakpoints from "@Theme/breakpoints";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce, useMedia } from "react-use";
import BatchSell from "./BatchSell";
import CardDetail from "./Card";
import Filter from "./Filter";
import LoadingCard from "./LoadingCard";
import NoNFT from "./NoData";
import {
  ButtonFilter,
  Grid,
  Header,
  Main, MultipleSell, MyLandWrapper,
  PageHeading
} from "./StyledMyLand";

const MyLandList = () => {
  const dataFilter = [
    {
      id: "holding",
      name: "Holding"
    },
    {
      id: "marketSale",
      name: "Market"
    },
    {
      id: "auction",
      name: "Regular Auction"
    },
    {
      id: "reverseAuction",
      name: "Reverse Auction"
    },
    {
      id: "voting",
      name: "Voting"
    }
  ];
  const belowSM = useMedia(breakpoints.sm);
  const [myLandData, setMyLandData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [lastElement, setLastElement] = useState(null);
  const [selectedType, setSelectedType] = useState("holding");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [myLandQuery, setMyLandQuery] = useState({});
  const [projectsData, setProjectsData] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const [totalResults, setTotalResults] = useState(0);
  const sortList = [
    // { name: "Price: Low to High", sortField: "price:asc" },
    // { name: "Price: High to Low", sortField: "price:desc" },
    { name: "Oldest", sortField: "landCreatedAt:asc" },
    { name: "New", sortField: "landCreatedAt:desc" }
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
    if (pageNum > 1) {
      let query = "";
      if (!selectedType) {
        query = {
          ...myLandQuery,
          page: pageNum
        };
        return fetchOwnedDataScroll(query);
      }
      if (selectedType === "holding") {
        query = {
          ...myLandQuery,
          page: pageNum
        };
        fetchOwnedDataScroll(query);
      } else if (selectedType === "voting") {
        query = {
          ...myLandQuery,
          page: pageNum,
          inVoting: true
        };
        fetchOwnedDataScroll(query);
      } else {
        query = {
          ...myLandQuery,
          page: pageNum,
          saleType: selectedType
        };
        fetchDataSellingScroll(query);
      }
    }
  }, [pageNum]);

  // useEffect(() => {
  //   setMyLandData([]);
  //   setPageNum(1);
  // }, [selectedType]);

  // useEffect(() => {
  //   fetchAllProjects();
  // }, []);

  const fetchDataSellingScroll = (filter = {}) => {
    dispatch(loading())
    nftServices
      .getNFTOnSale({ limit: 20, ...filter })
      .then((res) => {
        dispatch(unloading())
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setTotalResults(res.totalResults)
      })
      .catch((error) => {
        dispatch(unloading())
      });
  };

  const fetchOwnedDataScroll = (filter = {}) => {
    dispatch(loading())
    nftServices
      .getOwnNFTs({ limit: 20, ...filter })
      .then((res) => {
        dispatch(unloading())
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setTotalResults(res.totalResults)
      })
      .catch((error) => {
        dispatch(unloading())
      });
  };

  const onSearchName = async () => {
    myLandData.length = 0;
    setPageNum(1)
    delete myLandQuery.page;
    let searchQuery = debouncedValue ? { keyword: debouncedValue } : {};
    if (debouncedValue) setMyLandQuery({ ...myLandQuery, ...searchQuery });
    else delete myLandQuery.keyword;
    if (selectedType === "holding" || selectedType === undefined)
      fetchOwnedDataScroll({ ...myLandQuery, ...searchQuery });
    else if (selectedType === "voting")
      fetchOwnedDataScroll({ ...myLandQuery, ...searchQuery, inVoting: true });
    else fetchDataSellingScroll({...myLandQuery, ...searchQuery, saleType: selectedType })
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

  const sortByPrice = (field) => {
    setPageNum(1)
    myLandData.length = 0;
    delete myLandQuery.page;
    let sortQuery = "";
    if (selectedType === "holding" || selectedType === undefined) {
      sortQuery = {
        ...myLandQuery,
        sortBy: field
      };
      fetchOwnedDataScroll(sortQuery);
      setMyLandQuery({ ...sortQuery, sortBy: field });
    } else if (selectedType === "voting") {
      sortQuery = {
        ...myLandQuery,
        sortBy: field,
        inVoting: true
      };
      fetchOwnedDataScroll(sortQuery, { inVoting: true });
      setMyLandQuery({ ...sortQuery, sortBy: field });
    } else {
      sortQuery = {
        ...myLandQuery,
        sortBy: field,
        saleType: selectedType
      };
      fetchDataSellingScroll(sortQuery);
      setMyLandQuery({ ...sortQuery, sortBy: field });
    }
    setMyLandQuery({ sortBy: field });
  };
  const handleMinMax = () => {
    // const query = {
    //   ...landQuery,
    //   minPrice: Number(minPrice),
    //   maxPrice: Number(maxPrice),
    // };
    // if (selectedType === "holding") {
    //   fetchOwnedData(query);
    // } else if (selectedType === "voting")
    //   fetchOwnedData({ ...query, inVoting: true });
    // else {
    //   fetchDataSelling({ saleType: selectedType, ...query });
    // }
  };
  const filterProjects = (arr) => {
    let searchQuery = {};
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      // searchQuery = { ...myLandQuery, projectIds: projects };
      if (selectedType === "holding" || selectedType === undefined)
        fetchOwnedDataScroll(searchQuery);
      else if (selectedType === "voting")
        fetchOwnedDataScroll({ ...searchQuery, inVoting: true });
      else fetchDataSellingScroll(searchQuery);
      setMyLandQuery({ ...myLandQuery, projectIds: projects });
    } else {
      fetchOwnedDataScroll();
    }
  };
  const filterAll = async (arr) => {
    // let query;
    // if (arr.length > 0) {
    //   let projects = "";
    //   for (let item of arr) {
    //     projects += item + ",";
    //   }
    //   projects = projects.slice(0, projects.length - 1);
    //   query = {
    //     ...landQuery,
    //     minPrice: Number(minPrice),
    //     maxPrice: Number(maxPrice),
    //     projectIds: projects,
    //   };
    // } else {
    //   query = {};
    //   query = {
    //     ...landQuery,
    //     minPrice: Number(minPrice),
    //     maxPrice: Number(maxPrice),
    //   };
    // }
    // if (selectedType === "holding") {
    //   fetchOwnedData(query);
    // } else if (selectedType === "voting")
    //   fetchOwnedData({ ...query, inVoting: true });
    // else {
    //   fetchDataSelling({ saleType: selectedType, ...query });
    // }
    // setMyLandQuery(query);
  };

  const handleType = (filter) => {
    setPageNum(1);
    myLandData.length = 0;
    delete myLandQuery.page;
    let query = "";
    !filter.saleType
      ? setSelectedType("holding")
      : setSelectedType(filter.saleType);
    if (filter.saleType === "" || filter.saleType === undefined);
    else if (filter.saleType === "holding") fetchOwnedDataScroll({ ...myLandQuery });
    else if (filter.saleType === "voting") {
      query = {
        inVoting: true
      };
      fetchOwnedDataScroll({ ...myLandQuery, ...query });
    } else {
      query = {
        ...filter
      };
      fetchDataSellingScroll({ ...myLandQuery, ...query });
    }
  };
  const handleSelectItem = (item, checked) => {

    let ckList = [...selectedItem]
    if (checked) {
      ckList = [...ckList, item];
    } else {
      ckList = ckList.filter((x) => x.id !== item.id);
    }
    ckList = [...new Set(ckList)];
    setSelectedItem(ckList);
  };

  
  const handleDelete = (id) => {
    if (selectedItem.length > 0) {
      setSelectedItem(selectedItem.filter((i) => i.id !== id));
    }
  };

  const checkOnLoad = () => {
    return pageNum*20 < totalResults
  }
  return (
    <>
      <MyLandWrapper>
        <div
          style={
            belowSM && !showFilter
              ? { display: "none" }
              : { display: "block", width: "300px" }
          }
        >
          <Filter
            filterByProject={false}
            filterByPrice={false}
            filterByStatus={true}
            name="my-land"
            data={dataFilter}
            handleMin={setMinPrice}
            handleMax={setMaxPrice}
            filterPrice={handleMinMax}
            filterProjects={filterProjects}
            filterAll={filterAll}
            onClose={setShowFilter}
            handleClick={(filter) => {
              handleType(filter);
            }}
            projectsData={projectsData}
          />
        </div>
        <Main>
          <Header>
            <PageHeading>
              <h2>My land</h2>
              {selectedType === "holding" || selectedType === "" ? (
                <MultipleSell onClick={() => setShowModal(true)}>
                  Multiple sell ({selectedItem.length})
                </MultipleSell>
              ) : (
                <div></div>
              )}{" "}
            </PageHeading>
            <Search
              sort={true}
              search={true}
              val={searchValue}
              onSearch={setSearchValue}
              onSort={sortByPrice}
              sortList={sortList}
            />
          </Header>

          {belowSM && (
            <ButtonFilter onClick={() => setShowFilter(!showFilter)}>
              <div>
                <img src={filter} alt="" />
              </div>
              <span>Filter</span>
            </ButtonFilter>
          )}
          {myLandData && myLandData.length > 0 ? (
            <Grid>
              {myLandData &&
                myLandData.map((item, i) => {
                  return (
                    <CardDetail
                      key={i}
                      buttonName="DETAILS"
                      data={item}
                      id={item.nftId}
                      handleSelectItem={handleSelectItem}
                      selectedItem={selectedItem}
                    />
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
            </Grid>
          ) : (
            <NoNFT />
          )}
        </Main>
        {showModal && (
          <BatchSell
            onCloseModal={() => setShowModal(false)}
            selectedItem={selectedItem}
            handleDelete={handleDelete}
          />
        )}
      </MyLandWrapper>
    </>
  );
};

export default MyLandList;
