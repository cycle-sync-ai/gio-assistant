
 const Layout = ({children}) => {
  return (
    <main className="min-h-screen flex flex-col items-center">
      
      <div className="w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          </div>
        </nav>
      </div>
      {children}
    </main>
  )
}

export default Layout;