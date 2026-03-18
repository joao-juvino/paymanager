import { useState } from "react"
import { ShieldCheck, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import InputField from "../components/InputField"
import PasswordField from "../components/PasswordField"
import { useAuth } from "../../../contexts/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await login(form.email, form.password)

      navigate("/", { replace: true })
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-lg rounded-xl shadow-sm bg-white">
      <div className="px-5 pt-10">
        <div className="flex items-center justify-center gap-2 py-5">
          <div className="bg-highlight-blue flex items-center justify-center text-white p-2 rounded-xl">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-highlight-blue text-3xl font-bold font-heading">
            PayManager
          </h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold font-heading text-custom-primary">
            Sign in to PayManager
          </h1>
          <p className="text-sm text-custom-secondary text-center">
            Enter your credentials to access the payment portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-10 flex flex-col gap-5">
          <InputField
            label="Login / CNPJ"
            icon={<User />}
            placeholder="Username or identifier"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
          />

          <PasswordField
            value={form.password}
            onChange={(v) => handleChange("password", v)}
            show={showPassword}
            toggle={() => setShowPassword((prev) => !prev)}
          />

          {error && <p className="text-highlight-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-highlight-blue py-3 rounded-lg font-medium text-white hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      <hr className="border-gray-200" />

      <div className="px-10 py-10 flex flex-col gap-5 items-center text-custom-secondary">
        <p className="flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4" />
          Secure Enterprise Payment System
        </p>

        <div className="bg-custom-gray border border-gray-200 rounded-lg p-5 text-center text-xs flex flex-col gap-2">
          <h4 className="font-bold uppercase">Authorized Access Only</h4>
          <p>
            By logging in, you agree to your Terms of Service and Data Handling Policies for financial transactions.
          </p>
        </div>
      </div>
    </div>
  )
}