interface ScoreboardProps {
  advertiserLogo?: string;
  advertiserName?: string;
  visitingTeam: {
    name: string;
    logo?: string;
    score: number;
  };
  homeTeam: {
    name: string;
    logo?: string;
    score: number;
  };
  gameTitle?: string;
}

export default function Scoreboard({
  advertiserLogo,
  advertiserName = "Gatorade",
  visitingTeam,
  homeTeam,
  gameTitle = "Game of the Week"
}: ScoreboardProps) {
  return (
    <div className="w-full bg-card border border-card-border rounded-lg p-3 md:p-4 mb-8 shadow-sm">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Advertiser and Game Title */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          {advertiserLogo ? (
            <img 
              src={advertiserLogo} 
              alt={advertiserName}
              className="h-6 w-auto"
              data-testid="advertiser-logo"
            />
          ) : (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold" data-testid="text-advertiser-name">
              {advertiserName}
            </div>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            {gameTitle}
          </span>
        </div>
        
        {/* Teams and Scores */}
        <div className="flex items-center justify-between gap-4">
          {/* Visiting Team */}
          <div className="flex flex-col items-center space-y-2" data-testid="visiting-team">
            {visitingTeam.logo ? (
              <img 
                src={visitingTeam.logo} 
                alt={visitingTeam.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">
                  {visitingTeam.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="text-center">
              <div className="text-xs font-medium text-foreground">{visitingTeam.name}</div>
              <div className="text-xl font-black text-foreground">{visitingTeam.score}</div>
            </div>
          </div>

          {/* SportsCopilot Logo & Final Score */}
          <div className="flex flex-col items-center space-y-1" data-testid="final-score-section">
            <div className="font-black text-sm text-primary">SportsCopilot</div>
            <div className="text-xs text-muted-foreground font-medium">Final Score</div>
          </div>

          {/* Home Team */}
          <div className="flex flex-col items-center space-y-2" data-testid="home-team">
            {homeTeam.logo ? (
              <img 
                src={homeTeam.logo} 
                alt={homeTeam.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">
                  {homeTeam.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="text-center">
              <div className="text-xs font-medium text-foreground">{homeTeam.name}</div>
              <div className="text-xl font-black text-foreground">{homeTeam.score}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Advertiser Logo */}
        <div className="flex items-center space-x-3">
          {advertiserLogo ? (
            <img 
              src={advertiserLogo} 
              alt={advertiserName}
              className="h-8 w-auto"
              data-testid="advertiser-logo"
            />
          ) : (
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-bold" data-testid="text-advertiser-name">
              {advertiserName}
            </div>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            {gameTitle}
          </span>
        </div>

        {/* Scoreboard Content */}
        <div className="flex items-center space-x-6">
          {/* Visiting Team */}
          <div className="flex items-center space-x-3" data-testid="visiting-team-desktop">
            {visitingTeam.logo ? (
              <img 
                src={visitingTeam.logo} 
                alt={visitingTeam.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">
                  {visitingTeam.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">{visitingTeam.name}</div>
              <div className="text-2xl font-black text-foreground">{visitingTeam.score}</div>
            </div>
          </div>

          {/* SportsCopilot Logo & Final Score */}
          <div className="flex flex-col items-center space-y-1" data-testid="final-score-section-desktop">
            <div className="font-black text-lg text-primary">SportsCopilot</div>
            <div className="text-xs text-muted-foreground font-medium">Final Score</div>
          </div>

          {/* Home Team */}
          <div className="flex items-center space-x-3" data-testid="home-team-desktop">
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">{homeTeam.name}</div>
              <div className="text-2xl font-black text-foreground">{homeTeam.score}</div>
            </div>
            {homeTeam.logo ? (
              <img 
                src={homeTeam.logo} 
                alt={homeTeam.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">
                  {homeTeam.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}