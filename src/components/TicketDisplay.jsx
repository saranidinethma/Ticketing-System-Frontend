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
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] group">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
            <FaTicketAlt className="text-white text-xl animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Ticket Pool Status
          </h2>
        </div>
        
        {error && (
          <p className="text-red-400 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            {error}
          </p>
        )}
        
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-8 shadow-2xl">
              <p className="text-6xl font-bold text-white mb-2 animate-pulse">
                {currentTickets}
              </p>
              <p className="text-white/80 text-lg font-medium">
                Tickets Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDisplay