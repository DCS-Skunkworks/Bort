import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (container === null) {
    console.error('unable to get container');
    throw new Error('error getting container');
}

const root = createRoot(container);
root.render(<App />);
