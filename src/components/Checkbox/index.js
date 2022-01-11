import React, { useEffect, useState } from "react";
import { CheckboxLabel, CheckboxWrapper, Checked } from "./StyledCheckbox";
import check_icon from "@Assets/images/check.png";
import uncheck_icon from "@Assets/images/uncheck.png";

const Checkbox = ({checked = false, onClick, ...props }) => {
  return (
    <>
      <CheckboxWrapper>
        {checked ? (
          <Checked
            src={check_icon}
            onClick={()=>{onClick()}}
          />
        ) : (
          <Checked
            src={uncheck_icon}
            onClick={()=>onClick()}
          />
        )}

        <CheckboxLabel>{props.children}</CheckboxLabel>
      </CheckboxWrapper>
    </>
  );
};

export default Checkbox;
