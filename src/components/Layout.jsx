import { FaTicketAlt } from 'react-icons/fa'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 p-6 shadow-2xl">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-pulse">
              <FaTicketAlt className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Real-Time Ticketing Simulator
            </h1>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto p-6">
        {children}
      </main>
      
      <footer className="relative z-10 backdrop-blur-md bg-white/10 border-t border-white/20 text-white/80 text-center p-6 mt-8">
        <p className="text-lg">© 2025 Real-Time Ticketing Simulator. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout