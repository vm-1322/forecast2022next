import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {
  StyledSignUpForm,
  StyledSignUpFormCheckBox,
  StyledSignUpFormInput,
} from './SignUpStyled';

import { ISignUpProps } from '../../types';

const SignUp: React.FC<ISignUpProps> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const usernamedInputRef = useRef<HTMLInputElement>();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const confirmPasswordInputRef = useRef<HTMLInputElement>();

  const signUpHandler = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      router.replace('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSignUpForm>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          if (
            passwordInputRef.current.value !==
            confirmPasswordInputRef.current.value
          )
            return;

          signUpHandler(
            usernamedInputRef.current.value,
            emailInputRef.current.value,
            passwordInputRef.current.value
          );
        }}
      >
        <StyledSignUpFormInput>
          <label htmlFor='username'>Your name</label>
          <input
            type='text'
            id='username'
            placeholder="User's name"
            required
            ref={usernamedInputRef}
          />
        </StyledSignUpFormInput>
        <StyledSignUpFormInput>
          <label htmlFor='email'>Your E-Mail</label>
          <input
            type='email'
            id='email'
            placeholder='example@email.com'
            required
            ref={emailInputRef}
          />
        </StyledSignUpFormInput>
        <StyledSignUpFormInput>
          <label htmlFor='password'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            required
            minLength={6}
            ref={passwordInputRef}
          />
        </StyledSignUpFormInput>
        <StyledSignUpFormInput>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='confirmPassword'
            required
            minLength={6}
            ref={confirmPasswordInputRef}
          />
        </StyledSignUpFormInput>
        <StyledSignUpFormCheckBox>
          <input
            type='checkbox'
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
          />
          Show Password
        </StyledSignUpFormCheckBox>
        <input type='submit' value='Sign Up' />
      </form>
    </StyledSignUpForm>
  );
};

export default SignUp;
