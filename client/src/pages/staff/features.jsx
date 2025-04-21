import {
    ScanLine,
    CheckCircle2,
    History,
    Trophy,
    Clock4,
    Users,
  } from "lucide-react";
  
  const features = [
    {
      title: "Instant QR Scan",
      desc: "Quickly scan and verify unused meals with ease.",
      icon: <ScanLine className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: "Claim with One Click",
      desc: "Tap 'Claim' and get your meal confirmed in seconds.",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
    },
    {
      title: "Claim History",
      desc: "Access your past claims for better tracking.",
      icon: <History className="w-8 h-8 text-yellow-600" />,
    },
    {
      title: "Leaderboard Recognition",
      desc: "Top staff get appreciation and badges.",
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Timed Meal Collection",
      desc: "Meals are reserved for a limited time to ensure fairness.",
      icon: <Clock4 className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Community Impact",
      desc: "Help reduce food waste and serve the community.",
      icon: <Users className="w-8 h-8 text-blue-500" />,
    },
  ];
  
  const StaffFeatures = () => {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🚀 Staff Features</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start gap-3 hover:shadow-xl transition"
            >
              {f.icon}
              <h2 className="text-lg font-semibold">{f.title}</h2>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StaffFeatures;
  