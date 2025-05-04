import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/router';
import ReactQueryProvider from '../providers/ReactQueryProvider';

const App = () => (
  <ReactQueryProvider>
    <RouterProvider router={router} />
  </ReactQueryProvider>
);

export default App;
