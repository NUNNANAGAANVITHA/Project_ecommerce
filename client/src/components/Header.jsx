const Header = ({ resultCount }) => (
  <header className="header">
    <div className="header-inner">
      <div className="brand-block">
        <div className="brand-mark">M</div>
        <div className="brand-copy">
          <h1>Marketplace</h1>
          <p>Curated products across every category</p>
        </div>
      </div>
      <div className="search-card" aria-label="Search products">
        <span className="search-icon">🔎</span>
        <span>Search products and compare results</span>
      </div>
      <div className="result-pill">{resultCount} items</div>
    </div>
  </header>
);

export default Header;
