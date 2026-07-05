import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

const EVENTS = [
  {
    title: "The Annual Values for Daily Living Conference",
    category: "Conference",
    date: "18–19 September 2026",
    location: "Enugu, Nigeria",
    desc: "Educators, parents, students and leaders gather for keynote sessions, essay competition awards and the commissioning of new youth ambassadors.",
  },
  {
    title: "Inter-School Values Debate Championship",
    category: "Debate",
    date: "7 August 2026",
    location: "Zonal heats — Enugu, Onitsha, Aba",
    desc: "Secondary school teams argue live on integrity, honesty and civic responsibility, judged by educators and community leaders. Winners advance to the national final at the Annual Conference.",
  },
  {
    title: "Community Values Gathering",
    category: "Gathering",
    date: "Last Saturday, monthly",
    location: "Rotates across partner communities",
    desc: "An open town-hall for parents, faith leaders and residents to discuss character formation in the home and neighbourhood — informal, conversational, always free to attend.",
  },
  {
    title: "Parents & Teachers Values Workshop",
    category: "Workshop",
    date: "Ongoing — book a date",
    location: "On-site at your school or church",
    desc: "A half-day, hands-on session equipping the adults around a child with practical language and tools for values-driven correction and encouragement.",
  },
  {
    title: "Youth Ambassadors Induction Ceremony",
    category: "Gathering",
    date: "October 2026",
    location: "Enugu, Nigeria",
    desc: "Each new cohort of Youth Ambassadors is publicly commissioned — a short, ceremonial gathering for ambassadors, their families and mentors.",
  },
];

const PROJECTS = [
  {
    title: "School Values Tours",
    tag: "Ongoing · Nationwide",
    desc: "Moral education campaigns that bring values teaching directly into classrooms — assemblies, workshops and teacher resources delivered school by school.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80",
    alt: "A school classroom",
  },
  {
    title: "Annual VDL Conference",
    tag: "Yearly · Enugu",
    desc: "Educators, parents, students and leaders gather each year to advance the national conversation on values, character and purposeful leadership.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    alt: "An audience at a conference",
  },
  {
    title: "Essay Competitions",
    tag: "Yearly · Secondary Schools",
    desc: "Students reflect deeply on character and citizenship through structured writing — with scholarships and prizes for the most thoughtful voices.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    alt: "A student writing with a fountain pen",
  },
  {
    title: "Book Distribution",
    tag: "Ongoing · Nationwide",
    desc: "Values-based books placed into the hands of students, teachers and families — building home and school libraries of character.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    alt: "A stack of open books",
  },
  {
    title: "Youth Ambassador Programme",
    tag: "Ongoing · Cohort-based",
    desc: "A leadership pipeline of young people trained to model and multiply values in their schools and communities.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    alt: "Young people collaborating on a project",
  },
  {
    title: "Digital Skills Training",
    tag: "Ongoing · Ambassadors",
    desc: "Practical digital skills for young ambassadors — pairing competence with character for purposeful, productive futures.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    alt: "Young women learning on laptops",
  },
];

const POSTS = [
  {
    slug: "why-character-is-the-first-curriculum",
    title: "Why Character Is the First Curriculum",
    category: "Values Education",
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

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name },
  });
  console.log(`Admin user ready: ${email}`);

  for (const [i, e] of EVENTS.entries()) {
    await prisma.event.upsert({
      where: { id: `seed-event-${i}` },
      update: {},
      create: { id: `seed-event-${i}`, ...e },
    });
  }
  console.log(`Seeded ${EVENTS.length} events`);

  for (const [i, p] of PROJECTS.entries()) {
    await prisma.project.upsert({
      where: { id: `seed-project-${i}` },
      update: {},
      create: { id: `seed-project-${i}`, order: i, ...p },
    });
  }
  console.log(`Seeded ${PROJECTS.length} projects`);

  for (const p of POSTS) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, body: p.body.join("\n\n") },
    });
  }
  console.log(`Seeded ${POSTS.length} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
