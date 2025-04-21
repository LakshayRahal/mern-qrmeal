import { Trophy, Star, ArrowUpRight } from "lucide-react";

const Rewards = () => {
  const user = {
    name: "Lakshay",
    credits: 120,
    level: "Eco Warrior",
    nextMilestone: 150,
    rank: 8,
    badges: ["First Share", "10 Meals Saved", "Weekly Top 3"],
  };

  const progress = (user.credits / user.nextMilestone) * 100;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🎁 Rewards Dashboard</h1>

     
      <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-600">Credit Score</p>
          <h2 className="text-4xl font-bold text-indigo-600">{user.credits}</h2>
          <p className="text-sm text-gray-500 mt-1">Level: {user.level}</p>
        </div>
        <Trophy className="w-12 h-12 text-yellow-400" />
      </div>

     
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <p className="text-gray-600 mb-2">Next reward at {user.nextMilestone} credits</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-right text-gray-500 mt-1">{Math.floor(progress)}% reached</p>
      </div>

    
      <div>
        <h3 className="text-xl font-semibold mb-3">🏅 Badges Earned</h3>
        <div className="flex gap-4 flex-wrap">
          {user.badges.map((badge, i) => (
            <span key={i} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium shadow">
              {badge}
            </span>
          ))}
        </div>
      </div>

     
      <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Your Rank</p>
          <h2 className="text-2xl font-bold text-emerald-600">#{user.rank}</h2>
        </div>
        <ArrowUpRight className="w-8 h-8 text-emerald-500" />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow">
          Share More, Earn More!
        </button>
      </div>
    </div>
  );
};

export default Rewards;
