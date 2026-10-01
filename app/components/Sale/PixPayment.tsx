"use client";
import { TItemsSale } from "@/app/models/TSale";
import { TResponsePixQRCode } from "@/app/models/TPagSeguroPix";
import { MsgMethodPay } from "./helpers/MsgMethodPay";

type Props = {
  itemsSale: TItemsSale[];
  onBack: () => void;
  onComplete: () => void;
  onError: () => void;
  totalSale: number;
  msg: string;
  qrcode: TResponsePixQRCode;
  handleSubmitPix: any;
};

export default function PixPayment({
  itemsSale,
  onBack,
  onComplete,
  onError,
  totalSale,
  msg,
  qrcode,
  handleSubmitPix,
}: Props) {

  
     const qrCodeValue = qrcode.qr_codes[0].amount.value;

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl text-gray-950 font-bold text-center mb-6">
          Pagamento PIX
        </h2>

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

        {/**Gerar PIX */}
        <div className="flex justify-center mt-6 mb-4">
          {qrcode.qr_codes[0].text && (
            <div className="bg-gray-800 p-4 rounded-2xl shadow-lg w-full max-w-md text-center">
              {/* Título */}
              <h2 className="text-white text-lg font-semibold mb-3">
                Pagamento via PIX
              </h2>
              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <img
                  className="rounded-lg border border-gray-600"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrcode.qr_codes[0].text)}`}
                  alt="QR Code PIX"
                />
              </div>
              {/* Código copia e cola */}
              <div className="bg-gray-900 p-2 rounded-lg text-xs text-gray-300 break-all mb-3 max-h-24 overflow-y-auto">
                {qrcode.qr_codes[0].text}
              </div>
              {/* Botão copiar */}
              <button
                onClick={() =>
                  navigator.clipboard.writeText(qrcode.qr_codes[0].text)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Copiar código PIX
              </button>
            </div>
          )}
        </div>
        {/**PIX */}
        {qrCodeValue > 0 && (
          <div className="flex justify-center text-blue-500 mt-2">
            Valor do PIX: R$ $
            {(qrCodeValue / 100).toFixed(2)}
          </div>
        )}

        {!!!qrCodeValue && (
          <button
            className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
            onClick={handleSubmitPix}
          >
            Gerar PIX
          </button>
        )}
          <MsgMethodPay msg={msg} />
        <button
          type="button"
          onClick={onBack}
          className="w-full mt-6 bg-gray-200
                         hover:bg-gray-300 py-3 rounded-lg"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
