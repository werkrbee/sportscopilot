interface BasketballCardProps {
  name: string;
  image: string;
  team: string;
  sport: string;
  year: string;
  number?: string;
}

export default function BasketballCard({ name, image, team, sport, year, number }: BasketballCardProps) {
  return (
    <div 
      className="overflow-hidden shadow-lg bg-card max-w-sm mx-auto rounded-lg"
      style={{ border: '4px solid black' }}
      data-testid="basketball-card-wrapper"
    >
      {/* Player Photo */}
      <div className="relative bg-gradient-to-b from-gray-600 to-gray-800 aspect-[3/4]">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          data-testid="basketball-card-image"
        />
      </div>
      
      {/* Card Footer with Player Info */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 border-t-4 border-primary">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-wider mb-1" style={{ fontFamily: 'serif' }}>
              {name.toUpperCase()}
            </h3>
            <p className="text-sm font-medium tracking-wide opacity-90">
              {team} {sport} {year}
            </p>
          </div>
          {number && (
            <div className="text-5xl font-black opacity-60" style={{ fontFamily: 'serif' }}>
              #{number}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}