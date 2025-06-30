import clsx from 'clsx';
import { useLocation } from 'react-router';

const navLinks = [
  {
    name: "Classes",
    link: "/classes",
  },
  {
    name: "Teachers",
    link: "/teachers",
  },
];

export interface HeaderProps {}

const Header = () => {
  const currentPath = useLocation().pathname;
  console.log("Current Path:", currentPath);

  return (
    <div className="flex flex-row bg-white w-full h-[88px] items-center shadow">
      {/** Logo */}
      <div className="flex flex-row gap-2 px-12">
        <img
          src="/mortarboard.svg"
        />
        <p className="text-lg font-extrabold text-primary">
          School Portal
        </p>
      </div>
      {/** Navigation */}
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.link}
          className={clsx(
            "flex h-full items-center px-4",
            "text-sm font-semibold text-primary leading-5",
            currentPath == link.link && "shadow-[0px_-3px_0px_0px_var(--color-primary)_inset]" // From the figma design
          )}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default Header;
