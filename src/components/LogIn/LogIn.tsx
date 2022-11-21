import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import {
  StyledLogInForm,
  StyledLogInFormCheckBox,
  StyledLogInFormInput,
  StyledLogInFormResetPassword,
} from './LogInStyled';
import { ILogInProps } from '../../types';

const LogIn: React.FC<ILogInProps> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const logInHandler = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (!result.error) {
      router.replace('/');
    }
  };

  return (
    <StyledLogInForm>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          logInHandler(
            emailInputRef.current.value,
            passwordInputRef.current.value
          );
        }}
      >
        <StyledLogInFormInput>
          <label htmlFor='email'>Your E-Mail</label>
          <input
            type='email'
            id='email'
            placeholder='example@email.com'
            required
            ref={emailInputRef}
          />
        </StyledLogInFormInput>
        <StyledLogInFormInput>
          <label htmlFor='password'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            required
            minLength={6}
            ref={passwordInputRef}
          />
        </StyledLogInFormInput>
        <StyledLogInFormCheckBox>
          <input
            type='checkbox'
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
          />
          Show Password
        </StyledLogInFormCheckBox>
        <input type='submit' value='Log In' />
        <StyledLogInFormResetPassword>
          <a href='/reset'>Forgot password?</a>
        </StyledLogInFormResetPassword>
      </form>
    </StyledLogInForm>
  );
};

export default LogIn;
