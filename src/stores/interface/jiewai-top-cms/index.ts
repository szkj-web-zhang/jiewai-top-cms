export interface GlobalState {
  isCollapse: boolean;
  accordion: boolean;
}

export interface AliveTabsState {
  aliveTabList: string[];
}

export interface TabsMenuState {
  tabsMenuList: Menu.TabsMenuProps[];
}

export interface RemoveTabPayload {
  tabPath: string;
  isCurrent: boolean;
  callback?: (path: string) => void;
}

export interface RemoveUnselectPayload {
  path?: string;
  callback?: () => void;
}
