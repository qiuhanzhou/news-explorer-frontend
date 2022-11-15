import { useEffect, useRef } from 'react'

export default function InfoTooltip({
  isOpen,
  onClose,
  message,
  setIsOpen,
  setIsSignInOpen,
  hasServerError,
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus()
    }
  }, [isOpen])

  function onCloseInfoTooltip(e) {
    console.log('on close info')
    setIsOpen(false)
    setIsSignInOpen(true)
  }

  return (
    <div
      className={`modal modal__tooltip ${isOpen ? 'modal_open' : ''} 
    `}
      onClick={onClose}
      onKeyDown={onClose}
      tabIndex='0'
      ref={modalRef}
    >
      <div
        className='modal__content modal__content_type_tooltip
      '
      >
        <button
          type='button'
          aria-label='close'
          className='modal__close-button modal__close-button_type_image'
        ></button>

        {hasServerError && <p className='modal__message'>{message}</p>}
        <a onClick={onCloseInfoTooltip} className='form__redirect-link'>
          Sign in
        </a>
      </div>
    </div>
  )
}
