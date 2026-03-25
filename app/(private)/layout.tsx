import MenuHeader from "../components/MenuHeader"
import Sidebar from "../components/Sidebar"
import { getServerSession } from "next-auth"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
const session:any = await getServerSession()

  return <>
    <MenuHeader session={session} />
      <main className="flex-1 ml-12 p-2 min-h-screen bg-gray-900 text-white">
      <Sidebar />
        {children}
      </main>
  </>
}