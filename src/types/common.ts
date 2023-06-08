export type ApiResponse<T = {}> = {
  /**
   * @example success
   */
  message: string;
  data: T;
};
