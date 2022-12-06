import './Modal.css'
import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null)

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
        {children}{' '}
      </div>
    </div>
  )
}
