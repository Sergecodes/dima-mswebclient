import "axios";

declare module "axios" {
  // allow our custom flag everywhere a config is accepted
  export interface AxiosRequestConfig<D = any> {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}