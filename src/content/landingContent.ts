import { BarChart3, Bot, CalendarDays, Code2, FileText, FolderKanban, Mail, MessageSquareText, Search, Sparkles, Workflow } from "lucide-react";

export const productCategories = [
  { label: "AI Assistant", icon: Sparkles, title: "Start with context, not a blank prompt.", body: "Ask across projects, conversations, and documents. AK Cloud brings the right context forward and helps turn the answer into action.", stat: "3 priorities recommended", tone: "cyan" },
  { label: "Projects", icon: FolderKanban, title: "See momentum, risks, and next moves.", body: "Keep owners, decisions, files, and timelines connected so every project has a shared source of truth.", stat: "12 workstreams aligned", tone: "green" },
  { label: "Meetings", icon: MessageSquareText, title: "Make every conversation useful.", body: "Capture the discussion, surface decisions, and route follow-ups without adding another task to the meeting.", stat: "Meeting notes ready", tone: "cyan" },
  { label: "Documents", icon: FileText, title: "Knowledge that stays in the flow.", body: "Find the latest policy, brief, or decision with permission-aware search grounded in your workspace.", stat: "Knowledge indexed", tone: "green" },
  { label: "Calendar", icon: CalendarDays, title: "Protect time for the work that matters.", body: "Coordinate schedules, prepare for what is next, and create focused follow-up time around real priorities.", stat: "Calendar synchronized", tone: "cyan" },
  { label: "Email", icon: Mail, title: "Turn messages into coordinated work.", body: "Summarize long threads, identify commitments, and keep important actions from getting buried.", stat: "5 actions identified", tone: "green" },
  { label: "Developer Tools", icon: Code2, title: "Keep shipping context connected.", body: "Link discussions and project decisions to the technical work teams use to build and deploy.", stat: "Deployment successful", tone: "cyan" },
  { label: "Automations", icon: Workflow, title: "Let routine work move itself forward.", body: "Build dependable workflows across the tools your teams already use, with people in control of approvals.", stat: "Workflow completed", tone: "green" },
  { label: "Insights", icon: BarChart3, title: "See what deserves attention next.", body: "Turn activity across your workspace into calm, useful signals about momentum, capacity, and the decisions ahead.", stat: "3 insights surfaced", tone: "cyan" },
];

export const agents = [
  { name: "Meeting Agent", icon: MessageSquareText, description: "Summarizes context, extracts decisions, and prepares follow-ups.", tools: ["Calendar", "Email", "Documents"], status: "Ready" },
  { name: "Project Agent", icon: FolderKanban, description: "Tracks momentum, flags risks, and keeps priorities visible.", tools: ["Projects", "Jira", "Slack"], status: "3 updates" },
  { name: "Developer Agent", icon: Code2, description: "Connects technical work to the decisions behind every release.", tools: ["GitHub", "Jira", "Projects"], status: "Build passed" },
  { name: "Knowledge Agent", icon: Search, description: "Finds trusted answers across permissioned company knowledge.", tools: ["Drive", "Files", "Meetings"], status: "Indexed" },
  { name: "Calendar Agent", icon: CalendarDays, description: "Coordinates schedules and protects time around real priorities.", tools: ["Calendar", "Meetings", "Email"], status: "Synced" },
  { name: "Email Agent", icon: Mail, description: "Surfaces commitments and turns long threads into clear next steps.", tools: ["Email", "Projects", "Calendar"], status: "5 actions" },
];

export const integrations = ["Google Calendar", "Gmail", "Microsoft Outlook", "Microsoft Teams", "GitHub", "Jira", "Slack", "Google Drive"];

export const projects = [
  { number: "01", name: "Atlas Workspace", category: "Intelligent operations", summary: "One operational view for teams, priorities, and decisions.", status: "Live" },
  { number: "02", name: "Pulse Meetings", category: "Meeting intelligence", summary: "Conversations become summaries, owners, and coordinated follow-ups.", status: "Live" },
  { number: "03", name: "Northstar Projects", category: "Project orchestration", summary: "Connected plans that surface momentum, dependencies, and risk.", status: "Pilot" },
  { number: "04", name: "Context Library", category: "Enterprise knowledge", summary: "Permission-aware answers across documents, notes, and discussions.", status: "Live" },
  { number: "05", name: "Flow Automations", category: "Workflow automation", summary: "Human-approved workflows that move routine work between tools.", status: "Beta" },
  { number: "06", name: "Build Companion", category: "Developer experience", summary: "Release context connects engineering work to product decisions.", status: "Pilot" },
  { number: "07", name: "Time Intelligence", category: "Calendar optimization", summary: "Schedules adapt around priorities, preparation, and focused work.", status: "Concept" },
];

export const timeline = [
  ["09:15", "Team completes stand-up"], ["09:17", "AK Cloud captures context"], ["09:18", "AI identifies next actions"], ["09:19", "Workspace updates automatically"], ["09:20", "Team receives the plan"],
];

export const securityItems = [
  ["Role-based access", "Available today"], ["Encrypted credentials", "Available today"], ["Workspace isolation", "Available today"], ["Audit history", "Roadmap"], ["Permission-controlled AI", "Roadmap"],
];

export const heroStates = [
  { text: "Define the vision", icon: Sparkles }, { text: "Design the strategy", icon: FolderKanban }, { text: "Build the solution", icon: Code2 }, { text: "Scale the impact", icon: BarChart3 },
];

export const agentIcon = Bot;

export type LandingContentData = {
  productCategories: Array<Omit<(typeof productCategories)[number], "icon">>;
  agents: Array<Omit<(typeof agents)[number], "icon">>;
  integrations: string[];
  timeline: string[][];
  securityItems: string[][];
  projects: typeof projects;
};

export const defaultLandingContent: LandingContentData = {
  productCategories: productCategories.map(({ icon: _icon, ...item }) => item),
  agents: agents.map(({ icon: _icon, ...item }) => item),
  integrations,
  timeline,
  securityItems,
  projects,
};

export function applyLandingContent(content: LandingContentData) {
  const categoryIcons = new Map(productCategories.map(item => [item.label, item.icon]));
  productCategories.splice(0, productCategories.length, ...content.productCategories.map((item, index) => ({ ...item, icon: categoryIcons.get(item.label) || productCategories[index]?.icon || Sparkles })));
  const agentIcons = new Map(agents.map(item => [item.name, item.icon]));
  agents.splice(0, agents.length, ...content.agents.map((item, index) => ({ ...item, icon: agentIcons.get(item.name) || agents[index]?.icon || Bot })));
  integrations.splice(0, integrations.length, ...content.integrations);
  timeline.splice(0, timeline.length, ...content.timeline);
  securityItems.splice(0, securityItems.length, ...content.securityItems);
  projects.splice(0, projects.length, ...content.projects);
}
