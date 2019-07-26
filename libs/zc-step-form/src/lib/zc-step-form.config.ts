export interface StepFormConfig {
  id?: string;
  uid?: string;
  params?: any;
  model?: any;
  mode?: any;
  properties?: {
    displayStyle: string; // vertical horizontal
    isLinear?: boolean;
    hideNavigator?: boolean; // hide next previous
    preFillApi?: any;
  };
  steps?: Step[];
}
export interface Step {
  id?: any;
  title?: string;
  icon?: string;
  description?: string;
  fields?: any;
  disabled?: boolean;
  conditions?: {
    hidden?: string;
  };
}

export const DefaultOptions: StepFormConfig = {
  properties: {
    displayStyle: 'horizontal',
    isLinear: true,
    hideNavigator: false
  },
  steps: []
};
