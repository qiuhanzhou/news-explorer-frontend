import { useState } from 'react'
import { useRef, useEffect } from 'react'
import useForm from '../utils/useForm'

export default function ModalWithForm({
  isOpen,
  handleOnRegisterSubmit,
  handleOnSigninSubmit,
  onClose,
  message,
  hasServerError,
}) {
  const modalRef = useRef()

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

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus()
    }
  }, [isOpen])

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

    if (email && password) {
      if (isSignin) {
        handleOnRegisterSubmit(password, email, username)
      } else {
        handleOnSigninSubmit(email)
      }
    }
  }

  return (
    <div
      className={`modal ${isOpen ? 'modal_open' : ''} 
      `}
      onClick={onClose}
      onKeyDown={onClose}
      tabIndex='0'
      ref={modalRef}
    >
      <div className='modal__content'>
        <button
          type='button'
          aria-label='close'
          className='modal__close-button'
        ></button>
        <form className='form' onSubmit={onSubmit}>
          <h2
            className='form__title'
            children={`${isSignin ? 'Sign in' : 'Sign up'}`}
          ></h2>
          <label className='form__label'>
            Email
            <input
              name='email'
              className='form__input'
              type='email'
              placeholder='Enter email'
              required
              minLength='1'
              maxLength='30'
              onChange={handleChange}
              onInput={handleCheckInputValidity}
              value={email}
            />
            <span className={'form__input-error '}>{errorMessages.email}</span>
          </label>

          <label className='form__label'>
            Password
            <input
              name='password'
              className='form__input'
              type='password'
              placeholder='Enter password'
              required
              onChange={handleChange}
              onInput={handleCheckInputValidity}
              value={password}
              minLength='8'
              maxLength='30'
            />
            <span className={'form__input-error '}>
              {errorMessages.password}
            </span>
          </label>

          {!isSignin && (
            <label className='form__label'>
              Username
              <input
                name='username'
                className='form__input'
                type='text'
                placeholder='Enter your username'
                required
                onChange={handleChange}
                value={username}
                onInput={handleCheckInputValidity}
                minLength='2'
                maxLength='30'
              />
              <span className={'form__input-error'}>
                {errorMessages.username}
              </span>
            </label>
          )}
          {hasServerError && <p className='form__server-error'>{message}</p>}
          <button
            type='submit'
            aria-label='submit'
            className={`form__submit-button ${
              hasError ? 'form__submit-button_disabled' : ''
            }`}
            children={`${isSignin ? 'Sign in' : 'Sign up'}`}
          ></button>
          <p className='form__redirect'>
            or{' '}
            <a
              onClick={() => {
                setIsSignIn(!isSignin)
              }}
              className='form__redirect-link'
            >
              {' '}
              {!isSignin ? 'Sign in' : 'Sign up'}
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
