import { useEffect, useState } from 'react';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import TypeForm from 'renderer/classes/forms/Form';
import Input from 'renderer/classes/forms/Input';
import '../styles/Hello.css';

import { ActionMeta, SingleValue } from 'react-select/dist/declarations/src';
import { Option } from 'renderer/classes/forms/Option';
import { useMap } from 'usehooks-ts';

const Form = ({ data }: { data: TypeForm }) => {
  const [inputs, setInputs] = useState<JSX.Element[]>();

  const [map, actions] = useMap<string, string>();

  function generateInputs(array: Input[]) {
    return array?.map((input) => {
      let generatedInput = (
        <input
          id={`input-${input.name}`}
          key={`input-${input.name}`}
          name={input.name}
          readOnly={input.readOnly}
          disabled={input.disabled}
          type={input.type}
          defaultValue={input.value}
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
          //actions.remove(input.name);
          generatedInput = (
            <AsyncCreatableSelect
              id={`input-${input.name}`}
              key={`input-${input.name}`}
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
              key={`input-${input.name}`}
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
            display: 'flex',
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

  function refresh() {
    setInputs(generateInputs(data.inputs));
  }

  useEffect(() => {
    refresh();
  }, [data]);

  useEffect(() => {
    refresh();
  }, []);

  function defaultFormat(input: Input, value: string) {
    let anyValue: unknown = value;
    if (input.type === 'number') {
      if (value === '') anyValue = 0;
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
    const object = Object.assign({}, ...arr);
    console.log(object);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>{inputs}</div>
      <button id="get-valores" type="button" onClick={getValores}>
        Pegar Valores
      </button>
    </div>
  );
};

export default Form;
