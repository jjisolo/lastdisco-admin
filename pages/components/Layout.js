import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"

export default function Layout({ children }) {
  // NextAuth
  const { data: session } = useSession()

  if(!session) {
    return(
      <div className="bg-fuchsia-200 w-screen h-screen flex items-center">

        <div className="text-center w-full">
          <button onClick={() => signIn('vk') }className="bg-black p-2 px-4 rounded-lg">
            Login with VK!
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />

      <div className="bg-white text-black flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>

    </div>
  )
}