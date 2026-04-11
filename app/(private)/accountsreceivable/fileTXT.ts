import { TAccountsReceivable, TReceipt } from '@/app/models/TAccountsReceivable';
import { v4 as uuidv4 } from 'uuid';

function bodyReceipt(rec: TAccountsReceivable | any, receipt: TReceipt) {
    const line = "=".repeat(50);
    const divider = "-".repeat(50);
    const formatMoney = (value: number = 0) =>
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const safe = (value: any, fallback = "N/A") =>
        value ?? fallback;
    const receiptTXT = `${safe(process.env.NEXT_PUBLIC_SDK_COMPANY)}
CNPJ: ${safe(process.env.NEXT_PUBLIC_SDK_CNPJ)}
Contato: ${safe(process.env.NEXT_PUBLIC_SDK_PHONE)}

${line}
                    RECIBO
${line}

Recibo.....: ${uuidv4()}
Conta......: ${String(rec?.id ?? 0).padStart(6, '0')}
Venda......: ${String(rec?.sale?.id ?? 0).padStart(6, '0')}
Usuário....: ${safe(rec?.user?.name)}

Data.......: ${new Date().toLocaleDateString('pt-BR')}
Valor......: ${formatMoney(receipt?.receipt)}

${divider}
Descrição..: ${safe(rec?.descriptionTypeOperation || rec?.observations)}
${divider}

Cliente....: ${safe(rec?.payer?.name)}
Documento..: ${safe(rec?.payer?.cpf || rec?.payer?.cnpj)}

${line}
          Obrigado pela preferência!
${line}
`;

    return receiptTXT.trim();
}

export const txtValueReceived = (data: any, fileName: string, receipt: TReceipt) => {
    const blob = new Blob([bodyReceipt(data, receipt)], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
};