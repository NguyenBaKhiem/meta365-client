import search_icon from "@Assets/images/icon-search.png";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SearchGroup,
  SearchIcon,
  SearchInput, TableFilter
} from "./StyledAdminFilter";

const AdminFilter = ({ onSearch, placeholder = "Search", ...props }) => {
  const [selectAction, setSelectAction] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.indexOf("land") != -1) {
      setIsPending(true);
    }
  }, [pathname]);
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".filter-btn")) {
        setSelectFilter(false);
      }
      if (!e.target.closest(".apply-btn")) {
        setSelectAction(false);
      }
    });
    return () => {
      window.removeEventListener("click", function () {});
    }
  }, []);

  return (
    <>
      <TableFilter>
        <SearchGroup>
          <SearchInput
            placeholder={placeholder}
            type="text"
            onChange={onSearch}
          />
          <SearchIcon src={search_icon} />
        </SearchGroup>
      </TableFilter>
    </>
  );
};

export default AdminFilter;
