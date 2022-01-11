import arrow_down from "@Assets/images/arrow-down.png";
import search_icon from "@Assets/images/search.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import {
  GroupInput, Icon, Img, SearchButton,
  SearchInput, SearchWrap, SortOption, SortSelect, SortText, StyledSearch
} from "./StyledSearch";


const Search = ({ val, onSearch, onSort, sortList, ...props }) => {
  const [showSort, setShowSort] = useState(false);
  const [itemSelected,setItemSelected] =useState("");
  const [itemSelect,setItemSelect] =useState("");


  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".sort")) {
        setShowSort(false);
      }
    });
    return ()=>{
      window.removeEventListener("click", function () {});
    }
  }, []);
  const setNameItem = (data) =>{
    if(data==="updatedAt:asc") setItemSelected("Oldest")
    if(data==="updatedAt:desc") setItemSelected("New")
    if(data==="price:desc") setItemSelected("Price: High to Low")
    if(data==="price:asc") setItemSelected("Price: Low to High")
  }
  return (
    <StyledSearch>
      {props.search && (
        <GroupInput>
          <Icon src={search_icon} />
          <SearchInput
            value={val}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            placeholder={props.placeholder ? props.placeholder : "Search..."}
          />
        </GroupInput>
      )}

      {props.sort && (
        <SearchWrap>
          <SearchButton
            className="sort"
            onClick={() => {
              setShowSort(!showSort);
            }}
          >
            <SortText>{`${itemSelected !== "" ? itemSelected : "Sort by" }`}</SortText>
            <Img src={arrow_down} />
            {showSort && (
              <SortSelect>
                {sortList &&
                  sortList.map((item, index) => {
                    return (
                      <SortOption key={index}
                        style= {
                          itemSelect===item.sortField ? {
                            background: "rgba(66, 133, 244, 0.2)"
                          } : {}
                        }
                        onClick={() => {
                          onSort(item.sortField);
                          setNameItem(item.sortField);
                          setItemSelect(item.sortField)
                        }}
                      >
                        <Text color={colors.text} type="body1">
                          {item.name}
                        </Text>
                      </SortOption>
                    );
                  })}
              </SortSelect>
            )}
          </SearchButton>
        </SearchWrap>
      )}
    </StyledSearch>
  );
};

export default Search;
