import React, { FunctionComponent, ReactElement } from 'react';

type AuthFormProps = {
  title: string
  buttonCaption: string
  onSubmitAuthForm(
    email: string, 
    password: string
  ): void
};

const AuthForm: FunctionComponent<AuthFormProps> = ({
  title,
  buttonCaption,
  onSubmitAuthForm
}): ReactElement => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  function handleChangeEmailInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handleChangePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleSubmitForm(event: React.FormEvent): void {
    event.preventDefault();
    onSubmitAuthForm(email, password);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form
        className="auth__form"
        name="auth"
        onSubmit={handleSubmitForm}
      >
        <div className="auth__inputs">
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeEmailInput}
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={handleChangePasswordInput}
          />
        </div>
        <button
          className="auth__button"
          type="submit"
        >
          {buttonCaption}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
