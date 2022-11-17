import Preloader from '../Preloader'
import About from '../About/About'
import NewsCardList from '../NewsCardList'

export default function Main({ cards }) {
  return (
    <main className='main'>
      <section className='results'>
        <NewsCardList cards={cards} />
      </section>
      <Preloader />
      <About />
    </main>
  )
}
