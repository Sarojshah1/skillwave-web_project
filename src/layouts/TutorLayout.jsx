import { Outlet } from 'react-router-dom';
// import Sidebar from '@/components/Tutor_Components/sidebar/Sidebar.jsx';

const TutorLayout = () => {
  return (
    <div className='flex h-screen'>
      <div className="fixed">
        {/* <Sidebar /> */}
      </div>
      <div className="flex-grow ml-64 p-6 overflow-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default TutorLayout;
