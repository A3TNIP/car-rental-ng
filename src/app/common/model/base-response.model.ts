export class BaseResponseModel<T> {
    data!: T;
    dataList!: T[];
    message!: string;
    isSuccess!: boolean;
    totalCount!: number;
    pages!: number;
    currentPage!: number;
    pageSize!: number;
    hasPrevious!: boolean;
    hasNext!: boolean;
    statusCode!: number;
}
