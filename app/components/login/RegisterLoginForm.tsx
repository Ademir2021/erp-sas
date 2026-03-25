"use client"
import { TUser, UserRole } from "@/app/models/TUser"
import Link from "next/link"
import { useState } from "react"

type Props = {
  children: TUser
  handleChange: any
  handleSubmit:Function | any
  msg:string
}

export default function RegisterLoginForm({
  children,
  handleChange,
  handleSubmit,
  msg
}: Props) {
  const [step, setStep] = useState(1)

  const steps = [
    "Dados de Login",
    "Selecionar Privilégio",
    "Definir Senha"
  ]

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Lateral Esquerda - Progresso */}
        <div className="md:w-1/2 bg-gray-900 text-white flex flex-col justify-center p-8 space-y-6">
          {steps.map((title, index) => {
            const currentStep = index + 1
            const isActive = step === currentStep
            const isCompleted = step > currentStep

            return (
              <div key={index} className="flex items-center space-x-4">

                {/* Bolinha */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition
                    ${isCompleted ? "bg-green-400 text-white" : ""}
                    ${isActive ? "bg-white text-blue-600" : ""}
                    ${!isActive && !isCompleted ? "bg-blue-400 text-white" : ""}
                  `}
                >
                  {isCompleted ? "✓" : currentStep}
                </div>

                {/* Texto */}
                <span
                  className={`text-lg font-semibold transition
                    ${isActive ? "text-white" : ""}
                    ${isCompleted ? "text-green-200" : ""}
                  `}
                >
                  {title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Lado Direito */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {steps[step - 1]}
          </h2>

          <form className="space-y-4">
            {step === 1 && (
              <>
                <label>Email</label>
                <input
                  type="email"
                  name="login"
                  onChange={handleChange}
                  value={children.login}
                  placeholder="Digite seu email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}

            {step === 2 && (
              <>
                <label>Privilégio</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={''}
                  name="role"
                  onChange={handleChange}>
                  <option disabled value=''>Selecione o Privilégio ...</option>
                  <option>{UserRole.ADMIN}</option>
                  <option>{UserRole.USER}</option>
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={children.password}
                  placeholder="Digite sua senha"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          </form>
          {msg && <p className="text-red-600 mt-2 text-center">{msg}</p>}
          <button
           onClick= {step !==3 ? nextStep : handleSubmit}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {step === 3 ? "Finalizar" : "Próximo"}
          </button>
          <p className="m-2 text-center text-blue-600">
            <Link className=" text-end" href={'/login'}>Logar</Link>
            </p>
        </div>
      </div>
    </div>
  )
}