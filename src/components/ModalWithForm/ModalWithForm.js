import './ModalWithForm.css'
import { useState } from 'react'
import { useRef, useEffect } from 'react'
import useForm from '../../utils/useForm'
import Modal from '../Modal/Modal'

export default function ModalWithForm({
  isOpen,
  onClose,
  handleOnRegisterSubmit,
  handleOnSigninSubmit,
  isSuccess,
  message,
  isLoggedIn,
  setIsLoggedIn,
  setIsAuthFormOpen,
}) {
  //set states with input values on input change
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    username: '',
  })
  const { email, password, username } = values

  //set states
  const [hasError, setHasError] = useState(false)
  const [errorMessages, setErrorMessges] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [isSignin, setIsSignIn] = useState(true)

  //form validation
  const handleCheckInputValidity = (e) => {
    const currentInput = e.target
    if (!currentInput.validity.valid) {
      setHasError(true)
      setErrorMessges({
        ...errorMessages,
        [currentInput.name]: currentInput.validationMessage,
      })
    } else {
      setHasError(false)
      setErrorMessges({ ...errorMessages, [currentInput.name]: '' })
    }
  }

  function onSubmit(e) {
    e.preventDefault()

    // if (email && password) {
    //   if (isSignin) {
    //     handleOnRegisterSubmit(password, email, username)
    //   } else {
    //     handleOnSigninSubmit(email)
    //   }
    // }

    setIsLoggedIn(!isLoggedIn)
    setIsAuthFormOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className='modal-form' onSubmit={onSubmit}>
        <h2
          className='modal-form__title'
          children={`${isSignin ? 'Sign in' : 'Sign up'}`}
        ></h2>
        <label className='modal-form__label'>
          Email
          <input
            name='email'
            className='modal-form__input'
            type='email'
            placeholder='Enter email'
            required
            minLength='1'
            maxLength='30'
            onChange={handleChange}
            onInput={handleCheckInputValidity}
            value={email}
          />
          <span className={'modal-form__input-error '}>
            {errorMessages.email}
          </span>
        </label>

        <label className='modal-form__label'>
          Password
          <input
            name='password'
            className='modal-form__input'
            type='password'
            placeholder='Enter password'
            required
            onChange={handleChange}
            onInput={handleCheckInputValidity}
            value={password}
            minLength='8'
            maxLength='30'
          />
          <span className={'modal-form__input-error '}>
            {errorMessages.password}
          </span>
        </label>

        {!isSignin && (
          <label className='modal-form__label'>
            Username
            <input
              name='username'
              className='modal-form__input'
              type='text'
              placeholder='Enter your username'
              required
              onChange={handleChange}
              value={username}
              onInput={handleCheckInputValidity}
              minLength='2'
              maxLength='30'
            />
            <span className={'modal-form__input-error'}>
              {errorMessages.username}
            </span>
          </label>
        )}
        {!isSuccess && <p className='modal-form__server-error'>{message}</p>}
        <button
          type='submit'
          aria-label='submit'
          className={`modal-form__submit-button ${
            hasError ? 'modal-form__submit-button_disabled' : ''
          }`}
          children={`${isSignin ? 'Sign in' : 'Sign up'}`}
        ></button>
        <p className='modal-form__redirect'>
          or{' '}
          <a
            onClick={() => {
              setIsSignIn(!isSignin)
            }}
            className='modal-form__redirect-link'
          >
            {' '}
            {!isSignin ? 'Sign in' : 'Sign up'}
          </a>
        </p>
      </form>
    </Modal>
  )
}