import author from '../../images/author.jpg'
import './About.css'
export default function About() {
  return (
    <section className='about'>
      <img className='about__author' src={author} alt='author'></img>
      <div className='about__text-container'>
        <h2 className='about__title'>About the author</h2>
        <p className='about__text'>
          Hey there, I'm Karen. I'm a motivated and passionate aspiring software
          engineer with a background and master's degree in accounging. I’m a
          curious person, I love to code and I like to experiment with new
          technologies.
        </p>
        <p className='about__text'>
          {' '}
          Now coding is my passion and my new professional career focus. I have
          experience working with both frontend and backend technologies
          including HTML, CSS, JavaScript, and the M.E.R.N stack. When I'm not
          coding, I am enjoying family time, playing piano, watching re-runs of
          Friends, trying new recipes, and reading books.
        </p>
      </div>
    </section>
  )
}
