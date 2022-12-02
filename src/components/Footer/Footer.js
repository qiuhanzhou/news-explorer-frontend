import githubIcon from '../../images/github.svg'
import linkedInIcon from '../../images/linkedin.png'
import './Footer.css'

export default function Footer({}) {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        ©{new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className='footer__links-wrapper'>
        <div className='footer__nav-wrapper'>
          <a className='footer__link' href='/'>
            Home
          </a>
          <a className='footer__link' href='' target='_blank'>
            Portfolio
          </a>{' '}
        </div>
        <div className='footer__icons-wrapper'>
          <a
            className='footer__link_icon'
            href='https://github.com/qiuhanzhou'
            target='__blank'
            alt='GitHub Icon'
          >
            <img
              className='footer__link-img footer__link-img_git'
              alt='GitHub Icon'
              src={githubIcon}
            />
          </a>
          <a
            className='footer__link_icon'
            href='https://www.linkedin.com/in/qiuhan-karen-zhou/'
            target='__blank'
            alt='Facebook Icon'
          >
            <img
              className='footer__link-img'
              alt='LinkedIn Icon'
              src={linkedInIcon}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
