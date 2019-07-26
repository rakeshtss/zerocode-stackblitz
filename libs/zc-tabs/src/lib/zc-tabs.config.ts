export interface ZcTabsConfig {
  id?: string;
  cssClass?: string;
  properties?: any;
  tabs: Tab[];
}
interface Tab {
  icon?: string;
  title?: string;
  widgets: any;
}
