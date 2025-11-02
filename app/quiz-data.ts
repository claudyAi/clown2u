export interface Question {
  question: string;
  emoji: string;
  options: {
    text: string;
    emoji: string;
    value: string;
  }[];
}

export interface ClownType {
  name: string;
  emoji: string;
  description: string;
  traits: string[];
}

export const questions: Question[] = [
  {
    question: "What's your ideal way to make people laugh?",
    emoji: "😂",
    options: [
      { text: "Physical comedy and slapstick", emoji: "🤸", value: "physical" },
      { text: "Witty jokes and wordplay", emoji: "🎭", value: "witty" },
      { text: "Silly faces and expressions", emoji: "🤪", value: "silly" },
      { text: "Magic tricks and surprises", emoji: "✨", value: "magical" },
    ],
  },
  {
    question: "Pick your perfect clown outfit:",
    emoji: "👔",
    options: [
      { text: "Bright, colorful polka dots", emoji: "🎨", value: "colorful" },
      { text: "Classic red nose and big shoes", emoji: "👟", value: "classic" },
      { text: "Elegant suit with fancy props", emoji: "🎩", value: "elegant" },
      { text: "Wild, mismatched patterns", emoji: "🌈", value: "wild" },
    ],
  },
  {
    question: "What's your go-to party trick?",
    emoji: "🎪",
    options: [
      { text: "Juggling everything in sight", emoji: "🤹", value: "juggling" },
      { text: "Making balloon animals", emoji: "🎈", value: "balloons" },
      { text: "Telling funny stories", emoji: "📖", value: "stories" },
      { text: "Pranks and surprises", emoji: "🎁", value: "pranks" },
    ],
  },
  {
    question: "How do you handle a tough crowd?",
    emoji: "🎯",
    options: [
      { text: "Double down on the energy!", emoji: "⚡", value: "energetic" },
      { text: "Try different jokes until something lands", emoji: "🎲", value: "adaptive" },
      { text: "Make fun of yourself", emoji: "🙃", value: "selfdeprecating" },
      { text: "Turn it into part of the act", emoji: "🎬", value: "improvise" },
    ],
  },
  {
    question: "What's your favorite circus act?",
    emoji: "🎪",
    options: [
      { text: "The trapeze artists", emoji: "🤸‍♀️", value: "trapeze" },
      { text: "The ringmaster", emoji: "🎩", value: "ringmaster" },
      { text: "The silly clowns", emoji: "🤡", value: "clowns" },
      { text: "The magicians", emoji: "🪄", value: "magicians" },
    ],
  },
];

export const clownTypes: Record<string, ClownType> = {
  classic: {
    name: "The Classic Clown",
    emoji: "🤡",
    description: "You're a traditional entertainer who brings joy through timeless comedy and physical humor!",
    traits: [
      "Master of slapstick comedy",
      "Loves bright colors and oversized props",
      "Brings nostalgia and warmth to every performance",
      "Expert at making kids and adults laugh alike",
    ],
  },
  jester: {
    name: "The Witty Jester",
    emoji: "🎭",
    description: "You're a clever wordsmith who uses quick wit and intelligent humor to entertain!",
    traits: [
      "Sharp-tongued with clever comebacks",
      "Loves puns and wordplay",
      "Can roast with love and make people think",
      "The life of every party with your stories",
    ],
  },
  acrobat: {
    name: "The Acrobatic Clown",
    emoji: "🤸",
    description: "You combine physical prowess with comedy, creating awe-inspiring funny moments!",
    traits: [
      "Athletic and energetic",
      "Loves physical challenges and stunts",
      "Can turn any mishap into comedy gold",
      "Always ready for an adventure",
    ],
  },
  magician: {
    name: "The Mystical Clown",
    emoji: "✨",
    description: "You blend magic with comedy, creating wonder and laughter in equal measure!",
    traits: [
      "Full of surprises and tricks",
      "Mysterious yet approachable",
      "Loves creating moments of wonder",
      "Always has something up your sleeve",
    ],
  },
  silly: {
    name: "The Silly Goofball",
    emoji: "🤪",
    description: "You're pure chaos and joy, spreading laughter through random acts of silliness!",
    traits: [
      "Unpredictable and spontaneous",
      "Makes faces that could launch a thousand laughs",
      "Never takes anything too seriously",
      "Your energy is absolutely infectious",
    ],
  },
  ringmaster: {
    name: "The Ringmaster Clown",
    emoji: "🎩",
    description: "You're the sophisticated showman who commands attention with elegance and flair!",
    traits: [
      "Charismatic and commanding presence",
      "Knows how to work a crowd",
      "Balances class with comedy perfectly",
      "The orchestrator of fun and chaos",
    ],
  },
};

export function calculateClownType(answers: string[]): string {
  const scores: Record<string, number> = {
    classic: 0,
    jester: 0,
    acrobat: 0,
    magician: 0,
    silly: 0,
    ringmaster: 0,
  };

  // Score based on answer patterns
  answers.forEach((answer) => {
    switch (answer) {
      case "physical":
        scores.acrobat += 2;
        scores.classic += 1;
        break;
      case "witty":
        scores.jester += 2;
        scores.ringmaster += 1;
        break;
      case "silly":
        scores.silly += 2;
        scores.classic += 1;
        break;
      case "magical":
        scores.magician += 2;
        scores.ringmaster += 1;
        break;
      case "colorful":
        scores.classic += 2;
        scores.silly += 1;
        break;
      case "classic":
        scores.classic += 2;
        break;
      case "elegant":
        scores.ringmaster += 2;
        scores.magician += 1;
        break;
      case "wild":
        scores.silly += 2;
        scores.acrobat += 1;
        break;
      case "juggling":
        scores.acrobat += 2;
        scores.classic += 1;
        break;
      case "balloons":
        scores.classic += 2;
        break;
      case "stories":
        scores.jester += 2;
        scores.ringmaster += 1;
        break;
      case "pranks":
        scores.silly += 2;
        scores.magician += 1;
        break;
      case "energetic":
        scores.acrobat += 2;
        scores.silly += 1;
        break;
      case "adaptive":
        scores.jester += 2;
        break;
      case "selfdeprecating":
        scores.jester += 1;
        scores.silly += 1;
        break;
      case "improvise":
        scores.magician += 2;
        scores.jester += 1;
        break;
      case "trapeze":
        scores.acrobat += 2;
        break;
      case "ringmaster":
        scores.ringmaster += 2;
        break;
      case "clowns":
        scores.classic += 2;
        break;
      case "magicians":
        scores.magician += 2;
        break;
    }
  });

  // Find the highest scoring clown type
  let maxScore = 0;
  let clownType = "classic";

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      clownType = type;
    }
  });

  return clownType;
}
