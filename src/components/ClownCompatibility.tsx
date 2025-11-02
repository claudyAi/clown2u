import { motion } from 'motion/react';
import { Heart, Zap, Users } from 'lucide-react';

interface ClownType {
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
}

interface CompatibilityData {
  besties: string[];
  challenging: string[];
  alignmentScores: {
    humor: number;
    emotion: number;
    energy: number;
    leadership: number;
    creativity: number;
  };
  peerReviews: {
    clownType: string;
    quote: string;
  }[];
}

interface ClownCompatibilityProps {
  yourClownType: string;
  allClownTypes: Record<string, ClownType>;
}

const compatibilityMatrix: Record<string, CompatibilityData> = {
  jester: {
    besties: ['auguste', 'ringmaster'],
    challenging: ['mime', 'pierrot'],
    alignmentScores: {
      humor: 98,
      emotion: 65,
      energy: 85,
      leadership: 72,
      creativity: 88
    },
    peerReviews: [
      { clownType: 'auguste', quote: "At least they make the existential dread funny" },
      { clownType: 'ringmaster', quote: "Smart enough to know we're all fucked, productive enough to pretend we're not" }
    ]
  },
  mime: {
    besties: ['pierrot', 'ringmaster'],
    challenging: ['auguste', 'jester'],
    alignmentScores: {
      humor: 45,
      emotion: 95,
      energy: 60,
      leadership: 58,
      creativity: 92
    },
    peerReviews: [
      { clownType: 'pierrot', quote: "Finally someone who gets that silence speaks louder" },
      { clownType: 'ringmaster', quote: "They observe everything, which is both beautiful and terrifying" }
    ]
  },
  ringmaster: {
    besties: ['jester', 'mime'],
    challenging: ['auguste'],
    alignmentScores: {
      humor: 70,
      emotion: 68,
      energy: 90,
      leadership: 98,
      creativity: 82
    },
    peerReviews: [
      { clownType: 'jester', quote: "They're holding it together for all of us. Someone should probably check on them" },
      { clownType: 'mime', quote: "Control is their love language and their prison" }
    ]
  },
  auguste: {
    besties: ['jester', 'auguste'],
    challenging: ['mime', 'ringmaster'],
    alignmentScores: {
      humor: 95,
      emotion: 55,
      energy: 98,
      leadership: 48,
      creativity: 85
    },
    peerReviews: [
      { clownType: 'jester', quote: "They're either self-destructing or finding themselves. Honestly? Same thing" },
      { clownType: 'auguste', quote: "The only other person brave enough to admit this is all bullshit" }
    ]
  },
  pierrot: {
    besties: ['mime', 'pierrot'],
    challenging: ['auguste', 'jester'],
    alignmentScores: {
      humor: 52,
      emotion: 98,
      energy: 58,
      leadership: 62,
      creativity: 95
    },
    peerReviews: [
      { clownType: 'mime', quote: "They understand that some pain is too beautiful to fix" },
      { clownType: 'pierrot', quote: "We're both drowning, but at least the water's poetic" }
    ]
  }
};

export function ClownCompatibility({ yourClownType, allClownTypes }: ClownCompatibilityProps) {
  const compatibility = compatibilityMatrix[yourClownType];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-gray-800 mb-2">Compatibility Analysis</h3>
        <p className="text-gray-600">How you vibe with other crisis types</p>
      </div>

      {/* Alignment Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50"
      >
        <h4 className="text-gray-800 mb-5 flex items-center gap-2 justify-center">
          <Users className="w-5 h-5 text-purple-600" />
          Your Personality Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(compatibility.alignmentScores).map(([trait, score], index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white/70 rounded-xl p-4 border border-white/60"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 capitalize">{trait}</span>
                <span className="text-purple-600">{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Besties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50"
        >
          <h4 className="text-gray-800 mb-5 flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600 fill-green-600" />
            Best Matches
          </h4>
          <div className="space-y-3">
            {compatibility.besties.map((clownKey, index) => (
              <motion.div
                key={clownKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/80 rounded-xl p-4 flex items-center gap-4 border border-white shadow-sm cursor-pointer"
              >
                <div className="text-4xl">{allClownTypes[clownKey].emoji}</div>
                <div>
                  <div className="text-gray-800">{allClownTypes[clownKey].name}</div>
                  <div className="text-green-600 text-sm">Great synergy ✨</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50"
        >
          <h4 className="text-gray-800 mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Challenging Matches
          </h4>
          <div className="space-y-3">
            {compatibility.challenging.map((clownKey, index) => (
              <motion.div
                key={clownKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/80 rounded-xl p-4 flex items-center gap-4 border border-white shadow-sm cursor-pointer"
              >
                <div className="text-4xl">{allClownTypes[clownKey].emoji}</div>
                <div>
                  <div className="text-gray-800">{allClownTypes[clownKey].name}</div>
                  <div className="text-orange-600 text-sm">Opposites attract? ⚡</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Peer Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200/50"
      >
        <h4 className="text-gray-800 mb-5 text-center">What Other Types Say About You</h4>
        <div className="space-y-4">
          {compatibility.peerReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 rounded-xl p-5 border border-white shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">
                  {allClownTypes[review.clownType].emoji}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-2">"{review.quote}"</p>
                  <p className="text-gray-500 text-sm">
                    — {allClownTypes[review.clownType].name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
