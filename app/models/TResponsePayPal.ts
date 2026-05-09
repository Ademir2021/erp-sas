export type  TResponsePayPal = {
  id: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link[];
}

export type  PaymentSource = {
  paypal: Paypal;
}

export type  Paypal = {
  email_address: string;
  account_id: string;
  account_status: string;
  name: Name;
  tax_info: TaxInfo;
  address: Address;
}

export type  Name = {
  given_name: string;
  surname: string;
}

export type  TaxInfo = {
  tax_id: string;
  tax_id_type: string;
}

export type  Address = {
  country_code: string;
}

export type  PurchaseUnit ={
  reference_id: string;
  payments: Payments;
}

export type  Payments = {
  captures: Capture[];
}

export type  Capture = {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: string;
  update_time: string;
}

export type  Amount = {
  currency_code: string;
  value: string;
}

export type  SellerProtection = {
  status: string;
  dispute_categories: string[];
}

export type  SellerReceivableBreakdown = {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

export type  Link = {
  href: string;
  rel: string;
  method: string;
}

export type  Payer = {
  name: Name;
  email_address: string;
  payer_id: string;
  address: Address;
}