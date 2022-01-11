import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "@Components/Header";
import Sidebar from "@Components/Sidebar";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

const Wrapper = styled.div`
  display: flex;
  background-color: ${colors.background};
  min-height: 100vh;
  @media ${breakpoints.sm} {
    background-color: ${colors.second_bg};
  }
`;
const ContentContainer = styled.div`
  padding: 0 70px 40px 70px;
  @media ${breakpoints.sm}{
    padding: 24px;
  }
`;
const Container = styled.div`
  width: calc(100% - 290px);
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
const NavWrapper = styled.div`
  width: 253px;
  @media ${breakpoints.sm}{
    width: auto;
  }
`;

const AdminLayout = () => {
  return (
    <>
      <Wrapper>
        <NavWrapper>
          <Sidebar />
        </NavWrapper>
        <Container>
          <Header isAdmin={true} />
          <ContentContainer>
            <Outlet />
          </ContentContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default AdminLayout;
