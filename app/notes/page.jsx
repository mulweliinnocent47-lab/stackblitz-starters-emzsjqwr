"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Link2, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TxtReader } from "@/components/TxtReader";
import { NOTES } from "@/lib/study-data";

export default function NotesPage() {
 const [url,setUrl]=useState(""); const [loaded,setLoaded]=useState(null);
 return <AppShell>
  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Notes</h1>
  <p className="mt-2 text-sm text-muted-foreground">Every note is a plain <code className="rounded bg-muted px-1">.txt</code> source, rendered with markdown formatting. Paste any text URL to read it the same way.</p>
  <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
   <div className="flex items-center gap-2 text-sm font-semibold"><Link2 className="size-4 text-primary"/> Open a .txt source</div>
   <div className="mt-3 flex flex-col gap-2 sm:flex-row"><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com/notes/trig.txt" className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"/><button className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" onClick={()=>setLoaded(url.trim()||null)}>Read</button></div>
   {loaded&&<div className="mt-4 border-t border-border pt-4"><TxtReader src={loaded}/></div>}
  </div>
  <div className="mt-6 grid gap-3 md:grid-cols-2">
   {NOTES.map(n=><Link key={n.slug} href={`/notes/${n.slug}`} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-soft"><div className="flex items-start justify-between"><BookOpen className="size-5 text-cyan"/>{n.proOnly&&<span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-1 text-xs font-medium"><Lock className="size-3"/> Pro</span>}</div><p className="mt-3 font-semibold">{n.title}</p><p className="mt-1 text-sm text-muted-foreground">{n.summary}</p><p className="mt-3 text-xs text-muted-foreground">{n.subject} · Grade {n.grade} · {n.minutes} min read</p></Link>)}
  </div>
 </AppShell>
}
