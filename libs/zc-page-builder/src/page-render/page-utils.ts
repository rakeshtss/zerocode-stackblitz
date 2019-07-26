export interface PageInstructions {
  definition: {
    widgets?: PageInstructions[];
    [additional: string]: any;
  };
  info: {
    type: string;
    [additional: string]: any;
  };
}
export interface PageConfig {
  widgets?: PageInstructions[];
}
