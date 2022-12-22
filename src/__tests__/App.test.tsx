import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Hello from '../renderer/views/Hello';

describe('App', () => {
  it('should render', () => {
    expect(render(<Hello />)).toBeTruthy();
  });
});
