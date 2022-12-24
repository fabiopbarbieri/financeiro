import { AccessorFn } from '@tanstack/match-sorter-utils';
import { FilterFnOption, SortingFnOption } from '@tanstack/react-table';
import Serializable from './Serializable';

export default interface TableProperties<T extends Serializable> {
  id: string;
  property?: string;
  order: number;
  type: 'string' | 'number' | 'money';
  filter?: boolean;
  filterFn?: FilterFnOption<unknown>;
  format?(value: unknown): unknown;
  hidden?: boolean;
  acessorFn?: AccessorFn<T>;
  sortingFn?: SortingFnOption<T>;
}
