import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const NavMenu = () => {
  
  
  return (
    <nav className="bg-zinc-900 text-white flex flex-col align-start p-7 text-xl font-medium w-screen h-32">
      <div className="flex flex-row">
        <Link to="/" className="no-underline mr-5 hover:text-primary">Dashboard</Link>
  
        <div className="flex ml-auto">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="mt-5 opacity-5" />
    </nav>
  )
}

export default NavMenu;