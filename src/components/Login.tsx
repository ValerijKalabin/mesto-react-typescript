import React, { FunctionComponent, ReactElement } from 'react';
import AuthForm from './AuthForm';

type LoginProps = {
  loginButtonCaption: string
  onSubmitLoginForm(
    email: string,
    password: string
  ): void
};

const Login: FunctionComponent<LoginProps> = ({
  loginButtonCaption,
  onSubmitLoginForm
}): ReactElement => {
  return (
    <main>
      <section className="login">
        <AuthForm
          title="Вход"
          buttonCaption={loginButtonCaption}
          onSubmitAuthForm={onSubmitLoginForm}
        />
      </section>
    </main>
  );
}

export default Login;
