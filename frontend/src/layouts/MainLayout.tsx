import { Outlet } from "react-router-dom"
import SideMenu from "../common/components/SideMenu"
import UpperMenu from "../common/components/UpperMenu"

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <SideMenu />


      <main
        className="grow-1 max-w-95vh overflow-hidden"
      >
        <UpperMenu
          userName="Jhon Smith"
          userRole="Manager"
          userImage="/genericPerson.jpg"
          notifications={1}
        />
        <Outlet />
        <div className="flex justify-center">
          <p className="text-gray-500 text-xs">
            @2026 PayManager Systems. All rights reserved.
          </p>
        </div>
      </main>

    </div>
  )
}