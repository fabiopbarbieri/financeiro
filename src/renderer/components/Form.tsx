import { useEffect, useState } from 'react';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import TypeForm from 'renderer/classes/forms/Form';
import Input from 'renderer/classes/forms/Input';
import '../styles/Main.css';

import { ActionMeta, SingleValue } from 'react-select/dist/declarations/src';
import { Option } from 'renderer/classes/forms/Option';
import { useMap } from 'usehooks-ts';
import { faker } from '@faker-js/faker';
import { insertGenericos, insertValores } from 'renderer/classes/db/queries';

const Form = ({ data }: { data: TypeForm }) => {
  const [inputs, setInputs] = useState<JSX.Element[]>();

  const [map, actions] = useMap<string, string>();

  function generateInputs(array: Input[], rand: number) {
    return array?.map((input) => {
      let generatedInput = (
        <input
          id={`input-${input.name}`}
          key={`input-${input.name}-${rand}`}
          name={input.name}
          readOnly={input.readOnly}
          disabled={input.disabled}
          type={input.type}
          defaultValue={input.value}
          step={input.step}
          min={input.min}
          max={input.max}
        />
      );

      if (input.type === 'select') {
        const onChange = (
          value: SingleValue<Option>,
          action: ActionMeta<Option>
        ) => {
          if (
            (action.action === 'create-option' ||
              action.action === 'select-option') &&
            value?.value
          ) {
            actions.set(input.name, value.value);
          }

          if (action.action === 'clear') actions.remove(input.name);
        };

        if (input.select?.type === 'async') {
          generatedInput = (
            <AsyncCreatableSelect
              id={`input-${input.name}`}
              key={`input-${input.name}-${rand}`}
              name={input.name}
              options={input.select.options}
              loadOptions={input.select.loadFn}
              value={input.select.options?.find(
                (o) => o.value === map.get(input.name)
              )}
              onChange={onChange}
              defaultOptions
              cacheOptions
              isClearable
            />
          );
        } else {
          const value = input.select?.defaultValue
            ? input.select?.options?.find((_, index) => index === 1)?.value
            : null;

          if (value) {
            actions.set(input.name, value);
          } else {
            actions.remove(input.name);
          }

          generatedInput = (
            <Select
              id={`input-${input.name}`}
              key={`input-${input.name}-${rand}`}
              defaultValue={
                input.select?.defaultValue
                  ? input.select?.options?.find((_, index) => index === 1)
                  : undefined
              }
              name={input.name}
              options={input.select?.options}
              onChange={onChange}
            />
          );
        }
      }

      return (
        <div
          key={`div-${input.name}`}
          style={{
            display: input?.hidden ? 'none' : 'flex',
            flexDirection: 'column',
            maxWidth: '200px',
            width: input.width,
            padding: '2px',
          }}
        >
          <label htmlFor={`input-${input.name}`}>{input.label}</label>
          {generatedInput}
        </div>
      );
    });
  }

  function refresh(rand: number) {
    setInputs(generateInputs(data?.inputs, rand));
  }

  useEffect(() => {
    actions.reset();
    refresh(faker.datatype.number(10000));
  }, [data]);

  useEffect(() => {
    actions.reset();
    refresh(faker.datatype.number(10000));
  }, []);

  function defaultFormat(input: Input, value: string) {
    let anyValue: unknown = value;
    if (input.type === 'number') {
      if (value === '') anyValue = 0;
      anyValue = Number(anyValue);
    }
    return { [input.name]: anyValue };
  }

  const getValores = () => {
    const arr: any[] = [];

    document.querySelectorAll('[id^="input"]').forEach((input) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inp: Input = data.inputs.find(
        (i) => i.name === input.id.replace('input-', '')
      )!;

      let value: string;

      if (inp.type === 'select') {
        value = map.get(inp.name) ?? '';
      } else if (input instanceof HTMLElement) {
        value = (input as HTMLInputElement).value;
      } else {
        value = input?.getAttribute('value') ?? '';
      }

      arr.push(inp.formatFn ? inp.formatFn(value) : defaultFormat(inp, value));
    });
    return Object.assign({}, ...arr);
  };

  const inserir = () => {
    const valor = getValores();

    window.electron.ipcRenderer
      .dbInsertOne(valor?.dia ? insertGenericos : insertValores, valor)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>{inputs}</div>
      <button id="get-valores" type="button" onClick={inserir}>
        Inserir
      </button>
    </div>
  );
};

export default Form;
