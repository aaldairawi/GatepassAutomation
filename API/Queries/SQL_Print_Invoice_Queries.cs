
namespace API.Queries
{
    public static class SQL_Print_Invoice_Queries
    {
        public static string GetInvoiceContainersToPrint()
        {
            return @"SELECT id AS ContainerNumber, 
                    ValidityDate AS GatePassValidity,
                    bil_customer AS Consignee, draft_nbr AS InvoiceNumber , Grosswhigt AS GrossWeight,
                    UnitLength AS ContainerLength, freight_kind AS ContainerFreightStatus, 
                    TimeInOfUnit AS ContainerTimeIn,
                    category AS ContainerCategory, LineOperator AS LineId, ISO_CODE AS ContainerIsoCode
                    FROM gatePass_fullData
                    WHERE draft_nbr = @draftNumber AND ValidityDate IS NOT NULL AND ActiveHold IS NULL;";
        }
    
        public static string ForceGatePassPrint()
        {
            return @"SELECT id AS ContainerNumber, 
                    ValidityDate AS GatePassValidity,
                    bil_customer AS Consignee, 
                    draft_nbr AS InvoiceNumber , 
                    Grosswhigt AS GrossWeight,
                    UnitLength AS ContainerLength, 
                    freight_kind AS ContainerFreightStatus, 
                    TimeInOfUnit AS ContainerTimeIn,
                    category AS ContainerCategory, LineOperator AS LineId, ISO_CODE AS ContainerIsoCode
                    FROM gatePass_fullData
                    WHERE draft_nbr = @draftNumber;";
        }

        public static string DetermineIfContainerIsInterchangeOrStripped()
        {
            return @"SELECT TOP 1 equipment_id FROM argo_chargeable_unit_events
                WHERE last_draft_inv_nbr = @draftNumber AND status = 'INVOICED'
		        AND equipment_id = @containerNumber AND event_type = 'BGT_INTERCHANGE';";
        }

        public static string SaveGatePassAfterPrinting()
        {
            return @"INSERT INTO bgt_GatePass (id, Berth, draft_nbr, GatePassPrintDate, GatePassPrintUser) 
                        VALUES (@containerNumber, @berth, @draft_nbr, @gatePassPrintDate, @gatePassPrintUser)";
        }

        public static string GetCustomerContractName()
        {
            return @"SELECT name AS CustomerName FROM bil_customer WHERE gkey = @customerContractGkey;";

        }


    }
}