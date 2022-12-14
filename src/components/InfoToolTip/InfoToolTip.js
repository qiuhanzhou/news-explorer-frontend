import './InfoToolTip.css'
import Modal from '../Modal/Modal'

export default function InfoToolTip({
  isOpen,
  setIsOpen,
  onClose,
  setIsAuthFormOpen,
  setIsSignin,
}) {
  function onCloseInfoTooltip() {
    console.log('on close info')
    setIsOpen(false)
    setIsAuthFormOpen(true)
    setIsSignin(true)
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
