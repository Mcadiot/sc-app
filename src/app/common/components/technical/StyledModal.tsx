import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ReactModalAdapter: React.FC<any> = ({ className, ...props }) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return <Modal portalClassName={className} className={contentClassName} overlayClassName={overlayClassName} {...props} />;
};

export const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0.75);
  }

  &__content {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    outline: none;
    padding: 20px;
    @media screen and (max-width: 350px) {
      width: 17em !important;
    }
  }
`;
