import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  // NextAuth
  const { data: session } = useSession()

  if(!session) {
    return(
      <div className="bg-blue-900 w-screen h-screen flex items-center">

        <div className="text-center w-full">
          <button onClick={() => signIn('vk') }className="bg-black p-2 px-4 rounded-lg">
            Login with VK!
          </button>
        </div>

      </div>
    )
  }

  return (
    <div>
      Logged in {session.user.name}
    </div>
  )
}
