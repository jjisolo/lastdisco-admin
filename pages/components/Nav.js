// Default imports
import { signOut }   from "next-auth/react";
import { useRouter } from "next/router";
import Link          from "next/link";

// React-Icons
import { RxDashboard      } from 'react-icons/rx';
import { AiOutlineInbox   } from 'react-icons/ai';
import { MdOutlineCategory} from 'react-icons/md';
import { LuSettings       } from 'react-icons/lu';
import { RiAdminLine      } from 'react-icons/ri';
import { IoMdExit         } from 'react-icons/io';

const ICON_SIZE            = 24;
const ICON_SIZE_ADMIN      = 24;
const PRIMARY_COLOR        = "#FFAAC9";
const PRIMARY_COLOR_ACTIVE = "#E4A5FF"; 

export default function Nav() {
    const inactiveLink = "text-white flex items-start self-start p-2 my-2 mr-1 ml-1 rounded-xl text-primary";
    const activeLink   = inactiveLink + " bg-opacity-30 rounded-xl bg-primary";

    const router       = useRouter();
    const {pathname}   = router;

    const menuItems = [
        { name: "Товары",    icon: <AiOutlineInbox    size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/products",   },
        { name: "Категории", icon: <MdOutlineCategory size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/categories", },
        { name: "Настройки", icon: <LuSettings        size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/settings",   },
    ]
    
    return(
        <aside className="flex flex-col items-start self-start text-slate-950 bg-gray-900 gap-0 mt-2 mb-10">
            <Link href={'/'} className="flex p-2 mb-10 mr-1 ml-1 bg-opacity-10 rounded-xl bg-primary">
                <RiAdminLine size={ICON_SIZE_ADMIN} color={PRIMARY_COLOR}/>
            </Link>

            <nav className="flex flex-col">
                <Link href={'/'} className={pathname == "/" ? activeLink: inactiveLink}>
                    <RxDashboard size={ICON_SIZE} color={PRIMARY_COLOR}/>
                </Link>
                
                {menuItems.map(menuItem => (
                    <Link href={menuItem.path}
                         className={pathname.includes(menuItem.path)
                         ? activeLink
                         : inactiveLink}>
                        {menuItem.icon}
                    </Link>
                ))}

                <Link href={'/'} className={inactiveLink}>
                    <IoMdExit  size={ICON_SIZE} color={PRIMARY_COLOR}/>
                </Link>
            </nav>
        </aside>
    )
}