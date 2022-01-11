import React from "react";
import ProjectForm from "./ProjectForm";
import { Title } from "./StyledAdminProject";

const AddProject = () => {
  return (
    <>
      <Title style={{marginTop: "40px"}}>Add Project</Title>
      <ProjectForm action="add" />
    </>
  );
};

export default AddProject;
