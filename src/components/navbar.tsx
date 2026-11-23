"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DigitalClock from "@/components/clock";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Playground",
    path: "/playground",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "Book",
    path: "/book",
  },
];

// Framer Motion variants
const menuVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
};

const navItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className="w-full px-4 z-50 flex justify-between py-4 backdrop-blur-md sticky top-0"
        aria-label="Main Navigation"
      >
        <section className="flex gap-8 items-center">
          <Link
            href="/"
            className="font-bold text-amber-500 hover:text-amber-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Home"
          >
            エバンズ
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:block">
            <ul className="flex gap-4" role="menubar">
              {routes.map((route) => (
                <li
                  key={route.label}
                  className={`${
                    isActive(route.path)
                      ? "underline text-stone-900 dark:text-stone-100 opacity-100"
                      : "hover:opacity-100"
                  } opacity-60 dark:text-stone-200 transition-all duration-300`}
                  role="none"
                >
                  <Link
                    href={route.path}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-1 rounded"
                    role="menuitem"
                    aria-current={isActive(route.path) ? "page" : undefined}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex gap-2 items-center">
          <DigitalClock />

          {/* Hamburger button — mobile only */}
          <button
            className="sm:hidden ml-2 p-1.5 rounded-md text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="relative w-5 h-5 flex flex-col justify-center items-center gap-[5px]"
            >
              {/* Top bar */}
              <motion.span
                className="block h-[1.5px] w-5 bg-current rounded-full origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6.5 },
                }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Middle bar */}
              <motion.span
                className="block h-[1.5px] w-5 bg-current rounded-full"
                variants={{
                  closed: { opacity: 1, scaleX: 1 },
                  open: { opacity: 0, scaleX: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Bottom bar */}
              <motion.span
                className="block h-[1.5px] w-5 bg-current rounded-full origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6.5 },
                }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </button>
        </section>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm sm:hidden"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs flex flex-col bg-white/90 dark:bg-[#171717]/80 backdrop-blur-xs border-r border-stone-200 dark:border-stone-800 sm:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
                <Link
                  href="/"
                  className="font-bold text-amber-500 hover:text-amber-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Home"
                  onClick={() => setMenuOpen(false)}
                >
                  エバンズ
                </Link>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="flex flex-col gap-1" role="menu">
                  {routes.map((route, i) => (
                    <motion.li
                      key={route.label}
                      custom={i}
                      variants={navItemVariants}
                      initial="closed"
                      animate="open"
                      role="none"
                    >
                      <Link
                        href={route.path}
                        role="menuitem"
                        aria-current={isActive(route.path) ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                          ${
                            isActive(route.path)
                              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                              : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                      >
                        {/* Active indicator dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                            isActive(route.path) ? "bg-amber-500" : "bg-transparent"
                          }`}
                        />
                        {route.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Panel footer */}
              <div className="px-5 py-4 border-t border-stone-100 dark:border-stone-800">
                <DigitalClock />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
