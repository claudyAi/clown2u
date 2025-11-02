import { motion } from 'motion/react';
import { useState } from 'react';

interface ClownType {
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
}

interface ClownGalleryProps {
  clownTypes: Record<string, ClownType>;
}

export function ClownGallery({ clownTypes }: ClownGalleryProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              The Five Types of Crisis
            </h2>
            <motion.div
              className="h-1 w-48 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everyone's performing some version of themselves. 
            Here are the five main acts we're all running.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(clownTypes).map(([key, clown], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onHoverStart={() => setHoveredKey(key)}
              onHoverEnd={() => setHoveredKey(null)}
              className="h-full"
            >
              <motion.div
                className="relative h-full bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${clown.color}`} />
                
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${clown.color} opacity-0`}
                  animate={{ opacity: hoveredKey === key ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  {/* Emoji */}
                  <motion.div
                    className="text-7xl mb-4 text-center"
                    animate={hoveredKey === key ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {clown.emoji}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className={`text-center mb-4 bg-gradient-to-r ${clown.color} bg-clip-text text-transparent`}>
                    {clown.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {clown.description}
                  </p>
                  
                  {/* Traits */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                    <h4 className="text-sm text-gray-700 mb-3">Core Traits:</h4>
                    <div className="space-y-2">
                      {clown.traits.map((trait, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className={`text-lg shrink-0 bg-gradient-to-r ${clown.color} bg-clip-text text-transparent`}>
                            •
                          </span>
                          <span>{trait}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-xl text-center"
        >
          <motion.p 
            className="text-lg text-gray-700 mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-3xl mr-2">🎪</span>
            We're all just trying to make sense of this shit.
          </motion.p>
          <p className="text-gray-600">
            Different coping mechanisms for the same existential void.
            At least now you know which circus act you're performing.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
