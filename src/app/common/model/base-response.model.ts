export class BaseResponseModel<T> {
    Data!: T;
    dataList!: T[];
    Message!: string;
    Success!: boolean;
    TotalCount!: number;
    Pages!: number;
    CurrentPage!: number;
    PageSize!: number;
    HasPrevious!: boolean;
    HasNext!: boolean;
    StatusCode!: number;
}