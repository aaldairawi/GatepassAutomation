import { useEffect } from "react";
import GatePass from "../../app/components/GatePass";
import { IGatePass } from "../../app/models/printGatePassContainer";
import { useAppDispatch } from "../../app/store/configureStore";
import { setShowPrintLayoutToFalse } from "./printFinalizedInvoiceSlice";

interface Props {
  items: IGatePass[];
}

const GatePassPrintList: React.FC<Props> = ({ items }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBeforePrint = () => {
      console.log("Preparing to print...");
    };

    const handleAfterPrint = () => {
      dispatch(setShowPrintLayoutToFalse());
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    const timeout = setTimeout(() => {
      window.print();
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [dispatch]);

  return (
    <>
      {items.map((invoice) => (
        <GatePass invoice={invoice} key={invoice.containerNumber} />
      ))}
    </>
  );
};

export default GatePassPrintList;
