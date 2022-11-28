import './InfoToolTip.css'
import Modal from '../Modal/Modal'

export default function InfoToolTip({
  isOpen,
  setIsOpen,
  setIsSignInOpen,
  onClose,
  message,
  isSuccess,
}) {
  function onCloseInfoTooltip(e) {
    console.log('on close info')
    setIsOpen(false)
    setIsSignInOpen(true)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='infotooltip'>
        {isSuccess && <p className='infotooltip__message'>{message}</p>}
        <a onClick={onCloseInfoTooltip} className='infotooltip__redirect-link'>
          Sign in
        </a>
      </div>
    </Modal>
  )
}
