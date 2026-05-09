"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
    amount: string | number;
    onSuccess: (data: any) => void;
    orderSuccess: (data: any) => void;
}

export default function SubmitPayment({
    amount,
    onSuccess,
    orderSuccess
}: Props) {
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: "BRL",
                intent: "capture",
                components: "buttons,card-fields",
            }}
        >
            <div className="w-full max-w-md mx-auto">
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        shape: "rect",
                        label: "pay",
                    }}
                    createOrder={async () => {
                        const response = await fetch("/api/paypal/create-order", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "BRL",
                                            value: amount,
                                        },
                                    },
                                ],
                                application_context: {
                                    shipping_preference: "NO_SHIPPING",
                                    user_action: "PAY_NOW",
                                    brand_name: "Meu ERP",
                                    landing_page: "BILLING",
                                },
                            }
                            ),
                        });

                        const order = await response.json();
                        if (order)
                            orderSuccess(order)
                        return order.id;

                    }}
                    onApprove={async (data) => {
                        const response = await fetch("/api/paypal/capture-order", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                orderID: data.orderID,
                            }),
                        });

                        const details = await response.json();
                        if (onSuccess)
                            onSuccess(details)

                    }}
                    onError={(err) => {
                        console.error("Erro PayPal:", err);
                        alert("Erro ao processar pagamento");
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}