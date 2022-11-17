import { useEffect } from 'react'
import NewsCard from './NewsCard'

export default function NewsCardList({ cards }) {
  return (
    <ul>
      {cards.map((card) => (
        <NewsCard card={card} />
      ))}
    </ul>
  )
}
