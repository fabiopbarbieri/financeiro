import styled from 'styled-components';
import { LockClosed } from '@styled-icons/ionicons-sharp/LockClosed';
import BrandColor from './GlobalStyles';

const DisabledIcon = styled(LockClosed)<{ small?: boolean }>`
  color: ${BrandColor.BLACK};
  height: ${(props) => (props.small ? 15 : 25)}px;
  margin: auto;
`;

export default DisabledIcon;
