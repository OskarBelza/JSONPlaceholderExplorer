import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and controls', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to jsonplaceholder project/i);
  const postLimitInput = screen.getByLabelText(/Post Limit:/i);
  const minCharCountInput = screen.getByLabelText(/Min Char Count:/i);
  const maxCharCountInput = screen.getByLabelText(/Max Char Count:/i);
  const displayPostsButton = screen.getByText(/Display posts/i);
  const displayCommentsButton = screen.getByText(/Display comments/i);
  const displayAlbumsButton = screen.getByText(/Display albums/i);
  const displayPhotosButton = screen.getByText(/Display photos/i);

  expect(headerElement).toBeInTheDocument();
  expect(postLimitInput).toBeInTheDocument();
  expect(minCharCountInput).toBeInTheDocument();
  expect(maxCharCountInput).toBeInTheDocument();
  expect(displayPostsButton).toBeInTheDocument();
  expect(displayCommentsButton).toBeInTheDocument();
  expect(displayAlbumsButton).toBeInTheDocument();
  expect(displayPhotosButton).toBeInTheDocument();
});
