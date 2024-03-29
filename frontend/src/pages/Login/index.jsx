import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../.././redux/slices/auth'
import { Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import styles from "./Login.module.scss";

export const Login = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit, 
    // setError,
    formState: { errors, /*isValid*/ }
  } = useForm({ 
    defaultValues: { 
      email: 'test@test.ru', 
      password: '12345' 
    },
    mode: 'onChange' //'all'
  })

  const onSubmit = async (values) => {

    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться!')
    }

    if ('token' in data.payload) {
      window.localSotrage.setItem('token', data.payload.token)
    }
  }

  console.log(isAuth)

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          fullWidth           
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
