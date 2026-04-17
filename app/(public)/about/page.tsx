import pkg from "../../../package.json";
export default function About() {
  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Sobre o ERP</h1>
    <hr/>
      <p className="p-3">Versão: {pkg.version}</p>

      <p className="text-gray-500 font-bold mb-3">ERP - SAS</p>

      <p className="text-gray-100 leading-relaxed">
       Esta aplicação ERP foi desenvolvida para gerenciamento de dados e processos,
        oferecendo uma interface simples e eficiente para o usuário.
      </p>
    </main>
  );
}