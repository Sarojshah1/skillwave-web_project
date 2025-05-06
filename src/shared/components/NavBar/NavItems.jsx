import CustomButton from "../../../components/buttons/CustomButton";
const navitems = [
    { link: "Home", path: "" },
    { link: "Courses", path: "courses" },
    { link: "Posts", path: "posts" },
    { link: "Blog", path: "blogs" },
    { link: "Category", path: "category" },
    { link: "About Us", path: "aboutus" },
  ];
  
  const NavItems = ({ handleNavLinkClick }) => (
    <div className="hidden md:flex space-x-12 items-center flex-grow justify-end">
      {navitems.map((item, index) => (
        <CustomButton
        key={index}
        onClick={() => handleNavLinkClick(item.path)}
        variant="ghost"
        size="md"
      >
        {item.link}
      </CustomButton>
      ))}
    </div>
  );
  
  export default NavItems;
  