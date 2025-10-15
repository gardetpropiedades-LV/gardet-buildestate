import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import PropTypes from "prop-types";
import logoGardet from "../assets/logo-gardet.svg";
import { useAuth } from "../context/AuthContext";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Propiedades", path: "/properties" },
  { name: "Contacto", path: "/contact" },
];

const NavbarLink = ({ children, onNavigate, path, variant = "desktop" }) => (
  <NavLink
    to={path}
    onClick={onNavigate}
    className={({ isActive }) => {
      if (variant === "mobile") {
        return `block w-full rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
          isActive
            ? "bg-brand-50 text-brand-900 shadow-sm"
            : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
        }`;
      }

      return `px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
        isActive ? "text-brand-700" : "text-slate-600 hover:text-brand-700"
      }`;
    }}
  >
    {children}
  </NavLink>
);

NavbarLink.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigate: PropTypes.func,
  path: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["desktop", "mobile"]),
};

const getInitials = (value) => {
  if (!value) {
    return "G";
  }

  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const shiftColor = (hex, amount = 0) => {
  if (!hex) {
    return hex;
  }

  let color = hex.trim();
  if (color.startsWith("#")) {
    color = color.slice(1);
  }

  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const numeric = parseInt(color, 16);
  if (Number.isNaN(numeric)) {
    return hex;
  }

  const clamp = (value) => Math.max(0, Math.min(255, value));
  const r = clamp(((numeric >> 16) & 255) + amount);
  const g = clamp(((numeric >> 8) & 255) + amount);
  const b = clamp((numeric & 255) + amount);

  const updated = (r << 16) | (g << 8) | b;
  return `#${updated.toString(16).padStart(6, "0")}`;
};

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandName = useMemo(
    () => import.meta.env.VITE_BRAND_NAME || "Gardet",
    []
  );
  const themeColor = useMemo(
    () => import.meta.env.VITE_THEME_COLOR || "#C7A046",
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (themeColor) {
      document.documentElement.style.setProperty("--brand-color", themeColor);
      document.documentElement.style.setProperty("--brand-color-dark", shiftColor(themeColor, -35));
      document.documentElement.style.setProperty("--brand-color-light", shiftColor(themeColor, 40));
    }
  }, [themeColor]);

  const initials = useMemo(() => getInitials(user?.name || user?.email), [user]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg backdrop-blur" : "bg-white/80 backdrop-blur-lg"
      }`}
    >
      <div className="h-1 w-full bg-gradient-to-r from-brand-200 via-brand-500 to-brand-700" />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-200 bg-brand-100 shadow-sm">
            <img
              src={logoGardet}
              alt={`${brandName} logo`}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900 sm:text-xl">
              {brandName}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">
              Viví tu próximo hogar
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <NavbarLink key={item.path} path={item.path}>
              {item.name}
            </NavbarLink>
          ))}
        </div>

        {isLoggedIn ? (
          <div className="hidden items-center gap-3 md:flex">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              {initials}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        ) : (
          <div className="hidden text-sm font-medium text-brand-700 md:block">
            {import.meta.env.VITE_APP_NAME || "Gardet"}
          </div>
        )}

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-brand-200 bg-white/70 p-2 text-brand-800 shadow-sm transition md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-expanded={isMobileOpen}
          aria-label="Abrir menú de navegación"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-3xl border border-brand-100 bg-white/95 p-4 shadow-xl backdrop-blur">
            <div className="space-y-2">
              {links.map((item) => (
                <NavbarLink
                  key={item.path}
                  path={item.path}
                  onNavigate={() => setIsMobileOpen(false)}
                  variant="mobile"
                >
                  {item.name}
                </NavbarLink>
              ))}
            </div>

            {isLoggedIn ? (
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user?.name || user?.email}</p>
                  <p className="text-xs text-slate-500">Sesión iniciada</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-brand-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <p className="mt-4 text-xs text-slate-500">
                Explora propiedades exclusivas con Gardet.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
