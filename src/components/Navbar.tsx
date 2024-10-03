import Link from "next/link";
import Image from "next/image";
import Logo from "/public/assets/logo.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full backdrop-blur bg-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <Image height={40} src={Logo} alt="logo"></Image>
            </Link>
          </div>
          <div className="flex space-x-4 tracking-wide">
            <Link href="/champions" className="nav-link">
              챔피언 목록
            </Link>
            <Link href="/items" className="nav-link">
              아이템 목록
            </Link>
            <Link href="/rotation" className="nav-link">
              챔피언 로테이션
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
