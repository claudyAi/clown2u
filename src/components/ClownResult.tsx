import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ClownCompatibility } from './ClownCompatibility';
import { ShareButtons } from './ShareButtons';

interface ClownType {
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
}

interface ClownResultProps {
  clownType: ClownType;
  yourClownKey: string;
  allClownTypes: Record<string, ClownType>;
  onRestart: () => void;
}

export function ClownResult({ clownType, yourClownKey, allClownTypes, onRestart }: ClownResultProps) {
  return (
    <div className="w-full px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        {/* Main Result Card */}
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 mb-8 overflow-hidden">
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${clownType.color} opacity-20`} />
          
          {/* Sparkle decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 text-yellow-400"
          >
            <Sparkles className="w-16 h-16" fill="currentColor" />
          </motion.div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="text-center mb-8"
            >
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 text-xl mb-3"
              >
                🎉 The Results Are In 🎉
              </motion.p>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl mb-6"
              >
                {clownType.emoji}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className={`bg-gradient-to-r ${clownType.color} bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3`}>
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                  {clownType.name}
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </h2>
                <motion.div
                  className={`h-1 w-48 bg-gradient-to-r ${clownType.color} rounded-full mx-auto`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                {clownType.description}
              </p>
            </motion.div>

            {/* Traits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/60 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/40"
            >
              <h3 className="text-gray-800 mb-5 text-center">Your Core Traits</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {clownType.traits.map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.08 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`bg-gradient-to-br ${clownType.color} px-5 py-3 rounded-full text-white shadow-lg border border-white/30`}
                  >
                    {trait}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Compatibility Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 mb-8"
        >
          <ClownCompatibility 
            yourClownType={yourClownKey} 
            allClownTypes={allClownTypes}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 mb-8"
        >
          <ShareButtons clownName={clownType.name} />
        </motion.div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <motion.button
            onClick={onRestart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl text-white text-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              initial={{ x: '100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
