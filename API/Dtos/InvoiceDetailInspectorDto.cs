
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class InvoiceDetailInspectorDto
    {

        [Length(11, 11)]
        public string ContainerNumber { get; set; } = string.Empty;
        public string ContainerLocation { get; set; } = string.Empty;

        public string GatePassValidity { get; set; } = string.Empty;
        public string Consignee { get; set; } = string.Empty;
        [Length(6, 6)]
        public string InvoiceNumber { get; set; } = string.Empty;

        [Length(2, 2)]
        public string ContainerLength { get; set; } = string.Empty;
        [Length(4, 5)]
        public string ContainerFreightStatus { get; set; } = string.Empty;
        [Length(6, 6)]
        public string ContainerCategory { get; set; } = string.Empty;
        public string LineId { get; set; } = string.Empty;
        public string ActiveHold { get; set; } = string.Empty;
        public string Berth { get; set; } = string.Empty;
        public InvoiceDetailInspectorDto()
        {

        }

        public InvoiceDetailInspectorDto(string containerNumber, string containerLocation, string gatePassValidity,
        string consignee, string invoiceNumber, string containerLength, string freightStatus, string containerCategory,
        string lineId, string activeHold, string berth)
        {
            ContainerNumber = containerNumber; 
            ContainerLocation = containerLocation; 
            GatePassValidity = gatePassValidity;
            Consignee = consignee; 
            InvoiceNumber = invoiceNumber; 
            ContainerLength = containerLength; ContainerFreightStatus = freightStatus;
            ContainerCategory = containerCategory; LineId = lineId; 
            ActiveHold = activeHold; Berth = berth;
        }

    }


}