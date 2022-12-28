import BrandColor from 'renderer/classes/GlobalStyles';
import styled from 'styled-components';

export const Label = styled.label<{ disabled?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${BrandColor.BLACK};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  ${({ disabled }) =>
    disabled &&
    `
      color: ${BrandColor.GRAY} !important;
      cursor: not-allowed;
   `}
`;

export const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid ${BrandColor.BLACK};
  border-radius: 50%;
  ::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 3px;
  }
  :hover {
    ::after {
      background-color: ${BrandColor.GRAY};
    }
  }
  :focus {
    outline: 2px solid ${BrandColor.YELLOW};
  }
  :checked {
    ::after {
      background-color: ${BrandColor.BLACK};
    }
    :hover {
      background-color: ${BrandColor.WHITE};
      border: 2px solid ${BrandColor.BLACK};
      ::after {
        background-color: ${BrandColor.BLACK};
      }
    }
  }
  :disabled {
    cursor: not-allowed;
    border: 2px solid ${BrandColor.GRAY};
    background-color: ${BrandColor.PURPLE};
    :hover {
      ::after {
        background-color: ${BrandColor.PURPLE};
      }
    }
    :checked {
      ::after {
        background-color: ${BrandColor.GRAY};
      }
      :hover {
        background-color: ${BrandColor.PURPLE};
        ::after {
          background-color: ${BrandColor.GRAY};
        }
      }
    }
  }
`;

export const Legend = styled.legend`
  font-weight: 600;
  font-size: 1rem;
  color: ${BrandColor.BLACK};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;
