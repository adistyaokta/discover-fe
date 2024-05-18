import type { ReactElement } from 'react';

export type GetParam = {
  filters?: string;
  page?: number;
  take?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type INavLink = {
  imgURL?: string;
  route: string;
  label: string;
  icon: ReactElements;
};
