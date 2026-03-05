export type InterestItem = {
  name: string;
  details: React.ReactNode;
  tags?: string[];
};

export const interests: InterestItem[] = [
  {
    name: "iOS App Development",
    details: "Check out my Personal Projects page! A lot of my projects are related to iOS App Development.",
    tags: ["currently-learning"]
  },
  {
    name: "Web Development",
    details: "Check out my Personal Projects page! I have some projects related to Web Dev.",
    tags: ["currently-learning"]
  },
  { name: "Data Analysis", details: "Thank you Kaggle." },
  {
    name: "Cloud Computing",
    details: "I got interested in cloud computing after taking a class on it.",
    tags: ["currently-learning"]
  },
  { name: "Language Learning", details: "Favorite hobby!", tags: ["currently-learning"] },
  { name: "Creative Writing", details: "I love writing mystery novels, but they are cringe" },
  { name: "Astronomy", details: "It used to be my minor" },
  { name: "Fitness", details: "I love 15 lbs!" },
  { name: "Bouldering", details: "I don't have a bouldering gym pass yet" },
  {
    name: "Musical Instruments",
    details: (
      <div className="space-y-3">
        <p>
          <strong>Piano, Violin, Viola, Guitar, Flute, Ukulele, Harp</strong>
        </p>
        <p>
          <strong>Piano:</strong> I started playing the piano when I was 5. Piano has always been something deeply
          personal to me and one of my most consistent creative outlets.
        </p>
        <p>
          <strong>Violin:</strong> I started when I was in 4th grade. At that point, I was so sick of piano that I
          wanted to try something new and picked up a violin.
        </p>
        <p>
          <strong>Viola:</strong> I only started playing the viola because my violin teacher needed some extra cash,
          but then I became a viola principal in our school orchestra during my sophomore year in high school.
        </p>
        <p>
          <strong>Guitar:</strong> I started self-teaching myself guitar in 6th grade because that&apos;s what my dad
          did when he was in 6th grade too. He kind of just handed me a guitar and told me to teach myself. I realized
          how much I enjoy teaching myself things, and it gave me confidence that I can learn almost anything quickly if
          I really lock in. Later, my worship leader at church taught me more basics, and I joined my middle school
          guitar club to practice weekly. Not a lot of people know I play guitar, but I&apos;d say I reached a level
          where I can hear most songs and probably play them on guitar (with a capo!).
        </p>
        <p>
          <strong>Flute:</strong> I taught myself flute when my family bought a guitar bundle and it came with a flute.
          I didn&apos;t want to waste it, so I learned on YouTube and then kind of forgot about it until college. My
          friend was a flute major and took me to her music pedagogy class, and her classmates taught me flute there. It
          was so fun that I started picking it back up.
        </p>
        <p>
          <strong>Ukulele:</strong> I enjoy ukulele for casual playing, quick melody ideas, and just having fun with
          music.
        </p>
        <p>
          <strong>Harp:</strong> I got lessons from actual college harp professors. It&apos;s fun.
        </p>
      </div>
    )
  },
  { name: "Reading", details: "Incline walk while reading - love = 0. Check out my app called My Bookie!" },
  { name: "Sketching", details: "I don't actually consider this my hobby" },
  { name: "Detective Conan", details: "Something I liked since I was 5." },
  { name: "Cinnamoroll", details: "Aren't they so cute" },
  { name: "Harry Potter", details: "I read the entire series" },
  { name: "Figure Skating", details: "I started in college!" }
];
