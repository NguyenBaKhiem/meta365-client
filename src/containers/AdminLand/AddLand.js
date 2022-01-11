import React from "react";
import LandForm from "./LandForm";
import { Title } from "./StyledAdminLand";


const AddLand = () => {
  return (
    <>
      <Title>Add Land</Title>
      <LandForm action="add" />
    </>
  );
};

export default AddLand;
