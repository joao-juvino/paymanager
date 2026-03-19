import { Outlet } from "react-router-dom"
import SideMenu from "../common/components/SideMenu"

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <SideMenu/>

      <main
        style={{
          flex: 1,
          padding: 30
        }}
      >
        <Outlet />
      </main>

    </div>
  )
}