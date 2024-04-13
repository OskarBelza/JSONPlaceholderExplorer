import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('displays posts when "Display posts" button is clicked', () => {
  render(<App />);
  const displayPostsButton = screen.getByText(/Display posts/i);
  fireEvent.click(displayPostsButton);
  const postsTable = screen.getByText(/Posts:/i);
  expect(postsTable).toBeInTheDocument();
});

test('hides posts when "Display posts" button is clicked again', () => {
  render(<App />);
  const displayPostsButton = screen.getByText(/Display posts/i);
  fireEvent.click(displayPostsButton);
  fireEvent.click(displayPostsButton);
  const postsTable = screen.queryByText(/Posts:/i);
  expect(postsTable).toBeNull();
});

test('fetchPosts updates posts state with fetched data', async () => {
  render(<App />);

  const postLimitInput = screen.getByLabelText(/Post Limit:/i);
  userEvent.clear(postLimitInput);
  userEvent.type(postLimitInput, '5');

  await waitFor(() => {
    expect(screen.getByText(/Posts:/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('post-row')).toHaveLength(5);
  });
});

test('fetchComments updates comments state with fetched data', async () => {
  render(<App />);

  const displayCommentsButton = screen.getByText(/Display comments/i);
  fireEvent.click(displayCommentsButton);

  const postLimitInput = screen.getByLabelText(/Post Limit:/i);
  userEvent.clear(postLimitInput);
  userEvent.type(postLimitInput, '5');

  await waitFor(() => {
    expect(screen.getByText(/Comments:/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('comment-row')).toHaveLength(5);
  });
});

test('fetchAlbums updates albums state with fetched data', async () => {
  render(<App />);

  const displayAlbumsButton = screen.getByText(/Display albums/i);
  fireEvent.click(displayAlbumsButton);

  const postLimitInput = screen.getByLabelText(/Post Limit:/i);
  userEvent.clear(postLimitInput);
  userEvent.type(postLimitInput, '5');

  await waitFor(() => {
    expect(screen.getByText(/Albums:/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('album-row')).toHaveLength(5);
  });
});

test('fetchPhotos updates photos state with fetched data', async () => {
  render(<App />);

  const displayPhotosButton = screen.getByText(/Display photos/i);
  fireEvent.click(displayPhotosButton);

  const postLimitInput = screen.getByLabelText(/Post Limit:/i);
  userEvent.clear(postLimitInput);
  userEvent.type(postLimitInput, '5');

  await waitFor(() => {
    expect(screen.getByText(/Photos:/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('photo-row')).toHaveLength(5);
  });
});
