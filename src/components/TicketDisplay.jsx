import { useEffect, useState } from 'react'
import { getStatus } from '../services/api'
import { FaTicketAlt } from 'react-icons/fa'

const TicketDisplay = () => {
  const [currentTickets, setCurrentTickets] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const status = await getStatus()
        // Ensure status has the expected property, default to 0 if not
        setCurrentTickets(status.currentTicketsAvailable || 0)
        setError(null)
      } catch (err) {
        setError('Failed to fetch ticket status')
        console.error('Error fetching ticket status:', err)
      }
    }

    fetchTickets()
    const intervalId = setInterval(fetchTickets, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-dark mb-4 flex items-center gap-2">
        <FaTicketAlt className="text-secondary" /> Ticket Pool Status
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-3xl font-bold text-secondary">
        {currentTickets} <span className="text-lg text-dark">Tickets Available</span>
      </p>
    </div>
  )
}

export default TicketDisplay