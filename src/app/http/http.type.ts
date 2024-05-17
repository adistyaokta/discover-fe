export type BaseResponse<T> = {
  result: never[];
  statusCode: number;
  message: string | null;
  data: T;
};

export type BaseGetAllResponse<T> = BaseResponse<{
  count: number;
  countAll: number;
  totalPage: number;
  result: T;
}>;
