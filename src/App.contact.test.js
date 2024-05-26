import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component - contract tests', () => {
    // Set up to spy on global fetch before each test
    beforeEach(() => {
        jest.spyOn(global, 'fetch');
    });

    // Restore the original fetch function after each test
    afterEach(() => {
        global.fetch.mockRestore();
    });

    it('fetches posts when "Display posts" button is clicked', async () => {
        // Mock API response data for posts
        const postsData = [
            { id: 1, title: 'Title 1', body: 'This is a body within char limits This is a body within char limits This is a body within char limits This is a body within char limitsThis is a body within char limits' }
        ];

        // Mock global fetch to return the mocked post data
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => postsData,
        });

        // Render the App component
        render(<App />);
        // Simulate clicking the "Display posts" button
        fireEvent.click(screen.getByText('Display posts'));

        // Wait for the post title to be displayed in the document
        await waitFor(() => {
            expect(screen.getByText('Title 1')).toBeInTheDocument();
        });

        // Check that fetch was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
        );
    });

    it('fetches comments when "Display comments" button is clicked', async () => {
        // Mock API response data for comments
        const commentsData = [{ id: 1, postId: 1, name: 'Name 1', email: 'email@example.com', body: 'Body 1' }];

        // Mock global fetch to return the mocked comment data
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => commentsData,
        });

        // Render the App component
        render(<App />);
        // Simulate clicking the "Display comments" button
        fireEvent.click(screen.getByText('Display comments'));

        // Wait for the comment name to be displayed in the document
        await waitFor(() => {
            expect(screen.getByText('Name 1')).toBeInTheDocument();
        });

        // Check that fetch was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/comments?_limit=10'
        );
    });

    it('fetches albums when "Display albums" button is clicked', async () => {
        // Mock API response data for albums
        const albumsData = [{ id: 1, userId: 1, title: 'Title 1' }];

        // Mock global fetch to return the mocked album data
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => albumsData,
        });

        // Render the App component
        render(<App />);
        // Simulate clicking the "Display albums" button
        fireEvent.click(screen.getByText('Display albums'));

        // Wait for the album title to be displayed in the document
        await waitFor(() => {
            expect(screen.getByText('Title 1')).toBeInTheDocument();
        });

        // Check that fetch was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/albums?_limit=10'
        );
    });

    it('fetches photos when "Display photos" button is clicked', async () => {
        // Mock API response data for photos
        const photosData = [{ id: 1, albumId: 1, title: 'Title 1', thumbnailUrl: 'https://via.placeholder.com/150' }];

        // Mock global fetch to return the mocked photo data
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => photosData,
        });

        // Render the App component
        render(<App />);
        // Simulate clicking the "Display photos" button
        fireEvent.click(screen.getByText('Display photos'));

        // Wait for the photo title to be displayed in the document
        await waitFor(() => {
            expect(screen.getByText('Title 1')).toBeInTheDocument();
        });

        // Check that fetch was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/photos?_limit=10'
        );
    });
});
