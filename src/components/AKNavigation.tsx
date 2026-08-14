import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [{ label: "Platform", href: "#platform" }, { label: "Solutions", href: "#solutions" }, { label: "AI Agents", href: "#agents" }, { label: "Projects", href: "#projects" }, { label: "Integrations", href: "#integrations" }, { label: "Company", href: "#security" }];
export function AKNavigation({ onRequestDemo }: { onRequestDemo: () => void }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 24); handle(); addEventListener("scroll", handle, { passive: true }); return () => removeEventListener("scroll", handle); }, []);
  const go = (href: string) => { document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  const requestDemo = () => { onRequestDemo(); setOpen(false); };
  return <nav className={`new-nav ${scrolled ? "scrolled" : ""}`}><div className="nav-inner"><button className="new-brand" onClick={() => go("#home")} aria-label="AK Cloud Experience home"><img src="/brand/ak-cloud-experience.png" alt="AK Cloud experience" /></button><div className="nav-links">{links.map(l => <button key={l.href} onClick={() => go(l.href)}>{l.label}</button>)}</div><div className="nav-actions"><button onClick={() => go("#contact")}>Start a project</button><button onClick={requestDemo}>Request a demo <ArrowRight /></button></div><button className="nav-mobile" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></div>{open && <div className="nav-drawer">{links.map(l => <button key={l.href} onClick={() => go(l.href)}>{l.label}</button>)}<button onClick={requestDemo}>Request a demo</button></div>}</nav>;
}
