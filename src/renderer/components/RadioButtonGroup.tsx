import styled from 'styled-components';
import { IOption, IOptionGroup } from '../classes/RadioButtonGroup';
import { Legend } from './InputStyles';
import RadioButton from './RadioButton';

const Fieldset = styled.fieldset`
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;

const RadioButtonGroup = ({ label, options, onClick }: IOptionGroup) => {
  function renderOptions() {
    return options.map(
      ({ label: _label, name, disabled, id }: IOption, index) => (
        <RadioButton
          value={id}
          label={_label}
          key={`radio-option-${id}`}
          id={`radio-option-${id}`}
          name={name}
          disabled={disabled}
          defaultChecked={index === 0}
          onClick={onClick}
        />
      )
    );
  }

  return (
    <Fieldset>
      <Legend>{label}</Legend>
      <Wrapper>{renderOptions()}</Wrapper>
    </Fieldset>
  );
};

export default RadioButtonGroup;
