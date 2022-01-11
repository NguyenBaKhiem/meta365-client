import { landServices } from "@Services/landServices";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LandForm from "./LandForm";
import { Title } from "./StyledAdminLand";

const EditLand = () => {
  const param = useParams();
  const [landId, setLandId] = useState(param.id);
  const [loading, setLoading] = useState(false);
  const [landDetail, setLandDetail] = useState(null);

  useEffect(() => {
    setLoading(true);
    landServices
      .getLandDetails(landId)
      .then((res) => {
        setLandDetail(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Title>Edit</Title>
      <LandForm action="edit" landData={landDetail} />
    </>
  );
};

export default EditLand;
