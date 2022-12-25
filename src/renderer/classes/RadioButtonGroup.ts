import { MouseEventHandler } from 'react';

export interface IOption {
  label: string;
  name?: string;
  disabled?: boolean;
  id: string;
}

export interface IOptionGroup {
  label: string;
  options: IOption[];
  onClick: MouseEventHandler<HTMLInputElement>;
}
