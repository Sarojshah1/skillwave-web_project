import React from 'react';
import { render } from '@testing-library/react';
import App from '../layouts/App';

test('renders ToastContainer in App', () => {
  render(<App />);
  // ToastContainer renders a div with class "Toastify"
  expect(document.querySelector('.Toastify')).toBeInTheDocument();
}); 