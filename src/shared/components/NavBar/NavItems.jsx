
import CustomButton from "../../../components/buttons/CustomButton"

const navitems = [
  { link: "Home", path: "" },
  { link: "Courses", path: "courses" },
  { link: "Study Groups", path: "study-groups" },
  { link: "Posts", path: "posts" },
  { link: "Blog", path: "blogs" },
  { link: "Category", path: "category" },
  { link: "About Us", path: "aboutus" },
]

const NavItems = ({ handleNavLinkClick }) => (
  <div className="hidden lg:flex space-x-8 items-center flex-grow justify-center">
    {navitems.map((item, index) => (
      <CustomButton
        key={index}
        onClick={() => handleNavLinkClick(item.path)}
        variant="ghost"
        size="md"
        className="text-white hover:bg-white/10 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg backdrop-blur-sm"
      >
        {item.link}
      </CustomButton>
    ))}
  </div>
)

export default NavItems
