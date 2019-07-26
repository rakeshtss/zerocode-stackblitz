export interface PageInstructions {
  definition: {
    widgets?: PageInstructions[];
    styleClass?: string;
    breadcrumb?: any[];
    onLoad?: {
      actions?: any[];
    };
  };
  info: {
    type: string;
  };
}
