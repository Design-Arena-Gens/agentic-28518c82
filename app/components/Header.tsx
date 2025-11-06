"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#identity", label: "Identity" },
  { href: "#breeding", label: "Breeding" },
  { href: "#health", label: "Health" },
  { href: "#weight", label: "Growth" },
  { href: "#movement", label: "Movement" },
  { href: "#nutrition", label: "Nutrition" },
  { href: "#finance", label: "Finance" },
  { href: "#production", label: "Production" },
  { href: "#tasks", label: "Tasks" },
  { href: "#analytics", label: "Analytics" },
  { href: "#alerts", label: "Alerts" },
  { href: "#integrations", label: "Integrations" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__emoji">🐐</span>
        <div>
          <h1>Sitamarhi Goat Intelligence Platform</h1>
          <p>Precision management for commercial goat farming</p>
        </div>
      </div>
      <nav className="header__nav">
        <button
          className="header__menu-button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`header__links ${open ? "header__links--open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
