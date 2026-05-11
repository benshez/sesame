export interface IController<TRequest = unknown, TResponse = unknown, TService = unknown> {
  Id?: string,
  ControllerRequest?: TRequest;
  ControllerResponse?: TResponse;
  ControllerService?: TService;
}