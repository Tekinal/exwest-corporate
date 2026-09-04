"use client";

import { useState } from "react";

export function ContactIntent({ intents, cta, subject, locale }: { intents: readonly string[]; cta: string; subject: string; locale: "de" | "en" | "tr" }) {
  const [selected, setSelected] = useState(intents[0]);
  const body = locale === "de"
    ? `Guten Tag Exwest Team,\n\nich möchte folgendes Thema besprechen: ${selected}.\n\n`
    : locale === "tr"
      ? `Merhaba Exwest ekibi,\n\nŞu konuyu görüşmek istiyorum: ${selected}.\n\n`
      : `Hello Exwest team,\n\nI would like to discuss: ${selected}.\n\n`;
  const href = `mailto:contact@exwest.de?subject=${encodeURIComponent(`${subject}: ${selected}`)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="intent-panel">
      <div className="intent-options" role="group" aria-label={locale === "de" ? "Gesprächsanlass" : locale === "tr" ? "Görüşme konusu" : "Conversation topic"}>
        {intents.map((intent, index) => (
          <button key={intent} type="button" aria-pressed={selected === intent} className={selected === intent ? "selected" : ""} onClick={() => setSelected(intent)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{intent}<i aria-hidden="true" />
          </button>
        ))}
      </div>
      <a className="button primary intent-submit" href={href}>{cta}<span aria-hidden="true">↗</span></a>
    </div>
  );
}
