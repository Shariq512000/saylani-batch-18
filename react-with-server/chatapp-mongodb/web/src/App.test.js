import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the sign in screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});
