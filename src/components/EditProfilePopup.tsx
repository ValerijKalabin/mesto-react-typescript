import React, { ReactElement, SyntheticEvent } from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import IUser from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';

type ProfilePopupProps = {
  isOpen: boolean
  onClose(event: SyntheticEvent): void
  onUpdateUser(profile: IProfile): void
  submitButtonCaption: string
};

const EditProfilePopup: React.FunctionComponent<ProfilePopupProps> = ({
  isOpen,
  onClose,
  onUpdateUser,
  submitButtonCaption
}): ReactElement => {
  const currentUser: IUser = React.useContext<IUser>(CurrentUserContext);

  const [username, setUsername] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [isValidUsername, setValidityUsername] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<string>('');
  const [isValidDescription, setValidityDescription] = useState<boolean>(false);

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
    setErrorUsername(event.target.validationMessage);
    setValidityUsername(event.target.validity.valid);
  }

  function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
    setErrorDescription(event.target.validationMessage);
    setValidityDescription(event.target.validity.valid);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    onUpdateUser({ username, description });
  }

  React.useEffect(() => {
    if(isOpen) {
      setUsername(currentUser.name);
      setErrorUsername('');
      setValidityUsername(true);
      setDescription(currentUser.about);
      setErrorDescription('');
      setValidityDescription(true);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitButtonCaption={submitButtonCaption}
      isDisabledSubmitButton={!isValidUsername || !isValidDescription}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input ${errorUsername && 'popup__input_type_error'}`}
        type="text"
        name="username"
        value={username}
        onChange={handleChangeUsername}
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
      />
      <span className={`popup__error ${errorUsername && 'popup__error_visible'}`}>{errorUsername}</span>
      <input
        className={`popup__input ${errorDescription && 'popup__input_type_error'}`}
        type="text"
        name="description"
        value={description}
        onChange={handleChangeDescription}
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
      />
      <span className={`popup__error ${errorDescription && 'popup__error_visible'}`}>{errorDescription}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
