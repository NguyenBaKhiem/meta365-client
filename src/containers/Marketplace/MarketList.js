import filter from "@Assets/images/filter.png";
import Search from "@Components/Search";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import { marketplaceServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { contract } from "@Utils/contract";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce, useMedia } from "react-use";
import { changeSaleType } from "../../redux/actions/market";
import { colors } from "../../theme/colors";
import Filter from "../MyLand/Filter";
import LoadingCard from "../MyLand/LoadingCard";
import { ButtonFilter, Main } from "../MyLand/StyledMyLand";
import BatchBuy from "./BatchBuy";
import BatchOffer from "./BatchOffer";
import Market from "./Market";
import {
  MarketGrid,
  MarketplaceWrapper,
  MultipleOffer,
  NoData, PageHeading, SearchWrap
} from "./StyledMarketplace";

const PAGE_SIZE = 20;

// to-do: correct chain Id following user login

const MarketList = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [marketQuery, setMarketQuery] = useState({});
  const land = useSelector((state) => state.land);
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [showMulti, setShowMulti] = useState("")

  const dataFilter = [
    {
      id: "marketSale",
      name: "Market",
    },
    {
      id: "auction",
      name: "Regular Auction",
    },
    {
      id: "reverseAuction",
      name: "Reverse Auction",
    },
    {
      id: "holding",
      name: "Holding",
    },
  ];
  const dataPrice = [
    {
      id: "BUSD",
      name: "BUSD",
      unit: contract.BUSD_ADDRESS,
    },
    {
      id: "UCC",
      name: "UCC",
      unit: contract.TOKEN_ADDRESS,
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const dispatch = useDispatch();
  const sortList = [
    // { name: "Price: Low to High", sortField: "price:asc" },
    // { name: "Price: High to Low", sortField: "price:desc" },
    // { name: "Ending soon", sortField: "endedSale:desc" },
    { name: "Oldest", sortField: "updatedAt:asc" },
    { name: "New", sortField: "updatedAt:desc" },
  ];

  useEffect(() => {
    onSearchName();
  }, [debouncedValue]);

  const fetchMarketplaceAll = (filter = {}) => {
    dispatch(loading())
    marketplaceServices
      .getMarketPlaceAll({
        chainId: 97,
        limit: PAGE_SIZE,
        landId: land.landId,
        ...filter,
      })
      .then((res) => {
        dispatch(unloading())
        const { totalPages, page, results, totalResults } = res;
        setTotalPages(totalPages);
        setPage(page);
        setTotalResults(totalResults)
        let all = new Set([...marketData, ...results]);
        setMarketData([...all]);
      })
      .catch((error) => {
        dispatch(unloading())
      });
  };

  useEffect(() => {
    let query = {
      ...marketQuery,
      page: pageNum,
    };
    if (selectedType === "") {
      fetchMarketplaceAll(query);
    } else {
      fetchMarketplaceAll({ ...query, types: selectedType });
    }
    setMarketQuery(query);
  }, [pageNum]);

  const onSearchName = async (e) => {
    marketData.length = 0;
    setPageNum(1);
    delete marketQuery.page;
    let searchQuery = {
      ...marketQuery,
      name: debouncedValue,
    };
    if (debouncedValue === "") searchQuery = {};

    if (selectedType === "") {
      fetchMarketplaceAll(searchQuery);
    } else {
      const typeQuery = selectedType ? { types: selectedType } : {};
      fetchMarketplaceAll({ ...searchQuery, ...typeQuery });
    }
    setMarketQuery(searchQuery);
  };

  const sortByPrice = (type) => {
    marketData.length = 0;
    setPageNum(1);
    delete marketQuery.page;
    const sortQuery = {
      ...marketQuery,
      sortBy: type,
    };
    if (selectedType === "") {
      fetchMarketplaceAll(sortQuery);
      setMarketQuery(sortQuery);
    } else {
      const typeQuery = selectedType ? { types: selectedType } : {};
      fetchMarketplaceAll({ ...sortQuery, ...typeQuery });
      setMarketQuery({ ...sortQuery, ...typeQuery });
    }
  };

  const handleMinMax = () => {
    // const query = {
    //   ...marketQuery,
    //   minPrice: Number(minPrice),
    //   maxPrice: Number(maxPrice)
    // };
    // if (selectedType === "") {
    //   fetchMarketplaceAll(query);
    // } else {
    //   fetchMarketplaceAll({ ...query, types: selectedType });
    // }
  };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const onSearchProject = (arr) => {
    let searchQuery = {};
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      searchQuery = {
        ...marketQuery,
        projectIds: projects,
      };
    }
    if (selectedType === "") {
      fetchMarketplaceAll(searchQuery);
    } else {
      const typeQuery = selectedType ? { types: selectedType } : {};
      fetchMarketplaceAll({ ...searchQuery, ...typeQuery });
    }
    setMarketQuery(searchQuery);
  };

  const filterAll = async (arr) => {
    let query;
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      query = {
        ...marketQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        projectIds: projects,
      };
    } else {
      query = {};
      query = {
        ...marketQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      };
    }
    if (selectedType === "") {
      fetchMarketplaceAll(query);
    } else {
      const typeQuery = selectedType ? { types: selectedType } : {};
      fetchMarketplaceAll({ ...query, ...typeQuery });
    }
    setMarketQuery(query);
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

  const handleSaleType = (type, unit) => {
    marketData.length = 0;
    setPageNum(1);
    delete marketQuery.page;
    let query = "";
    let types = "";
    let units = "";
    for (let item of type) {
      types += item + ",";
    }
    for (let item of unit) {
      units += item + ",";
    }
    types = types.slice(0, types.length - 1);
    units = units.slice(0, units.length - 1);
    setSelectedType(types);
    if (type === "") {
      if (unit === "") fetchMarketplaceAll();
      else {
        query = {
          ...marketQuery,
          unit: units.toLowerCase(),
        };
        fetchMarketplaceAll(query);
        setMarketQuery(query);
      }
    } else {
      if (unit === "") {
        query = {
          ...marketQuery,
          types: types,
        };
        fetchMarketplaceAll(query);
        setMarketQuery(query);
      } else {
        query = {
          ...marketQuery,
          types: types,
          unit: units.toLowerCase(),
        };
        fetchMarketplaceAll(query);
        setMarketQuery(query);
      }
    }
    dispatch(changeSaleType({ saleType: type, unit: unit }));
  };

  const checkOnLoad = () => {
    return pageNum*PAGE_SIZE < totalResults
  }

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
            filterByProject={false}
            filterByPrice={false}
            filterByStatus={true}
            filterByUnits={true}
            name="marketplace"
            data={dataFilter}
            dataPrice={dataPrice}
            handleMin={setMinPrice}
            handleMax={setMaxPrice}
            filterPrice={handleMinMax}
            filterProjects={onSearchProject}
            filterAll={filterAll}
            onClose={setShowFilter}
            handleClick={(type, unit) => {
              handleSaleType(type, unit);
              selectedItem.length = 0;
            }}
          />
        </div>

        <Main>
          <SearchWrap>
            <PageHeading>
              <h2>Market</h2>
              {/* {
                selectedType==="auction" && <MultipleOffer onClick={()=>setShowMulti("Offer")}>
                  Multiple Offer ({selectedItem.length})
                </MultipleOffer>
              } */}
              {
                (selectedType==="marketSale" || selectedType==="reverseAuction") && <MultipleOffer onClick={()=>setShowMulti("Buy")}>
                  Multiple Buy ({selectedItem.length})
                </MultipleOffer>
              }
            </PageHeading>
            <Search
              search={true}
              sort={true}
              val={searchValue}
              onSearch={setSearchValue}
              onSort={sortByPrice}
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
          {marketData && marketData.length > 0 ? (
            <>
              <Market
                data={marketData}
                handleSelectItem={handleSelectItem}
                selectedItem={selectedItem}
                type={selectedType}
              />
              <div style={{ marginTop: "20px" }}>
                <MarketGrid>
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
            </>
          ) : (
            <NoData>
              <Text color={colors.text_header} type="button">
                No items to display
              </Text>
            </NoData>
          )}
        </Main>
        {
          showMulti === "Offer" && (
            <BatchOffer 
              onCloseModal={()=>setShowMulti("")}
              selectedItem={selectedItem}
              handleDelete={handleDelete}
            />
          )
        }
        {
          showMulti === "Buy" && (
            <BatchBuy 
              onCloseModal={()=>setShowMulti("")}
              selectedItem={selectedItem}
              handleDelete={handleDelete}
            />
          )
        }
      </MarketplaceWrapper>
    </>
  );
};

export default MarketList;
