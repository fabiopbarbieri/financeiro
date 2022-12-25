import BrandColor from 'renderer/classes/GlobalStyles';
import styled from 'styled-components';

export const Label = styled.label<{ disabled?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${BrandColor.DARK_PURPLE};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  ${({ disabled }) =>
    disabled &&
    `
      color: ${BrandColor.DARK_PURPLE_FADED} !important;
      cursor: not-allowed;
   `}
`;

export const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid ${BrandColor.DARK_PURPLE};
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
      background-color: ${BrandColor.DARK_PURPLE_FADED};
    }
  }
  :focus {
    outline: 2px solid ${BrandColor.YELLOW};
  }
  :checked {
    ::after {
      background-color: ${BrandColor.DARK_PURPLE};
    }
    :hover {
      background-color: ${BrandColor.WHITE};
      border: 2px solid ${BrandColor.DARK_PURPLE};
      ::after {
        background-color: ${BrandColor.DARK_PURPLE};
      }
    }
  }
  :disabled {
    cursor: not-allowed;
    border: 2px solid ${BrandColor.DARK_PURPLE_FADED};
    background-color: ${BrandColor.PURPLE};
    :hover {
      ::after {
        background-color: ${BrandColor.PURPLE};
      }
    }
    :checked {
      ::after {
        background-color: ${BrandColor.DARK_PURPLE_FADED};
      }
      :hover {
        background-color: ${BrandColor.PURPLE};
        ::after {
          background-color: ${BrandColor.DARK_PURPLE_FADED};
        }
      }
    }
  }
`;

export const Legend = styled.legend`
  font-weight: 600;
  font-size: 1rem;
  color: ${BrandColor.DARK_PURPLE};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;
