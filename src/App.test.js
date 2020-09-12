import React from 'react';
import { render } from '@testing-library/react';
import AppGlobal from "./AppContainer";

test('renders learn react link', () => {
  const { getByText } = render(<AppGlobal />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
