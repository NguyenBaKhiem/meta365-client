import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LoadingGif from "../../assets/images/loadingitem.gif";
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  max-width: 300px;
  img {
    max-width: 100%;
  }
`;

export default function LoadingModal() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  if (isLoading) {
    return (
      <ModalWrapper>
        <Modal>
          <img src={LoadingGif} alt="loading" />
        </Modal>
      </ModalWrapper>
    );
  }
  return <> </>;
}
