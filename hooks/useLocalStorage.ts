import { useState } from 'react';

// This custom hook manages a value in React state and synchronizes it with the browser's localStorage.
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // State to store our value.
    // The initial state is determined by reading from localStorage. If the key doesn't exist,
    // or if there's an error, it falls back to the provided initialValue.
    const [storedValue, setStoredValue] = useState<T>(() => {
        // We can't access `window` during server-side rendering.
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            // Attempt to get the value from localStorage by its key.
            const item = window.localStorage.getItem(key);
            // Parse the stored JSON. If it's null or invalid, use the initialValue.
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If there's an error (e.g., corrupted data), log it and return the initial value.
            console.error(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    /**
     * A wrapper around the state setter function (`setStoredValue`).
     * This function performs two actions:
     * 1. Updates the React state.
     * 2. Persists the new value to localStorage.
     * This ensures the UI and the persistent storage are always in sync.
     * @param value The new value, or a function that takes the current value and returns the new one.
     */
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Determine the value to store. If `value` is a function, we call it with the current
            // state (`storedValue`) to compute the new value. This mimics the behavior of React's `setState`.
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            
            // Update the React state with the new value.
            setStoredValue(valueToStore);

            // Persist the new value to localStorage, converting it to a JSON string.
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // If an error occurs during the process, log it.
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
