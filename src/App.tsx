import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroScreen } from './components/IntroScreen';
import { StoryScene } from './components/StoryScene';
import { ClownResult } from './components/ClownResult';
import { ClownGallery } from './components/ClownGallery';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { Book, Compass } from 'lucide-react';

interface Scores {
  jester: number;
  mime: number;
  ringmaster: number;
  auguste: number;
  pierrot: number;
}

const storyScenes = [
  {
    id: 1,
    title: "Monday Morning",
    text: "Your alarm goes off at 6:47 AM. You've hit snooze three times already. The thought of going to work today makes your stomach turn. You look at your phone - 47 unread emails. What's your honest first thought?",
    choices: [
      {
        text: "\"At least I can make people laugh about how absurd this all is\"",
        nextScene: 2,
        scores: { jester: 2, auguste: 1 }
      },
      {
        text: "\"I'll just go through the motions. No one really sees me anyway\"",
        nextScene: 2,
        scores: { mime: 2, pierrot: 1 }
      },
      {
        text: "\"Time to take control of this day. I've got shit to accomplish\"",
        nextScene: 2,
        scores: { ringmaster: 3 }
      },
      {
        text: "\"Fuck it, I'm calling in sick and doing whatever I want\"",
        nextScene: 2,
        scores: { auguste: 3 }
      }
    ]
  },
  {
    id: 2,
    title: "The Retirement Question",
    text: "You're at a family dinner. Your uncle asks: \"So, do you actually see yourself working this job until retirement?\" Everyone's eyes are on you. The truth is suffocating.",
    choices: [
      {
        text: "\"Retirement? In THIS economy? Haha... ha... *cries internally*\"",
        nextScene: 3,
        scores: { jester: 3, auguste: 1 }
      },
      {
        text: "*smile and nod while dying inside* \"We'll see what happens\"",
        nextScene: 3,
        scores: { mime: 2, pierrot: 2 }
      },
      {
        text: "\"I'm going to be running my own thing by then. This is just a stepping stone\"",
        nextScene: 3,
        scores: { ringmaster: 3, jester: 1 }
      },
      {
        text: "\"Probably not, but who cares? Life's too short for a plan\"",
        nextScene: 3,
        scores: { auguste: 3, pierrot: 1 }
      }
    ]
  },
  {
    id: 3,
    title: "The Mask You Wear",
    text: "A close friend says: \"You know what I've noticed? You act completely different at work than you do with us. Like, who even are you?\" They're right. You've been wearing a mask for so long.",
    choices: [
      {
        text: "\"Yeah, work me is just my greatest performance. Gotta keep them entertained\"",
        nextScene: 4,
        scores: { jester: 2, ringmaster: 2 }
      },
      {
        text: "\"I don't even know anymore. I've forgotten who I am under all this\"",
        nextScene: 4,
        scores: { mime: 3, pierrot: 2 }
      },
      {
        text: "\"Work requires a certain persona. I'm in control of both versions\"",
        nextScene: 4,
        scores: { ringmaster: 3, mime: 1 }
      },
      {
        text: "\"Fuck the mask. I'm tired of pretending. Chaos is more honest\"",
        nextScene: 4,
        scores: { auguste: 4 }
      }
    ]
  },
  {
    id: 4,
    title: "The Breaking Point",
    text: "It's 11 PM. You're still working. Your partner/friend texted you hours ago asking if you're okay. You haven't responded. Your hands are shaking. You're either going to cry or scream. What do you do?",
    choices: [
      {
        text: "Make a joke about capitalism and post it. At least someone will laugh",
        nextScene: 5,
        scores: { jester: 3, pierrot: 1 }
      },
      {
        text: "Turn off all the lights and just sit in silence, feeling everything",
        nextScene: 5,
        scores: { mime: 2, pierrot: 3 }
      },
      {
        text: "Push through. Make a plan to fix this. I need to take charge of my life",
        nextScene: 5,
        scores: { ringmaster: 4 }
      },
      {
        text: "Close the laptop, throw it across the room, and do something reckless",
        nextScene: 5,
        scores: { auguste: 4 }
      }
    ]
  },
  {
    id: 5,
    title: "The Question of Meaning",
    text: "You're scrolling at 2 AM. Everyone online seems to have their life together. You don't. A post asks: \"What's the point of it all?\" You've been asking yourself the same thing for months.",
    choices: [
      {
        text: "\"The point? To make people smile while we're all sinking. We're all in on the joke\"",
        nextScene: 6,
        scores: { jester: 3, auguste: 1 }
      },
      {
        text: "\"There is no point. Just beautiful, terrible existence. And that's okay\"",
        nextScene: 6,
        scores: { pierrot: 4, mime: 1 }
      },
      {
        text: "\"The point is what you make of it. I'm building something that matters\"",
        nextScene: 6,
        scores: { ringmaster: 3, jester: 1 }
      },
      {
        text: "\"Who gives a fuck about the point? I'm here to feel alive, not find meaning\"",
        nextScene: 6,
        scores: { auguste: 3, pierrot: 1 }
      }
    ]
  },
  {
    id: 6,
    title: "The Truth",
    text: "Final question. No one else will see this answer. Just you and your reflection in the dark screen: When you look at your life right now, what do you really feel?",
    choices: [
      {
        text: "\"Like I'm one good punchline away from making sense of all this absurdity\"",
        nextScene: -1,
        scores: { jester: 4 }
      },
      {
        text: "\"Invisible. Beautiful and sad and invisible. Like a ghost performing for no one\"",
        nextScene: -1,
        scores: { mime: 2, pierrot: 3 }
      },
      {
        text: "\"Like I'm about to break through. I just need to take control and execute\"",
        nextScene: -1,
        scores: { ringmaster: 4 }
      },
      {
        text: "\"Fuck it. Burn it all down and dance in the flames. At least I'd feel something\"",
        nextScene: -1,
        scores: { auguste: 4 }
      }
    ]
  }
];

const clownTypes = {
  jester: {
    name: "The Coping Comedian",
    emoji: "🃏",
    description: "You've weaponized humor as a survival mechanism. Behind every joke is a truth too painful to say directly. You make people laugh because if you can make the absurdity funny, maybe it'll hurt less. You see through the bullshit and you're determined to make art out of the collapse.",
    traits: [
      "Humor is your armor and your therapy",
      "You see the absurdity in everything (especially yourself)",
      "Intelligence as a defense mechanism",
      "Making people laugh while you're drowning inside"
    ],
    color: "from-yellow-400 to-orange-500"
  },
  mime: {
    name: "The Invisible Observer",
    emoji: "🎭",
    description: "You move through life feeling unseen, even when you're in a room full of people. You've mastered the art of being present while feeling absent. You watch everyone else perform their lives while yours happens in silence. There's something beautiful and tragic about how well you understand things you can't say.",
    traits: [
      "Emotionally present but socially invisible",
      "You feel everything, express nothing",
      "The world's most observant ghost",
      "Silence is both your prison and your power"
    ],
    color: "from-gray-600 to-gray-800"
  },
  ringmaster: {
    name: "The Control Freak",
    emoji: "🎩",
    description: "You're holding everything together with sheer force of will. If you just work hard enough, plan well enough, optimize enough, you can make this life work. You can't let the chaos win. You won't. Leadership is the only thing keeping you from falling apart. If you stop moving, you'll realize how scared you actually are.",
    traits: [
      "Anxiety disguised as ambition",
      "If you're not in control, you're drowning",
      "Overworking to avoid feeling",
      "The captain of a sinking ship who refuses to acknowledge the water"
    ],
    color: "from-red-600 to-purple-700"
  },
  auguste: {
    name: "The Chaos Embracer",
    emoji: "🤡",
    description: "Fuck it. Fuck the plan, fuck the career ladder, fuck what you're supposed to do. You'd rather feel alive in the mess than dead following the rules. You're either having a breakdown or a breakthrough and honestly? Same thing. Life's too short to not burn it down and see what happens.",
    traits: [
      "Impulsive as a lifestyle choice",
      "Self-destruction or self-discovery (who cares?)",
      "Allergic to structure and loving it",
      "The only honest one in a world of liars"
    ],
    color: "from-pink-500 to-red-500"
  },
  pierrot: {
    name: "The Sad Artist",
    emoji: "🌙",
    description: "You've romanticized your own suffering into an identity. There's something beautiful about the melancholy, something profound in the emptiness. You're too aware of how temporary everything is, too in touch with the weight of existence. You're not depressed, you're just awake. (That's what you tell yourself at 3 AM.)",
    traits: [
      "Existential dread as an aesthetic",
      "Too deep for this shallow world",
      "Sadness is your muse",
      "Beautifully broken (and kind of attached to it)"
    ],
    color: "from-indigo-600 to-blue-800"
  }
};

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [activeTab, setActiveTab] = useState('journey');
  const [scores, setScores] = useState<Scores>({
    jester: 0,
    mime: 0,
    ringmaster: 0,
    auguste: 0,
    pierrot: 0
  });

  const handleStart = () => {
    setGameState('playing');
    setActiveTab('journey');
  };

  const handleChoice = (choice: any) => {
    const newScores = { ...scores };
    Object.keys(choice.scores).forEach((key) => {
      newScores[key as keyof Scores] += choice.scores[key as keyof typeof choice.scores] || 0;
    });
    setScores(newScores);

    if (choice.nextScene === -1) {
      setGameState('result');
    } else {
      setCurrentSceneId(choice.nextScene);
    }
  };

  const handleRestart = () => {
    setGameState('intro');
    setCurrentSceneId(1);
    setActiveTab('journey');
    setScores({
      jester: 0,
      mime: 0,
      ringmaster: 0,
      auguste: 0,
      pierrot: 0
    });
  };

  const getClownType = () => {
    const maxScore = Math.max(...Object.values(scores));
    const winner = Object.entries(scores).find(([_, score]) => score === maxScore);
    return {
      clownType: clownTypes[winner![0] as keyof typeof clownTypes],
      clownKey: winner![0]
    };
  };

  const currentScene = storyScenes.find(scene => scene.id === currentSceneId);
  const progress = (currentSceneId / storyScenes.length) * 100;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {gameState === 'intro' ? (
          <IntroScreen onStart={handleStart} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-screen">
            <div className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/40 shadow-lg">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/70 backdrop-blur-xl border border-white/40 shadow-md p-1">
                  <TabsTrigger 
                    value="journey" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all"
                  >
                    <Compass className="w-4 h-4 mr-2" />
                    Your Journey
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gallery" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all"
                  >
                    <Book className="w-4 h-4 mr-2" />
                    All Types
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="journey" className="m-0">
              <AnimatePresence mode="wait">
                {gameState === 'playing' && currentScene && (
                  <div key="playing" className="min-h-screen py-8">
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-3xl mx-auto px-6 mb-8"
                    >
                      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm text-gray-600">
                            Question {currentSceneId} of {storyScenes.length}
                          </span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                    </motion.div>
                    <StoryScene 
                      scene={currentScene} 
                      onChoice={handleChoice}
                    />
                  </div>
                )}
                
                {gameState === 'result' && (
                  <div key="result" className="min-h-screen">
                    <ClownResult 
                      clownType={getClownType().clownType}
                      yourClownKey={getClownType().clownKey}
                      allClownTypes={clownTypes}
                      onRestart={handleRestart}
                    />
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="gallery" className="m-0">
              <ClownGallery clownTypes={clownTypes} />
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Toaster />
    </>
  );
}
