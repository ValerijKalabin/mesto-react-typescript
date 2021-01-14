import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import { useState } from 'react';
import IPlace from '../interfaces/IPlace';
import PopupWithForm from './PopupWithForm';

type PlacePopupProps = {
  isOpen: boolean
  onClose(event: SyntheticEvent): void
  onAddPlace(place: IPlace): void
  submitButtonCaption: string
};

const AddPlacePopup: FunctionComponent<PlacePopupProps> = ({
  isOpen,
  onClose,
  onAddPlace,
  submitButtonCaption
}): ReactElement => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [isValidName, setValidityName] = useState<boolean>(false);

  const [link, setLink] = useState<string>('');
  const [errorLink, setErrorLink] = useState<string>('');
  const [isValidLink, setValidityLink] = useState<boolean>(false);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
    setErrorName(event.target.validationMessage);
    setValidityName(event.target.validity.valid);
  }

  function handleChangeLink(event: React.ChangeEvent<HTMLInputElement>): void {
    setLink(event.target.value);
    setErrorLink(event.target.validationMessage);
    setValidityLink(event.target.validity.valid);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    if(isOpen) {
      setName('');
      setErrorName('');
      setValidityName(false);
      setLink('');
      setErrorLink('');
      setValidityLink(false);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      submitButtonCaption={submitButtonCaption}
      isDisabledSubmitButton={!isValidName || !isValidLink}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input ${errorName && 'popup__input_type_error'}`}
        type="text"
        name="placename"
        value={name}
        onChange={handleChangeName}
        placeholder="Название"
        required
        maxLength={30}
      />
      <span className={`popup__error ${errorName && 'popup__error_visible'}`}>{errorName}</span>
      <input
        className={`popup__input ${errorLink && 'popup__input_type_error'}`}
        type="url"
        name="placelink"
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        required
      />
      <span className={`popup__error ${errorLink && 'popup__error_visible'}`}>{errorLink}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
