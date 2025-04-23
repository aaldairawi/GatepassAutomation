
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class PrintGatePassContainerDto
    {
        [Length(11, 11)]
        public string ContainerNumber { get; set; } = string.Empty;
        public string TransactionDate { get; set; } = string.Empty;
        // public string GatePassValidity { get; set; } = string.Empty;

        [Length(3, 3)]
        public string DeliveryType { get; set; } = string.Empty;
        public string Consignee { get; set; } = string.Empty;
        [Length(6, 6)]
        public string InvoiceNumber { get; set; } = string.Empty;
        public string GrossWeight { get; set; } = string.Empty;
        [Length(2, 2)]
        public string ContainerLength { get; set; } = string.Empty;
        [Length(4, 5)]
        public string ContainerFreightStatus { get; set; } = string.Empty;
        [Length(6, 6)]
        public string ContainerCategory { get; set; } = string.Empty;
        public string LineId { get; set; } = string.Empty;
        public string ContainerIsoCode { get; set; } = string.Empty;
        public string CustomerContract { get; set; } = string.Empty;

        public string FinalValidityDate { get; set; } = string.Empty;
        public string ContainerYardLocation { get; set; } = string.Empty;
        public string Berth {get; set;} = string.Empty;
        public string DeliveryOrderDate {get; set;} = string.Empty;
        public PrintGatePassContainerDto()
        {

        }
        public PrintGatePassContainerDto(string containerNumber, string transactionDate, string consignee, string invoiceNumber, string grossWeight,
        string containerLength, string freightStatus,
        string containerCategory,
        string lineId, string isoCode,
        string finalValidDate, string customerContract, string containerYardLocation, string berth, string deliveryOrderDate)
        {
            ContainerNumber = containerNumber; TransactionDate = transactionDate;
            Consignee = consignee; InvoiceNumber = invoiceNumber;
            GrossWeight = grossWeight; ContainerLength = containerLength; ContainerFreightStatus = freightStatus;
            ContainerCategory = containerCategory; LineId = lineId; ContainerIsoCode = isoCode;
            FinalValidityDate = finalValidDate; CustomerContract = customerContract;
            ContainerYardLocation = containerYardLocation; Berth = berth; DeliveryOrderDate = deliveryOrderDate;
        }

    }

}