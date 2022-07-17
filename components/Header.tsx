import Link from "next/link";
const Header = () => {
  return (
    <header>
      <div className="container flex items-center space-x-6">
        <Link href={`/`}>
          <img
            src="https://links.papareact.com/yvf"
            alt="medium logo"
            className="w-52 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden space-x-6 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Follow</h3>
        </div>
      </div>
    </header>
  );
};
export default Header;
