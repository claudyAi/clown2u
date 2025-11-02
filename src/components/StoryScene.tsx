import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Choice {
  text: string;
  nextScene: number;
  scores: {
    jester?: number;
    mime?: number;
    ringmaster?: number;
    auguste?: number;
    pierrot?: number;
  };
}

interface StorySceneProps {
  scene: {
    id: number;
    title: string;
    text: string;
    choices: Choice[];
  };
  onChoice: (choice: Choice) => void;
}

export function StoryScene({ scene, onChoice }: StorySceneProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Reset selectedIndex when scene changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [scene.id]);

  const handleChoice = (choice: Choice, index: number) => {
    if (selectedIndex !== null) return; // Prevent multiple clicks
    setSelectedIndex(index);
    setTimeout(() => onChoice(choice), 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl w-full"
      >
        {/* Magical Background Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"
          />
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Glassmorphic container */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            {/* Sparkle decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 text-yellow-400"
            >
              <Sparkles className="w-12 h-12" fill="currentColor" />
            </motion.div>

            {/* Scene Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <div className="inline-block">
                <h2 className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2 relative">
                  {scene.title}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </h2>
              </div>
            </motion.div>

            {/* Scene Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                {scene.text}
              </p>
            </motion.div>

            {/* Choices Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid gap-4 md:gap-5 max-w-3xl mx-auto"
            >
              {scene.choices.map((choice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <motion.button
                    onClick={() => handleChoice(choice, index)}
                    disabled={selectedIndex !== null}
                    className={`
                      group relative w-full p-6 rounded-2xl text-left
                      transition-all duration-300 overflow-hidden
                      ${selectedIndex === index ? 'scale-95' : 'scale-100'}
                      ${selectedIndex !== null && selectedIndex !== index ? 'opacity-40' : 'opacity-100'}
                    `}
                    whileHover={{ scale: selectedIndex === null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedIndex === null ? 0.98 : 1 }}
                  >
                    {/* Background gradient */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br transition-opacity duration-300
                      ${hoveredIndex === index 
                        ? 'from-purple-500 via-pink-500 to-purple-600 opacity-100' 
                        : 'from-purple-400 via-pink-400 to-purple-500 opacity-90'
                      }
                    `} />
                    
                    {/* Shine effect on hover */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4">
                      <motion.span
                        className="text-3xl flex-shrink-0 mt-1"
                        animate={hoveredIndex === index ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {['🎭', '🌙', '🎪', '🃏'][index % 4]}
                      </motion.span>
                      <span className="text-white flex-1 leading-relaxed">
                        {choice.text}
                      </span>
                    </div>

                    {/* Border glow */}
                    <div className={`
                      absolute inset-0 rounded-2xl transition-opacity duration-300
                      ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/40" />
                      <div className="absolute inset-0 rounded-2xl bg-white/10" />
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
