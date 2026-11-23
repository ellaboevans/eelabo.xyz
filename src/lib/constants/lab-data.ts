export interface DialectItem {
  english: string;
  category: "greetings" | "verbs" | "nouns" | "grammar";
  asanteTwi: string;
  akuapemTwi: string;
  fante: string;
  nzema: string;
  pidgin: string;
  phonologicalNote?: string;
}

export interface CorpusSample {
  id: string;
  text: string;
  variety: "twi" | "fante" | "nzema" | "pidgin";
  dialect?: string;
  register: "social-media" | "everyday" | "formal";
  translation: string;
  annotatorNote: string;
}

export const labManifesto = {
  title: "Computational Linguistics & Language Lab",
  subtitle: "Investigating orthographic variation, dialect continuum gradience, and NLP evaluation across West African languages.",
  researcher: "Evans Elabo",
  focusAreas: [
    {
      title: "Orthographic Resilience",
      description: "Measuring and resolving NLP degradation under informal, non-standard, and homoglyphic text input in West African digital discourse.",
      icon: "ph:text-t-bold",
    },
    {
      title: "Akan Dialect Continuum",
      description: "Quantifying linguistic distance and mutual intelligibility between Asante Twi, Akuapem Twi, Fante, and Nzema for fine-grained NLP.",
      icon: "ph:git-merge-bold",
    },
    {
      title: "Pidgin & Contact Varieties",
      description: "Evaluating regional divergence between Ghanaian and Nigerian Pidgin in multilingual pretrained models and code-switching contexts.",
      icon: "ph:chats-circle-bold",
    },
    {
      title: "Native Corpus Stewardship",
      description: "Constructing ethically sourced, native-annotated evaluation datasets and Data Statements (Bender & Friedman) for low-resource languages.",
      icon: "ph:database-bold",
    },
  ],
};

export const dialectContinuumData: DialectItem[] = [
  {
    english: "Good morning",
    category: "greetings",
    asanteTwi: "Mema wo akye",
    akuapemTwi: "Mema wo akye",
    fante: "Mema wo akye",
    nzema: "Mesoma wɔ ngelɛba",
    pidgin: "Good morning / Mornin",
    phonologicalNote: "Nzema deviates significantly from the Akan core with distinct lexical root 'ngelɛba'.",
  },
  {
    english: "Work",
    category: "nouns",
    asanteTwi: "Adwuma",
    akuapemTwi: "Adwuma",
    fante: "Edwuma",
    nzema: "Gyima",
    pidgin: "Work / Hustle",
    phonologicalNote: "Akan vowel harmony prefix shift (a- vs e-) in Fante, and palatal glide palatalization (/dw/ -> /gy/) in Nzema.",
  },
  {
    english: "Go / Went",
    category: "verbs",
    asanteTwi: "Kɔ",
    akuapemTwi: "Kɔ",
    fante: "Kɔr",
    nzema: "Kɔ",
    pidgin: "Go / Commot",
    phonologicalNote: "Fante maintains the historical rhotic coda /-r/ in past and perfective forms.",
  },
  {
    english: "Mother",
    category: "nouns",
    asanteTwi: "Maame / Ɛna",
    akuapemTwi: "Ɛna",
    fante: "Ɔbaatan / Ɛna",
    nzema: "Mame / Ɛnli",
    pidgin: "Mama / Mother",
    phonologicalNote: "Nzema 'Ɛnli' exhibits alveolar nasal-lateral alternation relative to Akan 'Ɛna'.",
  },
  {
    english: "Food / To Eat",
    category: "verbs",
    asanteTwi: "Didie / Didi",
    akuapemTwi: "Didi",
    fante: "Didzi",
    nzema: "Di aleɛ",
    pidgin: "Chop",
    phonologicalNote: "Fante affricates alveolar plosives before front high vowels (/di/ -> /dzi/).",
  },
  {
    english: "Water",
    category: "nouns",
    asanteTwi: "Nsuo",
    akuapemTwi: "Nsu",
    fante: "Nsu",
    nzema: "Nzule",
    pidgin: "Water",
    phonologicalNote: "Asante retains closing diphthong /-uo/ whereas Akuapem/Fante truncate to /-u/; Nzema features voiced alveolar fricative /z/ and liquid suffix /-le/.",
  },
  {
    english: "He / She is doing it (Progressive)",
    category: "grammar",
    asanteTwi: "Ɔreyɛ",
    akuapemTwi: "Oreyɛ",
    fante: "Ɔroyɛ / Orisua",
    nzema: "Ɔlɛyɛ",
    pidgin: "He/She dey do am",
    phonologicalNote: "Nzema uses lateral marker 'lɛ' for progressive aspect; Ghanaian Pidgin uses auxiliary 'dey'.",
  },
  {
    english: "Will not come (Negation)",
    category: "grammar",
    asanteTwi: "Remma",
    akuapemTwi: "Remma",
    fante: "Rɔmma / Oremba",
    nzema: "Ɛnrɛra",
    pidgin: "No go come",
    phonologicalNote: "Nzema features distinct negative prospective clitic 'ɛnrɛ-' and lenition (/ba/ -> /ra/).",
  },
];

export const corpusSamples: CorpusSample[] = [
  {
    id: "NZ-01",
    variety: "nzema",
    dialect: "Nzema (Western Region)",
    register: "everyday",
    text: "Menli kɔsɔɔti lɛ ndelebɛbo kpalɛ wɔ gyima ne anwo.",
    translation: "All the people have a good understanding regarding the work.",
    annotatorNote: "Custom-written by Evans Elabo. Native verification of Nzema quantifier 'kɔsɔɔti' and lexical 'gyima'.",
  },
  {
    id: "NZ-02",
    variety: "nzema",
    dialect: "Nzema (Western Region)",
    register: "everyday",
    text: "Bɛyɛle gyima kpalɛ wɔ maanle ne anu ndɛba.",
    translation: "They did good work in the country recently.",
    annotatorNote: "Everyday register testing past morpheme '-le' and temporal adverb 'ndɛba'.",
  },
  {
    id: "NZ-03",
    variety: "nzema",
    dialect: "Nzema (UDHR)",
    register: "formal",
    text: "Mgbavolɛ nee mbayelɛ kɔsɔɔti lɛ adenle kɛ bɛgya na bɛbɔ abusua.",
    translation: "All men and women have the right to marry and found a family.",
    annotatorNote: "UDHR Section split (formal legal register), testing coordinated nominal conjunction 'nee'.",
  },
  {
    id: "TW-194",
    variety: "twi",
    dialect: "Asante Twi",
    register: "social-media",
    text: "Ɛnkyɛ koraa na yɛbɛyɛ adwuma no yie ama obiara anya anigye.",
    translation: "It won't be long at all before we do the work well so everyone finds joy.",
    annotatorNote: "Standard Akan orthography with open front vowel 'ɛ'. In informal tweets, typically written with 'e'.",
  },
  {
    id: "TW-195",
    variety: "twi",
    dialect: "Fante",
    register: "social-media",
    text: "Ɔbaatan pa no kɔr gua do ndɛ anapa kɔtɔɔ edziban maa ne mba.",
    translation: "The good mother went to the market this morning to buy food for her children.",
    annotatorNote: "Features Fante verbal coda '-r' (kɔr), affricated 'edziban', and noun plural 'mba' (vs Twi 'mma').",
  },
  {
    id: "PID-88",
    variety: "pidgin",
    dialect: "Ghanaian Pidgin (Strict)",
    register: "social-media",
    text: "Make you no worry, the guy dey come town tomorrow with the goods.",
    translation: "Don't worry, the guy is coming to town tomorrow with the goods.",
    annotatorNote: "Contains widespread Pidgin aspectual marker 'dey', easily detected by both GlotLID and AfroLID.",
  },
  {
    id: "PID-22",
    variety: "pidgin",
    dialect: "Ghanaian Pidgin (Authentic / Marker-less)",
    register: "social-media",
    text: "I go catch you for that side soon, make we link up for night.",
    translation: "I will meet you over there soon, let's meet up tonight.",
    annotatorNote: "Lacks Nigerian-specific markers (dey, wey, abeg). Pretrained LID recall on such sentences drops to 22%.",
  },
];

export const bibtexData = `@misc{elabo2026ghanaian,
  title={Language Identification for Twi, Fante, Nzema and Ghanaian Pidgin: An Error Analysis},
  author={Elabo, Evans},
  year={2026},
  month={October},
  howpublished={\\url{https://github.com/ellaboevans/ghanaian-langid-eval}},
  note={Computational Linguistics Evaluation and Error Analysis on Akan-continuum varieties}
}`;

export const researchKeyFindings = [
  {
    metric: "42% - 88%",
    label: "Informal Orthography Error Spike",
    description: "Substituting ASCII vowels (e/o) for standard characters (ɛ/ɔ) increases classification errors from 2%–27% up to 42% (GlotLID), 77% (baseline), and 88% (AfroLID).",
    icon: "ph:warning-circle-bold",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    metric: "88% vs 22%",
    label: "Pidgin Dialect Bias Gap",
    description: "Pretrained LID systems recognize Ghanaian Pidgin with 88% recall when Nigerian markers (dey, wey, abeg) are present, but plummet to 22% recall on authentic Ghanaian phrasing.",
    icon: "ph:chart-bar-bold",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    metric: "48% Fallback",
    label: "AfroLID Wolof Confusion",
    description: "When confronted with Ghanaian Pidgin or Akan code-mixing, AfroLID defaults to Wolof (wol) as a catch-all output in nearly half of social media test instances.",
    icon: "ph:arrows-split-bold",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    metric: "0.997 Clean F1",
    label: "Character n-gram Linear SVM Baseline",
    description: "A lightweight character n-gram baseline outperforms massive pretrained transformers on clean in-domain text, demonstrating tokenization flaws in current LLMs.",
    icon: "ph:check-circle-bold",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
];
