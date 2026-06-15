import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-display font-black text-white max-w-xs leading-snug">
            Our platform is trusted by millions &amp; features best updated movies all around the world.
          </p>

          {/* Nav links + socials */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground transition">Home</Link>
              <span className="text-border">/</span>
              <Link href="/search" className="hover:text-foreground transition">Discover</Link>
              <span className="text-border">/</span>
              <Link href="/groups" className="hover:text-foreground transition">Groups</Link>
              <span className="text-border">/</span>
              <Link href="/watchlist" className="hover:text-foreground transition">Watchlist</Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['IG', 'FB', 'TW', 'G+'].map(icon => (
                <button
                  key={icon}
                  className="w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center text-xs font-bold transition"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition">Privacy policy</span>
            <span className="hover:text-foreground cursor-pointer transition">Terms of service</span>
            <span className="hover:text-foreground cursor-pointer transition">Language</span>
          </div>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Watchalong</span>
        </div>
      </div>
    </footer>
  );
}
