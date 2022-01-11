import React, { useState, useMemo } from "react";
import { MarketPlaceContext } from "./Context";
import { Outlet } from "react-router-dom";

const MarketPlace = () => {
  const [marketPlace, setMarketPlace] = useState(
    JSON.parse(localStorage.getItem("marketPlace"))
  );
  const value = useMemo(() => ({ marketPlace, setMarketPlace }), [marketPlace]);
  return (
    <>
      <MarketPlaceContext.Provider value={value}>
        <Outlet />
      </MarketPlaceContext.Provider>
    </>
  );
};

export default MarketPlace;
