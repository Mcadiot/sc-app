import React from "react";
import Modal from "react-modal";
import { Button } from "./Button";
import { ButtonArea } from "./ButtonArea";
import { Content } from "./Content";
import { ModalTitle } from "./ModalTitle";
import { StyledModal } from "./StyledModal";

interface IProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content: JSX.Element | string;
  title: JSX.Element | string;
  label: string;
  style?: Modal.Styles;
}

const customStyles: Modal.Styles = {
  content: {
    minHeight: "10em",
    width: "20em",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export type CreateBookingModalProps = IProps;

export const Confirm: React.FC<CreateBookingModalProps> = ({ ...props }) => {
  let style = customStyles;
  if (props.style) {
    style = props.style;
  }

  return (
    <StyledModal isOpen={props.isOpen} ariaHideApp={false} style={style} contentLabel={props.label}>
      <Content>
        <ModalTitle>{props.title}</ModalTitle>
        <div>
          {props.content}
          <ButtonArea>
            <Button type="button" onClick={props.onConfirm}>
              Oui
            </Button>
            <Button type="button" onClick={props.onCancel}>
              Annuler
            </Button>
          </ButtonArea>
        </div>
      </Content>
    </StyledModal>
  );
};
