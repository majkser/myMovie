export default function Header() {
  const linkStyle =
    "text-white text-xl py-3 px-4 rounded-xl transition-colors duration-300 hover:bg-[#242440]";

  return (
    <>
      <header className="w-full fixed top-0 z-10">
        <nav className="bg-[#1A1A2E] p-8 w-full">
          <div className="mx-auto flex justify-between items-center w-full">
            <a href="/" className="text-white font-bold text-4xl">
              myMovie
            </a>
            <ul className="flex">
              <li>
                <a href="/" className={linkStyle}>
                  Home
                </a>
              </li>
              <li>
                <a href="/" className={linkStyle}>
                  About
                </a>
              </li>
              <li>
                <a href="/" className={linkStyle}>
                  Services
                </a>
              </li>
              <li>
                <a href="/" className={linkStyle}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="mt-40">
        {/* This div adds margin to the top of the content below the header */}
      </div>
    </>
  );
}
