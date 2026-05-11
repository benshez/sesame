
export interface IController<TRequest = unknown, TResponse = unknown> {
  Id?: string,
  ControllerRequest?: TRequest;
  ControllerResponse?: TResponse;
}