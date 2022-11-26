import styled from 'styled-components';

export const StyledSignUpForm = styled.div`
  width: 350px;
  margin: 50px auto;
  padding: 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.gainsboro};
  box-shadow: 10px 10px 10px 0px rgba(217, 213, 217, 1);

  & input[type='submit'] {
    display: block;
    margin: 0 auto;
    padding: 9px 23px;
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.common.white};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const StyledSignUpFormInput = styled.div`
  display: block;
  margin-bottom: 1rem;

  & label {
    display: block;
    margin-bottom: 0.25rem;
  }

  & input {
    display: block;
    width: 100%;
    padding: 5px;
    border: 1px solid #b3b3b3;
  }

  & input:invalid {
    border: 1px solid red;
  }
`;

export const StyledSignUpFormCheckBox = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & input {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
