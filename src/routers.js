import Dashboard from "@Containers/Dashboard";
import FAQ from "@Containers/FAQ";
import Home from "@Containers/Home";
import Land from "@Containers/Land";
import LandDetail from "@Containers/Land/LandDetail";
import LandList from "@Containers/Land/LandList";
import ProjectDetail from "@Containers/Land/ProjectDetail";
import Layout from "@Containers/Layout";
import Leaderboard from "@Containers/Leaderboard";
import MarketLand from "@Containers/MarketLand";
import MarketDetail from "@Containers/Marketplace/MarketDetail";
import MarketList from "@Containers/Marketplace/MarketList";
import MyLand from "@Containers/MyLand";
import MyLandList from "@Containers/MyLand/MyLandList";
import News from "@Containers/News";
import NewsDetail from "@Containers/News/NewsDetail";
import NewsList from "@Containers/News/NewsList";
import Profile from "@Containers/Profile";
import React from "react";
import PageNotFoundLand from "./components/PageNotFound/PageNotFoundLand";


const routers = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "", element: <Home /> },
      {
        index: false,
        path: "marketplace",
        element: <MarketList />,
      },
      {
        index: false,
        path: "detail/:detailId",
        element: <MarketDetail />,
      },
      {
        index: false,
        path: "land",
        element: <Land />,
        children: [
          { index: true, path: "", element: <LandList /> },
          {
            index: false,
            path: ":projectPath",
            element: <ProjectDetail />,
          },
          // {
          //   index: true,
          //   path: ":projectPath/:landName",
          //   element: <LandDetail />,
          // },
        ],
      },
      {
        index: false,
        path: "my-land",
        element: <MyLand />,
        children: [
          { index: true, path: "", element: <MyLandList /> },
        ]
      },
      {
        index: false,
        path: "profile",
        element: <Profile />,
      },
      {
        index: false,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        index: false,
        path: "news",
        element: <News />,
        children: [
          { index: true, path: "", element: <NewsList /> },
          { index: false, path: ":newsId", element: <NewsDetail /> },
        ],
      },
      {
        index: false,
        path: "faq",
        element: <FAQ />,
      },
      {
        index: false,
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        index: false,
        path: "market-land",
        element: <MarketLand />,
      },
    ],
  },
  {
    path:"land/:projectPath/:landName",
    element: <LandDetail />,
  },
  {
    path: "/page-not-found",
    element: <PageNotFoundLand />,
  }
];

export default routers;
