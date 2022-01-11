import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LoadingBounce } from "@Components/Loading";
import routers from "./routers";
import privateRoute from "./private";
import "./App.css";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound";
import ScrollToTop from "./ScrollToTop";
import { RoleBasedRouting } from "./components/RoleBasedRouting";
import Forbidden from "./components/Forbidden";

const App = () => {
  const isAdmin = useSelector(
    (state) =>
      (state.account.role === "godAccount" ||
        state.account.role === "editCreator") &&
      state.account.status === 1
  );
  const isLogin = useSelector((state) => state.account.isLogin);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingBounce />}>
        <Routes>
          {routers.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index}>
                {route.children &&
                  route.children.map((child, i) => {
                    return isLogin===false &&
                      (child.path === "profile" ||
                        child.path === "dashboard") ? (
                      <Route path="403" element={<Forbidden text="403" /> } key={i} />
                    ) : (
                      <Route
                        index={child.index}
                        path={child.path}
                        element={child.element}
                        key={i}
                      >
                        {child.children &&
                          child.children.map((item, j) => {
                            return (
                              <Route
                                index={item.index}
                                path={item.path}
                                element={item.element}
                                key={j}
                              />
                            );
                          })}
                      </Route>
                    );
                  })}
              </Route>
            );
          })}
          {isAdmin &&
            privateRoute.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={
                    <RoleBasedRouting roles={route.roles}>
                      {route.element}
                    </RoleBasedRouting>
                  }
                  key={index}
                >
                  {route.children &&
                    route.children.map((child, i) => {
                      return (
                        <Route
                          index={child.index}
                          path={child.path}
                          element={
                            <RoleBasedRouting roles={child.roles}>
                              {child.element}
                            </RoleBasedRouting>
                          }
                          key={i}
                        >
                          {child.children &&
                            child.children.map((item, j) => {
                              return (
                                <Route
                                  index={item.index}
                                  path={item.path}
                                  element={
                                    <RoleBasedRouting roles={item.roles}>
                                      {item.element}
                                    </RoleBasedRouting>
                                  }
                                  key={j}
                                />
                              );
                            })}
                        </Route>
                      );
                    })}
                </Route>
              );
            })}
          <Route path="403" element={<Forbidden text="403" />} />
          <Route path="*" element={<Forbidden text="404" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
