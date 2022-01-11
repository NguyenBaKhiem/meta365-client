import prev_icon from "@Assets/images/icon-arrow-left.png";
import next_icon from "@Assets/images/icon-arrow-right.png";
import React, { useEffect, useState } from "react";
import {
  AlignCenter, NavigationButton, Page, StyledTable, TablePagination,
  TableWrapper
} from "./StyledAdminTable";

const AdminTable = (props) => {
  const totalPages = props.pages;
  const [page, setPage] = useState([]);


  const resetPage = () => {
    let arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    setPage(arr);
  };
  useEffect(() => {
    resetPage();
    return () => {
      setPage([]);
    };
  }, [props.activePage,props.pages]);

  
  return (
    <>
      <TableWrapper>
        <StyledTable>{props.children}</StyledTable>
      </TableWrapper>
      <TablePagination>
        <AlignCenter>
          <NavigationButton onClick={() => { props.activePage > 1 && props.pageChange(props.activePage-1) }}>
            <img src={prev_icon} alt=""/>
          </NavigationButton>
          {props.pages < 6 ? (
            page.map((pg, index) => {
              return <Page key={index} style={props.activePage === pg ? {color: "#FFFFFF"} : {color: "#C0C0C0"}} onClick={() => {props.pageChange(pg)}}>{pg}</Page>;
            })
          ) : (
            <>
              <Page style={props.activePage === 1 ? {color: "#FFFFFF"} : {color: "#C0C0C0"}} onClick={() => {props.pageChange(1)}}>1</Page>
              <Page style={props.activePage === 2 ? {color: "#FFFFFF"} : {color: "#C0C0C0"}} onClick={() => {props.pageChange(2)}}>2</Page>
              <Page style={props.activePage === 3 ? {color: "#FFFFFF"} : {color: "#C0C0C0"}} onClick={() => {props.pageChange(3)}}>3</Page>
              <Page>...</Page>
              {props.activePage > 3 && props.activePage < page.length && (
                <>
                  <Page style={{color: "#FFFFFF"}}>{props.activePage}</Page>
                  <Page>...</Page>  
                </>
              )}
              <Page style={props.activePage === page.length ? {color: "#FFFFFF"} : {color: "#C0C0C0"}} onClick={() => {props.pageChange(page.length)}}>{page.length}</Page>
            </>
          )}
          <NavigationButton onClick={() => {props.activePage < props.pages && props.pageChange(props.activePage+1)}}>
            <img src={next_icon} alt="" />
          </NavigationButton>
        </AlignCenter>
      </TablePagination>
    </>
  );
};

export default AdminTable;
