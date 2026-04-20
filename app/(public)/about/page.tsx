import { globalStyles_form } from "@/app/components/GlobalStyles";
import pkg from "../../../package.json";
export default function About() {
  return (
    <main className={`${globalStyles_form}`}>
      <h1 className="text-2xl font-bold mb-4">Sobre o ERP !</h1>
    <hr/>
      <p className="mt-2">Versão: {pkg.version}</p>

      <p className=" text-gray-400 font-bold">Nome: {pkg.name.toUpperCase()}</p>

      <p className="text-gray-200 font-sans">
       Esta aplicação ERP foi desenvolvida para gerenciamento de dados e processos,<br/>
        oferecendo uma interface simples e eficiente para o usuário.
      </p>
    </main>
  );
}