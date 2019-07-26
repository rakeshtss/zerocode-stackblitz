export interface FormConfig {
  id: string;
  title?: string;
  fields?: Field[];
  conditions?: {
    title?: string;
  };
  properties?: {
    hideTitle?: boolean;
    preFillApi?: {
      params?: Param[];
      method?: any;
      url?: string;
    };
    afterSubmit?: string;
  };
  mode?: string; // none view
  params?: any;
  uid?: string;
  model?: any;
}
export interface Field {
  id?: string;
  containerClass?: string;
  defaultValue?: any;
  fieldClass?: string;
  label?: string;
  name?: string;
  properties?: Properties;
  template?: string;
  conditions?: {
    hidden?: string;
    hiddenValue?: any; // selected dropdown hidden
    [additional: string]: any; // label min max
  };
  dataSource?: {
    type?: string; // api
    api?: {
      url?: string;
      method?: string;
      dependents?: Key[];
      map?: {
        value?: string;
        label?: string;
      };
    };
    options: [];
  };
  action?: {
    type?: string; // api component  page
    needConfirmation?: boolean; // confirm msg
    confirmMsg?: string;
    api?: {
      // if type api
      method?: string;
      url?: string;
      params?: Param[];
    };
    component?: {
      // if type component
      id?: string; // component id
      method?: string; // component methods ex: if component type list (method : reload )
    };
    page?: {
      // if type page
      url?: string;
      type?: string; // internal || external
      target?: string; // self
    };
  };
  actions?: [];
  type?: string;
  events?: {};
  fieldItems?: Field[];
  [additional: string]: any;
}
export interface Properties {
  placeholder?: string;
  required?: boolean;
  displayStyle?: string;
  [additional: string]: any;
}
export interface Param {
  type?: string; // string, array, none
  name?: string;
  value?: string;
  keys?: Key[];
}

export interface Key {
  name?: string;
  value?: string;
}
