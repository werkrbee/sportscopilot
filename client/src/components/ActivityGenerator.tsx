import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import allisonImage from "@assets/Allison Barone Basketball_1759168369641.jpg";

interface ActivityGeneratorProps {
  isLoggedIn?: boolean;
}

// Activity levels for visualization
const ActivityLevel = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  VERY_HIGH: 4
} as const;

type ActivityLevelType = typeof ActivityLevel[keyof typeof ActivityLevel];

interface DayActivity {
  date: Date;
  level: ActivityLevelType;
  activities: {
    assessments: number;
    recommendations: number;
    practicePlans: number;
  };
}

// Sample athlete names for "athlete of the week"
const sampleAthletes = [
  "Jordan Martinez", "Sarah Chen", "Marcus Johnson", "Emily Rodriguez", 
  "David Kim", "Maya Patel", "Alex Thompson", "Zoe Williams"
];

function generateYearActivity(): DayActivity[] {
  const activities: DayActivity[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  startDate.setDate(startDate.getDate() + 1);

  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Generate realistic activity patterns (more activity on weekdays, less on weekends)
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;
    
    let level: ActivityLevelType = ActivityLevel.NONE;
    const assessments = Math.random() < baseChance ? Math.floor(Math.random() * 3) : 0;
    const recommendations = Math.random() < baseChance ? Math.floor(Math.random() * 5) : 0;
    const practicePlans = Math.random() < baseChance ? Math.floor(Math.random() * 2) : 0;
    
    const totalActivity = assessments + recommendations + practicePlans;
    
    if (totalActivity === 0) level = ActivityLevel.NONE;
    else if (totalActivity <= 2) level = ActivityLevel.LOW;
    else if (totalActivity <= 4) level = ActivityLevel.MEDIUM;
    else if (totalActivity <= 7) level = ActivityLevel.HIGH;
    else level = ActivityLevel.VERY_HIGH;

    activities.push({
      date: new Date(currentDate),
      level,
      activities: { assessments, recommendations, practicePlans }
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return activities;
}

function getActivityColor(level: ActivityLevelType): string {
  switch (level) {
    case ActivityLevel.NONE: return 'bg-gray-100 border-gray-200';
    case ActivityLevel.LOW: return 'bg-green-100 border-green-200';
    case ActivityLevel.MEDIUM: return 'bg-green-300 border-green-400';
    case ActivityLevel.HIGH: return 'bg-green-500 border-green-600';
    case ActivityLevel.VERY_HIGH: return 'bg-green-700 border-green-800';
    default: return 'bg-gray-100 border-gray-200';
  }
}

function getMonthName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month];
}

export default function ActivityGenerator({ isLoggedIn = false }: ActivityGeneratorProps) {
  const [currentAthlete, setCurrentAthlete] = useState("Allison Barone");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const yearActivity = useMemo(() => generateYearActivity(), []);
  
  const handleGenerateNew = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentAthlete(sampleAthletes[Math.floor(Math.random() * sampleAthletes.length)]);
      setIsGenerating(false);
    }, 1000);
  };

  // Group activities by month for header
  const monthsInView = useMemo(() => {
    const months: { month: number; year: number; label: string }[] = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(1);
    
    for (let i = 0; i < 12; i++) {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(startDate.getMonth() + i);
      months.push({
        month: currentMonth.getMonth(),
        year: currentMonth.getFullYear(),
        label: getMonthName(currentMonth.getMonth())
      });
    }
    return months;
  }, []);

  // Organize activities into weeks for display
  const weekData = useMemo(() => {
    const weeks: DayActivity[][] = [];
    let currentWeek: DayActivity[] = [];
    
    // Add empty days at the beginning to align with calendar
    const firstDate = yearActivity[0]?.date;
    if (firstDate) {
      const startDay = firstDate.getDay();
      for (let i = 0; i < startDay; i++) {
        currentWeek.push({
          date: new Date(0),
          level: ActivityLevel.NONE,
          activities: { assessments: 0, recommendations: 0, practicePlans: 0 }
        });
      }
    }
    
    yearActivity.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    // Fill the last week if needed
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push({
        date: new Date(0),
        level: ActivityLevel.NONE,
        activities: { assessments: 0, recommendations: 0, practicePlans: 0 }
      });
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [yearActivity]);

  const totalActivities = useMemo(() => {
    return yearActivity.reduce((sum, day) => 
      sum + day.activities.assessments + day.activities.recommendations + day.activities.practicePlans, 0
    );
  }, [yearActivity]);

  if (!isLoggedIn) {
    // Athlete of the Week View (not logged in)
    return (
      <div className="w-full bg-card border-4 border-black rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
        {/* Header with Sponsors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          {/* Sponsors with Featured Athlete in center */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
              Gatorade
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Featured Athlete
            </span>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              State Farm Insurance
            </div>
          </div>
        </div>

        {/* Allison Barone */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img 
            src={allisonImage}
            alt="Allison Barone"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-primary"
          />
          <div className="text-left">
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">
              Allison Barone
            </div>
            <p className="text-sm text-muted-foreground">
              {totalActivities} performance contributions in the last year
            </p>
          </div>
        </div>

        {/* SportsCopilot Contributions Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Month headers */}
            <div className="flex mb-2">
              <div className="w-8"></div> {/* Space for day labels */}
              <div className="flex-1 grid grid-cols-12 gap-1 text-xs text-muted-foreground font-medium">
                {monthsInView.map((month, idx) => (
                  <div key={idx} className="text-center">
                    {month.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Day labels and activity grid */}
            <div className="flex">
              {/* Day labels */}
              <div className="w-8 space-y-1">
                <div className="text-xs text-muted-foreground font-medium h-3"></div>
                <div className="text-xs text-muted-foreground font-medium h-3">Mon</div>
                <div className="text-xs text-muted-foreground font-medium h-3"></div>
                <div className="text-xs text-muted-foreground font-medium h-3">Wed</div>
                <div className="text-xs text-muted-foreground font-medium h-3"></div>
                <div className="text-xs text-muted-foreground font-medium h-3">Fri</div>
                <div className="text-xs text-muted-foreground font-medium h-3"></div>
              </div>

              {/* Activity squares */}
              <div className="flex-1">
                <div className="grid grid-rows-7 gap-1" style={{ gridTemplateColumns: `repeat(${weekData.length}, minmax(0, 1fr))` }}>
                  {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                    weekData.map((week, weekIndex) => {
                      const day = week[dayOfWeek];
                      const isEmptyDay = day.date.getTime() === 0;
                      
                      return (
                        <div
                          key={`${weekIndex}-${dayOfWeek}`}
                          className={`w-3 h-3 rounded-sm border ${
                            isEmptyDay 
                              ? 'bg-transparent border-transparent' 
                              : getActivityColor(day.level)
                          }`}
                          title={
                            isEmptyDay 
                              ? '' 
                              : `${day.date.toDateString()}: ${day.activities.assessments} assessments, ${day.activities.recommendations} recommendations, ${day.activities.practicePlans} practice plans`
                          }
                          data-testid={`spotlight-activity-day-${weekIndex}-${dayOfWeek}`}
                        />
                      );
                    })
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>Learn how we count performance contributions</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-300 border border-green-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 border border-green-600 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-700 border border-green-800 rounded-sm"></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged In View - Full Activity Calendar
  return (
    <div className="w-full bg-card border-4 border-black rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
      {/* Header with Sponsors and Title */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          {/* Sponsors */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
              Gatorade
            </div>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              BlueCross BlueShield
            </div>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              Activity Tracker
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-foreground">
            My SportsCopilot Activity
          </h3>
          <p className="text-sm text-muted-foreground">
            {totalActivities} activities in the past year
          </p>
        </div>
      </div>

      {/* Activity Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Month headers */}
          <div className="flex mb-2">
            <div className="w-8"></div> {/* Space for day labels */}
            <div className="flex-1 grid grid-cols-12 gap-1 text-xs text-muted-foreground font-medium">
              {monthsInView.map((month, idx) => (
                <div key={idx} className="text-center">
                  {month.label}
                </div>
              ))}
            </div>
          </div>

          {/* Day labels and activity grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="w-8 space-y-1">
              <div className="text-xs text-muted-foreground font-medium h-3"></div>
              <div className="text-xs text-muted-foreground font-medium h-3">Mon</div>
              <div className="text-xs text-muted-foreground font-medium h-3"></div>
              <div className="text-xs text-muted-foreground font-medium h-3">Wed</div>
              <div className="text-xs text-muted-foreground font-medium h-3"></div>
              <div className="text-xs text-muted-foreground font-medium h-3">Fri</div>
              <div className="text-xs text-muted-foreground font-medium h-3"></div>
            </div>

            {/* Activity squares */}
            <div className="flex-1">
              <div className="grid grid-rows-7 gap-1" style={{ gridTemplateColumns: `repeat(${weekData.length}, minmax(0, 1fr))` }}>
                {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                  weekData.map((week, weekIndex) => {
                    const day = week[dayOfWeek];
                    const isEmptyDay = day.date.getTime() === 0;
                    
                    return (
                      <div
                        key={`${weekIndex}-${dayOfWeek}`}
                        className={`w-3 h-3 rounded-sm border ${
                          isEmptyDay 
                            ? 'bg-transparent border-transparent' 
                            : getActivityColor(day.level)
                        }`}
                        title={
                          isEmptyDay 
                            ? '' 
                            : `${day.date.toDateString()}: ${day.activities.assessments} assessments, ${day.activities.recommendations} recommendations, ${day.activities.practicePlans} practice plans`
                        }
                        data-testid={`activity-day-${weekIndex}-${dayOfWeek}`}
                      />
                    );
                  })
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Learn how we track activity</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 border border-green-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 border border-green-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-700 border border-green-800 rounded-sm"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}