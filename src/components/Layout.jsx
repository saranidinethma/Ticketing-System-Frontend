import { FaPlane } from "react-icons/fa"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl shadow-lg">
                <FaPlane className="text-3xl text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  SkyLine Airlines
                </h1>
                <p className="text-gray-600 font-medium">Real-Time Flight Ticketing System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">{children}</main>

      <footer className="relative z-10 bg-white/80 backdrop-blur-md border-t border-gray-200 text-gray-600 text-center py-6 mt-12">
        <div className="container mx-auto px-6">
          <p className="text-lg">© 2025 SkyLine Airlines Ticketing System. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by Real-Time Aviation Technology</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
