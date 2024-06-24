import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { logOutgoingRequest, logIncomingResponse } from "./logging";

export const sendOutgoingRequest = async (
    url: string,
    method: string,
    headers: Record<string, any> = {},
    data: any = null
): Promise<AxiosResponse<any>> => {
    logOutgoingRequest(url, method);

    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        headers,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        logIncomingResponse(response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>;
            logIncomingResponse(axiosError.response);
            throw axiosError;
        } else throw error;
    }
};
