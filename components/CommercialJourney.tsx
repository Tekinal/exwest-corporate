"use client";

import { useId, useState } from "react";
import type { CommercialCopy } from "@/lib/commercial-content";

export function ShowroomDrawing() {
  const wallId = useId();
  return <svg viewBox="0 0 600 340" className="showroom-drawing" aria-hidden="true" focusable="false">
    <defs><linearGradient id={wallId} x2="1" y2="1"><stop stopColor="#c2c8ba"/><stop offset="1" stopColor="#e9e4d8"/></linearGradient></defs>
    <path d="M35 265 330 330 572 209 278 147Z" fill="#d4ccbb"/>
    <path d="M100 210 328 259 520 166 292 118Z" fill="#f7f4eb" stroke="#7f8b7a" strokeWidth="2"/>
    <path d="m100 210 228 49v-127L100 84Z" fill={`url(#${wallId})`} stroke="#637263" strokeWidth="2"/>
    <path d="m328 259 192-93V39L328 132Z" fill="#30483d" stroke="#637263" strokeWidth="2"/>
    <path d="m100 84 228 48L520 39 292 0Z" fill="#ded7c9" stroke="#637263" strokeWidth="2"/>
    <path d="m116 199 196 42V146l-196-42Z" fill="#a9c6b4" opacity=".65"/>
    <path d="m349 230 150-73V65L349 139Z" fill="#b8c8bb" opacity=".55"/>
    <path d="m166 115 0 95m74-80v97m155-111v90m51-115v88" stroke="#f7f4eb" strokeWidth="5"/>
    <path d="m269 232 25 5v-74l-25-6Z" fill="#e9ecdf"/>
    <path d="m72 237 255 56 213-104" fill="none" stroke="#74816f" strokeDasharray="4 6"/>
    <circle cx="66" cy="220" r="15" fill="#79876a"/><circle cx="550" cy="164" r="19" fill="#8a9478"/>
  </svg>;
}

export function CommercialJourney({ copy }: { copy: CommercialCopy }) {
  const [entry, setEntry] = useState(0);
  const [stage, setStage] = useState(0);
  return <div className="commercial-journey">
    <div className="visitor-heading"><p className="v2-kicker">CIE / EXWEST MODULAR</p><h2>{copy.situation}</h2><p>{copy.situationLead}</p></div>
    <div className="visitor-choices" role="group" aria-label={copy.situation}>
      {copy.choices.map((choice, index) => <button type="button" key={choice} aria-pressed={entry === index} onClick={() => { setEntry(index); setStage([0, 1, 4][index]); }}><span>0{index + 1} <i aria-hidden="true">↗</i></span><strong>{choice}</strong><small>{copy.choiceNotes[index]}</small></button>)}
    </div>
    <div className="journey-heading"><div><p className="v2-kicker">{copy.simulation}</p><h2>{copy.journey}</h2></div><p>{copy.journeyLead}</p></div>
    <div className="journey-workspace">
      <aside className="journey-context"><div className="demo-mark" aria-hidden="true">LR</div><p>{copy.project}</p><h3>{copy.company}</h3><p>{copy.context}</p><ShowroomDrawing/><span className="simulation-label">{copy.simulation}</span></aside>
      <div className="journey-content">
        <div className="journey-tabs" role="group" aria-label={copy.journey}>
          {copy.stages.map((item, index) => <button type="button" key={item.title} aria-pressed={stage === index} aria-controls={`demo-stage-${index}`} onClick={() => setStage(index)}><span>0{index + 1}</span>{item.title}</button>)}
        </div>
        {copy.stages.map((item, index) => <section id={`demo-stage-${index}`} className="demo-panel" hidden={stage !== index} key={item.title} aria-label={item.title}>
          <div className="panel-state"><span className="state-dot" aria-hidden="true"/>{item.state}<small>MOD / 001</small></div>
          <h3>{item.heading}</h3><p>{item.body}</p><blockquote>{item.quote}</blockquote><div className="demo-next"><span aria-hidden="true">↗</span>{item.next}</div><p className="demo-disclaimer">{copy.simulation}</p>
        </section>)}
        <noscript><style>{".demo-panel[hidden]{display:block;border-top:1px solid #d2d8cc}"}</style></noscript>
      </div>
    </div>
    <p className="journey-disclaimer">{copy.demoNote}</p>
  </div>;
}
