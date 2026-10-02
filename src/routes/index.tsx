import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Compass,
  Flower2,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import restaurantInterior from "@/assets/tsk-restaurant-interior.png";

const navigation = [
  ["Home", "home"],
  ["Our Story", "story"],
  ["Menu", "menu"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

const categories = ["Starters", "Kebabs & Grill", "Main Course", "Pulao & Biryani", "Indian Breads", "Desserts"];

const menuPages = [1, 2, 3, 4];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telangana Spice Kitchen | Hitech City, Hyderabad" },
      { name: "description", content: "Telangana Spice Kitchen – Telangana-inspired dining at Sattva Knowledge Park, Hitech City, Hyderabad." },
      { property: "og:title", content: "Telangana Spice Kitchen | Hitech City, Hyderabad" },
      { property: "og:description", content: "Telangana-inspired dining at Sattva Knowledge Park, Hitech City, Hyderabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className={`flex items-center gap-3 ${inverted ? "text-primary-foreground" : "text-primary"}`} aria-label="Telangana Spice Kitchen home">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/70 font-display text-sm font-bold">TSK</span>
      <span className="min-w-0 leading-none">
        <strong className="block font-display text-lg font-semibold uppercase">Telangana Spice</strong>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.32em]">Kitchen · Hyderabad</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className={`mb-10 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      <div className="ornamental-rule mb-4 text-xs font-bold uppercase tracking-[0.28em]"><Flower2 className="size-4" />{eyebrow}</div>
      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.96] sm:text-5xl lg:text-6xl">{title}</h2>
    </div>
  );
}

function MenuPagePlaceholder({ page, compact = false }: { page: number; compact?: boolean }) {
  return (
    <div className={`fine-border parchment-pattern relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden p-7 text-center text-primary ${compact ? "max-w-[280px]" : "max-w-2xl"}`}>
      <div className="absolute inset-3 border border-primary/25" aria-hidden="true" />
      <Flower2 className="mb-5 size-8 text-gold" />
      <p className="font-display text-3xl font-semibold uppercase">Menu</p>
      <span className="my-4 h-px w-16 bg-gold" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em]">Page {page}</p>
      <p className="mt-5 max-w-44 text-xs leading-6 text-muted-foreground">Original menu artwork will appear here when supplied to the concept.</p>
      <span className="absolute bottom-6 font-display text-sm italic">Telangana Spice Kitchen</span>
    </div>
  );
}

function MenuViewer({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setPage((current) => (current + 1) % menuPages.length);
      if (event.key === "ArrowLeft") setPage((current) => (current - 1 + menuPages.length) % menuPages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const changePage = (direction: number) => {
    setPage((current) => (current + direction + menuPages.length) % menuPages.length);
    setZoom(1);
  };

  return (
    <div className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto] bg-ink/95 text-primary-foreground" role="dialog" aria-modal="true" aria-label="Full menu viewer">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-primary-foreground/15 px-4 py-3 sm:px-8">
        <div className="min-w-0"><p className="truncate font-display text-xl font-semibold">Telangana Spice Kitchen</p><p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">Full menu</p></div>
        <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close menu viewer" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><X /></Button>
      </header>
      <div className="overflow-auto p-5 sm:p-10">
        <div className="mx-auto origin-top transition-transform duration-300" style={{ transform: `scale(${zoom})`, maxWidth: "min(620px, 85vw)" }}>
          <MenuPagePlaceholder page={page + 1} />
        </div>
      </div>
      <footer className="flex items-center justify-center gap-3 border-t border-primary-foreground/15 bg-ink px-3 py-3">
        <Button size="icon" variant="ghost" onClick={() => changePage(-1)} aria-label="Previous menu page" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><ArrowLeft /></Button>
        <span className="w-14 text-center text-sm font-semibold">{page + 1} / {menuPages.length}</span>
        <Button size="icon" variant="ghost" onClick={() => changePage(1)} aria-label="Next menu page" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><ArrowRight /></Button>
        <span className="mx-1 h-5 w-px bg-primary-foreground/20" />
        <Button size="icon" variant="ghost" onClick={() => setZoom((value) => Math.max(0.8, value - 0.2))} aria-label="Zoom out" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Minus /></Button>
        <Button size="icon" variant="ghost" onClick={() => setZoom((value) => Math.min(2, value + 0.2))} aria-label="Zoom in" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Plus /></Button>
      </footer>
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="overflow-x-hidden bg-background">
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "bg-parchment/95 py-2 text-primary shadow-lg backdrop-blur" : "bg-transparent py-4 text-primary-foreground"}`} aria-label="Main navigation">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
          <BrandMark inverted={!scrolled && !menuOpen} />
          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-gold">{label}</a>)}
            <Button asChild className="h-11 bg-gold px-6 text-ink shadow-none hover:bg-gold/90"><a href="#reservation">Reserve a Table</a></Button>
          </div>
          <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <MenuIcon />}</Button>
        </div>
        {menuOpen && <div className="border-t border-primary/15 bg-parchment px-5 pb-6 pt-4 lg:hidden">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-primary/10 py-4 font-display text-2xl font-semibold">{label}</a>)}<Button asChild className="mt-5 h-12 w-full"><a href="#reservation" onClick={() => setMenuOpen(false)}>Reserve a Table</a></Button></div>}
      </nav>

      <section id="home" className="relative flex min-h-[720px] items-end overflow-hidden lg:min-h-[780px]" aria-labelledby="hero-heading">
        <img src={restaurantInterior} alt="Dining room at Telangana Spice Kitchen in Hitech City, Hyderabad" width={1981} height={1216} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/72 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 lg:px-8 lg:pb-24">
          <div className="reveal-up max-w-3xl text-primary-foreground">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.27em] text-gold"><span className="h-px w-10 bg-gold" />Hitech City · Hyderabad</p>
            <h1 id="hero-heading" className="font-display text-6xl font-semibold uppercase leading-[0.82] sm:text-7xl lg:text-[6.8rem]">Telangana<br /><span className="text-gold">Spice Kitchen</span></h1>
            <p className="mt-8 font-display text-2xl italic text-primary-foreground/90 sm:text-3xl">The Soul of Telangana, Reimagined.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/70 sm:text-base">Classic Telangana flavours brought to the table with a contemporary dining experience.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-13 bg-gold px-8 text-xs uppercase tracking-[0.14em] text-ink hover:bg-gold/90"><a href="#menu">Explore Menu <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="h-13 border-primary-foreground/50 bg-transparent px-8 text-xs uppercase tracking-[0.14em] text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="#reservation">Reserve a Table</a></Button>
            </div>
          </div>
          <a href="#story" className="absolute bottom-7 right-8 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60 lg:flex">Discover <ChevronDown className="size-4" /></a>
        </div>
      </section>

      <section id="story" className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative mx-auto w-full max-w-lg p-4">
            <div className="gallery-pattern aspect-[4/5] border border-gold/40 p-7 text-primary-foreground">
              <div className="flex h-full flex-col items-center justify-center border border-gold/50 p-8 text-center">
                <Flower2 className="size-12 text-gold" />
                <p className="mt-7 font-display text-5xl font-semibold">TSK</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.32em] text-gold">Telangana · At the table</p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-1 -z-10 h-full w-full border border-primary/25" />
          </div>
          <div className="lg:pl-10">
            <SectionHeading eyebrow="Our Story" title="A Taste of Telangana" />
            <p className="max-w-2xl font-display text-2xl leading-relaxed text-primary">Telangana Spice Kitchen brings the flavours and character of Telangana to the modern dining table.</p>
            <p className="mt-6 max-w-xl text-sm leading-8 text-muted-foreground">Familiar regional influences meet a contemporary restaurant experience—presented with warmth, generosity and a sense of place.</p>
            <div className="mt-9 flex items-center gap-4 text-primary"><span className="h-px w-16 bg-gold" /><Sparkles className="size-4 text-gold" /><span className="font-display text-lg italic">Rooted in flavour. Made for today.</span></div>
          </div>
        </div>
      </section>

      <section id="menu" className="parchment-pattern border-y border-primary/15 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div><SectionHeading eyebrow="The Menu" title="Explore Our Menu" /><p className="max-w-2xl text-sm leading-7 text-muted-foreground">Discover a selection of Telangana-inspired favourites, Indian classics, grills, biryanis and desserts.</p></div>
            <Button onClick={() => setViewerOpen(true)} className="h-13 px-8 text-xs uppercase tracking-[0.16em]">View Full Menu <ArrowRight /></Button>
          </div>
          <div className="mt-14 flex gap-5 overflow-x-auto pb-8 [scrollbar-width:thin] lg:grid lg:grid-cols-4 lg:overflow-visible">
            {menuPages.map((page, index) => <button key={page} type="button" onClick={() => setViewerOpen(true)} className={`group min-w-[72vw] cursor-zoom-in transition-transform duration-300 hover:-translate-y-2 sm:min-w-[300px] lg:min-w-0 ${index % 2 ? "lg:mt-10" : ""}`} aria-label={`Open menu page ${page}`}><MenuPagePlaceholder page={page} compact /></button>)}
          </div>
          <div className="mt-16 border-t border-primary/20 pt-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-primary">Browse by category</p>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-primary/20 bg-primary/20 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => <a key={category} href="#menu" className="group flex min-h-32 flex-col justify-between bg-parchment p-5 text-left transition-colors hover:bg-secondary"><UtensilsCrossed className="size-5 text-gold" /><span className="font-display text-xl font-semibold text-primary">{category}</span></a>)}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-wine py-24 text-primary-foreground lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Dining Experience" title="More Than a Meal" light />
          <p className="max-w-2xl text-sm leading-7 text-primary-foreground/65">An inviting setting, a thoughtfully presented menu, and flavours inspired by the region come together for a memorable dining experience.</p>
          <div className="mt-14 grid gap-px border border-primary-foreground/15 bg-primary-foreground/15 md:grid-cols-3">
            {[["01", "Dine In", "A welcoming restaurant experience."], ["02", "Celebrate", "A space for meals, gatherings and occasions."], ["03", "Discover", "Explore a menu inspired by the flavours of Telangana."]].map(([number, title, copy]) => <article key={title} className="group min-h-72 bg-wine p-8 transition-colors hover:bg-primary/40"><span className="font-display text-5xl text-gold/50">{number}</span><div className="mt-20"><h3 className="font-display text-3xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-primary-foreground/60">{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><SectionHeading eyebrow="Gallery Preview" title="A Glimpse Into The Experience" /><p className="max-w-md text-sm leading-7 text-muted-foreground">A curated space for the restaurant, the table and the moments shared around it.</p><span className="mt-8 inline-block border border-primary/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Restaurant photography can be added here</span></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["gallery-pattern", "bg-terracotta", "bg-gold", "bg-primary", "bg-secondary", "gallery-pattern"].map((style, index) => <div key={index} className={`${style} relative aspect-[4/5] overflow-hidden ${index === 1 ? "sm:translate-y-8" : ""}`}><div className="absolute inset-4 border border-primary-foreground/25" /><span className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Gallery coming soon</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="reservation" className="relative overflow-hidden bg-primary py-24 text-center text-primary-foreground">
        <div className="absolute inset-0 gallery-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-5"><Flower2 className="mx-auto size-8 text-gold" /><h2 className="mt-6 font-display text-5xl font-semibold sm:text-6xl">Your Table Awaits</h2><p className="mt-5 text-sm text-primary-foreground/70">Planning your next meal? Connect with Telangana Spice Kitchen.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button className="h-13 bg-gold px-8 text-ink hover:bg-gold/90">Reserve a Table</Button><Button asChild variant="outline" className="h-13 border-primary-foreground/40 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="tel:+918988358888"><Phone />Call 089883 58888</a></Button></div><p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-primary-foreground/45">Reservation integration shown as a concept</p></div>
      </section>

      <section id="contact" className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch lg:px-8">
          <div><SectionHeading eyebrow="Find Us" title="Visit Telangana Spice Kitchen" /><address className="not-italic text-sm leading-8 text-muted-foreground"><strong className="text-foreground">Gate 7, Sattva Knowledge Park</strong><br />Silpa Gram Craft Village<br />HITEC City, Hyderabad<br />Telangana 500084</address><a href="tel:+918988358888" className="mt-5 flex items-center gap-3 font-display text-2xl font-semibold text-primary"><Phone className="size-5 text-gold" />089883 58888</a><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild className="h-12"><a href="https://www.google.com/maps/search/?api=1&query=Gate+7+Sattva+Knowledge+Park+HITEC+City+Hyderabad" target="_blank" rel="noreferrer"><Compass />Get Directions</a></Button><Button asChild variant="outline" className="h-12"><a href="tel:+918988358888"><Phone />Call Restaurant</a></Button></div></div>
          <div className="gallery-pattern relative min-h-[420px] overflow-hidden border border-gold/30"><div className="absolute inset-6 border border-gold/30" /><div className="absolute left-[18%] top-[32%] h-px w-[65%] rotate-12 bg-gold/30" /><div className="absolute left-[24%] top-[55%] h-px w-[58%] -rotate-6 bg-primary-foreground/20" /><div className="absolute inset-0 grid place-items-center"><div className="grid size-24 place-items-center rounded-full border border-gold/50 bg-wine text-gold shadow-2xl"><MapPin className="size-9" /></div></div><div className="absolute bottom-8 left-8 right-8 border-t border-gold/30 pt-4 text-primary-foreground"><p className="font-display text-2xl">HITEC City, Hyderabad</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/55">Map preview · location concept</p></div></div>
        </div>
      </section>

      <footer className="border-t border-primary/15 bg-parchment-deep pt-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 md:grid-cols-3 lg:px-8"><BrandMark /><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Navigate</p>{navigation.map(([label, id]) => <a key={id} href={`#${id}`} className="mb-3 block w-fit text-sm text-muted-foreground hover:text-primary">{label}</a>)}</div><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Contact</p><p className="max-w-sm text-sm leading-7 text-muted-foreground">Gate 7, Sattva Knowledge Park, Silpa Gram Craft Village, HITEC City, Hyderabad, Telangana 500084</p><a className="mt-4 inline-block text-sm font-semibold text-primary" href="tel:+918988358888">089883 58888</a></div></div>
        <div className="border-t border-primary/15 px-5 py-5 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Website concept prepared for Telangana Spice Kitchen by Vaishnavi</div>
      </footer>

      {viewerOpen && <MenuViewer onClose={() => setViewerOpen(false)} />}
    </main>
  );
}