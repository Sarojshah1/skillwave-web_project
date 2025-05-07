import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from '../routes/router';
import ReactQueryProvider from '../providers/ReactQueryProvider';

const App = () => (
  <ReactQueryProvider>
    <ToastContainer position="top-center" autoClose={3000} />
    
    {/* Router */}
    <RouterProvider router={router} />
  </ReactQueryProvider>
);

export default App;
