"use client";

import { useState } from "react";
import Links from "./Menu";

import { LogoutButton } from "./LogoutButton";
import { LogoutButtonSocial } from "./LogoutButtonSocial";
import Logo from "./Logo";

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(true);

  return <>
    <aside className={`fixed top-0 left-0 z-50 h-screen bg-gray-900 text-white
       overflow-y-auto transition-transform duration-300 ${collapsed ? "w-12" : "w-65"}`} >
      <div className="">
        <button onClick={() => setCollapsed(!collapsed)}>
          <div className="cursor-pointer border:0px p-4">{collapsed ? <b>☰</b> : <b>X</b>}</div>
        </button>
      </div>
      {!collapsed && <Logo/>}
      <div className="flex justify-between items-center p-4">
        {!collapsed && <a href="/" className="font-bold cursor-pointer">Home</a>}

      </div>
      {!collapsed && <Links />}
      {!collapsed && <div className="flex-3 p-6 ">
        <LogoutButton />
        <hr/>
        <LogoutButtonSocial />
      </div>}
    </aside>
    {/* </main> */}
  </>
}