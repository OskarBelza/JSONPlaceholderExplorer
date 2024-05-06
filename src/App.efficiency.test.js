import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Performance tests', () => {
    it('renders the component within 3 seconds', async () => {
        const startTime = performance.now();
        render(<App />);
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        expect(renderTime).toBeLessThan(3000);
    });

    it('fetches posts within 2 seconds after "Display posts" button is clicked', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, title: 'Title 1', body: 'Body 1' }],
        });

        render(<App />);
        const displayPostsButton = screen.getByText('Display posts');

        fireEvent.click(displayPostsButton);

        const startTime = performance.now();
        await screen.findByText('Posts:');
        const endTime = performance.now();
        const fetchTime = endTime - startTime;
        expect(fetchTime).toBeLessThan(2000);
    });

    it('fetches comments within 2 seconds after "Display comments" button is clicked', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, postId: 1, name: 'Name 1', email: 'email@example.com', body: 'Body 1' }],
        });

        render(<App />);
        const displayCommentsButton = screen.getByText('Display comments');

        fireEvent.click(displayCommentsButton);

        const startTime = performance.now();
        await screen.findByText('Comments:');
        const endTime = performance.now();
        const fetchTime = endTime - startTime;
        expect(fetchTime).toBeLessThan(2000);
    });

    it('fetches albums within 2 seconds after "Display albums" button is clicked', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, userId: 1, title: 'Title 1' }],
        });

        render(<App />);
        const displayAlbumsButton = screen.getByText('Display albums');

        fireEvent.click(displayAlbumsButton);

        const startTime = performance.now();
        await screen.findByText('Albums:');
        const endTime = performance.now();
        const fetchTime = endTime - startTime;
        expect(fetchTime).toBeLessThan(2000);
    });

    it('fetches photos within 2 seconds after "Display photos" button is clicked', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, albumId: 1, title: 'Title 1', thumbnailUrl: 'https://via.placeholder.com/150' }],
        });

        render(<App />);
        const displayPhotosButton = screen.getByText('Display photos');

        fireEvent.click(displayPhotosButton);

        const startTime = performance.now();
        await screen.findByText('Photos:');
        const endTime = performance.now();
        const fetchTime = endTime - startTime;
        expect(fetchTime).toBeLessThan(2000);
    });
});
