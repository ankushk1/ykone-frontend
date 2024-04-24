import axios, { AxiosRequestConfig } from "axios";

async function apiCall(
  url: string,
  method: string = "GET",
  headers: any = {},
  data: any = null
): Promise<any> {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data
    } as AxiosRequestConfig);
    return response;
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    return new Error(errorMessage);
  }
}

export default apiCall;

