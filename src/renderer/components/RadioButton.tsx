import DisabledIcon from 'renderer/classes/Icons';
import { InputElementProps } from 'renderer/classes/InputInterface';
import styled from 'styled-components';
import { Label, Radio } from './InputStyles';

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RadioButton = ({
  label,
  disabled = false,
  key,
  value,
  name,
  onClick,
  defaultChecked,
}: InputElementProps) => {
  return (
    <Wrapper key={key}>
      <Radio
        type="radio"
        id={`radio-button-${value}`}
        disabled={disabled}
        name={name}
        onClick={onClick}
        defaultChecked={defaultChecked}
        value={value}
      />
      <Label htmlFor={`radio-button-${value}`} disabled={disabled}>
        <span>{label}</span>
        {disabled && <DisabledIcon small />}
      </Label>
    </Wrapper>
  );
};

export default RadioButton;
