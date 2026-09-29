"use client";
import React, { Dispatch, SetStateAction } from "react";
import { TItemsSale } from "@/app/models/TSale";
import { TResponseImages } from "@/app/models/TItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  itemsSale: TItemsSale[];
  setItemsSale: Dispatch<SetStateAction<TItemsSale[]>>;
  onBack: () => void;
  onNext: () => void;
  responseImages: TResponseImages[];
};

export default function ItemsInTheCardForm({
  itemsSale,
  setItemsSale,
  onBack,
  onNext,
  responseImages,
}: Props) {
  const quantityTotal = itemsSale.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const totalSale = itemsSale.reduce(
    (total, item: any) => total + item.tItem,
    0,
  );

  function findImageItem(saleItem: TItemsSale) {
    const image = responseImages.find((img) => img.idItem === saleItem.item.id);
    return image?.fileName ?? null;
  }

  function increaseQuantity(itemId: number) {
    setItemsSale((prev: TItemsSale[]) =>
      prev.map((saleItem) => {
        if (saleItem.item.id !== itemId) {
          return saleItem;
        }
        const newAmount = saleItem.amount + 1;
        return {
          ...saleItem,
          amount: newAmount,
          tItem: saleItem.price * newAmount,
        };
      }),
    );
  }

  function decreaseQuantity(itemId: number) {
    setItemsSale((prev: TItemsSale[]) =>
      prev.map((saleItem) => {
        if (saleItem.item.id !== itemId) {
          return saleItem;
        }
        const newAmount = Math.max(1, saleItem.amount - 1);
        return {
          ...saleItem,
          amount: newAmount,
          tItem: saleItem.price * newAmount,
        };
      }),
    );
  }

  function removeItem(itemId: number) {
    setItemsSale((prev) =>
      prev.filter((saleItem) => saleItem.item.id !== itemId),
    );
  }

  return (
    <>
      {/* <p className="text-amber-50">{JSON.stringify('')}</p> */}
      <div className="w-full p-4">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Itens no Carrinho</h2>
          <p className="text-sm text-gray-500">
            Confira os produtos antes de escolher a forma de pagamento.
          </p>
        </div>
        {/* Carrinho vazio */}
        {itemsSale.length === 0 ? (
          <div className="rounded-lg border p-8 text-center">
            <p className="mb-4 text-gray-500">O carrinho está vazio.</p>
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Voltar para produtos
            </button>
          </div>
        ) : (
          <>
            {/* Lista dos produtos */}
            <div className="space-y-3">
              {itemsSale.map((saleItem) => (
                <div
                  key={saleItem.item.id}
                  className=" flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  {/* Imagem */}
                  <div className="flex-shrink-0">
                    {saleItem.item.id ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_IMG}/${saleItem.item.id}/${findImageItem(saleItem)}`}
                        alt={saleItem.item.name}
                        className=" h-20 w-20 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  {/* Informações */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-800">
                      {saleItem.item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Código: {saleItem.item.id}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      R$ {saleItem.price.toFixed(2)} / unidade
                    </p>
                  </div>
                  {/* Quantidade */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-900">Quantidade:</span>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="cursor-pointer text-sm m-1 text-black"
                      onClick={() => decreaseQuantity(saleItem.item.id)}
                    >
                      <RemoveIcon titleAccess="Remover" fontSize="medium"/>
                    </button>
                    <span className="min-w-1 rounded bg-gray-500 px-3 py-2 text-center font-semibold">
                      {saleItem.amount}
                    </span>
                    <button
                      type="button"
                      className="cursor-pointer text-sm m-1 text-black"
                      onClick={() => increaseQuantity(saleItem.item.id)}
                    >
                      <AddIcon titleAccess="Adicionar" fontSize="medium"/>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(saleItem.item.id)}
                      className="p-1 ml-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-md"
                      title="Excluir item"
                    >
                      <DeleteForeverIcon
                        titleAccess="Deletar"
                        fontSize="medium"
                      />
                    </button>
                  </div>
                  {/* Total do item */}
                  <div className=" min-w-[120px] text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-black">
                      R$ {saleItem.tItem?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Resumo */}
            <div className=" mt-6 rounded-lg border bg-gray-50 p-5">
              <div className=" flexflex-col gap-3 sm :flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Quantidade de itens</p>
                  <p className="text-lg font-semibold text-black">
                    {quantityTotal}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">Total da Venda</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {totalSale.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            {/* Navegação */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              {/* Voltar */}
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Voltar
              </button>
              {/* Continuar */}
              <button
                type="button"
                disabled={itemsSale.length === 0}
                onClick={onNext}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Escolher pagamento
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
