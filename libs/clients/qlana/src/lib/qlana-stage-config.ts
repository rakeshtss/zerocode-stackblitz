export interface StageConfig {
    api?: {
        url?: string;
        method?: string;
        map?:{
            type?:string; // contact || project || company
        }
    }
   
}