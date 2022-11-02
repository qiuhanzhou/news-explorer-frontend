import { useRef, useEffect } from 'react'

export default function ModalWithForm({
  name,
  title,
  isOpen,
  buttonText,
  onSubmit,
  onClose,
}) {
  const modalRef = useRef()

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus()
    }
  }, [isOpen])
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
        <h2 className='modal__title'>{title}</h2>
        <form className='modal__form' name={name} id={name} onSubmit={onSubmit}>
          {props.children}
          <button
            type='submit'
            aria-label='submit'
            className='modal__submit-button'
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}
