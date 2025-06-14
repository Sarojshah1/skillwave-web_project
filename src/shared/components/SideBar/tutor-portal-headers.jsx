import { SidebarTrigger } from "@/components/ui/sidebar"

export function TutorPortalHeader({ activeSection }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <div className="flex items-center text-lg font-semibold">
        {activeSection === "dashboard" && "Dashboard"}
        {activeSection === "add-course" && "Add New Course"}
        {activeSection === "view-courses" && "My Courses"}
        {activeSection === "add-blog" && "Create Blog Post"}
        {activeSection === "view-blogs" && "My Blog Posts"}
        {activeSection === "payments" && "Payment History"}
        {activeSection === "settings" && "Account Settings"}
        {activeSection === "profile" && "My Profile"}
      </div>
    </header>
  )
}
