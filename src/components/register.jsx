import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getCurrentUser } from '../services/authService';
import { getUser, saveUser, updateUser } from './../services/userService';
import { toast } from 'react-toastify';
import { findUsersByEmail, removeVerification } from '../utils/userMethods';

const Register = (props) => {

  const schema = {
    name: Joi.string().required().min(2).label('Name'),
    username: Joi.string().required().email().label('Email'),
    password: Joi.string().required().label('Password'),
    verification: Joi.string().required().label('Retype Password'),
  }

  useEffect(() => {
    const userId = props.match.params.id;
    if (userId === 'New') return;

    props.history.push('/home');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    
    try {
        const users =await findUsersByEmail(user.username);
        if(users.length > 0) {
            toast.error('Email already in use.');
            return;
        }

        if(user.password != user.verification) {
            toast.error('Passwords does not match');
            return;
        }

      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveUser(mapToViewModel(await removeVerification(user)))
        : await updateUser(mapToViewModel(user));
      toast(
        `Successfully Registered${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/login');
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const [
    user,
    setUser,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} USER
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderInput('username', 'Email Address')}
        {renderInput('password', 'Password', 'password')}
        {renderInput('verification', 'Retype Password', 'password')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default Register;
