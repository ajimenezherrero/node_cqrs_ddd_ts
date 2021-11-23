export interface UseCase<IResponse> {
  execute(...args: unknown[]): Promise<IResponse> | IResponse;
}
