namespace API.Dtos
{
    public class SavePrintedGatePassDataDto
    {
        public string ContainerNumber { get; set; } = string.Empty;
        public string Berth { get; set; } = string.Empty;
        public string DraftNumber { get; set; } = string.Empty;
        public string GatePassPrintDate { get; set; } = string.Empty;
        public string GatePassPrintUser { get; set; } = string.Empty;

        public SavePrintedGatePassDataDto(string containerNumber, string berth, string draftNumber, string gatePassPrintDate, string gatePassPrintUser)
        {
            ContainerNumber = containerNumber; Berth = berth; DraftNumber = draftNumber; GatePassPrintDate = gatePassPrintDate; GatePassPrintUser = gatePassPrintUser;
        }
    }
}