export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  img: string;
  alt: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-character-is-the-first-curriculum",
    title: "Why Character Is the First Curriculum",
    category: "Values Education",
    date: "June 12, 2026",
    excerpt:
      "Before mathematics and before grammar, a child learns who to be. What happens when schools treat character as core — not extracurricular?",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    alt: "A child studying at a desk",
    body: [
      "Walk into any classroom and you will find two curricula running at once. One is printed — timetabled, examined, certificated. The other is invisible: the way disagreements are settled, the way honesty is rewarded or quietly punished, the way effort is noticed. Children graduate from both.",
      "At Values for Daily Living, we believe the invisible curriculum deserves to be made visible. Character is not what remains after academics are done; it is the soil in which academics grow. A student who has learned discipline studies differently. A student who has learned integrity examines differently.",
      "That is why our values education programme does not arrive as an assembly-day lecture. It arrives as materials teachers can use every day, woven into the life of the school from primary to tertiary level — so the first curriculum is finally taught on purpose.",
    ],
  },
  {
    slug: "raising-honest-children-in-a-noisy-world",
    title: "Raising Honest Children in a Noisy World",
    category: "Parenting",
    date: "May 28, 2026",
    excerpt:
      "Children don't learn honesty from definitions. They learn it from watching what we do when honesty is expensive.",
    img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80",
    alt: "A parent holding a child's hand",
    body: [
      "Every parent has met the moment: the phone rings, and it would be so easy to say 'tell them I'm not home.' A small thing. Except a child is watching, and the lesson lands deeper than any lecture on truthfulness ever will.",
      "Honesty is caught before it is taught. In our parent empowerment workshops, we spend less time on what to say to children and more time on what to model in front of them — because values are not inherited; they are demonstrated, repeated, and absorbed through daily living.",
      "The world our children inherit will be noisy with shortcuts. Our work is to make sure the loudest voice they carry is the quiet, consistent one they watched at home.",
    ],
  },
  {
    slug: "the-discipline-dividend",
    title: "The Discipline Dividend",
    category: "Character",
    date: "May 9, 2026",
    excerpt:
      "Talent opens doors; discipline keeps them open. What our essay competition taught us about the students who finish.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    alt: "A student writing with a fountain pen",
    body: [
      "Each year, thousands of secondary school students enter our essay competition. The winning essays are rarely the flashiest. They are the ones that were rewritten — three times, four times — by students who kept a promise to themselves.",
      "Discipline has a compounding quality that talent alone does not. It converts intention into habit and habit into character. The student who learns to finish an essay learns to finish everything else life will hand them.",
      "This is the dividend we invest in: not the prize-winning paragraph, but the person who was formed in the writing of it.",
    ],
  },
  {
    slug: "mentorship-that-outlives-the-mentor",
    title: "Mentorship That Outlives the Mentor",
    category: "Youth Mentorship",
    date: "April 17, 2026",
    excerpt:
      "The goal of mentorship is not dependence — it is multiplication. Inside our youth ambassador programme.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    alt: "Young people collaborating on a project",
    body: [
      "A mentor's success is measured in a strange way: by how unnecessary they eventually become. The young person who once needed guidance begins to give it, and the value travels further than the mentor ever could alone.",
      "Our youth ambassador programme is built on this multiplication. Ambassadors are mentored in leadership, ethical decision-making and purposeful living — and then trained to carry those lessons back into their schools and communities.",
      "One mentor shapes a student. One ambassador shapes a generation of their peers. That is how a movement grows.",
    ],
  },
  {
    slug: "values-and-the-future-of-nigerian-leadership",
    title: "Values and the Future of Nigerian Leadership",
    category: "Leadership",
    date: "March 30, 2026",
    excerpt:
      "Policies fail where character fails. Why we consult with institutions on ethics — and what changes when we do.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Professionals in discussion",
    body: [
      "Nigeria does not lack brilliant policies. It lacks, too often, the character infrastructure to carry them out. A policy is only as strong as the integrity of the hands it passes through.",
      "This is why our work extends beyond classrooms into policy rooms. We consult with governments and organizations to embed values into governance and institutional culture — because a nation's ethics are set as much by its institutions as by its homes.",
      "The future of Nigerian leadership will not be decided only at elections. It is being decided now, in every classroom where a child learns that integrity is not negotiable.",
    ],
  },
  {
    slug: "empathy-is-a-skill-we-can-teach",
    title: "Empathy Is a Skill We Can Teach",
    category: "Values Education",
    date: "March 8, 2026",
    excerpt:
      "We treat empathy as a temperament some children have. Our school tours suggest something more hopeful.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands joined together in community",
    body: [
      "On a school values tour, we ask a simple question: 'When did someone last understand exactly how you felt?' Hands go up slowly, then stories follow — and something shifts in the room.",
      "Empathy grows through practice: naming feelings, hearing stories unlike our own, being heard ourselves. It is a skill, and like every skill it responds to teaching.",
      "A society that can imagine its neighbour's burden governs itself differently. Empathy, taught early, becomes citizenship later.",
    ],
  },
];
