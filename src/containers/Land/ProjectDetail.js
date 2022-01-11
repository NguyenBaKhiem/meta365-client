import React, { useContext } from "react";
import Iframe from "react-iframe";
import { ProjectContext } from "./context/ProjectContext";
import { LandDetailWrapper } from "./StyledLand";

const ProjectDetail = () => {
  const { project } = useContext(ProjectContext);
  return (
    <>
      <LandDetailWrapper>
        <Iframe
          url={`${project.media}`}
          width="100%"
          height="831px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          scrolling="auto"
          allowFullScreen="true"
          position="relative"
        />
      </LandDetailWrapper>
    </>
  );
};

export default ProjectDetail;
