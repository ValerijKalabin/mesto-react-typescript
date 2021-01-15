import React, { FormEvent, FunctionComponent, ReactElement, ReactNode, SyntheticEvent } from 'react';

type PopupFormProps = {
  name: string
  title: string
  submitButtonCaption: string
  isDisabledSubmitButton: boolean
  isOpen: boolean
  onClose(event: SyntheticEvent): void
  onSubmit(event: FormEvent): void
  children: ReactNode
};

const PopupWithForm: FunctionComponent<PopupFormProps> = ({
  name,
  title,
  submitButtonCaption,
  isDisabledSubmitButton,
  isOpen,
  onClose,
  onSubmit,
  children
}): ReactElement => {
  return (
    <div className={`popup popup_task_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} action="/" method="POST" noValidate onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__button ${isDisabledSubmitButton && 'popup__button_disabled'}`}
            type="submit"
            disabled={isDisabledSubmitButton}
          >
            {submitButtonCaption}
          </button>
        </form>
        <button className="popup__icon-close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
