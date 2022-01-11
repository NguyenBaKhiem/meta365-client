import { projectServices } from "@Services/projectServices";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Title } from "./StyledAdminProject";

const EditProject = () => {
  const param = useParams();
  const [projectId, setProjectId] = useState(param.id);
  const [loading, setLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);

  useEffect(() => {
    setLoading(true);
    projectServices
      .getProjectDetails(projectId)
      .then((res) => {
        setProjectDetail(res)
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Title style={{marginTop: "40px"}}>Edit</Title>
      <ProjectForm action="edit" projectData={projectDetail} />
    </>
  );
};

export default EditProject;
