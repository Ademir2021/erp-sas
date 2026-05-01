"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md w-[90vw]">
        <p className="text-sm text-gray-400">
          Este site usa cookies para melhorar sua experiência.
        </p>
        <button
          onClick={acceptCookies}
          className="bg-white text-gray-600 px-4 cursor-pointer
          py-2 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}