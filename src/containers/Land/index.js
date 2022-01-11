import React, { useState, useMemo } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { Outlet } from "react-router-dom";

const Land = () => {
  const [project, setProject] = useState(
    JSON.parse(localStorage.getItem("selectedProject"))
  );
  const value = useMemo(() => ({ project, setProject }), [project]);
  return (
    <>
      <ProjectContext.Provider value={value}>
        <Outlet />
      </ProjectContext.Provider>
    </>
  );
};

export default Land;
