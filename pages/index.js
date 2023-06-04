import { useSession } from "next-auth/react";
import Layout from "./components/Layout";


export default function Home() {
  const { data: session } = useSession();

  return(
    <Layout>
      <div className="text-color-blue-900 flex text-blue-900 justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <div className="flex bg-gray-300 text-white gap-1 rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="User Avatar" className="w-6 h-6 "/>  

          <span className="px-2">
            {session?.user?.name}
          </span>
        </div>
        
      </div>
    </Layout>
  )
}
