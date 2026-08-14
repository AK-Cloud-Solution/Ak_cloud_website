import { defaultLandingContent, LandingContentData } from "./landingContent";

export interface SiteContent {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: Array<{ value: string; label: string }>;
  clients: Array<{ name: string; industry: string; status: string }>;
  capabilities: Array<{ title: string; description: string }>;
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    location: string;
    responseTime: string;
  };
  company: {
    name: string;
    footerTagline: string;
  };
  landing: LandingContentData;
}

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "WORK INTELLIGENTLY",
    title: "Everything your work needs.",
    accent: "Connected by AI.",
    description: "AK Cloud connects your people, projects, meetings, documents, tools and AI agents in one intelligent workspace — so work moves forward without the busywork.",
    primaryCta: "Request a demo",
    secondaryCta: "Explore the platform",
  },
  metrics: [
    { value: "99.99%", label: "Platform uptime" },
    { value: "38 sec", label: "Median deployment" },
    { value: "42 ms", label: "Edge latency" },
    { value: "24/7", label: "Threat protection" },
  ],
  clients: [
    { name: "Project Orbit", industry: "Digital Commerce", status: "Active" },
    { name: "Nova Analytics", industry: "Data Intelligence", status: "Active" },
    { name: "Northstar Health", industry: "Healthcare", status: "Onboarding" },
  ],
  capabilities: [
    { title: "Delivery pipelines", description: "Preview, validate, promote, and roll back with confidence." },
    { title: "Managed data", description: "Postgres, Redis, and object storage with automated resilience." },
    { title: "Deep observability", description: "Logs, metrics, traces, and real-user impact in one timeline." },
    { title: "Zero-trust security", description: "Workload identity and policy enforcement from edge to data." },
    { title: "Elastic compute", description: "Serverless and container runtimes tuned to every workload." },
    { title: "Cloud intelligence", description: "AI-guided diagnosis, scaling, and cost optimization." },
  ],
  contact: {
    eyebrow: "Let’s build what’s next",
    title: "Bring your next big idea to life.",
    description: "Tell us what you’re building. We’ll help you find the fastest, safest path from concept to production.",
    email: "connect@akcloudsolution.com",
    location: "India · Available globally",
    responseTime: "Response within one business day",
  },
  company: {
    name: "AK Cloud",
    footerTagline: "Infrastructure that moves at the speed of your ambition.",
  },
  landing: defaultLandingContent,
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export interface ProjectRequest {
  _id: string;
  requestType: "demo" | "project";
  name: string;
  email: string;
  company: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: string;
}

export async function loadSiteContent(): Promise<{ content: SiteContent; source: "api" | "fallback" }> {
  try {
    const response = await fetch(`${API_BASE}/content`, { signal: AbortSignal.timeout(2500) });
    if (!response.ok) throw new Error("Content API unavailable");
    const remote = await response.json();
    return { content: { ...defaultSiteContent, ...remote, landing: { ...defaultLandingContent, ...(remote.landing || {}) } }, source: "api" };
  } catch {
    return { content: defaultSiteContent, source: "fallback" };
  }
}

export async function saveSiteContent(content: SiteContent, adminKey: string): Promise<SiteContent> {
  const response = await fetch(`${API_BASE}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify(content),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Unable to save content");
  return result;
}

export async function submitProjectRequest(payload: Omit<ProjectRequest, "_id" | "status" | "createdAt">) {
  const response = await fetch(`${API_BASE}/requests`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Unable to submit request");
  return result as ProjectRequest;
}

export async function loadProjectRequests(adminKey: string): Promise<ProjectRequest[]> {
  const response = await fetch(`${API_BASE}/requests`, { headers: { "x-admin-key": adminKey } });
  const result = await response.json().catch(() => ([]));
  if (!response.ok) throw new Error(result.message || "Unable to load requests");
  return result;
}

export async function updateProjectRequestStatus(id: string, status: ProjectRequest["status"], adminKey: string) {
  const response = await fetch(`${API_BASE}/requests/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-key": adminKey }, body: JSON.stringify({ status }) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Unable to update request");
  return result as ProjectRequest;
}
