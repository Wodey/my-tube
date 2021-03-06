import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../services/UserReducer/actions';
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const Wrapper = styled.form`
  display: flex;
  height: 85%;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  gap: 15px;
`;

const Input = styled.input`
  height: 30px;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1.2rem;
  outline: none;
`;
const Label = styled.label`
  font-size: 1.1rem;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  width: 130px;
  margin: auto;
  justify-content: space-between;
`;
const Icon = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const Submit = styled.button`
  width: 50%;
  padding: 10px 0;
  border: none;
  margin: auto;
  cursor: pointer;
  background:${props => props.theme.maincolor};
  font-size: 1.2rem;
`;

const errors = [
  'Email already have been used',
  'Name already have been used',
  'Password 1 is not equal password 2'
];

const Error = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.activecold};
`;
const Register = () => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const isLogged = useSelector(s => s.user.token);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  useEffect(() => {
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(registerState.email, registerState.name, registerState.password, registerState.password2, setError));
  }

  return (
    <Wrapper onSubmit={registerHandler}>
      <Label>{t('Nickname')}
      <Input type="text" placeholder="Wodey" onChange={e => {
        setError(null);
        setRegisterState({...registerState, name: e.target.value})
      }} value={registerState.name} required/>
      </Label>
      <Label>{t('Email')}
      <Input type="email" placeholder="myemail@gmail.com" onChange={e => {
        setError(null);
        setRegisterState({...registerState, email: e.target.value})
      }} value={registerState.email} required/>
      </Label>
      <Label>{t('Password')}
      <Input type="password" placeholder="************" onChange={e => {
        setError(null);
        setRegisterState({...registerState, password: e.target.value})
      }} value={registerState.password} required/>
      </Label>
      <Label>{t('Repeat Password')}
      <Input type="password" placeholder="************" onChange={e => {
        setError(null);
        setRegisterState({...registerState, password2: e.target.value})
      }} value={registerState.password2} required/>
      </Label>
      <Icons>
        <Icon src="/facebook.svg" />
        <Icon src="/twitter.svg" />
        <Icon src="/google.svg" />
      </Icons>
      <Submit>{t('Register')}</Submit>
      {error && (<Error>{t(errors[error-1])}</Error>)}
    </Wrapper>
  )
};

export default Register;
