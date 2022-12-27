import { createRef, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import TypeForm from 'renderer/classes/forms/Form';
import Input from 'renderer/classes/forms/Input';
import '../styles/Form.css';

import { faker } from '@faker-js/faker';
import {
  ActionMeta,
  MultiValue,
  SingleValue,
} from 'react-select/dist/declarations/src';
import { Option } from 'renderer/classes/forms/Option';
import { useMap } from 'usehooks-ts';

const Form = ({
  data,
  refreshFN,
}: {
  data: TypeForm;
  refreshFN: () => void;
}) => {
  const [inputs, setInputs] = useState<JSX.Element[]>();

  const [selectSelectedMap, selectSelectedActions] = useMap<
    string,
    string | string[]
  >();

  const refs = useRef(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.from({ length: data.inputs.length }, (_) => createRef<any>())
  );

  function generateInputs(array: Input[], rand: number) {
    return array?.map((input, indexInput: number) => {
      let generatedInput = (
        <input
          className="form-input"
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
          required={input.required}
          placeholder={input.placeholder}
          onBlur={input.onBlur}
        />
      );

      if (input.type === 'select') {
        const onChange = (
          value: MultiValue<Option> | SingleValue<Option>,
          action: ActionMeta<Option>
        ) => {
          if (
            (action.action === 'create-option' ||
              action.action === 'select-option') &&
            ((Array.isArray(value) && value?.length > 0) || value?.value)
          ) {
            selectSelectedActions.set(
              input.name,
              Array.isArray(value) ? value.map((v) => v.value) : value?.value
            );
          }

          if (action.action === 'clear')
            selectSelectedActions.remove(input.name);
        };

        if (input.select?.type === 'async') {
          generatedInput = (
            <AsyncCreatableSelect
              // className="form-input"
              id={`input-${input.name}`}
              key={`input-${input.name}-${rand}`}
              name={input.name}
              options={input.select.options}
              loadOptions={input.select.loadFn}
              value={input.select.options?.find(
                (o) => o.value === selectSelectedMap.get(input.name)
              )}
              placeholder={input.placeholder}
              onChange={onChange}
              defaultOptions
              cacheOptions
              isClearable
              ref={refs.current[indexInput]}
              required={input.required}
            />
          );
        } else {
          const value = input.select?.defaultValue
            ? input.select?.options?.find((_, index) => index === 1)?.value
            : null;

          if (value) {
            selectSelectedActions.set(input.name, value);
          } else {
            selectSelectedActions.remove(input.name);
          }

          generatedInput = (
            <Select
              // className="form-input"
              id={`input-${input.name}`}
              key={`input-${input.name}-${rand}`}
              defaultValue={
                input.select?.defaultValue
                  ? input.select?.options?.find((_, index) => index === 0)
                  : undefined
              }
              name={input.name}
              placeholder={input.placeholder}
              options={input.select?.options}
              onChange={onChange}
              isMulti={input.select?.multi}
              ref={refs.current[indexInput]}
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
            maxWidth: '1000px',
            width: input.width,
            padding: '2px',
          }}
        >
          <label htmlFor={`input-${input.name}`}>
            {input.label}
            {input.required ? ' *' : null}
          </label>
          {generatedInput}
        </div>
      );
    });
  }

  function refresh(rand: number) {
    setInputs(generateInputs(data?.inputs, rand));
  }

  useEffect(() => {
    selectSelectedActions.reset();
    refresh(faker.datatype.number(10000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    selectSelectedActions.reset();
    refresh(faker.datatype.number(10000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function defaultFormat(input: Input, value: string | string[]) {
    let anyValue: unknown = value;

    if (Array.isArray(value) && value.length === 1) {
      [anyValue] = value;
    }

    if (input.type === 'number') {
      if (value === '') anyValue = 0;
      anyValue = Number(anyValue);
    }

    return { [input.name]: anyValue };
  }

  const getValores = (): any[] => {
    const arr: any[] = [];

    document.querySelectorAll('[id^="input"]').forEach((input) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inp: Input = data.inputs.find(
        (i) => i.name === input.id.replace('input-', '')
      )!;

      let value: string | string[];

      if (inp.type === 'select') {
        value = selectSelectedMap.get(inp.name) ?? '';
      } else if (input instanceof HTMLElement) {
        value = (input as HTMLInputElement).value;
      } else {
        value = input?.getAttribute('value') ?? '';
      }

      arr.push(inp.formatFn ? inp.formatFn(value) : defaultFormat(inp, value));
    });

    const finalArr = [];
    const obj = Object.assign({}, ...arr);
    const keys = Object.keys(obj).filter((key) => Array.isArray(obj[key]));

    if (keys?.length > 0) {
      const repeat = keys
        .map((key) => obj[key]?.length)
        .reduce((a, b) => a + b);

      for (let i = 0; i < repeat; i += 1) {
        finalArr.push({ ...obj });
      }

      const countMap = new Map<string, number>();

      keys.forEach((key) => countMap.set(key, 0));

      return finalArr.map((item) => {
        keys.forEach((key) => {
          const count = countMap.get(key) ?? 0;
          item[key] = obj[key][count];
          countMap.set(key, count + 1);
        });
        return item;
      });
    }

    finalArr.push(obj);
    return finalArr;
  };

  const clearInputs = () => {
    data.inputs.forEach((input, index) => {
      if (input.clearAfterInsert) {
        const element = document.getElementById(
          `input-${input.name}`
        ) as HTMLInputElement;

        if (input.type === 'select') {
          refs.current[index].current.clearValue();
        } else if (!Array.isArray(input.value)) {
          element.value = String(input.value ?? '');
        } else {
          element.value = '';
        }
      }
    });
  };

  const inserir = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valor: any[] = getValores();

    window.electron.ipcRenderer
      .dbInsertMany(data.insert, ...valor)
      .then((results) => {
        clearInputs();
        refreshFN();

        const changedRows = results
          .map((run) => run.changes)
          .reduce((a, b) => a + b);

        if (changedRows > 1)
          console.log(`${changedRows} registros foram incluídos.`);
        else console.log(`${changedRows} registro foi incluído.`);

        return data;
      })
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
