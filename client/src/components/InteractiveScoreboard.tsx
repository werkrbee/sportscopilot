import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";

interface ScoreboardProps {
  advertiserLogo?: string;
  advertiserName?: string;
}

// Sample teams for random generation
const sampleTeams = [
  "Lakers", "Warriors", "Celtics", "Bulls", "Knicks", "Heat", "Spurs", "Mavericks",
  "Clippers", "Nets", "76ers", "Bucks", "Nuggets", "Suns", "Jazz", "Blazers"
];

function generateRandomGame() {
  const shuffled = [...sampleTeams].sort(() => 0.5 - Math.random());
  const visitingTeam = shuffled[0];
  const homeTeam = shuffled[1];
  const visitingScore = Math.floor(Math.random() * 50) + 80; // 80-130
  const homeScore = Math.floor(Math.random() * 50) + 80; // 80-130
  
  return {
    visitingTeam: { name: visitingTeam, score: visitingScore },
    homeTeam: { name: homeTeam, score: homeScore }
  };
}

export default function InteractiveScoreboard({
  advertiserLogo,
  advertiserName = "Gatorade"
}: ScoreboardProps) {
  const [gameData, setGameData] = useState(() => generateRandomGame());
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const parseGamePrompt = (prompt: string) => {
    const cleanPrompt = prompt.trim();
    
    // Parse format like "Lakers 108 vs Warriors 112" or "Bulls vs Knicks" or "Los Angeles Lakers 95 vs Golden State Warriors 88"
    const vsRegex = /(.+?)\s+(?:vs?|against|\s-\s)\s+(.+)/i;
    const match = cleanPrompt.match(vsRegex);
    
    if (!match) {
      return generateRandomGame();
    }
    
    const [, team1Part, team2Part] = match;
    
    // Extract team names and scores
    const parseTeamAndScore = (teamPart: string) => {
      // Look for score pattern at the end (1-3 digits)
      const scoreMatch = teamPart.trim().match(/^(.+?)\s+(\d{1,3})$/);
      if (scoreMatch) {
        const [, teamName, scoreStr] = scoreMatch;
        return {
          name: teamName.trim(),
          score: parseInt(scoreStr, 10)
        };
      } else {
        // No score provided, use team name and random score
        return {
          name: teamPart.trim(),
          score: Math.floor(Math.random() * 50) + 80 // 80-130
        };
      }
    };
    
    const visitingTeam = parseTeamAndScore(team1Part);
    const homeTeam = parseTeamAndScore(team2Part);
    
    return { visitingTeam, homeTeam };
  };

  const handleGenerateScore = async () => {
    setIsGenerating(true);
    
    // Simulate processing user prompt (in real app, this could call an AI service)
    setTimeout(() => {
      if (userPrompt.trim()) {
        const gameData = parseGamePrompt(userPrompt);
        setGameData(gameData);
        setUserPrompt("");
      } else {
        setGameData(generateRandomGame());
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-card border-4 border-black rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
      {/* User Prompt Section */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter matchup (e.g., 'Lakers 108 vs Warriors 112' or 'Bulls vs Knicks') or leave blank for random"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="flex-1 text-sm"
            data-testid="input-game-prompt"
          />
          <Button
            onClick={handleGenerateScore}
            disabled={isGenerating}
            size="sm"
            className="hover-elevate active-elevate-2 bg-primary text-white font-bold"
            data-testid="button-generate-score"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
                Generating...
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4 mr-1" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Advertiser */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          {advertiserLogo ? (
            <img 
              src={advertiserLogo} 
              alt={advertiserName}
              className="h-5 w-auto"
              data-testid="advertiser-logo"
            />
          ) : (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold" data-testid="text-advertiser-name">
              {advertiserName}
            </div>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            Score Predictor
          </span>
        </div>
        
        {/* Teams and Scores */}
        <div className="flex items-center justify-between gap-3">
          {/* Visiting Team */}
          <div className="flex flex-col items-center space-y-1" data-testid="visiting-team">
            <div className="h-7 w-7 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">
                {gameData.visitingTeam.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-foreground">{gameData.visitingTeam.name}</div>
              <div className="text-lg font-black text-foreground">{gameData.visitingTeam.score}</div>
            </div>
          </div>

          {/* SportsCopilot Logo & Final Score */}
          <div className="flex flex-col items-center space-y-1" data-testid="final-score-section">
            <div className="font-black text-sm text-primary">SportsCopilot</div>
            <div className="text-xs text-muted-foreground font-medium">Prediction</div>
          </div>

          {/* Home Team */}
          <div className="flex flex-col items-center space-y-1" data-testid="home-team">
            <div className="h-7 w-7 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">
                {gameData.homeTeam.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-foreground">{gameData.homeTeam.name}</div>
              <div className="text-lg font-black text-foreground">{gameData.homeTeam.score}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center">
        {/* Advertiser Logo */}
        <div className="flex items-center space-x-2 mr-8">
          {advertiserLogo ? (
            <img 
              src={advertiserLogo} 
              alt={advertiserName}
              className="h-6 w-auto"
              data-testid="advertiser-logo"
            />
          ) : (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold" data-testid="text-advertiser-name">
              {advertiserName}
            </div>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            Score Predictor
          </span>
        </div>

        {/* Scoreboard Content */}
        <div className="flex items-center space-x-4">
          {/* Visiting Team */}
          <div className="flex items-center space-x-2" data-testid="visiting-team-desktop">
            <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-muted-foreground">
                {gameData.visitingTeam.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">{gameData.visitingTeam.name}</div>
              <div className="text-xl font-black text-foreground">{gameData.visitingTeam.score}</div>
            </div>
          </div>

          {/* SportsCopilot Logo & Final Score */}
          <div className="flex flex-col items-center space-y-1 mx-4" data-testid="final-score-section-desktop">
            <div className="font-black text-base text-primary">SportsCopilot</div>
            <div className="text-xs text-muted-foreground font-medium">Prediction</div>
          </div>

          {/* Home Team */}
          <div className="flex items-center space-x-2" data-testid="home-team-desktop">
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">{gameData.homeTeam.name}</div>
              <div className="text-xl font-black text-foreground">{gameData.homeTeam.score}</div>
            </div>
            <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-muted-foreground">
                {gameData.homeTeam.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}