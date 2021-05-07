export interface UseCase<T, IResponse> {
  execute(args: T): Promise<IResponse> | IResponse;
}
