import { SearchBar } from "@/components/SearchBar";

export function HeroSection() {
  return (
    <div className="relative h-[20vh] md:h-[30vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80)',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      
      <div className="relative z-10 text-center px-4 w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display mb-4 text-foreground" data-testid="text-hero-title">
          Discover & Share Movies
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
          Watch together, vote on favorites, and create the perfect movie night
        </p>
        <SearchBar placeholder="Search for your next favorite movie..." />
      </div>
    </div>
  );
}
