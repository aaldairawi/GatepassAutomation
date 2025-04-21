export interface IDailyFinalizedInvoiceDto {
  draftNumber: string;
  finalNumber: string;
  contractCutomerGkey: string;
  creator: string;
  payeeName: string;
  created: string;
  invoiceType: string;
  invoiceStatus: string;
  invoicePrintedAlready: boolean;
}

export interface IInvoiceDetailDto {
  containerNumber: string;
  containerLocation: string;
  gatePassValidity: string;
  consignee: string;
  invoiceNumber: string;
  containerLength: string;
  containerFreightStatus: string;
  containerCategory: string;
  lineId: string;
  activeHold: string;
  berth: string;
}


export interface IPrintGatePassDataDto {
  draftNumber: string;
  customerContractGkey: string;
  user: string;
} 
