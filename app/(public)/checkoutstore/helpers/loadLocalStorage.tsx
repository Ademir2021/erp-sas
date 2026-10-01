import { TItemsSale } from "@/app/models/TSale";

export class LoadLocalStorge {
  loadsetLocalStorage(setItemsSale: Function) {
    const savedItems = localStorage.getItem("itemsSale");
    if (savedItems) {
      setItemsSale(JSON.parse(savedItems));
    }
  };

  loadgetLocalStorage(itemsSale: TItemsSale[]) {
    if (itemsSale.length > 0) {
      localStorage.setItem("itemsSale", JSON.stringify(itemsSale));
    } else {
      localStorage.removeItem("itemsSale");
    }
    // Dispara um evento personalizado para notificar outros componentes sobre a atualização
     window.dispatchEvent(new Event("itemsSaleUpdated"));
  }
}
