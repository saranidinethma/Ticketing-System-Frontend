import { FaTicketAlt } from 'react-icons/fa'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaTicketAlt className="text-2xl" />
            <h1 className="text-xl font-semibold">TicketMaster</h1>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-dark text-white text-center p-4 mt-8">
        <p>&copy; 2025 Real-Time Ticketing Simulator. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout