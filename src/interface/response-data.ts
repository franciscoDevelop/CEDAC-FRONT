export interface ResponseData<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}
