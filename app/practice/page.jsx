"use client";
import { useEffect, useRef, useState } from "react";
import { Lightbulb, Send, Sparkles, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SUBJECTS } from "@/lib/study-data";

const STARTERS=["Explain photosynthesis like I'm in Grade 10","Quiz me on trigonometry identities","Help me brainstorm an essay on load shedding","Give me a 5-step study plan for this weekend"];
const MODES=["Brainstorm","Explain","Quiz me","Mark my answer"];
const CANNED=[
"Good question. Let's break it into three parts:\n\n1. What the concept actually says\n2. Where the marks usually sit in the exam\n3. One worked example you can copy\n\nStart with part 1 and tell me where it stops making sense â€” I'll slow down there.",
"Here are five angles you could take:\n\nâ€¢ The everyday-impact angle (what a student actually experiences)\nâ€¢ The data angle (numbers you can quote)\nâ€¢ The counter-argument angle (what the other side says)\nâ€¢ The local angle (your school, your township, your city)\nâ€¢ The solution angle (what you'd change and why)\n\nWhich one feels most like you? I'll help build it out.",
"Let's test it. Question 1: state the definition in your own words, no textbook phrasing. Question 2: give one example and one non-example. Send both and I'll mark them the way an NSC marker would."
];

export default function PracticePage(){
 const [mode,setMode]=useState(MODES[0]); const [subject,setSubject]=useState(SUBJECTS[0]); const [input,setInput]=useState(""); const [thinking,setThinking]=useState(false);
 const [messages,setMessages]=useState([{id:0,role:"ai",text:"Hi ðŸ‘‹ I'm your practice partner. Pick a mode and a subject, then ask me anything â€” or throw a half-formed idea at me and we'll shape it together."}]);
 const endRef=useRef(null);
 useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[messages,thinking]);
 function send(text){const value=text.trim();if(!value||thinking)return;setMessages(m=>[...m,{id:Date.now(),role:"user",text:value}]);setInput("");setThinking(true);window.setTimeout(()=>{setMessages(m=>[...m,{id:Date.now()+1,role:"ai",text:CANNED[m.filter(x=>x.role==="ai").length%CANNED.length]}]);setThinking(false)},900)}
 return <AppShell>
  <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold tracking-tight md:text-3xl">Practice AI</h1><span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-xs font-medium text-primary"><Sparkles className="size-3"/> UI preview</span></div>
  <p className="mt-2 text-sm text-muted-foreground">Brainstorm ideas, ask questions, get quizzed. Replies here are sample text â€” the model isn't wired up yet.</p>
  <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
   <aside className="space-y-4">
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mode</p><div className="mt-3 flex flex-wrap gap-2">{MODES.map(m=><button key={m} onClick={()=>setMode(m)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${mode===m?"border-primary bg-brand-soft text-primary":"border-border text-muted-foreground"}`}>{m}</button>)}</div></div>
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subject</p><select value={subject} onChange={e=>setSubject(e.target.value)} className="mt-3 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select></div>
    <div className="rounded-2xl border border-border bg-gold-soft p-4 text-xs text-muted-foreground shadow-sm"><Lightbulb className="size-4 text-gold"/><p className="mt-2">Free includes 10 messages a day. Go and Pro remove the cap and keep your sessions.</p></div>
   </aside>
   <section className="flex min-h-[60vh] flex-col rounded-2xl border border-border bg-card shadow-sm">
    <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
     {messages.map(m=><div key={m.id} className={`flex gap-3 ${m.role==="user"?"flex-row-reverse":""}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full ${m.role==="ai"?"bg-hero text-primary-foreground":"bg-muted text-foreground"}`}>{m.role==="ai"?<Sparkles className="size-4"/>:<User className="size-4"/>}</span><div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm ${m.role==="ai"?"bg-muted text-foreground":"bg-primary text-primary-foreground"}`}>{m.text}</div></div>)}
     {thinking&&<div className="flex gap-3"><span className="grid size-8 place-items-center rounded-full bg-hero text-primary-foreground"><Sparkles className="size-4"/></span><div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">{[0,150,300].map(d=><span key={d} className="size-2 animate-bounce rounded-full bg-muted-foreground/60" style={{animationDelay:`${d}ms`}}/>)}</div></div>}
     <div ref={endRef}/>
    </div>
    <div className="border-t border-border p-3 md:p-4">
     <div className="flex gap-2 overflow-x-auto pb-2">{STARTERS.map(s=><button key={s} onClick={()=>send(s)} className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">{s}</button>)}</div>
     <div className="flex items-end gap-2"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(input)}}} rows={2} placeholder={`${mode} Â· ${subject} â€” ask anythingâ€¦`} className="min-h-[52px] flex-1 resize-none rounded-lg border border-input bg-background px-3 py-3 text-sm"/><button onClick={()=>send(input)} className="grid size-[52px] shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><Send className="size-4"/></button></div>
    </div>
   </section>
  </div>
 </AppShell>
}
