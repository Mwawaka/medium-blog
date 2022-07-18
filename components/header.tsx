import Link from "next/link";
const Header = () => {
  return (
    <header className=" container font-outfit flex justify-between  my-4 mx-auto">
      <div className=" flex items-center space-x-6">
        <Link href={`/`}>
          <img
            src="https://links.papareact.com/yvf"
            alt="medium logo"
            className="w-44 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden space-x-6 items-center tracking-wider md:inline-flex  ">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 rounded-full px-4 py-1">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex space-x-6 items-center tracking-wider text-green-600 sm:mr-2">
        <h3>Sign In</h3>
        <h3 className=" border border-green-600 px-4 py-1 rounded-full hover:text-white hover:bg-green-600 cursor-pointer ">
          Get Started
        </h3>
      </div>
    </header>
  );
};
export default Header;
