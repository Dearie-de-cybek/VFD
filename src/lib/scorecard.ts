export type Question = {
  id: string;
  text: string;
  value: string;
  /** true when the behaviour described is undesirable — a high score means it rarely/never happens */
  reverse?: boolean;
  custom?: boolean;
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Does my child show remorse after doing something wrong?",
    value: "Conscience / Accountability",
  },
  {
    id: "q2",
    text: "Does my child make excessive noise in the classroom?",
    value: "Obedience, Attentiveness & Discipline",
    reverse: true,
  },
  {
    id: "q3",
    text: "Does my child often draw attention to their achievements, or speak in ways that make others feel less?",
    value: "Humility",
    reverse: true,
  },
  {
    id: "q4",
    text: "Is my child always withdrawn or inattentive during lessons?",
    value: "Engagement",
    reverse: true,
  },
  {
    id: "q5",
    text: "Does my child avoid fights and physical conflicts with peers?",
    value: "Self-control",
  },
  {
    id: "q6",
    text: "Can my child be said to take care of school equipment and instructional materials?",
    value: "Respect for Property",
  },
  {
    id: "q7",
    text: "Does my child tell the truth even in difficult situations?",
    value: "Honesty",
  },
  {
    id: "q8",
    text: "Does my child intimidate, bully, mock, or intentionally hurt other students physically, verbally or emotionally?",
    value: "Respect for Others / Emotional Self-control",
    reverse: true,
  },
  {
    id: "q9",
    text: "To what extent does my child engage in school duties such as cleaning and organizing?",
    value: "Team Spirit / Cooperation",
  },
  {
    id: "q10",
    text: "Is my child eager to participate in spiritual or faith-based activities at school, such as devotions and scripture reading?",
    value: "Intimacy with God",
  },
  {
    id: "q11",
    text: "Does my child talk frequently about the family in class?",
    value: "Boundaries / Emotional Intelligence",
    reverse: true,
  },
  {
    id: "q12",
    text: "To what extent does my child volunteer or offer help without being told?",
    value: "Service / Responsibility / Personal Initiative",
  },
  {
    id: "q13",
    text: "Does my child treat classmates with kindness and speak to them respectfully, regardless of their background or performance?",
    value: "Peer Respect / Consideration",
  },
  {
    id: "q14",
    text: "Have you observed my child engaging in any form of sexual misconduct toward other students?",
    value: "Decency / Respect for Others / Self-control",
    reverse: true,
  },
  {
    id: "q15",
    text: "Does my child open up to you (the teacher) about personal challenges, worries, or emotional struggles?",
    value: "Open Communication / Trust",
  },
];

export type Band = {
  key: "ni" | "prog" | "exp";
  label: string;
  range: string;
  emoji: string;
  mid: number;
  color: string;
};

export const BANDS: Band[] = [
  {
    key: "ni",
    label: "Needs Improvement",
    range: "0–30",
    emoji: "🌱",
    mid: 15,
    color: "#b4552d",
  },
  {
    key: "prog",
    label: "Progressing",
    range: "40–60",
    emoji: "🌿",
    mid: 50,
    color: "#c9a227",
  },
  {
    key: "exp",
    label: "Expected Behaviour",
    range: "70–100",
    emoji: "🌳",
    mid: 85,
    color: "#14432e",
  },
];

export function bandFor(score: number): Band {
  if (score < 40) return BANDS[0];
  if (score < 70) return BANDS[1];
  return BANDS[2];
}

export const LEVELS = ["Elementary", "Primary", "Secondary"];
