import React from "react";

import { useSelector } from "react-redux";

export const GrantPermission = (requestedRoles) => {
  const myRole = useSelector((state) => state.account.role);
  return requestedRoles && requestedRoles.includes(myRole);
};

export function RoleBasedRouting({ roles, children }) {
  return GrantPermission(roles) ? children : null;
}

export const UnlockAccess = ({ children, request }) => {
  const permission = GrantPermission(request);
  return <>{permission && children}</>;
};
