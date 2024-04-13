import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    const { getByText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const headerElement = getByText(/Welcome to jsonplaceholder project/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('changes post limit input value', async () => {
    const { getByLabelText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const postLimitInput = getByLabelText('Post Limit:');
    fireEvent.change(postLimitInput, { target: { value: '20' } });
    expect(postLimitInput.value).toBe('20');
  });

  test('changes min char count input value', async () => {
    const { getByLabelText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const minCharCountInput = getByLabelText('Min Char Count:');
    fireEvent.change(minCharCountInput, { target: { value: '50' } });
    expect(minCharCountInput.value).toBe('50');
  });

  test('changes max char count input value', async () => {
    const { getByLabelText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const maxCharCountInput = getByLabelText('Max Char Count:');
    fireEvent.change(maxCharCountInput, { target: { value: '1000' } });
    expect(maxCharCountInput.value).toBe('1000');
  });

  test('displays posts when "Display posts" button is clicked', async () => {
    const { getByText, getAllByText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const displayPostsButton = getByText('Display posts');
    fireEvent.click(displayPostsButton);
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const postsTable = getAllByText('Posts:');
      expect(postsTable.length).toBeGreaterThan(0);
    });
  });

  test('displays comments when "Display comments" button is clicked', async () => {
    const { getByText, getAllByText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const displayCommentsButton = getByText('Display comments');
    fireEvent.click(displayCommentsButton);
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const commentsTable = getAllByText('Comments:');
      expect(commentsTable.length).toBeGreaterThan(0);
    });
  });

  test('displays albums when "Display albums" button is clicked', async () => {
    const { getByText, getAllByText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const displayAlbumsButton = getByText('Display albums');
    fireEvent.click(displayAlbumsButton);
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const albumsTable = getAllByText('Albums:');
      expect(albumsTable.length).toBeGreaterThan(0);
    });
  });

  test('displays photos when "Display photos" button is clicked', async () => {
    const { getByText, getAllByText } = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const displayPhotosButton = getByText('Display photos');
    fireEvent.click(displayPhotosButton);
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const photosTable = getAllByText('Photos:');
      expect(photosTable.length).toBeGreaterThan(0);
    });
  });
});
