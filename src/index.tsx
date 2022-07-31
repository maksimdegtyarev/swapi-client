import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Bootstrap } from './components/bootstrap/Bootstrap';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Bootstrap />
  </Provider>
);

