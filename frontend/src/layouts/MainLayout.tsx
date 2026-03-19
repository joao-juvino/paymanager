import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <aside
        style={{
          width: 250,
          background: "#111827",
          color: "white",
          padding: 20
        }}
      >
        <h3>Admin</h3>
      </aside>

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