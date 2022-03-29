import { render, screen } from '@testing-library/react';
import App from './App';

test('App 1 header has been rendered', () => {
  render(<App />);
  const linkElement = screen.getByText(/App 1/i);
  expect(linkElement).toBeInTheDocument();
});
