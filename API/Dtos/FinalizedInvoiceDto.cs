namespace API.Dtos
{
    public class FinalizedInvoiceDto
    {
        public string DraftNumber { get; set; } = string.Empty;
        public string FinalNumber { get; set; } = string.Empty;
        // No need for the payee , just get the customer gkey.
        public string? ContractCutomerGkey { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;
        public string PayeeName { get; set; } = string.Empty;
        public string Created { get; set; } = string.Empty;
        public string InvoiceType { get; set; } = string.Empty;
        public string InvoiceStatus { get; set; } = string.Empty;
        public bool InvoicePrintedAlready { get; set; } = false;

        public FinalizedInvoiceDto()
        {

        }
        public FinalizedInvoiceDto(string draftNumber, string finalNumber, string? contractCustomerGkey, string creator,
        string payeeName, string created, string invoiceType, string invoiceStatus)
        {
            DraftNumber = draftNumber; FinalNumber = finalNumber; ContractCutomerGkey = contractCustomerGkey;
            Creator = creator; PayeeName = payeeName; Created = created; InvoiceType = invoiceType;
            InvoiceStatus = invoiceStatus;

        }

    }
}