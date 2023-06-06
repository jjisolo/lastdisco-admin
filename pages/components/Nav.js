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
import { useState } from "react";

const ICON_SIZE            = 30;
const ICON_SIZE_ADMIN      = 30;
const PRIMARY_COLOR        = "#FFAAC9";
const PRIMARY_COLOR_ACTIVE = "#E4A5FF"; 

export default function Nav() {
    const [hotElement, setHotElement] = useState('');
    
    const inactiveLink = "flex items-start self-start gap-2 p-2 my-2 mr-1 ml-1 rounded-xl text-primary font-semibold text-lg";
    const activeLink   = inactiveLink + " bg-opacity-30 rounded-xl bg-primary";

    const router       = useRouter();
    const {pathname}   = router;

    const menuItems = [
        { name: "Товары",    icon: <AiOutlineInbox    size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/products",   },
        { name: "Категории", icon: <MdOutlineCategory size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/categories", },
        { name: "Настройки", icon: <LuSettings        size={ICON_SIZE} color={PRIMARY_COLOR} />,  path: "/settings",   },
    ]
    
    const linkHandleMouseEnter = e => {
        e.target.style.opacity    = 0.3;
        e.target.style.transition = 'all 0.2s'
    }

    const linkHandleMouseLeave = e => {
        e.target.style.opacity    = 1;
    }
    

    return(
        <aside className="flex flex-col items-start self-start text-slate-950 bg-gray-900 gap-0 mt-2 mb-10">
            <Link href={'/'} className="flex p-2 mb-10 mr-1 ml-1 rounded-xl text-primary font-semibold text-lg"
                onMouseEnter={linkHandleMouseEnter}
                onMouseLeave={linkHandleMouseLeave}
            >
                <RiAdminLine size={ICON_SIZE_ADMIN} color={PRIMARY_COLOR}/>
            </Link>

            <nav className="flex flex-col">
                <Link href={'/'}
                      className={pathname == "/"
                      ? activeLink
                      : inactiveLink}
                      onMouseEnter={!(pathname == "/") ? linkHandleMouseEnter : () => {}}
                      onMouseLeave={!(pathname == "/") ? linkHandleMouseLeave : () => {}}
                      prefech={false}
                >
                    <RxDashboard size={ICON_SIZE} color={PRIMARY_COLOR}/>
                </Link>
                
                {menuItems.map(menuItem => (
                    <Link href={menuItem.path}
                         className={pathname.includes(menuItem.path)
                         ? activeLink
                         : inactiveLink}
                         onMouseEnter={!pathname.includes(menuItem.path) ? linkHandleMouseEnter: () => {}}
                         onMouseLeave={!pathname.includes(menuItem.path) ? linkHandleMouseLeave: () => {}}
                    >
                        {menuItem.icon}
                    </Link>
                ))}

                <Link href={'/'}
                      className   ={inactiveLink}
                      onMouseEnter={linkHandleMouseEnter}
                      onMouseLeave={linkHandleMouseLeave}
                >
                    <IoMdExit  size={ICON_SIZE} color={PRIMARY_COLOR}/>
                </Link>
            </nav>
        </aside>
    )
}