import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { performance } from 'perf_hooks';

describe('App component - unit tests', () => {
    it('renders without crashing', () => {
        // Renderuje komponent App
        render(<App />);
        // Sprawdza, czy tekst "Welcome to jsonplaceholder project" jest obecny na stronie
        expect(screen.getByText('Welcome to jsonplaceholder project')).toBeInTheDocument();
    });

    describe('Character limits', () => {
        it('updates post limit when input changes', async () => {
            // Renderuje komponent App
            render(<App />);
            // Pobiera input do zmiany limitu postów
            const postLimitInput = screen.getByLabelText('Post Limit:');
            // Zmienia wartość inputu
            fireEvent.change(postLimitInput, { target: { value: '20' } });
            // Sprawdza, czy wartość inputu została zmieniona na oczekiwaną
            expect(postLimitInput.value).toBe('20');
        });

        it('updates min char count when input changes', async () => {
            // Renderuje komponent App
            render(<App />);
            // Pobiera input do zmiany minimalnej liczby znaków
            const minCharCountInput = screen.getByLabelText('Min Char Count:');
            // Zmienia wartość inputu
            fireEvent.change(minCharCountInput, { target: { value: '50' } });
            // Sprawdza, czy wartość inputu została zmieniona na oczekiwaną
            expect(minCharCountInput.value).toBe('50');
        });

        it('updates max char count when input changes', async () => {
            // Renderuje komponent App
            render(<App />);
            // Pobiera input do zmiany maksymalnej liczby znaków
            const maxCharCountInput = screen.getByLabelText('Max Char Count:');
            // Zmienia wartość inputu
            fireEvent.change(maxCharCountInput, { target: { value: '1000' } });
            // Sprawdza, czy wartość inputu została zmieniona na oczekiwaną
            expect(maxCharCountInput.value).toBe('1000');
        });

        it('filters posts based on character count constraints', async () => {
            // Dane testowe dla postów
            const postsData = [
                { id: 1, title: 'Title 1', body: 'This is a post with 350 characters.'.repeat(10) },
                { id: 2, title: 'Title 2', body: 'Short post' }, // 10 characters
                { id: 3, title: 'Title 3', body: 'This is a longer post with 420 characters.'.repeat(10) },
            ];

            // Mockowanie funkcji fetch dla testu
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: true,
                json: async () => postsData,
            });

            // Renderuje komponent App
            render(<App />);
            // Pobiera przycisk do wyświetlenia postów
            const displayPostsButton = screen.getByText('Display posts');

            // Pomiar czasu wykonania filtrowania postów
            const startTime = performance.now();
            // Kliknięcie przycisku wyświetlenia postów
            fireEvent.click(displayPostsButton);
            // Oczekiwanie na pojawienie się postów na stronie
            await waitFor(() => {
                expect(screen.getByText('Title 1')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.queryByText('Title 2')).not.toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByText('Title 3')).toBeInTheDocument();
            });
            // Pomiar czasu wykonania filtrowania postów
            const endTime = performance.now();
            console.log('Time taken to filter posts:', endTime - startTime, 'milliseconds');
        });
    });
});
