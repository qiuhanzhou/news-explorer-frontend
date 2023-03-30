import './InfoToolTip.css'
import Modal from '../Modal/Modal'

export default function InfoToolTip({
  isOpen,
  setIsOpen,
  onClose,
  setIsAuthFormOpen,
}) {
  function onCloseInfoTooltip() {
    setIsOpen(false)
    setIsAuthFormOpen(true)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='infotooltip'>
        <p className='infotooltip__message'>
          Registration successfully completed!
        </p>
        <button
          onClick={onCloseInfoTooltip}
          className='infotooltip__redirect-link'
        >
          Sign in
        </button>
      </div>
    </Modal>
  )
}
