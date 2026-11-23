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

export interface DialectVarietyMeta {
  id: "akuapem" | "asante" | "fante" | "nzema" | "pidgin";
  label: string;
  region: string;
  subfamily: string;
  keyShift: string;
  accentColor: string;
  badgeClass: string;
  isoCode: string;
}

export const continuumVarieties: DialectVarietyMeta[] = [
  {
    id: "akuapem",
    label: "Akuapem Twi",
    region: "Eastern Region (Akropong, Mountains)",
    subfamily: "Central Akan (Twi)",
    keyShift: "Conservative standard, preserves historical open vowels without diphthongization",
    accentColor: "#f59e0b",
    badgeClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    isoCode: "aka / twi",
  },
  {
    id: "asante",
    label: "Asante Twi",
    region: "Ashanti & Brong Ahafo Regions",
    subfamily: "Central Akan (Twi)",
    keyShift: "Closing diphthongs (-uo in Nsuo), broad vehicular standard across Ghana",
    accentColor: "#fbbf24",
    badgeClass: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    isoCode: "aka / twi",
  },
  {
    id: "fante",
    label: "Fante (Mfantse)",
    region: "Central & Western Coastal Ghana (Cape Coast, Takoradi)",
    subfamily: "Southern Akan",
    keyShift: "Historical rhotic coda /-r/, affrication (/di/ -> /dzi/), prefix harmony shift (a- -> e-)",
    accentColor: "#a855f7",
    badgeClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    isoCode: "aka / fat",
  },
  {
    id: "nzema",
    label: "Nzema (Appolo)",
    region: "Western Region & Ivorian Border (Axim, Half Assini)",
    subfamily: "Central Bia (Tano Subgroup)",
    keyShift: "Palatal glide shift (/dw/ -> /gy/), progressive clitic 'lɛ', alveolar nasal-lateral alternation",
    accentColor: "#10b981",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    isoCode: "nzi",
  },
  {
    id: "pidgin",
    label: "Ghanaian Pidgin (Kru)",
    region: "Urban Centers (Accra, Kumasi, Campus Discourse)",
    subfamily: "Atlantic Contact Creole",
    keyShift: "English lexical base with Kwa syntax, aspectual 'dey', authentic Ghanaian register",
    accentColor: "#06b6d4",
    badgeClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    isoCode: "gpe",
  },
];

export interface ContinuumMorphSample {
  id: string;
  english: string;
  category: "greetings" | "nouns" | "verbs" | "grammar";
  akuapem: { text: string; ipa: string; gloss: string };
  asante: { text: string; ipa: string; gloss: string };
  fante: { text: string; ipa: string; gloss: string };
  nzema: { text: string; ipa: string; gloss: string };
  pidgin: { text: string; ipa: string; gloss: string };
  phonologicalMechanism: string;
  linguisticRule: string;
}

export const continuumMorphSamples: ContinuumMorphSample[] = [
  {
    id: "water",
    english: "Water",
    category: "nouns",
    akuapem: { text: "Nsu", ipa: "/n.su/", gloss: "water" },
    asante: { text: "Nsuo", ipa: "/n.su.o/", gloss: "water [diphthong]" },
    fante: { text: "Nsu", ipa: "/n.su/", gloss: "water [truncated]" },
    nzema: { text: "Nzule", ipa: "/n.zu.le/", gloss: "water [voiced fricative + -le coda]" },
    pidgin: { text: "Water", ipa: "/wɔ.tɐ/", gloss: "water" },
    phonologicalMechanism: "Vowel Diphthongization & Spirantization",
    linguisticRule: "Akuapem/Fante truncate to high round /u/, Asante retains closing diphthong /-uo/, whereas Bia/Nzema undergoes spirantization (/s/ -> /z/) and suffixes the liquid morpheme /-le/.",
  },
  {
    id: "work",
    english: "Work / Labor",
    category: "nouns",
    akuapem: { text: "Adwuma", ipa: "/a.d͡ʒʷu.ma/", gloss: "work [prefix a-]" },
    asante: { text: "Adwuma", ipa: "/a.d͡ʒʷu.ma/", gloss: "work [prefix a-]" },
    fante: { text: "Edwuma", ipa: "/e.d͡ʒʷu.ma/", gloss: "work [prefix e- ATR harmony]" },
    nzema: { text: "Gyima", ipa: "/ɟi.ma/", gloss: "work [glide fronting /dw/ -> /gy/]" },
    pidgin: { text: "Work / Hustle", ipa: "/wɔk/", gloss: "labor / hustle" },
    phonologicalMechanism: "Akan Prefix Vowel Harmony & Nzema Palatal Glide Fronting",
    linguisticRule: "Fante applies ATR vowel harmony raising prefix /a-/ to /e-/. Nzema palatalizes the labialized coronal stop /d͡ʒʷ/ into a palatal stop /ɟ/ ('Gyima') and sheds the initial nominal prefix.",
  },
  {
    id: "food-eat",
    english: "To Eat / Food",
    category: "verbs",
    akuapem: { text: "Didi", ipa: "/di.di/", gloss: "eat [reduplicated]" },
    asante: { text: "Didie / Didi", ipa: "/di.di.e/", gloss: "eat [nominalized /didi/]" },
    fante: { text: "Didzi", ipa: "/di.d͡zi/", gloss: "eat [alveolar affrication]" },
    nzema: { text: "Di aleɛ", ipa: "/di a.le.ɛ/", gloss: "eat + food [compound complement]" },
    pidgin: { text: "Chop", ipa: "/t͡ʃɔp/", gloss: "eat [creole lexical root]" },
    phonologicalMechanism: "Fante High Front Vowel Affrication (/d/ -> /dz/)",
    linguisticRule: "Fante affricates voiced alveolar stops into sibilant affricates before high front vowels (/i/). Nzema mandates the lexical complement 'aleɛ' for intransitive eating.",
  },
  {
    id: "go",
    english: "Go / Went",
    category: "verbs",
    akuapem: { text: "Kɔ", ipa: "/kɔ/", gloss: "go" },
    asante: { text: "Kɔ", ipa: "/kɔ/", gloss: "go" },
    fante: { text: "Kɔr", ipa: "/kɔr/", gloss: "went [rhotic coda preservation]" },
    nzema: { text: "Kɔ", ipa: "/kɔ/", gloss: "go" },
    pidgin: { text: "Go / Commot", ipa: "/go/", gloss: "depart / leave" },
    phonologicalMechanism: "Historical Akan Rhotic Coda (/-r/) Conservation",
    linguisticRule: "Proto-Akan maintained syllable-final rhotics. Coastal Fante conservatively preserves /-r/ in past/perfective constructions where Asante and Akuapem have dropped it.",
  },
  {
    id: "progressive",
    english: "He / She is doing it",
    category: "grammar",
    akuapem: { text: "Oreyɛ", ipa: "/o.re.jɛ/", gloss: "3SG-PROG-do" },
    asante: { text: "Ɔreyɛ", ipa: "/ɔ.re.jɛ/", gloss: "3SG-PROG-do [vowel harmony Ɔ-]" },
    fante: { text: "Ɔroyɛ", ipa: "/ɔ.ro.jɛ/", gloss: "3SG-PROG-do [labialized prog]" },
    nzema: { text: "Ɔlɛyɛ", ipa: "/ɔ.lɛ.jɛ/", gloss: "3SG-PROG(lɛ)-do" },
    pidgin: { text: "He dey do am", ipa: "/i deɪ du am/", gloss: "3SG AUX do 3SG.OBJ" },
    phonologicalMechanism: "Morphosyntactic Aspectual Realization",
    linguisticRule: "Central Akan employs the prefixed aspectual morpheme 're-'. Fante labializes the vowel to 'ro-'. Nzema uses the distinct Bia continuous auxiliary clitic 'lɛ', while Pidgin introduces the Atlantic pre-verbal auxiliary 'dey'.",
  },
  {
    id: "greeting",
    english: "Good morning",
    category: "greetings",
    akuapem: { text: "Mema wo akye", ipa: "/me.ma wo a.t͡ɕᶣe/", gloss: "1SG-give 2SG morning" },
    asante: { text: "Mema wo akye", ipa: "/me.ma wo a.t͡ɕᶣe/", gloss: "1SG-give 2SG morning" },
    fante: { text: "Mema wo akye", ipa: "/me.ma wo a.t͡ɕᶣe/", gloss: "1SG-give 2SG morning" },
    nzema: { text: "Mesoma wɔ ngelɛba", ipa: "/me.so.ma wɔ ŋ.ge.lɛ.ba/", gloss: "1SG-send 2SG blessing" },
    pidgin: { text: "Good morning / Mornin", ipa: "/gʊd mɔːnɪn/", gloss: "greeting" },
    phonologicalMechanism: "Lexical Root Replacement & Politeness Clitic",
    linguisticRule: "Akan employs the formulaic performative 'Mema wo akye' (lit. 'I give you morning/light'). Nzema replaces both verb ('soma' = send) and nominal root with 'ngelɛba' (grace/morning peace).",
  },
];

export interface TokenTaxSample {
  id: string;
  title: string;
  language: string;
  category: "akan" | "nzema" | "informal" | "pidgin";
  inputText: string;
  englishTranslation: string;
  englishTokens: string[];
  gpt4o: {
    tokens: string[];
    inflation: number;
    explanation: string;
  };
  llama3: {
    tokens: string[];
    inflation: number;
    explanation: string;
  };
  byteLevel: {
    bytesCount: number;
    tokenCount: number;
    benefit: string;
  };
}

export const tokenTaxSamples: TokenTaxSample[] = [
  {
    id: "tax-twi-standard",
    title: "Standard Akan (Twi) with Open Vowels",
    language: "Asante Twi (Standard)",
    category: "akan",
    inputText: "Ɛnkyɛ koraa na yɛbɛyɛ adwuma no yie.",
    englishTranslation: "It won't be long at all before we do the work well.",
    englishTokens: ["It", " won", "'t", " be", " long", " at", " all", " before", " we", " do", " the", " work", " well", "."],
    gpt4o: {
      tokens: ["\xc9", "\x9b", "n", "ky", "\xc9", "\x9b", " k", "ora", "a", " na", " y", "\xc9", "\x9b", "b", "\xc9", "\x9b", "y", "\xc9", "\x9b", " ad", "w", "uma", " no", " y", "ie", "."],
      inflation: 2.1,
      explanation: "Open vowels 'ɛ' (U+025B) are split into raw multibyte UTF-8 chunks ('\xc9' and '\x9b'), doubling token cost.",
    },
    llama3: {
      tokens: ["\xc9\x9b", "n", "ky", "\xc9\x9b", " kora", "a", " na", " y", "\xc9\x9b", "b", "\xc9\x9b", "y", "\xc9\x9b", " adwuma", " no", " yie", "."],
      inflation: 1.8,
      explanation: "Tiktoken/BPE recognizes characters partially but severely fragments verbal prefixes ('y-ɛ-b-ɛ-y-ɛ').",
    },
    byteLevel: {
      bytesCount: 42,
      tokenCount: 42,
      benefit: "ByT5 & Mamba process directly at the byte level with zero open-vowel penalty and zero vocabulary out-of-bounds.",
    },
  },
  {
    id: "tax-twi-informal",
    title: "Informal WhatsApp/Twitter Twi (ASCII Substitute)",
    language: "Informal Twi (Internet Discourse)",
    category: "informal",
    inputText: "Enkye koraa na yebeye adwuma no yie ama obiara anya anigye.",
    englishTranslation: "It won't take long before we do the job well so everyone finds joy.",
    englishTokens: ["It", " won", "'t", " take", " long", " before", " we", " do", " the", " job", " well", " so", " everyone", " finds", " joy", "."],
    gpt4o: {
      tokens: ["En", "k", "ye", " k", "ora", "a", " na", " ye", "bey", "e", " ad", "w", "uma", " no", " y", "ie", " ama", " ob", "i", "ara", " any", "a", " ani", "gye", "."],
      inflation: 1.6,
      explanation: "Replacing 'ɛ' with ASCII 'e' reduces multibyte splits, but semantic degradation occurs—LID accuracy plummets by up to 88%.",
    },
    llama3: {
      tokens: ["En", "kye", " kora", "a", " na", " yeb", "eye", " adwuma", " no", " yie", " ama", " obi", "ara", " anya", " anig", "ye", "."],
      inflation: 1.3,
      explanation: "ASCII vowels merge into English subwords ('eye', 'ara') causing catastrophic attention drift during generation.",
    },
    byteLevel: {
      bytesCount: 61,
      tokenCount: 61,
      benefit: "Uniform sequence representation without misleading phonetic subword matches.",
    },
  },
  {
    id: "tax-nzema",
    title: "Nzema Low-Resource Evaluation Sample",
    language: "Nzema (Western Region)",
    category: "nzema",
    inputText: "Menli kɔsɔɔti lɛ ndelebɛbo kpalɛ wɔ gyima ne anwo.",
    englishTranslation: "All the people have a good understanding regarding the work.",
    englishTokens: ["All", " the", " people", " have", " a", " good", " understanding", " regarding", " the", " work", "."],
    gpt4o: {
      tokens: ["Men", "li", " k", "\xc9", "\x94", "s", "\xc9", "\x94", "\xc9", "\x94", "ti", " l", "\xc9", "\x9b", " nd", "ele", "b", "\xc9", "\x9b", "bo", " k", "pal", "\xc9", "\x9b", " w", "\xc9", "\x94", " gy", "ima", " ne", " an", "wo", "."],
      inflation: 3.1,
      explanation: "Extreme fragmentation: 33 tokens generated for an 8-word sentence (4.1 tokens/word!). Nzema users pay over 300% more.",
    },
    llama3: {
      tokens: ["Men", "li", " k", "\xc9\x94", "s", "\xc9\x94\xc9\x94", "ti", " l", "\xc9\x9b", " nd", "eleb", "\xc9\x9b", "bo", " kpal", "\xc9\x9b", " w", "\xc9\x94", " gyima", " ne", " anwo", "."],
      inflation: 2.4,
      explanation: "Heavy subword fragmentation across grammatical particles and the progressive marker 'lɛ'.",
    },
    byteLevel: {
      bytesCount: 52,
      tokenCount: 52,
      benefit: "Preserves native morphemic boundary information in low-resource embedding space.",
    },
  },
  {
    id: "tax-pidgin",
    title: "Ghanaian Pidgin (Authentic Register)",
    language: "Ghanaian Pidgin (Accra/Kumasi)",
    category: "pidgin",
    inputText: "Make you no worry, the guy dey come town tomorrow with the goods.",
    englishTranslation: "Don't worry, he is coming to town tomorrow with the goods.",
    englishTokens: ["Don", "'t", " worry", ",", " he", " is", " coming", " to", " town", " tomorrow", " with", " the", " goods", "."],
    gpt4o: {
      tokens: ["Make", " you", " no", " worry", ",", " the", " guy", " dey", " come", " town", " tomorrow", " with", " the", " goods", "."],
      inflation: 1.0,
      explanation: "English-based surface vocabulary achieves 1:1 token efficiency, yet semantic understanding of Pidgin syntax remains distorted.",
    },
    llama3: {
      tokens: ["Make", " you", " no", " worry", ",", " the", " guy", " dey", " come", " town", " tomorrow", " with", " the", " goods", "."],
      inflation: 1.0,
      explanation: "Tokens are compact, but classifiers frequently misattribute authentic Ghanaian phrasing as Nigerian or Wolof.",
    },
    byteLevel: {
      bytesCount: 66,
      tokenCount: 66,
      benefit: "Unbiased cross-lingual transfer across West African creoles and contact varieties.",
    },
  },
];

export interface TonalMinimalPair {
  word: string;
  toneMelody: string; // e.g. "HH", "LL", "LH", "HL"
  gloss: string;
  ipa: string;
  pitchCurve: number[]; // Normalized pitch sequence 0.0 - 1.0
  description: string;
}

export const tonalMinimalPairs: TonalMinimalPair[] = [
  {
    word: "pápá",
    toneMelody: "High - High (HH)",
    gloss: "Goodness / Virtuous / Good",
    ipa: "[pápá]",
    pitchCurve: [0.85, 0.86, 0.88, 0.87],
    description: "Sustained high terraced tone across both syllables. Indicates quality, goodness, or perfection.",
  },
  {
    word: "pàpà",
    toneMelody: "Low - Low (LL)",
    gloss: "Hand fan (woven palm frond fan)",
    ipa: "[pàpà]",
    pitchCurve: [0.25, 0.24, 0.22, 0.23],
    description: "Sustained low tone register across both syllables. Distinct lexical noun referring to a fan.",
  },
  {
    word: "pàpá",
    toneMelody: "Low - High (LH)",
    gloss: "Father / Elder male",
    ipa: "[pàpá]",
    pitchCurve: [0.28, 0.32, 0.78, 0.85],
    description: "Rising pitch trajectory: commences in low register on first syllable and sharply ascends to high tone on coda.",
  },
  {
    word: "dádá",
    toneMelody: "High - High (HH)",
    gloss: "Old / Antique / Ancient",
    ipa: "[dádá]",
    pitchCurve: [0.82, 0.84, 0.85, 0.83],
    description: "High tone stative adjective denoting age of objects.",
  },
  {
    word: "dàdà",
    toneMelody: "Low - Low (LL)",
    gloss: "Long ago / Already / Formerly",
    ipa: "[dàdà]",
    pitchCurve: [0.28, 0.26, 0.24, 0.22],
    description: "Low tone temporal adverb denoting prior completed event state.",
  },
];

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
