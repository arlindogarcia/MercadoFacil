import { Logo } from "@/components/Logo";
import { Link, usePage } from "@inertiajs/react";
import React, { ReactNode, useState } from "react";
import { FiFileText, FiHome, FiLogOut, FiMessageCircle, FiSettings, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import { User } from "@/pages/System/types/user";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  type MenuItems = {
    name: string;
    href?: string;
    icon: ReactNode;
    quantity?: number;
    function?: () => void;
    class?: string;
    onlyAdminCanSee?: boolean;
  }

  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const menuItems: MenuItems[] = [
    {
      name: 'Listas de Compra',
      href: '/purchase-lists',
      icon: <FiShoppingCart size={"22px"} />,
    },
  ]

  const menuFooterItems: MenuItems[] = [
    {
      name: 'Perfil',
      href: '/profile',
      icon: <FiUser size={"22px"} />,
    },
    {
      name: 'Sair da conta',
      class: 'text-red-700 hover:bg-red-100 hover:text-red-900',
      icon: <FiLogOut size={"22px"} />,
      href: '/logout',
    },
  ]

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    if (!sidebarOpen) {
      return <></>;
    }
  }

  const Li = ({ menu }: { menu: MenuItems }) => {
    return (
      <li>
        {menu.href ? <Link href={menu.href} onClick={() => typeof menu.function === 'function' && menu.function()} className={
          `${menu.class ?? ''} flex w-full items-center relative pl-4 p-3 text-gray-900 rounded-lg hover:bg-green-50 hover:text-green-500 group ${location.pathname == menu.href ? 'bg-green-50 text-green-500' : ''}
        `}>
          {menu.icon}
          <span className="ms-3 text-lg"> {menu.name} </span>
          {typeof menu.quantity === 'number' && <span className="absolute right-0 inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            {menu.quantity}
          </span>}
        </Link> : <span onClick={() => typeof menu.function === 'function' && menu.function()} className={
          ` ${menu.class ?? ''} cursor-pointer flex w-full items-center relative pl-4 p-3 text-gray-900 rounded-lg hover:bg-green-50 hover:text-green-500 group ${location.pathname == menu.href ? 'bg-green-50 text-green-500' : ''}
        `}>
          {menu.icon}
          <span className="ms-3 text-lg"> {menu.name} </span>
          {typeof menu.quantity === 'number' && <span className="absolute right-0 inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            {menu.quantity}
          </span>}
        </span>}
      </li>
    )
  }

  const props = usePage().props;

  const user = props.user as User;

  return (
    <aside id="logo-sidebar" className="min-h-[100vh] fixed top-0 left-0 z-40 w-[17.5rem] h-screen transition-transform sm:translate-x-0" aria-label="Sidebar">
      <div className="min-h-[100vh] flex flex-grow flex-col h-full px-3 overflow-y-auto bg-white border-r border-gray-200 shadow">
        <Logo />
        {isMobile && <span onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 cursor-pointer text-gray-700 z-10"><FiX size={"20px"} /></span>}
        <ul className="flex-grow space-y-2 font-semibold px-2 text-gray-300">
          {menuItems.filter((menu) => menu.onlyAdminCanSee == true ? user.admin == 1 : true).map((menu, index) => (
            <Li key={`${index}`} menu={menu} />
          ))}
        </ul>
        <div className="pb-8">
          <ul className="flex-grow space-y-2 font-semibold px-2 text-gray-300">
            {menuFooterItems.filter((menu) => menu.onlyAdminCanSee == true ? user.admin == 1 : true).map((menu, index) => (
              <Li key={`${index}`} menu={menu} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
