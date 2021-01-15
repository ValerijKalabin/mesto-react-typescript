import React, { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

type RegisterProps = {
  registerButtonCaption: string
  onSubmitRegisterForm(
    email: string,
    password: string
  ): void
};

const Register: FunctionComponent<RegisterProps> = ({
  registerButtonCaption,
  onSubmitRegisterForm
}):ReactElement => {
  return (
    <main>
      <section className="register">
        <AuthForm
          title="Регистрация"
          buttonCaption={registerButtonCaption}
          onSubmitAuthForm={onSubmitRegisterForm}
        />
        <p className="register__text">
          <span className="register__question">Уже зарегистрированы? </span>
          <Link className="register__link" to="/sign-in">Войти</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
