import React from "react";
import styled from "styled-components";
import { Booking } from "../../../class/Booking";
import { Resource } from "../../../class/Resource";
import { getPossibleMaxDuration } from "../../../utils/BookingUtils";
import { Content } from "../../technical/layout/Content";
import { ModalTitle } from "../../technical/ModalTitle";
import { StyledModal } from "../../technical/StyledModal";
import CreateBookingForm from "./CreateBookingForm";

interface IProps {
  isOpen: boolean;
  resource: Resource;
  bookings: Booking[];
  onClose: () => void;
}

const customStyles = {
  content: {
    minHeight: "20em",
    width: "20em",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalContent = styled.div`
  select,
  textarea {
    min-height: 2.5em;
    border: ${(props) => props.theme.form.inputBorder};
    font: ${(props) => props.theme.font.font};
    color: ${(props) => props.theme.colors.globalColor};
    resize: none;
    width: 100%;
    margin-bottom: 1em;
  }

  textarea {
    width: 98%;
  }
`;

export type CreateBookingModalProps = IProps;

export const CreateBookingModal: React.FC<CreateBookingModalProps> = ({ isOpen, resource, bookings, onClose }) => {
  const possibleMaxDuration = getPossibleMaxDuration(resource, bookings);
  return (
    <StyledModal isOpen={isOpen} ariaHideApp={false} style={customStyles} contentLabel="Nouvelle réservation">
      <Content>
        <ModalTitle>Nouvelle réservation</ModalTitle>
        <ModalContent>
          <CreateBookingForm
            minDuration={resource.minimumBookingDuration}
            step={resource.bookingDurationStep}
            possibleMaxDuration={possibleMaxDuration}
            onCancel={onClose}
          />
        </ModalContent>
      </Content>
    </StyledModal>
  );
};
