export interface ZcDataListConfig {
  title?: string;
  properties?: Properties;
  cols?: Array<Cols>;
  actions?: Actions;
  id?: string;
  cssClass?: string;
  uid?: string;
  hiddenList?: boolean;
  events?:{
    onLoad?:any;
  }
}

interface Properties {
  groupRow?: {
    keys?: string[];
  };
  hideTitle?: boolean;
  pagination?: {
    autoScroll?: boolean;
    virtualRowHeight?: any; // if auto scroll
    scrollHeight?: string; // if atuo scroll
    size?: number;
    position?: string; // top | bottom | both
    displayFormat?: string;
    style?: string;
  };
  type?: string; // table | card
  cardTemplate?: string;
  cardTemplateJson?: any;
  kanban?: {
    style?: string; // row | column
    field?: string;
    dataSource?: string;
    dropConfirmation?: {
      needConfirmation?: boolean;
      confirmTitle?: string;
      confirmMsg?: string;
    };
  };
  dataSource?: string;
  api?: any;
  lazy?: boolean; // if it is true then hits service call, if not then won't hits service call
  langProps?: {};
  globalFilter?: {
    label?: string;
    position?: string;
  };
  filter?: {
    title?: string;
    type?: string; // column | advanced
    position?: string; // left | top | right
    cssClass?: string;
    cssStyle?: string;
    submissionMode?: string; // individual | all
    action?: {
      position?: string; // bottom | top
      submit?: {
        label?: string;
      };
      reset?: {
        label?: string;
      };
    };
  };
  defaultOrder?: Array<DefaultOrder>;
  styling?: Styling;
  shrinkToFit?: boolean;
  groupHeader?: Array<GroupHeader>;
  noDataText?: string;
  rowSelection?: {
    display?: boolean;
    type?: string; // checkbox | row
    rowspan?: number;
    action?:Item;
    disableCondition?: {
      fieldName?: string;
      value?: string;
    };
  };
}
interface DefaultOrder {
  key?: string;
  order?: string; // 'DESC' | 'ASC'
  fixed?: boolean;
};
interface Styling {
  container?: {
    cssStyle?: string;
    cssClass?: string;
    bgColor?: string;
    fgColor?: string;
    font?: string;
  };
  header?: {
    cssStyle?: string;
    cssClass?: string;
    frozen?: boolean;
  };
  freezeColumn?: number; // no of columns to freeze
  row?: {
    cssStyle?: string;
    cssClass?: string;
    evenColor?: string;
    oddColor?: string;
    mouseOverColorSource?: string;
    bgColorSource?: string;
  };
}

interface GroupHeader {
  title?: string;
  columns?: any[];
  cssStyle?: string;
  cssClass?: string;
}

interface Cols {
  label?: string;
  name?: string;
  type?: string;
  width?: string;
  sort?: boolean;
  sortByName?: string; //if sortByname else name
  hidden?: boolean;
  hideLabel?: boolean;
  hideValue?: boolean;
  displayStyle?: {
    type?: string; // style attr
    source?: string; // column key
  };
  displayFormat?: string;
  fontColorSource?: string;
  bgColorSource?: string;
  prefix?: Array<Prefix>;
  suffix?: Array<Suffix>;
  order?: number; // Not doing now
  filter?: Filter;
  cssStyle?: string;
  toolTip?: string;
  target?: any;
  action?: Action;
}

interface Prefix {
  iconSource?: string;
  colorSource?: string;
  condition?: any;
}

interface Suffix {
  iconSource?: string;
  colorSource?: string;
  condition?: any;
}

interface Filter {
  required?: boolean;
  type?: string;
  dataSource?: string;
  dataLabel?: string;
  dataValue?: string;
  fieldNames?: string;
}

interface Action {
  type?: string;
  label?: string;
  styling?: any;
  api?: Api;
  component?: Component;
  page?: Page;
}

interface ActionStyling {
  icon?: string;
  tooltip?: string;
  cssStyle?: string;
  cssColor?: string;
}

interface Api {
  url?: string;
  method?: string;
  needConfirmation?: boolean;
  confirmTitle?: string;
  confirmMsg?: string;
}
interface Component {
  id?: string;
  type?: string; // modal | inline
  hideParent?: boolean;
  title?: string;
}
interface Page {
  url?: string;
  type?: string; // internal | external
  target?: string;
}

export interface Actions {
  group?: GroupActions;
  row?: RowActions;
}

interface GroupActions {
  displayStyle?: string; // dropdown | button | menu
  items?: Array<Item>;
}

interface RowActions {
  displayStyle?: string; // dropdown | button | menu
  items?: Array<Item>;
}

interface Item {
  type?: string; // api | component | page
  label?: string;
  conditions?: any;
  styling?: {
    cssStyle?: string;
    tooltip?: string;
    icon?: string;
    cssColor?: string;
  };
  api?: Api;
  component?: Component;
  page?: Page;
  disableCondition?: any;
}

export let ZcDatalistDefaultOptions: ZcDataListConfig = {};
