import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IPrintGatePassDataDto } from "../models/dailyFinalizedInvoice";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 100));

// axios.defaults.baseURL = "http://localhost:5000/api/";

axios.defaults.baseURL = "/api/";

const responseBody = (axiosResponse: AxiosResponse) => axiosResponse.data;
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },

  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title, { autoClose: 200 });
        break;
      case 404:
        toast.error(data.title, { autoClose: 500 });
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error("Server error", { autoClose: 200 });
        break;
      default:
        break;
    }
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const FinalizedInvoices = {
  getAllFinalizedInvoicesByCreator: (invoiceCreator: string) =>
    requests.get(`finalizedinvoices?invoiceCreator=${invoiceCreator}`),
  getInvoiceDetails: (draftNumber: string) =>
    requests.get(`finalizedInvoices/invoicedetails/${draftNumber}`),
  fetchSingleInvoiceAsync: (draftNumber: string) =>
    requests.get(`finalizedInvoices/singleInvoice/${draftNumber}`),
};

const PrintFinalizedGatePass = {
  printFinalizedGatePass: (data: IPrintGatePassDataDto) =>
    requests.post("printGatePass", data),
  printForcedFinalizedGatePass: (data: IPrintGatePassDataDto) =>
    requests.post("printGatePass/forcegatepass", data),
};

const agent = { FinalizedInvoices, PrintFinalizedGatePass };

export default agent;
