"use client"

import { useState, useEffect } from "react"
import { FaPlane, FaClock, FaMapMarkerAlt } from "react-icons/fa"

const FlightStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const flightInfo = {
    flightNumber: "SL 1234",
    departure: "JFK",
    arrival: "LAX",
    departureTime: "14:30",
    status: "Boarding",
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg">
          <FaPlane className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Flight Information</h2>
          <p className="text-gray-600">Current flight details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <FaPlane className="text-blue-600 text-lg" />
            <div>
              <div className="text-sm text-gray-600">Flight Number</div>
              <div className="font-bold text-gray-800">{flightInfo.flightNumber}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <FaMapMarkerAlt className="text-green-600 text-lg" />
            <div>
              <div className="text-sm text-gray-600">Route</div>
              <div className="font-bold text-gray-800">
                {flightInfo.departure} → {flightInfo.arrival}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
            <FaClock className="text-orange-600 text-lg" />
            <div>
              <div className="text-sm text-gray-600">Departure Time</div>
              <div className="font-bold text-gray-800">{flightInfo.departureTime}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="font-bold text-green-600">{flightInfo.status}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
        <div className="text-sm text-gray-600">Current Time</div>
        <div className="text-xl font-bold text-gray-800">{currentTime.toLocaleTimeString()}</div>
      </div>
    </div>
  )
}

export default FlightStatus
