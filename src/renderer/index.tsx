import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Hello from './views/Hello';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Hello />} />
    </Routes>
  </Router>
);

// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
