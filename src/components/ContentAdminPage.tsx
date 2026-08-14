import { useEffect, useState } from "react";
import { ArrowLeft, Check, Eye, KeyRound, Loader2, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { defaultSiteContent, loadSiteContent, saveSiteContent, SiteContent } from "../content/siteContent";
import { Toaster } from "./ui/sonner";

export function ContentAdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem("akcloud_admin_key") || "");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState<"api" | "fallback">("fallback");

  const refresh = async () => {
    setLoading(true);
    const result = await loadSiteContent();
    setContent(result.content);
    setSource(result.source);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const save = async () => {
    if (!adminKey.trim()) { toast.error("Enter the ADMIN_KEY configured on the server."); return; }
    setSaving(true);
    try {
      const saved = await saveSiteContent(content, adminKey);
      setContent(saved);
      sessionStorage.setItem("akcloud_admin_key", adminKey);
      setSource("api");
      toast.success("Site content published.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to publish content.");
    } finally { setSaving(false); }
  };

  const updateHero = (key: keyof SiteContent["hero"], value: string) => setContent({ ...content, hero: { ...content.hero, [key]: value } });
  const updateContact = (key: keyof SiteContent["contact"], value: string) => setContent({ ...content, contact: { ...content.contact, [key]: value } });

  return (
    <div className="admin-studio">
      <header className="admin-topbar">
        <button className="brand-lockup" onClick={() => window.location.assign("/")}><span className="brand-mark"><img src="/brand/ak-cloud-logo-black.png" alt="" /></span><span>AK <b>Cloud</b> Studio</span></button>
        <div className="admin-top-actions">
          <span className={`admin-source ${source}`}><i /> {source === "api" ? "Connected to API" : "Using fallback data"}</span>
          <button onClick={refresh}><RefreshCw /> Refresh</button>
          <button onClick={() => window.open("/", "_blank")}><Eye /> Preview</button>
          <button className="admin-save" onClick={save} disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Save />} Publish</button>
        </div>
      </header>

      <main className="admin-main">
        <aside className="admin-sidebar">
          <a href="#hero">Hero</a><a href="#landing-content">Homepage sections</a><a href="#metrics">Legacy metrics</a><a href="#clients">Legacy clients</a><a href="#capabilities">Legacy capabilities</a><a href="#contact-admin">Contact</a><a href="/admin/requests">Project requests</a><a href="#settings">Publishing</a>
          <button onClick={() => window.location.assign("/")}><ArrowLeft /> Back to website</button>
        </aside>

        <div className="admin-content">
          <div className="admin-heading"><div><span>CONTENT MANAGEMENT</span><h1>Website content</h1><p>Update the information shown on the public AK Cloud website.</p></div><span className="admin-draft"><Check /> Autosaved in this form</span></div>
          {loading ? <div className="admin-loading"><Loader2 className="animate-spin" /> Loading content…</div> : (
            <>
              <Section id="hero" kicker="01 · First impression" title="Hero">
                <Field label="Eyebrow" value={content.hero.eyebrow} onChange={v => updateHero("eyebrow", v)} />
                <div className="admin-grid-2"><Field label="Headline" value={content.hero.title} onChange={v => updateHero("title", v)} /><Field label="Accent line" value={content.hero.accent} onChange={v => updateHero("accent", v)} /></div>
                <Field label="Description" textarea value={content.hero.description} onChange={v => updateHero("description", v)} />
                <div className="admin-grid-2"><Field label="Primary button" value={content.hero.primaryCta} onChange={v => updateHero("primaryCta", v)} /><Field label="Secondary button" value={content.hero.secondaryCta} onChange={v => updateHero("secondaryCta", v)} /></div>
              </Section>

              <Section id="landing-content" kicker="02 · Homepage" title="Redesigned sections">
                <p className="admin-section-help">Edit projects, workspace categories, agents, integrations, timeline, and security content. Keep the JSON structure intact; icons remain mapped by their labels.</p>
                <LandingJsonEditor value={content.landing} onChange={landing => setContent({ ...content, landing })} />
              </Section>

              <Section id="metrics" kicker="02 · Proof" title="Headline metrics">
                <div className="admin-repeater metrics">{content.metrics.map((item, index) => <div className="admin-repeat-card" key={index}><Field label="Value" value={item.value} onChange={v => { const metrics=[...content.metrics]; metrics[index]={...item,value:v}; setContent({...content,metrics}); }} /><Field label="Label" value={item.label} onChange={v => { const metrics=[...content.metrics]; metrics[index]={...item,label:v}; setContent({...content,metrics}); }} /></div>)}</div>
              </Section>

              <Section id="clients" kicker="03 · Relationships" title="Clients">
                <div className="admin-repeater">{content.clients.map((client, index) => <div className="admin-repeat-card client" key={index}><Field label="Client name" value={client.name} onChange={v => { const clients=[...content.clients]; clients[index]={...client,name:v}; setContent({...content,clients}); }} /><Field label="Industry" value={client.industry} onChange={v => { const clients=[...content.clients]; clients[index]={...client,industry:v}; setContent({...content,clients}); }} /><Field label="Status" value={client.status} onChange={v => { const clients=[...content.clients]; clients[index]={...client,status:v}; setContent({...content,clients}); }} /><button className="remove-row" onClick={() => setContent({...content,clients:content.clients.filter((_,i)=>i!==index)})}><Trash2 /></button></div>)}</div>
                <button className="add-row" onClick={() => setContent({...content,clients:[...content.clients,{name:"New client",industry:"Industry",status:"Active"}]})}><Plus /> Add client</button>
              </Section>

              <Section id="capabilities" kicker="04 · Offering" title="Capabilities">
                <div className="admin-repeater">{content.capabilities.map((item,index)=><div className="admin-repeat-card capability" key={index}><Field label="Title" value={item.title} onChange={v=>{const capabilities=[...content.capabilities];capabilities[index]={...item,title:v};setContent({...content,capabilities});}}/><Field label="Description" textarea value={item.description} onChange={v=>{const capabilities=[...content.capabilities];capabilities[index]={...item,description:v};setContent({...content,capabilities});}}/></div>)}</div>
              </Section>

              <Section id="contact-admin" kicker="05 · Conversion" title="Contact">
                <Field label="Section label" value={content.contact.eyebrow} onChange={v => updateContact("eyebrow", v)} />
                <Field label="Headline" value={content.contact.title} onChange={v => updateContact("title", v)} />
                <Field label="Description" textarea value={content.contact.description} onChange={v => updateContact("description", v)} />
                <div className="admin-grid-2"><Field label="Email" value={content.contact.email} onChange={v => updateContact("email", v)} /><Field label="Location" value={content.contact.location} onChange={v => updateContact("location", v)} /></div>
                <Field label="Response time" value={content.contact.responseTime} onChange={v => updateContact("responseTime", v)} />
              </Section>

              <Section id="settings" kicker="06 · Publishing" title="API connection">
                <label className="admin-field"><span>Admin key</span><div className="key-input"><KeyRound /><input type="password" value={adminKey} onChange={e=>setAdminKey(e.target.value)} placeholder="Value of server ADMIN_KEY" /></div><small>This key is held in session storage only and is required to publish.</small></label>
                <button className="admin-publish-large" onClick={save} disabled={saving}>{saving ? <Loader2 className="animate-spin"/> : <Save/>} Publish all changes</button>
              </Section>
            </>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Section({ id, kicker, title, children }: { id:string; kicker:string; title:string; children:React.ReactNode }) {
  return <section className="admin-section" id={id}><div className="admin-section-title"><span>{kicker}</span><h2>{title}</h2></div><div className="admin-section-body">{children}</div></section>;
}
function Field({ label, value, onChange, textarea=false }: { label:string; value:string; onChange:(value:string)=>void; textarea?:boolean }) {
  return <label className="admin-field"><span>{label}</span>{textarea?<textarea rows={3} value={value} onChange={e=>onChange(e.target.value)}/>:<input value={value} onChange={e=>onChange(e.target.value)}/>}</label>;
}

function LandingJsonEditor({ value, onChange }: { value: SiteContent["landing"]; onChange: (value: SiteContent["landing"]) => void }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  useEffect(() => setDraft(JSON.stringify(value, null, 2)), [value]);
  const apply = () => { try { onChange(JSON.parse(draft)); toast.success("Homepage section JSON validated."); } catch { toast.error("Homepage JSON is invalid. Fix it before publishing."); } };
  return <label className="admin-field"><span>Homepage content JSON</span><textarea className="admin-json-editor" rows={28} value={draft} onChange={event => setDraft(event.target.value)} onBlur={apply} spellCheck={false} /><small>Changes are validated when you leave this field, then included when you publish.</small></label>;
}
