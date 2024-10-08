export interface Daily {
  name: string;
  text: string;
  location: string;
  completed: boolean;
  selected: boolean;
}

export interface Boss {
  name: string;
  text: string;
  completed: boolean;
  selected: boolean;
}

export const initialWeeklyBosses = [
  { selected: true, name: "czak", completed: false, text: "Chaos Zak" },
  { selected: true, name: "hmag", completed: false, text: "H Magnus" },
  { selected: true, name: "ncyg", completed: false, text: "Cygnus" },
  { selected: true, name: "cpap", completed: false, text: "Chaos Papalatus" },
  { selected: true, name: "cpb", completed: false, text: "Chaos Pink Bean" },
  { selected: true, name: "cvonbon", completed: false, text: "Chaos Von bon" },
  { selected: true, name: "cpierre", completed: false, text: "Chaos Pierre" },
  { selected: true, name: "cqueen", completed: false, text: "Chaos Crimson Queen" },
  { selected: true, name: "cvel", completed: false, text: "Chaos Vellum" },
  { selected: true, name: "pno", completed: false, text: "Princess No" },
  { selected: true, name: "aketchi", completed: false, text: "Aketchi Mitsuhide" },
  { selected: true, name: "lotus", completed: false, text: "Lotus" },
  { selected: true, name: "damien", completed: false, text: "Damien" },
  { selected: true, name: "slime", completed: false, text: "Angel Slime" },
  { selected: true, name: "lucid", completed: false, text: "Lucid" },
  { selected: true, name: "will", completed: false, text: "Will" },
  { selected: true, name: "gloom", completed: false, text: "Gloom" },
  { selected: true, name: "vhilla", completed: false, text: "Verus Hilla" },
  { selected: true, name: "darknell", completed: false, text: "Darknell" },
  { selected: true, name: "seren", completed: false, text: "Seren" },
  { selected: true, name: "kalos", completed: false, text: "Kalos" },
  { selected: true, name: "kaling", completed: false, text: "Kaling" },
];

export const initialDailies = [
  { selected: true, name: "vj", text: "VJ", completed: false, location: "arcane-river" },
  { selected: true, name: "chuchu", text: "ChuChu", completed: false, location: "arcane-river" },
  { selected: true, name: "lachlein", text: "Lachlein", completed: false, location: "arcane-river" },
  { selected: true, name: "arcana", text: "Arcana", completed: false, location: "arcane-river" },
  { selected: true, name: "morass", text: "Morass", completed: false, location: "arcane-river" },
  { selected: true, name: "esfera", text: "Esfera", completed: false, location: "arcane-river" },
  { selected: true, name: "cernium", text: "Cernium", completed: false, location: "grandis" },
  { selected: true, name: "burnium", text: "Burnium", completed: false, location: "grandis" },
  { selected: true, name: "hotel", text: "Hotel Arcus", completed: false, location: "grandis" },
  { selected: true, name: "odium", text: "Odium", completed: false, location: "grandis" },
  { selected: true, name: "shangrila", text: "Shangri La", completed: false, location: "grandis" },
  { selected: true, name: "arteria", text: "Arteria", completed: false, location: "grandis" },
  { selected: true, name: "carcion", text: "Carcion", completed: false, location: "grandis" },
  { selected: true, name: "amoria", text: "Amoria", completed: false, location: "pq" },
];
