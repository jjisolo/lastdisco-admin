import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"

export default function Layout({ children }) {
  // NextAuth
  const { data: session } = useSession()

  if(!session) {
    return(
      <div className="bg-gray-700 w-screen h-screen flex items-center">

        <div className="text-center w-full">
          <h1>
            You are not logged in!
          </h1> 
          <a href="http://localhost:3000/api/auth/signin">
            Login here
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen flex">
      <Nav />

      <div className="bg-gray-800 text-white flex-grow mt-2 mr-2 mb-0 rounded-lg p-4">
        {children}
      </div>

    </div>
  )
}