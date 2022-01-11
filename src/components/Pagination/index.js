import React, { useEffect, useState } from "react";
import {
  NavigationButton,
  PaginationContainer,
  PaginationItem,
} from "./StyledPagination";
import prev_icon from "@Assets/images/arrow-left.png";
import next_icon from "@Assets/images/arrow-right.png";

const Pagination = (props) => {
  const [pageData, setPageData] = useState([]);
  const totalPages = props.pages;
  
  useEffect(() => {
    function getPage(page) {
      let newData = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i === props.activePage) {
          newData.push({ page: i, active: true });
        } else {
          newData.push({ page: i, active: false });
        }
      }
      setPageData(newData);
    }
    getPage(props.activePage);
  }, [props.activePage, totalPages]);
  return (
    <>
      <PaginationContainer>
        <NavigationButton>
          <img
            src={prev_icon}
            onClick={() =>
              props.activePage > 1 && props.pageChange(props.activePage - 1)
            }
            alt="Back"
          />
        </NavigationButton>
        {totalPages < 6
          ? pageData.map((item) => {
              return (
                <PaginationItem
                  key={item.page}
                  style={
                    item.active
                      ? { background: "#4285F4" }
                      : { background: "rgba(255, 255, 255, 0.1)" }
                  }
                  onClick={() => props.pageChange(item.page)}
                >
                  {item.page}
                </PaginationItem>
              );
            })
          : (
            <>
              <PaginationItem style={ item.active ? { background: "#00B67F" } : { background: "#1E2027" } } onClick={() => props.pageChange(1)} >1</PaginationItem>
              <PaginationItem style={ item.active ? { background: "#00B67F" } : { background: "#1E2027" } } onClick={() => props.pageChange(2)} >2</PaginationItem>
              <PaginationItem style={ item.active ? { background: "#00B67F" } : { background: "#1E2027" } } onClick={() => props.pageChange(3)} >3</PaginationItem>
              <Page>...</Page>  
              {props.activePage > 3 && props.activePage < page.length && (
                <>
                  <PaginationItem style={{ background: "#00B67F" }} >{props.activePage}</PaginationItem>
                  <Page>...</Page>  
                </>
              )}
              <PaginationItem style={ item.active ? { background: "#00B67F" } : { background: "#1E2027" } } onClick={() => props.pageChange(pageData.length)} >pageData.length</PaginationItem>
            </>
          )}
        <NavigationButton>
          <img
            src={next_icon}
            onClick={() =>
              props.activePage < props.pages &&
              props.pageChange(props.activePage + 1)
            }
            alt="Next"
          />
        </NavigationButton>
      </PaginationContainer>
    </>
  );
}

export default Pagination;
