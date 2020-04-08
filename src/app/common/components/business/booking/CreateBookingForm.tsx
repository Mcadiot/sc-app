import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { createBooking } from "../../../../stores/booking/BookingAction";
import { BookingData } from "../../../class/BookingData";
import { getDurations } from "../../../utils/BookingUtils";
import { isValidString } from "../../../utils/FormUtils";
import { Button } from "../../technical/button/Button";
import { ErrorBox } from "../../technical/ErrorBox";
import { ButtonArea } from "../../technical/layout/ButtonArea";

interface IProps {
  minDuration: number;
  step: number;
  possibleMaxDuration: number;
  onCancel: () => void;
}

interface DispatchProps {
  doCreateBooking: (data: BookingData) => void;
}

const FormContent = styled.div`
  min-height: 17.5em;

  .label {
    margin-bottom: 1em;
  }
`;

const RequiredSpan = styled.span`
  color: ${(props) => props.theme.colors.requiredIconColor};
`;

export type CreateBookingFormProps = IProps & DispatchProps;

const CreateBookingForm: React.FC<CreateBookingFormProps> = (props) => {
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState(props.minDuration);
  const [showError, setShowError] = React.useState(false);
  const durations = getDurations(props.minDuration, props.possibleMaxDuration, props.step);

  const onClickSelect = (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
    const target = event.target as any;
    if (target && target.options && target.options.length > 5) {
      target.size = 5;
    }
  };

  const resizeSelect = (event: React.FocusEvent<HTMLSelectElement>) => {
    const target = event.target;
    if (target) {
      target.size = 0;
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    if (target) {
      target.size = 0;
    }
    setDuration(+target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const onValidate = () => {
    if (isValidString(name)) {
      props.doCreateBooking({ name: name, duration: duration });
      props.onCancel();
    } else {
      setShowError(true);
    }
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <form>
      <FormContent>
        {showError && <ErrorBox onClose={closeError}>Le nom doit être renseigné</ErrorBox>}
        <label>
          <div className="label" id="label-nom">
            Nom (3 caractères minimum, 500 maximum)<RequiredSpan>*</RequiredSpan>:
          </div>
          <textarea
            maxLength={500}
            name="name"
            minLength={3}
            rows={5}
            value={name}
            onChange={handleNameChange}
            required={true}
            aria-labelledby="label-nom"
            aria-required={true}
          />
        </label>
        <br />
        <label>
          <div className="label" id="label-time">
            Temps <RequiredSpan>*</RequiredSpan>:
          </div>
          {props.possibleMaxDuration !== 0 ? (
            <select
              id="time"
              name="time"
              onMouseDown={onClickSelect}
              onBlur={resizeSelect}
              onChange={selectChange}
              value={duration}
              required={true}
              aria-labelledby="label-time"
              aria-required={true}
            >
              {durations.map((duration) => {
                return (
                  <option value={duration} key={duration}>
                    {duration} minutes
                  </option>
                );
              })}
            </select>
          ) : (
            "Aucune disponibilité"
          )}
        </label>
      </FormContent>
      <ButtonArea>
        <Button type="button" onClick={onValidate} disabled={props.possibleMaxDuration === 0}>
          Créer
        </Button>
        <Button type="button" onClick={props.onCancel}>
          Annuler
        </Button>
      </ButtonArea>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doCreateBooking: (data: BookingData) => dispatch(createBooking(data)),
});

export default connect(null, mapDispatchToProps)(CreateBookingForm);
