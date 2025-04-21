namespace API.Queries
{
    public static class SQL_Daily_Invoice_Queries
    {

        public static string GetDailyInvoicesCreatedByUser()
        {
            return @"
             SELECT 
                bil_invoices.draft_nbr AS DraftNumber,
                bil_invoices.final_nbr AS FinalNumber,
                bil_invoices.creator AS Creator,
                billing_customer_payee.id AS PayeeName,
                bil_invoices.contract_customer_gkey AS ContractCustomerGkey,
                bil_invoices.created AS Created,
                bil_invoices.status AS InvoiceStatus,
                bil_invoice_type.id AS InvoiceType
                    
            FROM bil_invoices
            INNER JOIN 
                bil_customer AS billing_customer_payee ON bil_invoices.payee_customer_gkey = billing_customer_payee.gkey
            INNER JOIN
	            bil_invoice_type ON bil_invoices.invtype_gkey = bil_invoice_type.gkey
            WHERE  
                CONVERT(DATE, GETDATE()) = CONVERT(DATE,bil_invoices.created) AND      
                bil_invoices.creator = @invoiceCreator AND
                bil_invoices.status = 'FINAL' AND
	            (SUBSTRING(billingnavis.dbo.bil_invoice_type.id, 1, 2) IN ('C1','C8', 'D1','D2'))
	            ORDER BY Created DESC;";
        }
        // 2024-09-26 
        // 
        //            YEAR(DATEADD(day, -1, GETDATE()))  = YEAR(CONVERT(DATE,bil_invoices.created)) AND 
        //          MONTH(DATEADD(day, -1, GETDATE())) = MONTH(CONVERT(DATE, bil_invoices.created)) AND
        //        DAY(DATEADD(day, -1, GETDATE() )) = DAY(CONVERT(DATE,bil_invoices.created)) AND
        // CONVERT(DATE, GETDATE()) = CONVERT(DATE,bil_invoices.created)
        public static string GetSingleFinalizedInvoiceByDraftNumber()
        {
            return @"
             SELECT 
                bil_invoices.draft_nbr AS DraftNumber,
                bil_invoices.final_nbr AS FinalNumber,
                bil_invoices.creator AS Creator,
                billing_customer_payee.id AS PayeeName,
                bil_invoices.contract_customer_gkey AS ContractCustomerGkey,
                bil_invoices.created AS Created,
                bil_invoices.status AS InvoiceStatus,
                bil_invoice_type.id AS InvoiceType     
            FROM bil_invoices
            INNER JOIN 
                bil_customer AS billing_customer_payee ON bil_invoices.payee_customer_gkey = billing_customer_payee.gkey
            INNER JOIN
	            bil_invoice_type ON bil_invoices.invtype_gkey = bil_invoice_type.gkey
            WHERE
            bil_invoices.draft_nbr = @invoiceDraftNumber AND bil_invoices.status = 'FINAL' AND
	            (SUBSTRING(billingnavis.dbo.bil_invoice_type.id, 1, 2) IN ('C1','C8', 'D1','D2'))
	            ORDER BY Created DESC;";
        }
        public static string GetInvoiceItemDetails()
        {
            return @"SELECT 
                        id AS ContainerNumber, 
                        ValidityDate AS GatePassValidity,
                        bil_customer AS Consignee, 
                        UnitLength AS ContainerLength, 
                        last_pos_slot AS ContainerLocation,
                        freight_kind AS ContainerFreightStatus, 
                        category AS ContainerCategory, 
                        LineOperator AS LineId, 
                        ActiveHold AS ActiveHold,
                        Berth AS Berth
                        FROM gatePass_fullData
                    WHERE draft_nbr = @draftNumber;";
        }
        public static string GetInvoicePrintedAlready()
        {
            return "SELECT draft_nbr AS DraftNumber FROM bgt_GatePass WHERE draft_nbr = @draftNumber";
        }


    }
}