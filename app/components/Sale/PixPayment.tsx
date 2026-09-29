"use client";

import { TPagSeguroPix } from "@/app/models/TPagSeguroPix";
import { TItemsSale } from "@/app/models/TSale";
import { useEffect, useMemo, useState } from "react";
import pagSeguroPixJSON from "../../json/pagSeguroPix.json";
import { uuidv4 } from "zod";

type Props = {
  itemsSale: TItemsSale[];
  onBack: () => void;
  onComplete: () => void;
  onError: () => void;
  totalSale: number;
};

type PixPaymentResponse = {
  id: string;
  status: string;
  qrCode: string;
  qrCodeBase64?: string;
  expiresAt?: string;
};

export default function PixPayment({
  itemsSale,
  onBack,
  onComplete,
  onError,
  totalSale,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [pix, setPix] = useState<PixPaymentResponse | null>(null);
  const [error, setError] = useState("");
  const [pagSeguroPix, setPagSeguroPix] = useState<TPagSeguroPix>(
    pagSeguroPixJSON as TPagSeguroPix,
  );

  async function createPixPayment() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/paymentpix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(totalSale.toFixed(2)),
          itemsSale,
        }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível criar o pagamento PIX.");
      }
      const data: PixPaymentResponse = await response.json();
      setPix(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao gerar o pagamento PIX.");
      onError();
    } finally {
      setLoading(false);
    }
  }

  async function checkPayment() {
    if (!pix?.id) return;
    try {
      setChecking(true);
      //`/api/paymentpix/${pix.id}`,
      const response = await fetch("/api/paymentpix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference_id:  uuidv4(),
          description: "Pagamento teste Pix - homologação",
          customer: {
            name: "João da Silva",
            email: "teste@pagseguro.com.br",
            tax_id: "12345678909",
            phones: [
              {
                country: "55",
                area: "11",
                number: "912345678",
                type: "MOBILE",
              },
            ],
          },
          items: [
            {
              name: "Produto Teste",
              quantity: 1,
              unit_amount: 10050,
            },
          ],
          qr_codes: [
            {
              amount: {
                value:  Math.round(Number(2000) * 100),
              },
              expiration_date: "2026-04-02T14:30:00Z",
              links: [
                {
                  href: "https://sandbox.pagseguro.uol.com.br/pix/qr-code/TESTE12345",
                },
              ],
            },
          ],
          shipping: {
            address: {
              street: "Rua Exemplo",
              number: "1241",
              complement: "Apto 101",
              locality: "Bairro Teste",
              city: "São Paulo",
              region_code: "SP",
              country: "BRA",
              postal_code: "01001000",
            },
          },
          notification_urls: ["https://meusite.com/notificacoes"],
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      console.log("Status PIX:", data.status);

      if (data.status === "PAID" || data.status === "AUTHORIZED") {
        onComplete();
      }

      if (
        data.status === "CANCELED" ||
        data.status === "DECLINED" ||
        data.status === "EXPIRED"
      ) {
        onError();
      }
    } catch (err) {
      console.error("Erro consultando PIX:", err);
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    if (!pix?.id) return;

    const interval = setInterval(() => {
      checkPayment();
    }, 5000);

    return () => clearInterval(interval);
  }, [pix?.id]);

  function copyPixCode() {
    if (!pix?.qrCode) return;

    navigator.clipboard.writeText(pix.qrCode);
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Pagamento PIX</h2>

        {/* TOTAL */}
        <div className="text-center mb-6">
          <p className="text-gray-500">Total da venda</p>

          <p className="text-3xl text-black font-bold">
            {totalSale.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        {/* GERAR PIX */}
        {!pix && (
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={createPixPayment}
              disabled={loading || totalSale <= 0}
              className="w-full bg-green-600 hover:bg-green-700
                         text-white font-semibold py-3 rounded-lg
                         disabled:opacity-50"
            >
              {loading ? "Gerando PIX..." : "Gerar pagamento PIX"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-200 hover:bg-gray-300
                         py-3 rounded-lg"
            >
              Voltar
            </button>
          </div>
        )}

        {/* PIX GERADO */}
        {pix && (
          <div className="flex flex-col items-center">
            <p className="text-center font-semibold mb-4">
              Escaneie o QR Code para pagar
            </p>

            {/* QR CODE */}
            {pix.qrCodeBase64 && (
              <img
                src={`data:image/png;base64,${pix.qrCodeBase64}`}
                alt="QR Code PIX"
                className="w-64 h-64 object-contain"
              />
            )}

            {/* STATUS */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">Aguardando pagamento...</p>

              {checking && (
                <p className="text-sm text-gray-400 mt-1">
                  Verificando pagamento...
                </p>
              )}
            </div>

            {/* COPIA E COLA */}
            {pix.qrCode && (
              <div className="w-full mt-6">
                <label className="block text-sm font-medium mb-2">
                  PIX copia e cola
                </label>

                <textarea
                  value={pix.qrCode}
                  readOnly
                  className="w-full h-24 p-3 border rounded-lg
                             text-xs resize-none bg-gray-50"
                />

                <button
                  type="button"
                  onClick={copyPixCode}
                  className="w-full mt-2 bg-blue-600
                             hover:bg-blue-700 text-white
                             py-3 rounded-lg"
                >
                  Copiar código PIX
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onBack}
              className="w-full mt-6 bg-gray-200
                         hover:bg-gray-300 py-3 rounded-lg"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
