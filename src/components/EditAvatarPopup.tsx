import React, { ReactElement, SyntheticEvent } from 'react';
import IAvatar from '../interfaces/IAvatar';
import PopupWithForm from './PopupWithForm';

type AvatarPopupProps = {
  isOpen: boolean
  onClose(event: SyntheticEvent): void
  onUpdateAvatar(avatar: IAvatar): void
  submitButtonCaption: string
};

const EditAvatarPopup: React.FunctionComponent<AvatarPopupProps> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  submitButtonCaption
}): ReactElement => {
  const [valueInput, setValueInput] = React.useState<string>('');
  const [errorInput, setErrorInput] = React.useState<string>('');
  const [isValidInput, setValidityInput] = React.useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValueInput(event.target.value);
    setErrorInput(event.target.validationMessage);
    setValidityInput(event.target.validity.valid);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    onUpdateAvatar({
      avatar: valueInput
    });
  }

  React.useEffect(() => {
    if(isOpen) {
      setValueInput('');
      setErrorInput('');
      setValidityInput(false);
    }
  },  [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitButtonCaption={submitButtonCaption}
      isDisabledSubmitButton={!isValidInput}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input ${errorInput && 'popup__input_type_error'}`}
        type="url"
        name="avatarlink"
        placeholder="Ссылка на изображение"
        value={valueInput}
        required
        onChange={handleChange}
      />
      <span className={`popup__error ${errorInput && 'popup__error_visible'}`}>{errorInput}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
