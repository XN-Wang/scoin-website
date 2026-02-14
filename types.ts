
export type Language = 'EN' | 'ZH';

export interface Translation {
  [key: string]: {
    EN: string;
    ZH: string;
  };
}

export interface NavItem {
  id: string;
  label: { EN: string; ZH: string };
}

export interface Product {
  title: string;
  description: { EN: string; ZH: string };
  link: string;
}

export interface Advantage {
  title: { EN: string; ZH: string };
  description: { EN: string; ZH: string };
  icon: string;
}

export interface StatItem {
  label: { EN: string; ZH: string };
  value: string;
  suffix?: string;
}
