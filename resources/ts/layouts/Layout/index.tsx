import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Banner } from "@/components/Banner";

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
  hasPadding?: boolean;
  headerClass?: string;
}

function Layout({ children, header, headerClass, hasPadding = true }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="sm:ml-[17.5rem]">
        {header && <header className="bg-white shadow">
          <div className={headerClass ? headerClass : "text-gray-700 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"}>
            {header}
          </div>
        </header>}
        <Banner />
          <div className={`w-full px-2 ${hasPadding ? 'sm:px-8 py-8' : ''}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
