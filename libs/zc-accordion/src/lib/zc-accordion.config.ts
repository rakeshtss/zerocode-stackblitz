export interface ZcAccordionConfig {
  id?: string;
  cssClass?: string;
  properties?: any;
  expandIcon?: any;
  collapseIcon?: any;
  transitionOptions?: any;
  cssStyle?: any;
  multiple?: boolean;
  cache?: boolean;
  accordion: Accordion[];
}
interface Accordion {
  icon?: string;
  title?: string;
  widgets: any;
  disabled?: any;
}
