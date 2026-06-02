"use client";

import { useEffect, useState } from "react";

import PolicyIcon from '@mui/icons-material/Policy';

export default function LegalNoticeLGPD() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lgpd-consent");
    if (consent === "true") {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lgpd-consent", "true");
    setAccepted(true);
  };

  if (accepted) return <button
    className="cursor-pointer text-blue-600 hover:text-blue-800 "
    onClick={() => setAccepted(false)}
  ><PolicyIcon
      fontSize="medium"
      titleAccess="Aviso Legal" />
    <p className="text-[10px]">Aviso Legal !</p>
  </button>;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 shadow-2xl z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="text-sm md:text-base">
          Coletamos dados pessoais para melhorar sua experiência, realizar atendimentos
          e processar informações conforme nossa política de privacidade e a LGPD
          (Lei Geral de Proteção de Dados).
        </div>

        <button
          onClick={handleAccept}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-semibold"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}