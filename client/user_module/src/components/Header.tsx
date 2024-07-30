import "../output.css";

function Header() {
  return (
    <div className="text-gray-950 h-14 p-4 flex justify-end gap-6">
      <a href="/">Home</a>
      {/* <a href="/criar">Criar estudo</a> */}
      <a href="/meus-estudos">Meus estudos</a>
    </div>
  );
}

export default Header;
