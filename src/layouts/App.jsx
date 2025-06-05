import { RouterProvider } from 'react-router-dom';
import { ToastContainer,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from '../routes/router';
import ReactQueryProvider from '../providers/ReactQueryProvider';

const App = () => (
  <ReactQueryProvider>
    <ToastContainer position="top-center"  transition={Slide}  hideProgressBar={false} autoClose={3000} />
    <RouterProvider router={router} />
  </ReactQueryProvider>
);

export default App;
