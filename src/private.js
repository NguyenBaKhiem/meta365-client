import React, { lazy } from "react";
import AdminLayout from "@Containers/AdminLayout";
import Blog from "@Containers/Blog";
import AdminLand from "@Containers/AdminLand";
import AdminProject from "@Containers/AdminProject";
import AdminAccount from "@Containers/AdminAccount";
import AllAccount from "@Containers/AdminAccount/AllAccount";
import AllBlockedAccount from "@Containers/AdminAccount/AllBlockedAccount";

import AllLand from "@Containers/AdminLand/AllLand";
import AddLand from "@Containers/AdminLand/AddLand";
import EditLand from "@Containers/AdminLand/EditLand";
import AllProjects from "@Containers/AdminProject/AllProjects";
import AddProject from "@Containers/AdminProject/AddProject";
import EditProject from "@Containers/AdminProject/EditProject";
import PostedLand from "@Containers/AdminLand/PostedLand";
import MintNft from "./containers/MintNft";

const routers = [
  {
    path: "/admin",
    element: <AdminLayout />,
    roles: ["godAccount", "editCreator"], 
    children: [
      { index: true, roles: ["godAccount", "editCreator"],path: "", element: <Blog /> },
      {
        index: false,
        path: "project",
        roles: ["godAccount", "editCreator"],
        element: <AdminProject />,
        children: [
          { index: true, roles: ["godAccount", "editCreator"], path: "", element: <AllProjects /> },
          { index: false, roles: ["godAccount", "editCreator"], path: "add", element: <AddProject /> },
          { index: false, roles: ["godAccount", "editCreator"], path: "edit/:id", element: <EditProject /> }
        ]
      },
      {
        index: false,
        path: "land",
        roles: ["godAccount", "editCreator"],
        element: <AdminLand />,
        children: [
          { index: true, roles: ["godAccount", "editCreator"], path: "", element: <AllLand /> },
          { index: false, roles: ["godAccount", "editCreator"], path: "add", element: <AddLand /> },
          { index: false, roles: ["godAccount", "editCreator"], path: "edit/:id", element: <EditLand /> },
          { index: false, roles: ["godAccount", "editCreator"], path: "posted", element: <PostedLand /> }
        ]
      },
      {
        index: false,
        path: "mint",
        roles: ["godAccount"],
        element: <MintNft />,
      },
      {
        index: false,
        path: "account",
        roles: ["godAccount"],
        element: <AdminAccount />,
        children: [
          { index: true, roles: ["godAccount"], path: "", element: <AllAccount /> },
          { path: "blocked", roles: ["godAccount"], element: <AllBlockedAccount /> }
        ]
      }
    ]
  }
];

export default routers;
