import { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, Bot, Check, CloudCog, Code2, Cpu, Database, Gauge, GitBranch, Globe2, Layers3, LockKeyhole, Radar, Server, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { SiteContent } from "../content/siteContent";

const stages = [
  { id: "build", number: "01", icon: Code2, title: "Build without friction.", copy: "Connect your repository and turn every commit into a preview environment. AK Cloud understands your stack and configures the path to production.", stat: "38 sec", statLabel: "average build" },
  { id: "deploy", number: "02", icon: GitBranch, title: "Deploy with confidence.", copy: "Progressive rollouts, automatic rollbacks, and environment promotion give every team enterprise control without operational drag.", stat: "12×", statLabel: "faster releases" },
  { id: "observe", number: "03", icon: Activity, title: "See the whole system.", copy: "Metrics, logs, traces, and user impact live in one coherent view. Ask questions in plain language and move from signal to cause.", stat: "42 ms", statLabel: "global latency" },
  { id: "secure", number: "04", icon: ShieldCheck, title: "Secure by default.", copy: "Identity-aware access, encrypted workloads, policy controls, and continuous posture checks protect every layer automatically.", stat: "24/7", statLabel: "active protection" },
  { id: "scale", number: "05", icon: Layers3, title: "Scale on intelligence.", copy: "Predictive capacity and cost-aware placement keep applications fast while eliminating waste across regions and services.", stat: "31%", statLabel: "lower cloud cost" },
];

export function ProofStrip({ metrics }: { metrics: SiteContent["metrics"] }) {
  return (
    <section id="proof" className="border-y border-white/10 bg-[#07101f]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4 lg:px-12 xl:px-20">
        {metrics.map(({ value,label }) => (
          <div key={label} className="proof-stat"><strong>{value}</strong><span>{label}</span></div>
        ))}
      </div>
    </section>
  );
}

export function PlatformExperience() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
      });
    }, { rootMargin: "-38% 0px -45%", threshold: 0 });
    refs.current.forEach(node => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = stages[active].icon;
  return (
    <section id="platform" className="relative bg-[#050b16] py-28 text-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-20">
        <div className="section-kicker">One continuous cloud</div>
        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <h2 className="display-heading">From first commit<br/>to global scale.</h2>
          <p className="max-w-xl self-end text-lg leading-8 text-slate-400">Every stage shares context, policy, and intelligence. Scroll through the platform to see how AK Cloud removes the seams between teams and tools.</p>
        </div>
        <div className="platform-story-shell grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-28 py-[12vh]">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.id} ref={node => { refs.current[index] = node; }} data-index={index} className={`story-step ${active === index ? "active" : ""}`}>
                  <div className="story-index"><span>{stage.number}</span><Icon /></div>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                  <div className="story-stat"><strong>{stage.stat}</strong><span>{stage.statLabel}</span></div>
                </div>
              );
            })}
          </div>
          <div className="platform-visual-column hidden lg:block">
            <div className="platform-sticky-visual sticky top-24 h-[calc(100vh-8rem)] min-h-[560px] max-h-[720px]">
              <div className="story-visual h-full">
                <div className="visual-topline"><span className="flex items-center gap-2"><ActiveIcon className="h-4 w-4 text-cyan-300" /> {stages[active].id}.akcloud.app</span><span className="live-pill"><span/> Live</span></div>
                <div className="orbit-system">
                  <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
                  <div className="core-node"><ActiveIcon /></div>
                  {[CloudCog, Database, Server, Globe2, LockKeyhole, Radar].map((Icon, i) => <div key={i} className={`satellite satellite-${i}`}><Icon /></div>)}
                </div>
                <div className="visual-console">
                  <span><i className="bg-emerald-400"/> Region health</span><strong>6 / 6 operational</strong>
                  <span><i className="bg-cyan-400"/> Optimization</span><strong>Active</strong>
                  <span><i className="bg-violet-400"/> Current stage</span><strong className="capitalize">{stages[active].id}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  { icon: Workflow, title: "Delivery pipelines", copy: "Preview, validate, promote, and roll back with confidence.", tone: "cyan" },
  { icon: Database, title: "Managed data", copy: "Postgres, Redis, and object storage with automated resilience.", tone: "violet" },
  { icon: Gauge, title: "Deep observability", copy: "Logs, metrics, traces, and real-user impact in one timeline.", tone: "emerald" },
  { icon: LockKeyhole, title: "Zero-trust security", copy: "Workload identity and policy enforcement from edge to data.", tone: "amber" },
  { icon: Cpu, title: "Elastic compute", copy: "Serverless and container runtimes tuned to every workload.", tone: "blue" },
  { icon: Bot, title: "Cloud intelligence", copy: "AI-guided diagnosis, scaling, and cost optimization.", tone: "pink" },
];

export function CapabilityGrid({ content }: { content: SiteContent["capabilities"] }) {
  const [selected, setSelected] = useState(0);
  return (
    <section id="services" className="relative overflow-hidden bg-[#f5f7fb] py-28 text-slate-950">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-20">
        <div className="section-kicker text-blue-700">Designed as one system</div>
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="display-heading !text-slate-950">Powerful alone.<br/>Exceptional together.</h2>
          <p className="max-w-lg text-lg leading-8 text-slate-600">Choose a capability to explore how the platform adapts around your application—not the other way around.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const managed = content[index] || { title: item.title, description: item.copy };
            return (
              <button key={item.title} onClick={() => setSelected(index)} className={`capability-card tone-${item.tone} ${selected === index ? "selected" : ""}`}>
                <div className="capability-icon"><Icon /></div>
                <ArrowUpRight className="capability-arrow" />
                <h3>{managed.title}</h3><p>{managed.description}</p>
                <div className="capability-detail">
                  <span><Check /> Unified controls</span><span><Check /> Intelligent defaults</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section id="security" className="bg-[#07101f] py-28 text-white">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-2 lg:px-12 xl:px-20">
        <div>
          <div className="section-kicker">Security without compromise</div>
          <h2 className="display-heading mt-5">Protected at<br/>every layer.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Security is part of the platform architecture—not a product bolted on later. Every request, workload, secret, and change is continuously verified.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {["Encrypted by default","Identity-aware access","Continuous posture","Immutable audit trail"].map(item => <div className="security-check" key={item}><Check />{item}</div>)}
          </div>
        </div>
        <div className="security-stack">
          {[["Edge protection","DDoS · WAF · TLS"],["Application identity","Zero-trust · RBAC"],["Runtime isolation","Policy · Sandboxing"],["Data protection","Encryption · Backups"]].map(([title,copy],i) => (
            <div key={title} className="security-layer" style={{"--i": i} as React.CSSProperties}><span>0{i+1}</span><div><strong>{title}</strong><small>{copy}</small></div><ShieldCheck /></div>
          ))}
          <div className="security-core"><Sparkles /> Continuously verified</div>
        </div>
      </div>
    </section>
  );
}
