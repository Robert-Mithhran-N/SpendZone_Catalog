import logo from "@/assets/spendzone-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import crystal from "@/assets/crystal.png";
import dashCard from "@/assets/dashboard-card.png";
import { Shield, Lock, TrendingUp, Eye, Sparkles, Cpu, Download, Star, ArrowRight } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <Intelligence />
      <DownloadCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-[oklch(0.82_0.14_88/0.18)] bg-[oklch(0.14_0.05_295/0.6)] px-5 py-3 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="SpendZone" className="h-9 w-9 rounded-lg object-cover ring-1 ring-accent/30" />
          <span className="text-lg font-semibold tracking-tight">
            Spend<span className="text-gold-gradient">Zone</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#intelligence" className="transition-colors hover:text-foreground">Intelligence</a>
          <a href="#download" className="transition-colors hover:text-foreground">Download</a>
        </nav>
        <a href="#download" className="gold-button rounded-full px-5 py-2 text-sm font-semibold">
          Get App
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-screen items-center justify-center px-6 pt-32 pb-20">
      {/* Cinematic background */}
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-70" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      </div>

      {/* Floating crystals */}
      <img
        src={crystal}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute left-[6%] top-[22%] w-40 opacity-70 blur-[1px] animate-float-slow md:w-56"
      />
      <img
        src={crystal}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute right-[8%] top-[55%] w-32 -scale-x-100 opacity-60 animate-float-slower md:w-48"
      />

      {/* Gold particles glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.14_88/0.18)] blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-rise text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-[oklch(0.2_0.08_295/0.6)] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-accent backdrop-blur">
            <Sparkles className="h-3 w-3" /> Privacy-Focused Finance Tracker
          </div>
          <h1 className="text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[1.02]">
            Financial Intelligence,
            <br />
            <span className="text-gold-gradient italic">Privately Yours.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
            SpendZone turns every transaction into clarity — silently, securely, and entirely on your device.
            Built for those who treat their money with intention.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start">
            <a href="#download" className="gold-button inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
              <Download className="h-4 w-4" /> Download APK
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-7 py-3.5 text-sm font-medium text-foreground/90 backdrop-blur transition-all hover:border-accent/60 hover:bg-[oklch(0.82_0.14_88/0.06)]">
              Explore the Experience <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:justify-start">
            <div className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-accent" /> On-device</div>
            <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Zero-knowledge</div>
            <div className="flex items-center gap-2"><Cpu className="h-3.5 w-3.5 text-accent" /> AI Native</div>
          </div>
        </div>

        {/* Logo showcase */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[oklch(0.5_0.22_300/0.35)] blur-3xl" />
          <div className="relative rounded-[2.5rem] border border-accent/25 bg-gradient-to-b from-[oklch(0.25_0.1_300/0.7)] to-[oklch(0.15_0.06_295/0.5)] p-6 backdrop-blur-2xl shadow-[0_40px_120px_-30px_oklch(0.5_0.25_300/0.7)]">
            <img src={logo} alt="SpendZone logo" className="h-auto w-full rounded-[2rem]" />
          </div>
          <img
            src={dashCard}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute -bottom-10 -left-10 w-48 rotate-[-8deg] animate-float-slower drop-shadow-[0_20px_40px_oklch(0.05_0.02_295/0.6)] md:w-60"
          />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = ["256-bit Encryption", "On-Device AI", "No Cloud Sync", "RBI-Aligned", "Indian Rupee Native"];
  return (
    <section className="border-y border-accent/10 bg-[oklch(0.13_0.05_295/0.6)] py-6 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" />{i}</span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Shield, title: "Vault-Grade Privacy", body: "Your financial DNA never leaves your device. Encrypted, sandboxed, and invisible to the cloud." },
    { icon: TrendingUp, title: "Predictive Intelligence", body: "On-device models forecast spend, surface anomalies, and quietly guide every rupee." },
    { icon: Eye, title: "Silent SMS Reading", body: "Detect transactions in milliseconds from bank SMS — no APIs, no exposure, no permissions abuse." },
    { icon: Lock, title: "Biometric Lockdown", body: "Multi-layer biometric access with secure enclave key storage and zero-knowledge sessions." },
    { icon: Cpu, title: "AI-Crafted Insights", body: "Personal financial insights that read like a private advisor — not a generic dashboard." },
    { icon: Sparkles, title: "Luxury Experience", body: "Every pixel tuned for clarity. Built like a private wealth product, priced for everyone." },
  ];
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">The Architecture</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Engineered like a <span className="text-gold-gradient italic">private vault.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Six foundational pillars. Each one obsessively designed to protect, predict, and elevate how you experience money.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-card group relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.5_0.22_300/0.25)] blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-[oklch(0.2_0.08_295/0.6)] text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Intelligence() {
  return (
    <section id="intelligence" className="relative px-6 py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.45_0.22_300/0.2)] blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-2">
            <div className="rounded-[1.6rem] bg-gradient-to-br from-[oklch(0.2_0.1_300)] to-[oklch(0.12_0.05_295)] p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>This Month</span>
                <span className="text-accent">Live</span>
              </div>
              <div className="mt-4 font-display text-5xl text-gold-gradient">₹ 84,200</div>
              <div className="mt-1 text-xs text-muted-foreground">↑ 12.4% vs last month</div>

              <div className="mt-8 space-y-3">
                {[
                  { label: "Dining", val: 22, amount: "₹ 18,520" },
                  { label: "Travel", val: 65, amount: "₹ 54,700" },
                  { label: "Investments", val: 40, amount: "₹ 33,600" },
                  { label: "Essentials", val: 18, amount: "₹ 15,140" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>{r.label}</span>
                      <span className="text-foreground/80">{r.amount}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[oklch(0.25_0.08_295)]">
                      <div className="h-full rounded-full" style={{ width: `${r.val}%`, background: "var(--gradient-gold)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img src={crystal} alt="" loading="lazy" className="pointer-events-none absolute -right-16 -top-12 w-40 animate-float-slow opacity-80" />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">Intelligence Layer</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Every rupee, <span className="text-gold-gradient italic">understood.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            SpendZone watches silently — parsing your bank's SMS into structured intelligence. No bank logins. No screen scraping. Just elegant clarity, on-device, in real time.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Instant transaction recognition across 40+ Indian banks",
              "Auto-categorisation tuned to Indian spend patterns",
              "Forecasted month-end balance with confidence band",
              "Anomaly alerts before the damage is done",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent">
                  <Star className="h-3 w-3 fill-current" />
                </span>
                <span className="text-sm text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DownloadCTA() {
  return (
    <section id="download" className="relative px-6 py-32">
      {/* Floating purple orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[oklch(0.45_0.25_300/0.4)] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[oklch(0.55_0.2_310/0.35)] blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_88/0.12)] blur-3xl" />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-accent/30 bg-gradient-to-br from-[oklch(0.22_0.1_300/0.6)] to-[oklch(0.13_0.05_295/0.8)] p-12 text-center backdrop-blur-2xl md:p-20">
        <div className="absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-accent">
          <Download className="h-3 w-3" /> Available Now
        </div>
        <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
          Carry a <span className="text-gold-gradient italic">private vault</span>
          <br /> in your pocket.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Install SpendZone in under 30 seconds. No sign-up. No syncing. No surveillance. Just the most considered finance experience ever shipped on Android.
        </p>

        <a
          href="#"
          className="gold-button group relative mt-12 inline-flex items-center gap-3 rounded-full px-10 py-5 text-base font-semibold"
        >
          <Download className="h-5 w-5" />
          Download APK
          <span className="ml-1 text-xs font-normal opacity-70">v1.0 · 18 MB</span>
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Signed Build</span>
          <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-accent" /> Play Protect Verified</span>
          <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-accent" /> 4.9 / 5 Early Users</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-accent/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-9 w-9 rounded-lg object-cover ring-1 ring-accent/30" />
          <div>
            <div className="text-sm font-semibold">Spend<span className="text-gold-gradient">Zone</span></div>
            <div className="text-xs text-muted-foreground">Privacy-Focused Finance Tracker</div>
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} SpendZone · Crafted in India
        </p>
      </div>
    </footer>
  );
}
