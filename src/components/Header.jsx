// Mozemy skorzystac ze zwykłych <a> ale w takim przypadku strona zostanie przeładowana, a my chcemy, aby nawigacja była płynna i bez przeładowania. Dlatego używamy komponentu <Link> z react-router.

import { Link } from "react-router";

const Header = () => {
  return (
    <header className="border-b border-border bg-surface text-text py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="font-display text-h3 font-bold">Crypto Dash</h1>
        <div className="links">
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/" className="text-text transition-colors duration-200 ease-out hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text transition-colors duration-200 ease-out hover:text-brand">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
