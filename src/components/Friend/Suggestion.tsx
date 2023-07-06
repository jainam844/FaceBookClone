import React, { useEffect, useState } from 'react'
import { getUserSuggestion } from '../../services/Response'
import Suggestionlist from './suggestionlist'

const Suggestion = () => {
  const [friends, setFriends] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserSuggestion(1, 11)
        console.log(response)
        setFriends(response.records)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    
      {friends.map(friend => (
        <Suggestionlist friend={friend} sx={{ width: 'calc(33% - 1rem)' }} />
      ))}
    </>
  )
}
export default Suggestion
