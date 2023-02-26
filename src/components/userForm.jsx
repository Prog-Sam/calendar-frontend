import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getCurrentUser } from '../services/authService';
import { getUser, saveUser, updateUser } from './../services/userService';
import { toast } from 'react-toastify';
import { removeVerification } from '../utils/userMethods';
import { findUsersByEmail } from '../utils/userMethods';

const UserForm = (props) => {

  const localEnums = {
    status: [
      { id: 0, name: 'TEMPORARY' },
      { id: 1, name: 'ACTIVE' },
      { id: 2, name: 'DISABLED' },
    ],
    access: [
      { id: '0', name: 'DEVELOPER' },
      { id: '1', name: 'OIC' },
      { id: '2', name: 'ASSISTANT OIC' },
      { id: '3', name: 'MANAGEMENT' },
      { id: '4', name: 'OPTOMETRIST' },
      { id: '5', name: 'ENCODER' },
      { id: '6', name: 'SALES' },
    ],
  };

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().min(2).label('Name'),
    username: Joi.string().email().label('Email'),
    password: Joi.string().required().label('Password'),
    verification: Joi.string().required().label('Retype Password'),
    themeId: Joi.number().label('Theme Id'),
  }

  useEffect(() => {
    const userId = props.match.params.id;
    if (userId === 'New') return;

    if(userId != getCurrentUser().id){
      toast.error('Not Allowed');
      props.history.push('/');
    }

    async function populateUser() {
      let { data } = await getUser(userId);
      setUser(data);
    }
    populateUser();

    if (!user) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {

      const users =await findUsersByEmail(user.username);
        if(users.length > 0) {
          if(users[0].id != user.id){
            toast.error('Email already in use.');
            return;
          }
        }

        if(user.password != user.verification) {
            toast.error('Passwords does not match');
            return;
        }

      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveUser(await removeVerification(mapToViewModel(user)))
        : await updateUser(await removeVerification(mapToViewModel(user)));
      toast(
        `User ${user.name} with the id of ${user.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/');
    } catch (e) {
      console.error(e);
      toast(e);
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
        {renderInput('username', 'Email')}
        {renderInput('password', 'Password', 'password')}
        {renderInput('verification', 'Retype Password', 'password')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default UserForm;
