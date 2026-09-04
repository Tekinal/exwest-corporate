import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <p>404 · Exwest</p>
      <h1>Signal not found.</h1>
      <span>Diese Seite ist nicht verfügbar. This page is unavailable. Bu sayfa kullanılamıyor.</span>
      <div><Link className="button primary" href="/de">Deutsch</Link><Link className="button secondary" href="/en">English</Link><Link className="button secondary" href="/tr">Türkçe</Link></div>
    </main>
  );
}
