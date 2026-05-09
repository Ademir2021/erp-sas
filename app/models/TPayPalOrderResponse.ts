export type TPayPalOrderResponse = {
    id: string;
    status: "CREATED" | "COMPLETED" | "APPROVED" | "VOIDED" | "PAYER_ACTION_REQUIRED";
    links: PayPalLink[];
};

type PayPalLink = {
    href: string;
    rel: "self" | "approve" | "update" | "capture";
    method: "GET" | "POST" | "PATCH";
};