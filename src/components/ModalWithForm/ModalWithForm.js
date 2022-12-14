import './ModalWithForm.css'
import { useState } from 'react'
import useForm from '../../utils/useForm'
import Modal from '../Modal/Modal'

export default function ModalWithForm({
  isOpen,
  onClose,
  setIsLoggedIn,
  setIsAuthFormOpen,
  isSignUpSuccess,
  setIsSignUpSuccess,
  setIsSignin,
  isSignin,
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
  const [showServerMessage, setShowServerMessage] = useState(false)

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

  //mimic  successful api call to sign in / sign up
  function onSubmit(e) {
    e.preventDefault()

    // if (email && password) {
    //   if (isSignin) {
    //     handleOnRegisterSubmit(password, email, username)
    //   } else {
    //     handleOnSigninSubmit(email)
    //   }
    // }

    if (isSignin) {
      //onLogin
      setIsLoggedIn(true)
    } else {
      //onSignup
      setShowServerMessage(true)
      setIsSignUpSuccess(true)
    }

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

        {!isSignUpSuccess && showServerMessage && (
          <p className='modal-form__server-error'>Email is not valid</p>
        )}

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
          <button
            type='button'
            onClick={() => {
              setIsSignin(!isSignin)
            }}
            className='modal-form__redirect-link'
          >
            {' '}
            {!isSignin ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </form>
    </Modal>
  )
}
