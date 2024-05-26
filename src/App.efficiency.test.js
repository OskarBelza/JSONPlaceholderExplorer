import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Performance tests', () => {
    // Test to check if the component renders within 3 seconds
    it('renders the component within 3 seconds', async () => {
        // Record the start time
        const startTime = performance.now();

        // Render the App component
        render(<App />);

        // Record the end time
        const endTime = performance.now();

        // Calculate the render time
        const renderTime = endTime - startTime;

        // Assert that the render time is less than 3000 milliseconds (3 seconds)
        expect(renderTime).toBeLessThan(3000);
    });

    // Test to check if posts are fetched within 2 seconds after clicking "Display posts"
    it('fetches posts within 2 seconds after "Display posts" button is clicked', async () => {
        // Mock the global fetch function to return a successful response with posts data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, title: 'Title 1', body: 'This is a body within char limits This is a body within char limits This is a body within char limits This is a body within char limitsThis is a body within char limits' }],
        });

        // Render the App component
        render(<App />);

        // Get the "Display posts" button
        const displayPostsButton = screen.getByText('Display posts');

        // Simulate clicking the "Display posts" button
        fireEvent.click(displayPostsButton);

        // Record the start time
        const startTime = performance.now();

        // Wait for the posts to be displayed in the document
        await screen.findByText('Posts:');

        // Record the end time
        const endTime = performance.now();

        // Calculate the fetch time
        const fetchTime = endTime - startTime;

        // Assert that the fetch time is less than 2000 milliseconds (2 seconds)
        expect(fetchTime).toBeLessThan(2000);
    });

    // Test to check if comments are fetched within 2 seconds after clicking "Display comments"
    it('fetches comments within 2 seconds after "Display comments" button is clicked', async () => {
        // Mock the global fetch function to return a successful response with comments data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, postId: 1, name: 'Name 1', email: 'email@example.com', body: 'Body 1' }],
        });

        // Render the App component
        render(<App />);

        // Get the "Display comments" button
        const displayCommentsButton = screen.getByText('Display comments');

        // Simulate clicking the "Display comments" button
        fireEvent.click(displayCommentsButton);

        // Record the start time
        const startTime = performance.now();

        // Wait for the comments to be displayed in the document
        await screen.findByText('Comments:');

        // Record the end time
        const endTime = performance.now();

        // Calculate the fetch time
        const fetchTime = endTime - startTime;

        // Assert that the fetch time is less than 2000 milliseconds (2 seconds)
        expect(fetchTime).toBeLessThan(2000);
    });

    // Test to check if albums are fetched within 2 seconds after clicking "Display albums"
    it('fetches albums within 2 seconds after "Display albums" button is clicked', async () => {
        // Mock the global fetch function to return a successful response with albums data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, userId: 1, title: 'Title 1' }],
        });

        // Render the App component
        render(<App />);

        // Get the "Display albums" button
        const displayAlbumsButton = screen.getByText('Display albums');

        // Simulate clicking the "Display albums" button
        fireEvent.click(displayAlbumsButton);

        // Record the start time
        const startTime = performance.now();

        // Wait for the albums to be displayed in the document
        await screen.findByText('Albums:');

        // Record the end time
        const endTime = performance.now();

        // Calculate the fetch time
        const fetchTime = endTime - startTime;

        // Assert that the fetch time is less than 2000 milliseconds (2 seconds)
        expect(fetchTime).toBeLessThan(2000);
    });

    // Test to check if photos are fetched within 2 seconds after clicking "Display photos"
    it('fetches photos within 2 seconds after "Display photos" button is clicked', async () => {
        // Mock the global fetch function to return a successful response with photos data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, albumId: 1, title: 'Title 1', thumbnailUrl: 'https://via.placeholder.com/150' }],
        });

        // Render the App component
        render(<App />);

        // Get the "Display photos" button
        const displayPhotosButton = screen.getByText('Display photos');

        // Simulate clicking the "Display photos" button
        fireEvent.click(displayPhotosButton);

        // Record the start time
        const startTime = performance.now();

        // Wait for the photos to be displayed in the document
        await screen.findByText('Photos:');

        // Record the end time
        const endTime = performance.now();

        // Calculate the fetch time
        const fetchTime = endTime - startTime;

        // Assert that the fetch time is less than 2000 milliseconds (2 seconds)
        expect(fetchTime).toBeLessThan(2000);
    });
});
