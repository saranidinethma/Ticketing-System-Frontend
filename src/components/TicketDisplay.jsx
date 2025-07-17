"use client"

import { useEffect, useState } from "react"
import { getStatus } from "../services/api"
import { FaTicketAlt, FaUsers } from "react-icons/fa"

const TicketDisplay = () => {
  const [currentTickets, setCurrentTickets] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const status = await getStatus()
        setCurrentTickets(status.currentTicketsAvailable || 0)
        setError(null)
      } catch (err) {
        setError("Failed to fetch ticket status")
        console.error("Error fetching ticket status:", err)
      }
    }

    fetchTickets()
    const intervalId = setInterval(fetchTickets, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg">
          <FaTicketAlt className="text-white text-2xl animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Seats</h2>
          <p className="text-gray-600">Real-time seat availability</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-12 shadow-2xl">
            <div className="text-6xl font-bold text-white mb-2 animate-pulse">{currentTickets}</div>
            <div className="text-white/90 text-lg font-medium flex items-center justify-center gap-2">
              <FaUsers className="text-sm" />
              Seats Available
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-blue-600 font-semibold">Flight Status</div>
            <div className="text-blue-800 font-bold">{currentTickets > 0 ? "Boarding Open" : "Fully Booked"}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-gray-600 font-semibold">Last Updated</div>
            <div className="text-gray-800 font-bold">Live</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDisplay
