import { HTMLInputTypeAttribute } from 'react';
import { Option } from './Option';

type Input = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined | 'select';

  value?: string | ReadonlyArray<string> | number | undefined;

  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;

  autoComplete?: string | undefined;
  placeholder?: string | undefined;
  pattern?: string | undefined;

  form?: string | undefined;

  height?: number | string | undefined;
  width?: number | string | undefined;

  min?: number | string | undefined;
  max?: number | string | undefined;

  minLength?: number | undefined;
  maxLength?: number | undefined;

  size?: number | undefined;
  step?: number | string | undefined;

  select?: {
    type: 'async' | 'sync';
    defaultValue?: boolean;
    options?: Option[];
    loadFn?:
      | ((value: string, callback: (options: Option[]) => void) => void)
      | ((value: string) => Promise<Option[]>);
    multi?: boolean;
  };

  formatFn?: (value: string | string[]) => unknown;
  hidden?: boolean;

  clearAfterInsert?: boolean;
};

export default Input;
