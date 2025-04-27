import HomeLink from "../HomeLink";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "text-2xl font-bold" }: LogoProps) => {
  return (
    <HomeLink className={className}>ViNa</HomeLink>
  );
};

export default Logo;
