import { Eye, EyeClosed, Lock } from "lucide-react"

export default function PasswordField({
  value,
  onChange,
  show,
  toggle,
}: {
  value: string
  onChange: (v: string) => void
  show: boolean
  toggle: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <label>Password</label>
        <span className="text-highlight-blue cursor-pointer text-sm">
          Forgot password?
        </span>
      </div>

      <div className="flex">
        <div className="input-icon rounded-l-md px-3">
          <Lock />
        </div>

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-base border-l-0 border-r-0"
          placeholder="Password"
        />

        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer input-icon rounded-r-md border-l-0 border-r-1 px-3"
        >
          {show ? <EyeClosed /> : <Eye />}
        </button>
      </div>
    </div>
  )
}