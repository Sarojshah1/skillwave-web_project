import { TutorPortalHeader } from '@/shared/components/SideBar/tutor-portal-headers';
import { TutorPortalSidebar } from '@/shared/components/SideBar/tutor-portal-sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardContent } from '@/features/tutor_features/dashboard/page/dashboard-content';
import { ProfileContent } from '@/features/tutor_features/profile_screen/pages/profile-content';
import { AddCourseContent } from '@/features/tutor_features/courses/page/add-course-content';
// import Sidebar from '@/components/Tutor_Components/sidebar/Sidebar.jsx';

const TutorLayout = () => {
   const [activeSection, setActiveSection] = useState("dashboard")
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <TutorPortalSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset>
          <div className="flex flex-col w-full">
            <TutorPortalHeader activeSection={activeSection} />
            <main className="flex-1 overflow-auto p-6">
              {activeSection === "dashboard" && <DashboardContent/>}
              {activeSection === "add-course" && <AddCourseContent/>}
              {activeSection === "profile" && <ProfileContent/>}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TutorLayout;
