import { useEffect, useState } from "react";
import { AKNavigation } from "./components/AKNavigation";
import { AKHero } from "./components/AKHero";
import { AgentsSection, CTASection, Footer, HumanAISection, IntegrationGrid, KnowledgeDiagram, ProjectPortfolio, ProductShowcase, SecuritySection } from "./components/LandingSections";
import { ContentAdminPage } from "./components/ContentAdminPage";
import { ProjectRequestsPage } from "./components/ProjectRequestsPage";
import { Toaster } from "./components/ui/sonner";
import { defaultSiteContent, loadSiteContent, SiteContent } from "./content/siteContent";
import { applyLandingContent } from "./content/landingContent";

function PublicExperience() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  useEffect(() => { loadSiteContent().then(result => { applyLandingContent(result.content.landing); setContent(result.content); }); }, []);
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  return <div className="ak-site-new"><AKNavigation onRequestDemo={() => scroll("#contact")} /><main><AKHero content={content.hero} onPrimaryClick={() => scroll("#contact")} onSecondaryClick={() => scroll("#platform")} /><ProjectPortfolio /><ProductShowcase /><HumanAISection /><AgentsSection /><IntegrationGrid /><KnowledgeDiagram /><SecuritySection /><CTASection /></main><Footer /><Toaster /></div>;
}

export default function App() {
  if (window.location.pathname.startsWith("/admin/requests")) return <ProjectRequestsPage />;
  if (window.location.pathname.startsWith("/admin")) return <ContentAdminPage />;
  return <PublicExperience />;
}
