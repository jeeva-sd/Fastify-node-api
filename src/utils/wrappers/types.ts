export interface RequestX  {
  parameters?: any;
}

export interface ResponseX {
  version: string;
  status: string;
  code: number;
  message: string | null;
  data: any;
  options?: any;
  error?: any;
}