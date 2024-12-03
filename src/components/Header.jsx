import Input from "./Input";

export default function Header() {
  const linkStyle = "text-xl mx-4 text-gray-300 hover:text-white transition";

  return (
    <>
      <header className="w-full fixed top-0 z-10">
        <nav className="bg-[#121212] text-white flex justify-between items-center shadow-md p-8 w-full">
          <div className="mx-auto flex justify-between items-center w-full">
            <a href="/myMovie/" className="text-white font-bold text-4xl">
              myMovie
            </a>
            <Input />
          </div>
        </nav>
      </header>
    </>
  );
}
