import { queryTagSelect } from 'renderer/classes/db/queries';
import Input from '../Input';

const inputTag: Input = {
  name: 'tag',
  label: 'TAG',
  type: 'select',
  select: {
    type: 'async',
    loadFn: (value: string) =>
      window.electron.ipcRenderer
        .dbGet(queryTagSelect, `%${value}%`)
        .then((data: Record<string, unknown>[]) => {
          return data.map((item) => {
            return { label: item.tag, value: item.tag };
          });
        }),
  },
  width: '225px',
  clearAfterInsert: true,
  required: true,
  placeholder: 'Selecione ou crie uma tag',
};

export default inputTag;
