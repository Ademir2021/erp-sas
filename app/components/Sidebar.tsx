"use client";

import { useState } from "react";
import Menu from "./Menu";
import { LogoutButtonSocial } from "./LogoutButtonSocial";
import Logo from "./Logo";
import { userAuth } from "../lib/userAuth";

export default function Sidebar() {

  const { user } = userAuth()
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="fixed top-[-6] left-0 z-50 bg-black text-white
overflow-y-auto transition-all duration-300">
      <aside className={`${collapsed ? "w-auto h-10 bg-gray-800 overflow-hidden" : "w-64 h-screen"}`}>

        <button onClick={() => setCollapsed(!collapsed)}>
          <div className="cursor-pointer border:0px p-4">{collapsed ? <b>☰</b> : <b>X</b>}</div>
        </button>

        {!collapsed && <Logo />}
        <div className="flex justify-between items-center p-4">
          {!collapsed && <a href="/" className="font-bold cursor-pointer">HOME</a>}

        </div>
        {!collapsed && <Menu setCollapsed={setCollapsed} />}
        {!collapsed && <div className="p-6">
          {user ? <LogoutButtonSocial /> : <a href="/login">Fazer Login</a>}
        </div>}
      </aside>
    </div>
  )
}