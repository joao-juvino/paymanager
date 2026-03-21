import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center">
      <div className="w-full h-[95vh] flex justify-center items-center">
        <Outlet />
      </div>
      <div>
        <p className="text-gray-500 text-xs">
          @2026 PayManager Systems. All rights reserved.
        </p>
      </div>
    </div>
  )
}