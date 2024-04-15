import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import expect from "expect";

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Welcome to jsonplaceholder project')).toBeInTheDocument();
  });

  describe('Data fetching', () => {
    it('fetches posts when "Display posts" button is clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByText('Display posts'));
      await screen.findByText('Posts:');
    });

    it('fetches comments when "Display comments" button is clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByText('Display comments'));
      await screen.findByText('Comments:');
    });

    it('fetches albums when "Display albums" button is clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByText('Display albums'));
      await screen.findByText('Albums:');
    });

    it('fetches photos when "Display photos" button is clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByText('Display photos'));
      await screen.findByText('Photos:');
    });
  });

  describe('Data display', () => {
    it('displays posts when "Display posts" button is clicked', async () => {
      render(<App />);
      const displayPostsButton = screen.getByText('Display posts');
      fireEvent.click(displayPostsButton);
      await waitFor(() => {
        const postsTable = screen.getAllByText('Posts:');
        expect(postsTable.length).toBeGreaterThan(0);
      });
    });

    it('displays comments when "Display comments" button is clicked', async () => {
      render(<App />);
      const displayCommentsButton = screen.getByText('Display comments');
      fireEvent.click(displayCommentsButton);
      await waitFor(() => {
        const commentsTable = screen.getAllByText('Comments:');
        expect(commentsTable.length).toBeGreaterThan(0);
      });
    });

    it('displays albums when "Display albums" button is clicked', async () => {
      render(<App />);
      const displayAlbumsButton = screen.getByText('Display albums');
      fireEvent.click(displayAlbumsButton);
      await waitFor(() => {
        const albumsTable = screen.getAllByText('Albums:');
        expect(albumsTable.length).toBeGreaterThan(0);
      });
    });

    it('displays photos when "Display photos" button is clicked', async () => {
      render(<App />);
      const displayPhotosButton = screen.getByText('Display photos');
      fireEvent.click(displayPhotosButton);
      await waitFor(() => {
        const photosTable = screen.getAllByText('Photos:');
        expect(photosTable.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Character limits', () => {
    it('updates post limit when input changes', async () => {
      render(<App />);
      const postLimitInput = screen.getByLabelText('Post Limit:');
      fireEvent.change(postLimitInput, { target: { value: '20' } });
      expect(postLimitInput.value).toBe('20');
    });

    it('updates min char count when input changes', async () => {
      render(<App />);
      const minCharCountInput = screen.getByLabelText('Min Char Count:');
      fireEvent.change(minCharCountInput, { target: { value: '50' } });
      expect(minCharCountInput.value).toBe('50');
    });

    it('updates max char count when input changes', async () => {
      render(<App />);
      const maxCharCountInput = screen.getByLabelText('Max Char Count:');
      fireEvent.change(maxCharCountInput, { target: { value: '1000' } });
      expect(maxCharCountInput.value).toBe('1000');
    });

    it('filters posts based on character count constraints', async () => {
      const postsData = [
        { id: 1, title: 'Title 1', body: 'This is a post with 350 characters.'.repeat(10) },
        { id: 2, title: 'Title 2', body: 'Short post' }, // 10 characters
        { id: 3, title: 'Title 3', body: 'This is a longer post with 420 characters.'.repeat(10) },
      ];

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => postsData,
      });

      render(<App />);
      const displayPostsButton = screen.getByText('Display posts');
      fireEvent.click(displayPostsButton);

      await waitFor(() => {
        expect(screen.getByText('Title 1')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.queryByText('Title 2')).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText('Title 3')).toBeInTheDocument();
      });
    });
  });
});
