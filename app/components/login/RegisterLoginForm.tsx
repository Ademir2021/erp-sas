
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { TUser, UserRole } from "@/app/models/TUser"
import Link from "next/link"
import { useState } from "react"
import { globalStyles_login_btn, globalStyles_login_div, globalStyles_login_div_hight, globalStyles_login_div_left, globalStyles_login_input, globalStyles_login_main } from '../GlobalStyles';

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
 const back =<>  {step !== 1 && <button  onClick={()=>setStep(1)}
          className="flex cursor-pointer ">
            <KeyboardReturnIcon titleAccess='Voltar'/></button>}</>
  return (
    <div className={`${globalStyles_login_div}`}>
      <main className={`${globalStyles_login_main}`}>

        {/* Lateral Esquerda - Progresso */}
        <div className={`${globalStyles_login_div_left}`}>
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
         {back}
          </div>

        {/* Lado Direito */}
        <div className={`${globalStyles_login_div_hight}`}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-300">
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
                  className={`${globalStyles_login_input}`}
                />
              </>
            )}

            {step === 2 && (
              <>
                <label>Privilégio</label>
                <select className="w-full text-gray-700  p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                 className={`${globalStyles_login_input}`}
                />
              </>
            )}
          </form>
          {msg && <p className="text-red-600 mt-2 text-center">{msg}</p>}
          {msg && back}
          <button
           onClick= {step !==3 ? nextStep : handleSubmit}
            className={`${globalStyles_login_btn}`}
          >
            {step === 3 ? "Finalizar" : "Próximo"}
          </button>
          <p className="m-2 text-center text-blue-600">
            <Link className=" text-end" href={'/login'}>Logar</Link>
            </p>
        </div>
      </main>
    </div>
  )
}