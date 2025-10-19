/*
Imperium
  Adepta Sororitas
  Adeptus Custodes
  Adeptus Mechanicus
  Astra Militarum
  Grey Knights
  Imperial Agents
  Imperial Knights

Space Marines
  Black Templars
  Blood Angels
  Dark Angels
  Deathwatch
  Imperial Fists (no codex)
  Iron Hands (no codex)
  Raven Guard (no codex)
  Salamanders (no codex)
  Space Marines
  Space Wolves
  Ultramarines (no codex)
  White Scars (no codex)

Chaos
  Chaos Space Marines
  Death Guard
  Emperor's Children
  Thousand Sons
  World Eaters
  Chaos Daemons
  Chaos Knights

Xenos
  Aeldari
  Drukhari
  Genestealer Cults
  Leagues of Votann
  Necrons
  Orks
  Tyranids
  T'au Empire
*/

export const ARMIES = {
  "Adepta Sororitas": {
    "characters": [
      { name: "Aestred Thurga and Agathae Dolan", modelCount: 2 },
      { name: "Canoness", modelCount: 1 },
      { name: "Canoness with Jump Pack", modelCount: 1 },
      { name: "Daemonifuge", modelCount: 2 },
      { name: "Dialogus", modelCount: 1 },
      { name: "Dogmata", modelCount: 1 },
      { name: "Hospitaller", modelCount: 1 },
      { name: "Imagifier", modelCount: 1 },
      { name: "Junith Eruita", modelCount: 1 },
      { name: "Ministorum Priest", modelCount: 1, tags: ["Penitent"] },
      { name: "Morvenn Vahl", modelCount: 1 },
      { name: "Palatine", modelCount: 1 },
      { name: "Saint Celestine", modelCount: 3 },
      { name: "Triumph of Saint Katherine", modelCount: 1 },
    ],
    "battleline": [
      { name: "Battle Sisters Squad", modelCount: 10 },
    ],
    "otherUnits": [
      {
        name: "Arco-flagellants",
        modelCount: [3, 10],
        tags: ["Penitent"],
        unitOptions: {
          unitSize: [3, 10],
        }
      },
      { name: "Castigator", modelCount: 1 },
      {
        name: "Celestian Sacresants",
        modelCount: [5, 10],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Dominion Squad", modelCount: 10 },
      { name: "Exorcist", modelCount: 1 },
      { name: "Immolator", modelCount: 1 },
      {
        name: "Mortifiers",
        modelCount: [1, 2],
        tags: ["Penitent"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      { name: "Paragon Warsuits", modelCount: 3 },
      {
        name: "Penitent Engines",
        modelCount: [1, 2],
        tags: ["Penitent"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "Repentia Squad",
        modelCount: [5, 10],
        tags: ["Penitent"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Retributor Squad", modelCount: 5 },
      { name: "Sanctifiers", modelCount: 9 },
      {
        name: "Seraphim Squad",
        modelCount: [5, 10],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Sisters Novitiate Squad", modelCount: 10 },
      { name: "Sororitas Rhino", modelCount: 1 },
      {
        name: "Zephyrim Squad",
        modelCount: [5, 10],
        unitOptions: {
          unitSize: [5, 10],
        }
      }
    ],
    "enhancements": {
      "Army of Faith": [
        {
          name: "Blade of Saint Ellynor",
        },
        {
          name: "Divine Aspect",
        },
        {
          name: "Litanies of Faith",
          tags: ["Canoness", "Palatine"],
        },
        {
          name: "Triptych of the Macharian Crusade",
        },
      ],
      "Bringers of Flame": [
        {
          name: "Fire and Fury",
        },
        {
          name: "Iron Surplice of Saint Istalela",
          tags: ["Canoness", "Palatine"],
        },
        {
          name: "Manual of Saint Griselda",
        },
        {
          name: "Righteous Rage",
        },
      ],
      "Champions of Faith": [
        {
          name: "Eyes of the Oracle",
        },
        {
          name: "Mark of Devotion",
        },
        {
          name: "Sanctified Amulet",
        },
        {
          name: "Triptych of Judgement",
        },
      ],
      "Hallowed Martyrs": [
        {
          name: "Chaplet of Sacrifice",
        },
        {
          name: "Mantle of Ophelia",
          tags: ["Canoness", "Palatine"],
        },
        {
          name: "Saintly Example",
        },
        {
          name: "Through Suffering, Strength",
        },
      ],
      "Penitent Host": [
        {
          name: "Catechism of Divine Penitence",
          tags: ["Canoness", "Palatine", "Ministorum Priest"]
        },
        {
          name: "Psalm of Righteous Judgement",
        },
        {
          name: "Refrain of Enduring Faith",
          tags: ["Penitent"]
        },
        {
          name: "Verse of Holy Piety",
          tags: ["Penitent"],
        },
      ],
    }
  },

  "Adeptus Custodes": {
    "characters": [
      { name: "Aleya", points: 65, modelCount: 1 },
      { name: "Blade Champion", points: 120, modelCount: 1 },
      { name: "Knight-Centura", points: 55, modelCount: 1 },
      { name: "Shield-Captain", points: 130, modelCount: 1 },
      { name: "Shield-Captain in Allarus Terminator Armour", points: 130, modelCount: 1 },
      { name: "Shield-Captain on Dawneagle Jetbike", points: 150, modelCount: 1 },
      { name: "Trajann Valoris", points: 140, modelCount: 1 },
      { name: "Valerian", points: 110, modelCount: 1 },
    ],
    "battleline": [
      { name: "Custodian Guard (x4)", points: 170, modelCount: 4 },
      { name: "Custodian Guard (x5)", points: 215, modelCount: 5 },
    ],
    "otherUnits": [
      { name: "Agamatus Custodians (x3)", points: 225 },
      { name: "Agamatus Custodians (x6)", points: 450 },
      { name: "Allarus Custodians (x2)", points: 130 },
      { name: "Allarus Custodians (x3)", points: 195 },
      { name: "Allarus Custodians (x5)", points: 325 },
      { name: "Allarus Custodians (x6)", points: 390 },
      { name: "Anathema Psykana Rhino", points: 75 },
      { name: "Aquilon Custodians (x3)", points: 195 },
      { name: "Aquilon Custodians (x6)", points: 390 },
      { name: "Ares Gunship", points: 580 },
      { name: "Caladius Grav-tank", points: 215 },
      { name: "Contemptor-Achillus Dreadnought", points: 155 },
      { name: "Contemptor-Galatus Dreadnought", points: 165 },
      { name: "Coronus Grav-carrier", points: 200 },
      { name: "Custodian Guard with Adrasite and Pyrithite Spears", points: 250, modelCount: 5 },
      { name: "Custodian Wardens (x4)", points: 210 },
      { name: "Custodian Wardens (x5)", points: 260 },
      { name: "Orion Assault Dropship", points: 690 },
      { name: "Pallas Grav-attack", points: 105 },
      { name: "Prosecutors (x4)", points: 40 },
      { name: "Prosecutors (x5)", points: 50 },
      { name: "Prosecutors (x9)", points: 90 },
      { name: "Prosecutors (x10)", points: 100 },
      { name: "Sagittarum Custodians", points: 225, modelCount: 5 },
      { name: "Telemon Heavy Dreadnought", points: 225 },
      { name: "Venerable Contemptor Dreadnought", points: 170 },
      { name: "Venerable Land Raider", points: 240 },
      { name: "Venatari Custodians (x3)", points: 165 },
      { name: "Venatari Custodians (x6)", points: 330 },
      { name: "Vertus Praetors (x2)", points: 150 },
      { name: "Vertus Praetors (x3)", points: 225 },
      { name: "Vigilators (x4)", points: 50 },
      { name: "Vigilators (x5)", points: 65 },
      { name: "Vigilators (x9)", points: 115 },
      { name: "Vigilators (x10)", points: 125 },
      { name: "Witchseekers (x4)", points: 50 },
      { name: "Witchseekers (x5)", points: 65 },
      { name: "Witchseekers (x9)", points: 115 },
      { name: "Witchseekers (x10)", points: 125 },
    ],
    "enhancements": {
      "Auric Champions": {
        "Blade Imperator": 25,
        "Inspirational Exemplar": 10,
        "Martial Philosopher": 30,
        "Veiled Blade": 25
      },
      "Lions of the Emperor": {
        "Admonimortis": 10,
        "Fierce Conqueror": 15,
        "Praesidius": 25,
        "Superior Creation": 25
      },
      "Null Maiden Vigil": {
        "Enhanced Voidsheen Cloak": 10,
        "Huntress' Eye": 15,
        "Oblivion Knigh": 25,
        "Raptor Blade": 5
      },
      "Shield Host": {
        "Auric Mantle": 15,
        "Castellan's Mark": 20,
        "From the Hall of Armouries": 25,
        "Panoptispex": 5
      },
      "Solar Spearhead": {
        "Adamantine Talisman": 25,
        "Augury Uplink": 35,
        "Honoured Fallen": 15,
        "Veteran of the Kataphraktoi": 10
      },
      "Talons of the Emperor": {
        "Aegis Projector": 20,
        "Champion of the Imperium": 25,
        "Gift of Terran Artifice": 15,
        "Radiant Mantle": 30
      }
    }
  },

  "Adeptus Mechanicus": {
    "models": {
      "Archaeopter Fusilave": 160,
      "Archaeopter Stratoraptor": 185,
      "Archaeopter Transvector": 150,
      "Belisarius Cawl": 135,
      "Corpuscarii Electro-Priests": {
        "5x": 65,
        "10x": 130
      },
      "Cybernetica Datasmith": 35,
      "Fulgurite Electro-Priests": {
        "5x": 70,
        "10x": 140
      },
      "Ironstrider Ballistarii": {
        "1x": 75,
        "2x": 150,
        "3x": 225
      },
      "Kastelan Robots": {
        "2x": 180,
        "4x": 360
      },
      "Kataphron Breachers": {
        "3x": 160,
        "6x": 320
      },
      "Kataphron Destroyers": {
        "3x": 105,
        "6x": 210
      },
      "Onager Dunecrawler": 155,
      "Pteraxii Skystalkers": {
        "5x": 70,
        "10x": 140
      },
      "Pteraxii Sterylizors": {
        "5x": 80,
        "10x": 160
      },
      "Serberys Raiders": {
        "3x": 60,
        "6x": 120
      },
      "Serberys Sulphurhounds": {
        "3x": 55,
        "6x": 110
      },
      "Sicarian Infiltrators": {
        "5x": 70,
        "10x": 140
      },
      "Sicarian Ruststalkers": {
        "5x": 75,
        "10x": 150
      },
      "Skitarii Marshal": 35,
      "Skitarii Rangers": {
        "10x": 85
      },
      "Skitarii Vanguard": {
        "10x": 95
      },
      "Skorpius Disintegrator": 175,
      "Skorpius Dunerider": 85,
      "Sydonian Dragoons with Radium Jezzails": {
        "1x": 55,
        "2x": 100,
        "3x": 150
      },
      "Sydonian Dragoons with Taser Lances": {
        "1x": 70,
        "2x": 140,
        "3x": 210
      },
      "Sydonian Skatros": 50,
      "Tech-Priest Dominus": 65,
      "Tech-Priest Enginseer": 55,
      "Tech-Priest Manipulus": 60,
      "Technoarcheologist": 45
    },
    "enhancements": {
      "Cohort Cybernetica": {
        "Arch-negator": 10,
        "Emotionless Clarity": 15,
        "Lord of Machines": 20,
        "Necromechanic": 25
      },
      "Data-psalm Conclave": {
        "Data-blessed Autosermon": 20,
        "Mantle of the Gnosticarch": 15,
        "Mechanicus Locum": 10,
        "Temporcopia": 25
      },
      "Explorator Maniple": {
        "Artisan": 15,
        "Genetor": 25,
        "Logis": 20,
        "Magos": 15
      },
      "Haloscreed Battle Clade": {
        "Cognitive Reinforcement": 35,
        "Inloaded Lethality": 15,
        "Sanctified Ordnance": 10,
        "Transoracular Dyad Wafer": 30
      },
      "Rad-zone Corps": {
        "Autoclavic Denunciation": 15,
        "Malphonic Susurrus": 20,
        "Peerless Eradicator": 20,
        "Radial Suffusion": 25
      },
      "Skitarii Hunter Cohort": {
        "Battle-sphere Uplink": 30,
        "Cantic Thrallnet": 25,
        "Clandestine Infiltrator": 20,
        "Veiled Hunter": 10
      }
    }
  },

  "Aeldari": {
    /*
    Other
      Corsair Voidscarred
      Crimson Hunter
      D-cannon Platform
      Dark Reapers
      Dire Avengers
      Falcon
      Fire Dragons
      Fire Prism
      Hemlock Wraithfighter
      Howling Banshees
      Night Spinner
      Rangers
      Shadow Weaver Platform
      Shining Spears
      Shroud Runners
      Skyweavers
      Striking Scorpions
      Swooping Hawks
      Troupe
      Vibro Cannon Platform
      Voidweaver
      Vypers
      War Walkers
      Warlock Conclave
      Warlock Skyrunners
      Warp Spiders
      Windriders
      Wraithblades
      Wraithguard
      Wraithknight
      Wraithknight with Ghostglaive
      Wraithlord
      Ynnari Incubi
      Ynnari Reavers
    */
    "characters": [
      { name: "Asurmen", points: 135 },
      { name: "Autarch", points: 85 },
      { name: "Autarch Wayleaper", points: 80 },
      { name: "Avatar of Khaine", points: 300 },
      { name: "Baharroth", points: 115 },
      { name: "Death Jester", points: 90 },
      { name: "Eldrad Ulthran", points: 110 },
      { name: "Farseer", points: 70 },
      { name: "Farseer Skyrunner", points: 80 },
      { name: "Fuegan", points: 120 },
      { name: "Jain Zar", points: 105 },
      { name: "Lhykhis", points: 120 },
      { name: "Maugan Ra", points: 100 },
      { name: "Shadowseer", points: 60 },
      { name: "Solitaire", points: 115 },
      { name: "Spiritseer", points: 65 },
      { name: "The Visarch", points: 90 },
      { name: "The Yncarne", points: 260 },
      { name: "Troupe Master", points: 75 },
      { name: "Warlock", points: 45 },
      { name: "Ynnari Archon", points: 85 },
      { name: "Ynnari Succubus", points: 45 },
      { name: "Yvraine", points: 100 },
    ],
    "battleline": [
      { name: "Corsair Voidreavers (x5)", points: 60, modelCount: 5 },
      { name: "Corsair Voidreavers (x10)", points: 120, modelCount: 10 },
      { name: "Corsair Voidscarred (x5)", points: 80, modelCount: 5 },
      { name: "Corsair Voidscarred (x10)", points: 160, modelCount: 10 },
      { name: "Guardian Defenders (x11)", points: 100, modelCount: 11 },
      { name: "Storm Guardians (x11)", points: 100, modelCount: 11 },
      { name: "Ynnari Kabalite Warriors (x10)", points: 110, modelCount: 10 },
      { name: "Ynnari Wyches (x10)", points: 90, modelCount: 10 },
    ],
    "otherUnits": [
      { name: "Crimson Hunter", points: 160 },
      { name: "D-cannon Platform", points: 125 },
      { name: "Dark Reapers (x5)", points: 90, modelCount: 5 },
      { name: "Dark Reapers (x10)", points: 195, modelCount: 10 },
      { name: "Dire Avengers (x5)", points: 80, modelCount: 5 },
      { name: "Dire Avengers (x10)", points: 160, modelCount: 10 },
      { name: "Falcon", points: 130 },
      { name: "Fire Dragons (x5)", points: 120, modelCount: 5 },
      { name: "Fire Dragons (x10)", points: 220, modelCount: 10 },
      { name: "Fire Prism", points: 150 },
      { name: "Hemlock Wraithfighter", points: 155 },
      { name: "Howling Banshees (x5)", points: 95, modelCount: 5 },
      { name: "Howling Banshees (x10)", points: 190, modelCount: 10 },
      { name: "Night Spinner", points: 190 },
      { name: "Rangers (x5)", points: 55, modelCount: 5 },
      { name: "Rangers (x10)", points: 110, modelCount: 10 },
      { name: "Shadow Weaver Platform", points: 75 },
      { name: "Shining Spears (x3)", points: 110, modelCount: 3 },
      { name: "Shining Spears (x6)", points: 220, modelCount: 6 },
      { name: "Shroud Runners (x3)", points: 80, modelCount: 3 },
      { name: "Shroud Runners (x6)", points: 160, modelCount: 6 },
      { name: "Skyweavers (x2)", points: 95, modelCount: 2 },
      { name: "Skyweavers (x4)", points: 190, modelCount: 4 },
      { name: "Starweaver", points: 80 },
      { name: "Storm Guardians (x11)", points: 100, modelCount: 11 },
      { name: "Striking Scorpions (x5)", points: 85, modelCount: 5 },
      { name: "Striking Scorpions (x10)", points: 150, modelCount: 10 },
      { name: "Swooping Hawks (x5)", points: 85, modelCount: 5 },
      { name: "Swooping Hawks (x10)", points: 170, modelCount: 10 },
      { name: "Troupe (x5)", points: 85, modelCount: 5 },
      { name: "Troupe (x6)", points: 100, modelCount: 6 },
      { name: "Troupe (x11)", points: 190, modelCount: 11 },
      { name: "Troupe (x12)", points: 205, modelCount: 12 },
      { name: "Troupe Master", points: 75 },
      { name: "Vibro Cannon Platform", points: 60 },
      { name: "Voidweaver", points: 125 },
      { name: "Vyper", points: 65 },
      { name: "War Walker", points: 85 },
      { name: "Warlock", points: 45 },
      { name: "Warlock Conclave (x2)", points: 55, modelCount: 2 },
      { name: "Warlock Conclave (x4)", points: 130, modelCount: 4 },
      { name: "Warlock Skyrunners (x1)", points: 45, modelCount: 1 },
      { name: "Warlock Skyrunners (x2)", points: 90, modelCount: 2 },
      { name: "Warp Spiders (x5)", points: 95, modelCount: 5 },
      { name: "Warp Spiders (x10)", points: 190, modelCount: 10 },
      { name: "Wave Serpent", points: 125 },
      { name: "Windriders (x3)", points: 80, modelCount: 3 },
      { name: "Windriders (x6)", points: 160, modelCount: 6 },
      { name: "Wraithblades (x5)", points: 170, modelCount: 5 },
      { name: "Wraithguard (x5)", points: 170, modelCount: 5 },
      { name: "Wraithknight", points: 435 },
      { name: "Wraithknight with Ghostglaive", points: 420 },
      { name: "Wraithlord", points: 140 },
      { name: "Ynnari Incubi (x5)", points: 85, modelCount: 5 },
      { name: "Ynnari Incubi (x10)", points: 170, modelCount: 10 },
      { name: "Ynnari Raider", points: 80 },
      { name: "Ynnari Reavers (x3)", points: 65, modelCount: 3 },
      { name: "Ynnari Reavers (x6)", points: 120, modelCount: 6 },
      { name: "Ynnari Venom", points: 70 },
    ],
    "enhancements": {
      "Armoured Warhost": {
        "Guiding Presence": 25,
        "Guileful Strategist": 15,
        "Harmonisation Matrix": 30,
        "Spirit Stone of Raelyth": 20
      },
      "Aspect Host": {
        "Aspect of Murder": 25,
        "Mantle of Wisdom": 30,
        "Shimmerstone": 15,
        "Strategic Savant": 15
      },
      "Devoted of Ynnead": {
        "Borrowed Vigour": 10,
        "Gaze of Ynnead": 15,
        "Morbid Might": 15,
        "Storm of Whispers": 10
      },
      "Ghosts of the Webway": {
        "Cegorach’s Coil": 25,
        "Mask of Secrets": 15,
        "Mistweave": 15,
        "Murder’s Jest": 20
      },
      "Guardian Battlehost": {
        "Breath of Vaul": 10,
        "Craftworld’s Champion": 25,
        "Ethereal Pathway": 30,
        "Protector of the Paths": 20
      },
      "Seer Council": {
        "Lucid Eye": 30,
        "Runes of Warding": 25,
        "Stone of Eldritch Fury": 15,
        "Torc of Morai-Heg": 20
      },
      "Spirit Conclave": {
        "Higher Duty": 25,
        "Light of Clarity": 30,
        "Rune of Mists": 10,
        "Stave of Kurnous": 15
      },
      "Warhost": {
        "Gift of Foresight": 15,
        "Phoenix Gem": 35,
        "Psychic Destroyer": 30,
        "Timeless Strategist": 15
      },
      "Windrider Host": {
        "Echoes of Ulthanesh": 20,
        "Firstdrawn Blade": 10,
        "Mirage Field": 25,
        "Seersight Strike": 15
      },
    }
  },

  "Astra Militarum": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Black Templars": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more BLACK TEMPLARS units, it cannot include any ADEPTUS ASTARTES PSYKER models, and cannot include any of the following models that do not have the Black Templars keyword: GLADIATOR LANCER; GLADIATOR REAPER; GLADIATOR VALIANT; IMPULSOR; REPULSOR; REPULSOR EXECUTIONER.
      */
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Blood Angels": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more DEATHWATCH units, it cannot include any of the following units: DEVASTATOR SQUAD; SCOUT SQUAD; TACTICAL SQUAD.
      */
    },
    "characters": [
      { name: "Astorath", points: 105, tags: ["epic"] },
      { name: "Blood Angels Captain", points: 80 },
      { name: "Chief Librarian Mephiston", points: 135, tags: ["epic"] },
      { name: "Commander Dante", points: 130, tags: ["epic"] },
      { name: "Death Company Captain", points: 70 },
      { name: "Death Company Captain with Jump Pack", points: 75 },
      { name: "Lemartes", points: 110, tags: ["epic"] },
      { name: "Sanguinary Priest", points: 90 },
      { name: "The Sanguinor", points: 140, tags: ["epic"] }
    ],
    "battleline": [
      {
        name: "Death Company Marines",
        modelCount: [5, 10],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Death Company Marines with Bolt Rifles",
        modelCount: [5, 10],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Death Company Marines with Jump Packs",
        modelCount: [5, 10],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Sanguinary Guard",
        modelCount: [3, 6],
        unitOptions: { unitSize: [3, 6] }
      }
    ],
    "otherUnits": [
      {
        name: "Baal Predator",
        points: 135
      },
      {
        name: "Death Company Dreadnought",
        points: 180
      }
    ],
    "enhancements": {
      "Angelic Inheritors": [
        { name: "Blazing Icon" },
        { name: "Ordained Sacrifice" },
        { name: "Prescient Flash" },
        { name: "Troubling Visions" }
      ],
      "Liberator Assault Group": [
        { name: "Gift of Foresight" },
        { name: "Icon of the Angel" },
        { name: "Rage-fuelled Warrior" },
        { name: "Speed of the Primarch" }
      ],
      "The Angelic Host": [
        { name: "Archangel's Shard" },
        { name: "Artisan of War" },
        { name: "Gleaming Pinions" },
        { name: "Visage of Death" }
      ],
      "The Lost Brethren": [
        { name: "Blood Shard" },
        { name: "Sanguinius' Grace" },
        { name: "To Slay the Warmaster" },
        { name: "Vengeful Onslaught" }
      ]
    }
  },

  "Chaos Daemons": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Chaos Knights": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Chaos Space Marines": {

      /*
      Abaddon the Despoiler / 280
      Accursed Cultists / 8-90 | 16-195
      Chaos Bikers / 3-70 | 6-130
      Chaos Land Raider / 240
      Chaos Lord / 90
      Chaos Lord in Terminator Armour / 95
      Chaos Lord with Jump Pack / 80
      Chaos Predator Annihilator / 135
      Chaos Predator Destructor / 140
      Chaos Rhino / 75
      Chaos Spawn / 2-70
      Chaos Terminator Squad / 5-180 | 10-360
      Chaos Vindicator / 185
      Chosen / 5-125 | 10-250
      Cultist Firebrand / 1-45
      Cultist Mob / 10-50 | 20-100
      Cypher / 1-90
      Dark Apostle / 3-65
      Dark Commune / 5-80
      Defiler / 190
      Fabius Bile / 2-85
      Fellgor Beastmen / 10-70
      Forgefiend / 180
      Haarken Worldclaimer / 1-90
      Havocs / 5-125
      Helbrute / 130
      Heldrake / 205
      Heretic Astartes Daemon Prince / 165
      Heretic Astartes Daemon Prince with Wings / 180
      Huron Blackheart / 80
      Khorne Lord of Skulls / 450
      Legionaries / 5-90 | 10-170
      Lord Discordant on Helstalker / 160
      Master of Executions / 80
      Master of Possession / 60
      Maulerfiend / 130
      Nemesis Claw / 5-110 | 10-190
      Noctilith Crown / 125
      Obliterators / 2-160
      Possessed / 5-120 | 10-240
      Raptors / 5-90 | 10-170
      Sorcerer / 60
      Sorcerer in Terminator Armour / 80
      Traitor Enforcer / 2-55
      Traitor Guardsmen Squad / 10-70
      Vashtorr the Arkifane / 175
      Venomcrawler / 120
      Warp Talons / 5-125 | 10-270
      Warpsmith / 70
      */
    "characters": [
      { name: "Abaddon the Despoiler", tags: ["epic"] },
      { name: "Chaos Lord" },
      { name: "Chaos Lord In Terminator Armour" },
      { name: "Chaos Lord with Jump Pack" },
      { name: "Cultist Firebrand" },
      { name: "Cypher", tags: ["epic", "fallen"] },
      { name: "Dark Apostle" },
      { name: "Dark Commune" },
      { name: "Fabius Bile", tags: ["epic"] },
      { name: "Haarken Worldclaimer", tags: ["epic"] },
      { name: "Heretic Astartes Daemon Prince" },
      { name: "Heretic Astartes Daemon Prince With Wings" },
      { name: "Huron Blackheart", tags: ["epic"] },
      { name: "Lord Discordant On Helstalker" },
      { name: "Master of Executions" },
      { name: "Master of Possession" },
      { name: "Sorcerer" },
      { name: "Sorcerer In Terminator Armour" },
      { name: "Traitor Enforcer" },
      { name: "Vashtorr The Arkifane", tags: ["epic"] },
      { name: "Warpsmith" },
    ],
    "battleline": [
      { name: "Cultist Mob", unitOptions: { unitSize: [8, 16] } },
      { name: "Legionaries", unitOptions: { unitSize: [5, 10] } },
      { name: "Traitor Guardsmen Squad", unitOptions: { unitSize: [5, 10] } },
      // { name: "Khorne Berzerkers", unitOptions: { unitSize: [5, 10] } },
      // { name: "Plague Marines", unitOptions: { unitSize: [5, 10] } },
      // { name: "Rubric Marines", unitOptions: { unitSize: [5, 10] } },
    ],
    "otherUnits": [
      { name: "Accursed Cultists", unitOptions: { unitSize: [8, 16] } },
      { name: "Chaos Bikers", unitOptions: { unitSize: [3, 6] } },
      { name: "Chaos Land Raider" },
      { name: "Chaos Predator Annihilator" },
      { name: "Chaos Predator Destructor" },
      { name: "Chaos Rhino" },
      { name: "Chaos Spawn" },
      { name: "Chaos Terminator Squad" },
      { name: "Chaos Vindicator" },
      { name: "Chosen" },
      { name: "Defiler" },
      { name: "Fellgor Beastmen" },
      { name: "Forgefiend" },
      { name: "Havocs" },
      { name: "Helbrute" },
      { name: "Heldrake" },
      { name: "Khorne Lord Of Skulls" },
      { name: "Maulerfiend" },
      { name: "Nemesis Claw" },
      { name: "Obliterators" },
      { name: "Possessed" },
      { name: "Raptors" },
      { name: "Venomcrawler" },
      { name: "Warp Talons" },
      // { name: "Noise Marines", unitOptions: { unitSize: [5, 10] } },
    ],
    "enhancements": {
      "Disciples of the Dark Gods": {
        "Dark Pact": 15,
        "Infernal Tactics": 20,
        "Rites of Chaos": 25
      },
      "Legion Traits": {
        "Black Legion": 15,
        "World Eaters": 20,
        "Death Guard": 25,
        "Thousand Sons": 25
      },
    }
  },

  "Dark Angels": {
    "chapterInfo": {
      parentFaction: "Space Marines",
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Death Guard": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Deathwatch": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more DEATHWATCH units, it cannot include any of the following units: DEVASTATOR SQUAD; SCOUT SQUAD; TACTICAL SQUAD.
      */
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Drukhari": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Emperor's Children": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Genestealer Cults": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Grey Knights": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Imperial Agents": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Imperial Knights": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Leagues of Votann": {
    "characters": [
      { name: "Arkanyst Evaluator", points: 75 },
      { name: "Brôkhyr Iron-master", points: 75 },
      { name: "Buri Aegnirssen", points: 110, tags: ["epic"] },
      { name: "Einhyr Champion", points: 70 },
      { name: "Grimnyr", points: 65 },
      { name: "Kâhl", points: 70 },
      { name: "Memnyr Strategist", points: 45 },
      { name: "Ûthar the Destined", points: 95, tags: ["epic"] }
    ],
    "battleline": [
      {
        name: "Hearthkyn Warriors",
        modelCount: 10,
        points: 100
      },
    ],
    "otherUnits": [
      {
        name: "Brôkhyr Thunderkyn",
        modelCount: [3, 6],
        points: [80, 160],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Cthonian Beserks",
        modelCount: [5, 10],
        points: [100, 200],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Cthonian Earthshakers",
        points: 110,
        modelCount: 2
      },
      {
        name: "Einhyr Hearthguard",
        modelCount: [5, 10],
        points: [135, 270],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Hekaton Land Fortress",
        points: 240,
      },
      {
        name: "Hernkyn Pioneers",
        modelCount: [3, 6],
        points: [80, 160],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Hernkyn Yaegirs",
        points: 90,
        modelCount: 10
      },
      {
        name: "Ironkin Steeljacks w/ Melee Weapons",
        modelCount: [3, 6],
        points: [90, 180],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Ironkin Steeljacks w/ Volkanite Disintegrators",
        modelCount: [3, 6],
        points: [90, 180],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Kapricus Carrier",
        points: 75,
      },
      {
        name: "Kapricus Defender",
        modelCount: [1, 2],
        points: [70, 140],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "Sagitaur",
        points: 95,
      },
    ],
    "enhancements": {
      "Brandfast Oathband": [
        {
          name: "Precursive Judgement",
          points: 15,
        },
        {
          name: "Signature Restoration",
          points: 5,
        },
        {
          name: "Tactical Alchemy",
          points: 10,
        },
        {
          name: "Trivärg Cyber Implant",
          points: 30,
        },
      ],
      "Dêlve Assault Shift": [
        {
          name: "Dêlvwerke Navigator",
          points: 25,
        },
        {
          name: "Multiwave System Jammer",
          points: 10,
        },
        {
          name: "Piledriver",
          points: 15,
        },
        {
          name: "Quake Supervisor",
          points: 20,
        },
      ],
      "Hearthband": [
        {
          name: "Bastion Shield",
          points: 25,
        },
        {
          name: "High Kâhl",
          points: 30,
          tags: ["Kâhl"],
        },
        {
          name: "Ironskein",
          points: 10,
        },
        {
          name: "Quake Multigenerator",
          points: 15,
          tags: ["Kâhl"],
        },
      ],
      "Hearthfyre Arsenal": [
        {
          name: "Calculated Tenacity",
          points: 15,
          tags: ["Brôkhyr Iron-master", "Memnyr Strategist"],
        },
        {
          name: "Fârstrydr Node",
          points: 20,
          tags: ["Brôkhyr Iron-master", "Memnyr Strategist"],
        },
        {
          name: "Graviton Vault",
          points: 5,
          tags: ["Brôkhyr Iron-master"],
        },
        {
          name: "Mantle of Elders",
          points: 10,
          tags: ["Memnyr Strategist"],
        },
      ],
      "Needgaârd Oathband": [
        {
          name: "Ancestral Crest",
          points: 15,
        },
        {
          name: "Dead Reckoning",
          points: 10,
        },
        {
          name: "Iron Ambassador",
          points: 5,
        },
        {
          name: "Oathbound Speculator",
          points: 30,
        },
      ],
      "Persecution Prospect": [
        {
          name: "Eye for Weakness",
          points: 25,
        },
        {
          name: "Nomad Strategist",
          points: 20,
        },
        {
          name: "Surgical Saboteur",
          points: 10,
        },
        {
          name: "Writ of Acquisition",
          points: 10,
        },
      ],
    }
  },

  "Necrons": {
    "models": {
      "Annihilation Barge": 105,
      "C'tan Shard of the Deceiver": 265,
      "C'tan Shard of the Nightbringer": 305,
      "C'tan Shard of the Void Dragon": 300,
      "Canoptek Doomstalker": 145,
      "Canoptek Reanimator": 75,
      "Canoptek Scarab Swarms": {
        "3x": 40,
        "6x": 80
      },
      "Canoptek Spyders": {
        "1 model": 75,
        "2x": 150
      },
      "Catacomb Command Barge": 120,
      "Chronomancer": 65,
      "Cryptothralls": {
        "2x": 60
      },
      "Deathmarks": {
        "5x": 65,
        "10x": 130
      },
      "Doom Scythe": 230,
      "Doomsday Ark": 200,
      "Flayed Ones": {
        "5x": 60,
        "10x": 120
      },
      "Ghost Ark": 115,
      "Hexmark Destroyer": 75,
      "Illuminor Szeras": 175,
      "Immortals": {
        "5x": 70,
        "10x": 150
      },
      "Imotekh the Stormlord": 100,
      "Lokhust Destroyers": {
        "1 model": 35,
        "2x": 60,
        "3x": 90,
        "6x": 180
      },
      "Lokhust Heavy Destroyers": {
        "1 model": 55,
        "2x": 110,
        "3x": 165
      },
      "Lokhust Lord": 80,
      "Lychguard": {
        "5x": 85,
        "10x": 170
      },
      "Monolith": 400,
      "Necron Warriors": {
        "10x": 90,
        "20x": 200
      },
      "Night Scythe": 145,
      "Obelisk": 300,
      "Ophydian Destroyers": {
        "3x": 80,
        "6x": 160
      },
      "Orikan the Diviner": 80,
      "Overlord": 85,
      "Overlord with Translocation Shroud": 85,
      "Plasmancer": 60,
      "Psychomancer": 55,
      "Royal Warden": 50,
      "Skorpekh Destroyers": {
        "3x": 90,
        "6x": 180
      },
      "Skorpekh Lord": 80,
      "Technomancer": 85,
      "Tesseract Vault": 425,
      "The Silent King": {
        "3x": 420
      },
      "Tomb Blades": {
        "3x": 75,
        "6x": 150
      },
      "Transcendent C'tan": 295,
      "Trazyn the Infinite": 75,
      "Triarch Praetorians": {
        "5x": 100,
        "10x": 200
      },
      "Triarch Stalker": 110
    },
    "enhancements": {
      "Annihilation Legion": {
        "Eldritch Nightmare": 15,
        "Eternal Madness": 25,
        "Ingrained Superiority": 10,
        "Soulless Reaper": 20
      },
      "Awakened Dynasty": {
        "Enaegic Dermal Bond": 15,
        "Nether-realm Casket": 20,
        "Phasal Subjugator": 35,
        "Veil of Darkness": 20
      },
      "Canoptek Court": {
        "Autodivinator": 15,
        "Dimensional Sanctum": 20,
        "Hyperphasic Fulcrum": 15,
        "Metalodermal Tesla Weave": 10
      },
      "Hypercrypt Legion": {
        "Arisen Tyrant": 25,
        "Dimensional Overseer": 25,
        "Hyperspatial Transfer Node": 15,
        "Osteoclave Fulcrum": 20
      },
      "Obeisance Phalanx": {
        "Eternal Conqueror": 25,
        "Honourable Combatant": 10,
        "Unflinching Will": 20,
        "Warrior Noble": 15
      },
      "Starshatter Arsenal": {
        "Chrono-impedance Fields": 25,
        "Demanding Leader": 10,
        "Dread Majesty": 30,
        "Miniaturised Nebuloscope": 15
      }
    }
  },

  "Orks": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Space Marines": {
    "characters": [
      { name: "Adrax Agatone", tags: ["epic"] },
      { name: "Aethon Shaan", tags: ["epic"] },
      { name: "Ancient" },
      { name: "Ancient in Terminator Armour" },
      { name: "Apothecary" },
      { name: "Apothecary Biologis" },
      { name: "Bladeguard Ancient" },
      { name: "Captain" },
      { name: "Captain in Gravis Armour" },
      { name: "Captain in Phobos Armour" },
      { name: "Captain in Terminator Armour" },
      { name: "Captain Sicarius", tags: ["epic"] },
      { name: "Captain with Jump Pack" },
      { name: "Chaplain" },
      { name: "Chaplain in Terminator Armour" },
      { name: "Chaplain on Bike" },
      { name: "Chaplain with Jump Pack" },
      { name: "Chief Librarian Tigurius", tags: ["epic"] },
      { name: "Darnath Lysander", tags: ["epic"] },
      { name: "Iron Father Feirros", tags: ["epic"] },
      { name: "Judiciar" },
      { name: "Kayvan Shrike", tags: ["epic"] },
      { name: "Kor'Sarro Khan", tags: ["epic"] },
      { name: "Librarian" },
      { name: "Librarian in Phobos Armour" },
      { name: "Librarian in Terminator Armour" },
      { name: "Lieutenant" },
      { name: "Lieutenant in Phobos Armour" },
      { name: "Lieutenant in Reiver Armour" },
      { name: "Lieutenant with Combi-weapon" },
      { name: "Lieutenant Titus", tags: ["epic"] },
      { name: "Marneus Calgar", tags: ["epic"] },
      { name: "Pedro Kantor", tags: ["epic"] },
      { name: "Roboute Guilliman", tags: ["epic"] },
      { name: "Techmarine" },
      { name: "Tor Garadon", tags: ["epic"] },
      { name: "Uriel Ventris", tags: ["epic"] },
      { name: "Vulkan He'stan", tags: ["epic"] },
    ],
    "battleline": [
      { name: "Assault Intercessor Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Heavy Intercessor Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Intercessor Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Tactical Squad", modelCount: 10 },
    ],
    "otherUnits": [
      { name: "Aggressor Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Assault Intercessors with Jump Packs", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Ballistus Dreadnought", modelCount: 140 },
      { name: "Bladeguard Veteran Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Brutalis Dreadnought", modelCount: 160 },
      { name: "Centurion Assault Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Centurion Devastator Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Company Heroes", modelCount: 4 },
      { name: "Desolation Squad", modelCount: 5 },
      { name: "Devastator Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Dreadnought", modelCount: 1 },
      { name: "Drop Pod", modelCount: 1 },
      { name: "Eliminator Squad", modelCount: 3 },
      { name: "Eradicator Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Firestrike Servo-turrets", modelCount: [1, 2], unitOptions: { unitSize: [1, 2] } },
      { name: "Gladiator Lancer", modelCount: 1 },
      { name: "Gladiator Reaper", modelCount: 1 },
      { name: "Gladiator Valiant", modelCount: 1 },
      { name: "Hammerfall Bunker", modelCount: 1 },
      { name: "Hellblaster Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Impulsor", modelCount: 1 },
      { name: "Inceptor Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Incursor Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Infernus Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Infiltrator Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Invader ATV", modelCount: 1 },
      { name: "Invictor Tactical Warsuit", modelCount: 1 },
      { name: "Land Raider", modelCount: 1 },
      { name: "Land Raider Crusader", modelCount: 1 },
      { name: "Land Raider Redeemer", modelCount: 1 },
      { name: "Outrider Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },  // figure out how to handle Invader ATV +60
      { name: "Predator Annihilator", modelCount: 1 },
      { name: "Predator Destructor", modelCount: 1 },
      { name: "Razorback", modelCount: 1 },
      { name: "Redemptor Dreadnought", modelCount: 1 },
      { name: "Reiver Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Repulsor", modelCount: 1 },
      { name: "Repulsor Executioner", modelCount: 1 },
      { name: "Rhino", modelCount: 1 },
      { name: "Scout Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Sternguard Veteran Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Storm Speeder Hailstrike", modelCount: 1 },
      { name: "Storm Speeder Hammerstrike", modelCount: 1 },
      { name: "Storm Speeder Thunderstrike", modelCount: 1 },
      { name: "Stormhawk Interceptor", modelCount: 1 },
      { name: "Stormraven Gunship", modelCount: 1 },
      { name: "Stormtalon Gunship", modelCount: 1 },
      { name: "Suppressor Squad", modelCount: 1 },
      { name: "Terminator Assault Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Terminator Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Vanguard Veteran Squad with Jump Packs", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Vindicator", modelCount: 1 },
      { name: "Whirlwind", modelCount: 1 },
      { name: "Astraeus", modelCount: 1 },
      { name: "Thunderhawk Gunship", modelCount: 1 },
    ],
    "enhancements": {
      // TODO: check enhancement restrictions
      "1st Company Task Force": [
        { name: "Fear Made Manifest" },
        { name: "Iron Resolve" },
        { name: "Rites of War" },
        { name: "The Imperium's Sword" },
      ],
      "Anvil Siege Force": [
        { name: "Architect of War" },
        { name: "Fleet Commander" },
        { name: "Indomitable Fury" },
        { name: "Stoic Defender" },
      ],
      "Emperor's Shield": [
        { name: "Champion of the Feast" },
        { name: "Disciple of Rhetoricus" },
        { name: "Indomitable Champion" },
        { name: "Malodraxian Standard" },
      ],
      "Firestorm Assault Force": [
        { name: "Adamantine Mantle" },
        { name: "Champion of Humanity" },
        { name: "Forged in Battle" },
        { name: "War-tempered Artifice" },
      ],
      "Forgefather's Seekers": [
        { name: "Adamantine Mantle" },
        { name: "Forged in Battle" },
        { name: "Immolator" },
        { name: "War-tempered Artifice" },
      ],
      "Gladius Task Force": [
        { name: "Adept of the Codex" },
        { name: "Artificer Armour" },
        { name: "Fire Discipline" },
        { name: "The Honour Vehement" },
      ],
      "Ironstorm Spearhead": [
        { name: "Adept of the Omnissiah" },
        { name: "Master of Machine War" },
        { name: "Target Augury Web" },
        { name: "The Flesh is Weak" },
      ],
      "Librarius Conclave": [
        { name: "Celerity" },
        { name: "Fusillade" },
        { name: "Obfuscation" },
        { name: "Prescience" },
      ],
      "Shadowmark Talon": [
        { name: "Blackwing Shroud" },
        { name: "Coronal Susurrant" },
        { name: "Hunter’s Instincts" },
        { name: "Umbral Raptor" },
      ],
      "Stormlance Task Force": [
        { name: "Feinting Withdrawal" },
        { name: "Fury of the Storm" },
        { name: "Hunter’s Instincts" },
        { name: "Portents of Wisdom" },
      ],
      "Vanguard Spearhead": [
        { name: "Execute and Redeploy" },
        { name: "Ghostweave Cloak" },
        { name: "Shadow War Veteran" },
        { name: "The Blade Driven Deep" },
      ],
    },
  },

  "Space Wolves": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      restrictions: [
        "Apothecary",
        "Devastator Squad",
        "Tactical Squad"
      ],
    },
    "characters": [
      { name: "Arjac Rockfist", tags: ["epic"] },
      { name: "Bjorn the Fell-Handed", tags: ["epic"] },
      { name: "Iron Priest" },
      { name: "Logan Grimnar", tags: ["epic"] },
      { name: "Murderfang", tags: ["epic"] },
      { name: "Njal Stormcaller", tags: ["epic"] },
      { name: "Ragnar Blackmane", tags: ["epic"] },
      { name: "Ulrik the Slayer", tags: ["epic"] },
      { name: "Wolf Guard Battle Leader" },
      { name: "Wolf Priest" },
    ],
    "battleline": [
      { name: "Blood Claws", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] } },
      { name: "Grey Hunters", modelCount: 10 },
    ],
    "otherUnits": [
      {
        name: "Fenrisian Wolves",
        modelCount: [5, 10],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Thunderwolf Cavalry", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Venerable Dreadnought" },
      { name: "Wolf Guard Headtakers", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Wolf Guard Headtakers and Hunting Wolves", modelCount: [6, 12], unitOptions: { unitSize: [6, 12] } },
      { name: "Wolf Guard Terminators", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Wulfen", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Wulfen Dreadnought" },
      { name: "Wulfen with Storm Shields", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
    ],
    "enhancements": {
      "Champions of Fenris": [
        { name: "Fangrune Pendant" },
        { name: "Foes’ Fate" },
        { name: "Longstrider" },
        { name: "Wolves’ Wisdom" },
      ],
      "Saga of the Beastslayer": [
        { name: "Elder’s Guidance" },
        { name: "Helm of the Beastslayer" },
        { name: "Hunter’s Guile" },
        { name: "Wolf-touched" },
      ],
      "Saga of the Bold": [
        { name: "Braggart’s Steel" },
        { name: "Hordeslayer" },
        { name: "Skjald" },
        { name: "Thunderwolf’s Fortitude" },
      ],
      "Saga of the Hunter": [
        { name: "Fenrisian Grit" },
        { name: "Feral Rage" },
        { name: "Swift Hunter" },
        { name: "Wolf Master" },
      ],
    }
  },

  "T'au Empire": {
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Thousand Sons": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "characters": [],
    "battleline": [],
    "otherUnits": [],
    "enhancements": {},
  },

  "Tyranids": {
    "characters": [
      { name: "Broodlord", tags: ["Vanguard Invader", "Psyker", "Synapse"] },
      { name: "Deathleaper", tags: ["epic", "Vanguard Invader"] },
      { name: "Hive Tyrant", tags: ["Monster", "Psyker", "Synapse"] },
      { name: "Hyperadapted Raveners", tags: ["Vanguard Invader", "Synapse"] },
      { name: "Neurotyrant", tags: ["Monster", "Psyker", "Synapse"] },
      { name: "Old One Eye", tags: ["epic", "Monster"] },
      { name: "Parasite of Mortrex", tags: ["Vanguard Invader", "Synapse"] },
      { name: "Tervigon", tags: ["Monster", "Psyker", "Synapse"] },
      { name: "The Swarmlord", tags: ["epic", "Monster", "Psyker", "Synapse"] },
      { name: "Winged Hive Tyrant", tags: ["Monster", "Vanguard Invader", "Psyker", "Synapse"] },
      { name: "Winged Tyranid Prime", tags: ["Vanguard Invader", "Synapse"] },
    ],
    "battleline": [
      { name: "Gargoyles", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] }, tags: ["Vanguard Invader"] },
      { name: "Hormagaunts", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] } },
      { name: "Termagants", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] } },
    ],
    "otherUnits": [
      { name: "Barbgaunts", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Biovores", modelCount: [1, 2, 3], unitOptions: { unitSize: [1, 2, 3] } },
      { name: "Carnifexes", modelCount: [1, 2], unitOptions: { unitSize: [1, 2] }, tags: ["Monster"] },
      { name: "Exocrine", tags: ["Monster"] },
      { name: "Genestealers", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] }, tags: ["Vanguard Invader"] },
      { name: "Harpy", tags: ["Monster", "Vanguard Invader"] },
      { name: "Haruspex", tags: ["Monster"] },
      { name: "Hive Crone", tags: ["Monster", "Vanguard Invader"] },
      { name: "Hive Guard", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Lictor", tags: ["Vanguard Invader"] },
      { name: "Maleceptor", tags: ["Monster", "Psyker", "Synapse"] },
      { name: "Mawloc", tags: ["Monster", "Vanguard Invader"] },
      { name: "Mucolid Spores", modelCount: [1, 2], unitOptions: { unitSize: [1, 2] } },
      { name: "Neurogaunts", modelCount: [11, 22], unitOptions: { unitSize: [11, 22] } },
      { name: "Neurolictor", tags: ["Vanguard Invader", "Synapse"] },
      { name: "Norn Assimilator", tags: ["Monster", "Synapse"] },
      { name: "Norn Emissary", tags: ["Monster", "Psyker", "Synapse"] },
      { name: "Psychophage", tags: ["Monster"] },
      { name: "Pyrovores", modelCount: [1, 2, 3], unitOptions: { unitSize: [1, 2, 3] } },
      { name: "Raveners", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] }, tags: ["Vanguard Invader"] },
      { name: "Ripper Swarms", modelCount: [1, 2, 3], unitOptions: { unitSize: [1, 2, 3] } },
      { name: "Screamer-Killer", tags: ["Monster"] },
      { name: "Spore Mines", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Sporocyst", tags: ["Monster"] },
      { name: "Toxicrene", tags: ["Monster"] },
      { name: "Trygon", tags: ["Monster", "Vanguard Invader"] },
      { name: "Tyranid Warriors with Melee Bio-weapons", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] }, tags: ["Synapse"] },
      { name: "Tyranid Warriors with Ranged Bio-weapons", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] }, tags: ["Synapse"] },
      { name: "Tyrannocyte", tags: ["Monster", "Vanguard Invader"] },
      { name: "Tyrannofex", tags: ["Monster"] },
      { name: "Tyrant Guard", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Venomthropes", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Von Ryan's Leapers", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] }, tags: ["Vanguard Invader"] },
      { name: "Zoanthropes", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] }, tags: ["Psyker", "Synapse"] },
    ],
    "enhancements": {
      "Assimilation Swarm": [
        { name: "Biophagic Flow" },
        { name: "Instinctive Defence" },
        { name: "Parasitic Biomorphology" },
        { name: "Regenerating Monstrosity" },
      ],
      "Crusher Stampede": [
        { name: "Enraged Reserves", tags: ["Monster"] },
        { name: "Monstrous Nemesis", tags: ["Monster"] },
        { name: "Null Nodules", tags: ["Monster"] },
        { name: "Ominous Presence", tags: ["Monster"] },
      ],
      "Invasion Fleet": [
        { name: "Adaptive Biology" },
        { name: "Alien Cunning" },
        { name: "Perfectly Adapted" },
        { name: "Synaptic Linchpin" },
      ],
      "Subterranean Assault": [
        { name: "Synaptic Strategy" },
        { name: "Tremor Senses" },
        { name: "Trygon Prime", tags: ["Trygon"] },
        { name: "Vanguard Intellect" },
      ],
      "Synaptic Nexus": [
        { name: "Power of the Hive Mind", tags: ["Psyker"] },
        { name: "Psychostatic Disruption", tags: ["Synapse"] },
        { name: "Synaptic Control", tags: ["Synapse"] },
        { name: "The Dirgeheart of Kharis", tags: ["Synapse"] },
      ],
      "Unending Swarm": [
        { name: "Adrenalised Onslaught" },
        { name: "Naturalised Camouflage" },
        { name: "Piercing Talons" },
        { name: "Relentless Hunger" },
      ],
      "Vanguard Onslaught": [
        { name: "Chameleonic", tags: ["Vanguard Invader"] },
        { name: "Hunting Grounds" },
        { name: "Neuronode" },
        { name: "Stalker", tags: ["Vanguard Invader"] },
      ],
      "Warrior Bioform Onslaught": [
        { name: "Elevated Might" },
        { name: "Ocular Adaptation", tags: ["Winged Tyranid Prime"] },
        { name: "Sensory Assimilation", tags: ["Winged Tyranid Prime"] },
        { name: "Synaptic Tyrant", tags: ["Neurotyrant"] },
      ],
    },
  },

  "World Eaters": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "models": {
      "Angron": 435,
      "Eightbound": {
        "3x": 140,
        "6x": 280
      },
      "Exalted Eightbound": {
        "3x": 155,
        "6x": 310
      },
      "Jakhals": {
        "10x": 65,
        "20x": 130
      },
      "Khorne Berzerkers": {
        "5x": 90,
        "10x": 180
      },
      "Khorne Lord of Skulls": 450,
      "Kharn the Betrayer": 100,
      "Lord Invocatus": 140,
      "World Eaters Chaos Spawn": {
        "2x": 70
      },
      "World Eaters Daemon Prince": 185,
      "World Eaters Daemon Prince with Wings": 155,
      "World Eaters Defiler": 190,
      "World Eaters Forgefiend": 145,
      "World Eaters Helbrute": 130,
      "World Eaters Heldrake": 210,
      "World Eaters Land Raider": 240,
      "World Eaters Lord on Juggernaut": 80,
      "World Eaters Master of Executions": 110,
      "World Eaters Maulerfiend": 140,
      "World Eaters Predator Annihilator": 135,
      "World Eaters Predator Destructor": 140,
      "World Eaters Rhino": 75,
      "World Eaters Terminator Squad": {
        "5x": 180,
        "10x": 360
      }
    },
    "enhancements": {
      "Berzerker Warband": {
        "Battle-lust": 15,
        "Berzerker Glaive": 25,
        "Favoured of Khorne": 20,
        "Helm of Brazen Ire": 25
      },
      "Vessels of Wrath": {
        "Archslaughterer": 25,
        "Avenger's Crown": 15,
        "Gateways to Glory": 10,
        "Vox-diabolus": 20
      }
    }
  }
};

const POINTS = {
  "Adepta Sororitas": {
    "units": {
      "Aestred Thurga and Agathae Dolan": 70,
      "Arco-flagellants": [45, 140],
      "Battle Sisters Squad": 105,
      "Canoness with Jump Pack": 75,
      "Canoness": 50,
      "Castigator": 170,
      "Celestian Sacresants": [70, 130],
      "Daemonifuge": 95,
      "Dialogus": 40,
      "Dogmata": 45,
      "Dominion Squad": 115,
      "Exorcist": 210,
      "Hospitaller": 50,
      "Imagifier": 65,
      "Immolator": 125,
      "Junith Eruita": 90,
      "Ministorum Priest": 50,
      "Mortifiers": [70, 140],
      "Morvenn Vahl": 170,
      "Palatine": 50,
      "Paragon Warsuits": 210,
      "Penitent Engines": [75, 150],
      "Repentia Squad": [75, 160],
      "Retributor Squad": 105,
      "Saint Celestine": 150,
      "Sanctifiers": 100,
      "Seraphim Squad": [80, 160],
      "Sisters Novitiate Squad": 100,
      "Sororitas Rhino": 75,
      "Triumph of Saint Katherine": 235,
      "Zephyrim Squad": [80, 160],
    },
    "enhancements": {
      "Army of Faith": {
        "Blade of Saint Ellynor": 15,
        "Divine Aspect": 5,
        "Litanies of Faith": 10,
        "Triptych of the Macharian Crusade": 20,
      },
      "Bringers of Flame": {
        "Fire and Fury": 30,
        "Iron Surplice of Saint Istalela": 10,
        "Manual of Saint Griselda": 20,
        "Righteous Rage": 15,
      },
      "Champions of Faith": {
        "Eyes of the Oracle": 10,
        "Mark of Devotion": 30,
        "Sanctified Amulet": 25,
        "Triptych of Judgement": 15,
      },
      "Hallowed Martyrs": {
        "Chaplet of Sacrifice": 25,
        "Mantle of Ophelia": 20,
        "Saintly Example": 10,
        "Through Suffering, Strength": 25,
      },
      "Penitent Host": {
        "Catechism of Divine Penitence": 20,
        "Psalm of Righteous Judgement": 30,
        "Refrain of Enduring Faith": 25,
        "Verse of Holy Piety": 15,
      },
    }
  },
  "Adeptus Custodes (to refactor)": {
    "Aleya": 65,
    "Blade Champion": 120,
    "Knight-Centura": 55,
    "Shield-Captain": 130,
    "Shield-Captain in Allarus Terminator Armour": 130,
    "Shield-Captain on Dawneagle Jetbike": 150,
    "Trajann Valoris": 140,
    "Valerian": 110,
    "Custodian Guard (x4)": 170,
    "Custodian Guard (x5)": 215,
    "Agamatus Custodians (x3)": 225,
    "Agamatus Custodians (x6)": 450,
    "Allarus Custodians (x2)": 130,
    "Allarus Custodians (x3)": 195,
    "Allarus Custodians (x5)": 325,
    "Allarus Custodians (x6)": 390,
    "Anathema Psykana Rhino": 75,
    "Aquilon Custodians (x3)": 195,
    "Aquilon Custodians (x6)": 390,
    "Ares Gunship": 580,
    "Caladius Grav-tank": 215,
    "Contemptor-Achillus Dreadnought": 155,
    "Contemptor-Galatus Dreadnought": 165,
    "Coronus Grav-carrier": 200,
    "Custodian Guard with Adrasite and Pyrithite Spears": 250,
    "Custodian Wardens (x4)": 210,
    "Custodian Wardens (x5)": 260,
    "Orion Assault Dropship": 690,
    "Pallas Grav-attack": 105,
    "Prosecutors (x4)": 40,
    "Prosecutors (x5)": 50,
    "Prosecutors (x9)": 90,
    "Prosecutors (x10)": 100,
    "Sagittarum Custodians": 225,
    "Telemon Heavy Dreadnought": 225,
    "Venerable Contemptor Dreadnought": 170,
    "Venerable Land Raider": 240,
    "Venatari Custodians (x3)": 165,
    "Venatari Custodians (x6)": 330,
    "Vertus Praetors (x2)": 150,
    "Vertus Praetors (x3)": 225,
    "Vigilators (x4)": 50,
    "Vigilators (x5)": 65,
    "Vigilators (x9)": 115,
    "Vigilators (x10)": 125,
    "Witchseekers (x4)": 50,
    "Witchseekers (x5)": 65,
    "Witchseekers (x9)": 115,
    "Witchseekers (x10)": 125
  },
  "Adeptus Mechanicus (refactor needed)": {
    "Archaeopter Fusilave": 160,
    "Archaeopter Stratoraptor": 185,
    "Archaeopter Transvector": 150,
    "Belisarius Cawl": 135,
    "Corpuscarii Electro-Priests (5)": 65,
    "Corpuscarii Electro-Priests (10)": 130,
    "Cybernetica Datasmith": 35,
    "Fulgurite Electro-Priests (5)": 70,
    "Fulgurite Electro-Priests (10)": 140,
    "Ironstrider Ballistarii (1)": 75,
    "Ironstrider Ballistarii (2)": 150,
    "Ironstrider Ballistarii (3)": 225,
    "Kastelan Robots (2)": 180,
    "Kastelan Robots (4)": 360,
    "Kataphron Breachers (3)": 160,
    "Kataphron Breachers (6)": 320,
    "Kataphron Destroyers (3)": 105,
    "Kataphron Destroyers (6)": 210,
    "Onager Dunecrawler": 155,
    "Pteraxii Skystalkers (5)": 70,
    "Pteraxii Skystalkers (10)": 140,
    "Pteraxii Sterylizors (5)": 80,
    "Pteraxii Sterylizors (10)": 160,
    "Serberys Raiders (3)": 60,
    "Serberys Raiders (6)": 120,
    "Serberys Sulphurhounds (3)": 55,
    "Serberys Sulphurhounds (6)": 110,
    "Sicarian Infiltrators (5)": 70,
    "Sicarian Infiltrators (10)": 140,
    "Sicarian Ruststalkers (5)": 75,
    "Sicarian Ruststalkers (10)": 150,
    "Skitarii Marshal": 35,
    "Skitarii Rangers (10)": 85,
    "Skitarii Vanguard (10)": 95,
    "Skorpius Disintegrator": 175,
    "Skorpius Dunerider": 85,
    "Sydonian Dragoons with Radium Jezzails (1)": 55,
    "Sydonian Dragoons with Radium Jezzails (2)": 100,
    "Sydonian Dragoons with Radium Jezzails (3)": 150,
    "Sydonian Dragoons with Taser Lances (1)": 70,
    "Sydonian Dragoons with Taser Lances (2)": 140,
    "Sydonian Dragoons with Taser Lances (3)": 210,
    "Sydonian Skatros": 50,
    "Tech-Priest Dominus": 65,
    "Tech-Priest Enginseer": 55,
    "Tech-Priest Manipulus": 60,
    "Technoarcheologist": 45
  },
  "Aeldari (to refactor)": {
    "Asurmen": 135,
    "Autarch": 85,
    "Autarch Wayleaper": 80,
    "Avatar of Khaine": 300,
    "Baharroth": 115,
    "Death Jester": 90,
    "Eldrad Ulthran": 110,
    "Farseer": 70,
    "Farseer Skyrunner": 80,
    "Fuegan": 120,
    "Jain Zar": 105,
    "Lhykhis": 120,
    "Maugan Ra": 100,
    "Shadowseer": 60,
    "Solitaire": 115,
    "Spiritseer": 65,
    "The Visarch": 90,
    "The Yncarne": 260,
    "Troupe Master": 75,
    "Warlock": 45,
    "Ynnari Archon": 85,
    "Ynnari Succubus": 45,
    "Yvraine": 100,
    "Corsair Voidreavers (5)": 60,
    "Corsair Voidreavers (10)": 120,
    "Corsair Voidscarred (5)": 80,
    "Corsair Voidscarred (10)": 160,
    "Guardian Defenders (11)": 100,
    "Storm Guardians (11)": 100,
    "Ynnari Kabalite Warriors (10)": 110,
    "Ynnari Wyches (10)": 90,
    "Crimson Hunter": 160,
    "D-cannon Platform": 125,
    "Dark Reapers (5)": 90,
    "Dark Reapers (10)": 195,
    "Dire Avengers (5)": 80,
    "Dire Avengers (10)": 160,
    "Falcon": 130,
    "Fire Dragons (5)": 120,
    "Fire Dragons (10)": 220,
    "Fire Prism": 150,
    "Hemlock Wraithfighter": 155,
    "Howling Banshees (5)": 95,
    "Howling Banshees (10)": 190,
    "Night Spinner": 190,
    "Rangers (5)": 55,
    "Rangers (10)": 110,
    "Shadow Weaver Platform": 75,
    "Shining Spears (3)": 110,
    "Shining Spears (6)": 220,
    "Shroud Runners (3)": 80,
    "Shroud Runners (6)": 160,
    "Skyweavers (2)": 95,
    "Skyweavers (4)": 190,
    "Starweaver": 80,
    "Striking Scorpions (5)": 85,
    "Striking Scorpions (10)": 150,
    "Swooping Hawks (5)": 85,
    "Swooping Hawks (10)": 170,
    "Troupe (5)": 85,
    "Troupe (6)": 100,
    "Troupe (11)": 190,
    "Troupe (12)": 205,
    "Vibro Cannon Platform": 60,
    "Voidweaver": 125,
    "Vyper": 65,
    "War Walker": 85,
    "Warlock Conclave (2)": 55,
    "Warlock Conclave (4)": 130,
    "Warlock Skyrunners (1)": 45,
    "Warlock Skyrunners (2)": 90,
    "Warp Spiders (5)": 95,
    "Warp Spiders (10)": 190,
    "Wave Serpent": 125,
    "Windriders (3)": 80,
    "Windriders (6)": 160,
    "Wraithblades (5)": 170,
    "Wraithguard (5)": 170,
    "Wraithknight": 435,
    "Wraithknight with Ghostglaive": 420,
    "Wraithlord": 140,
    "Ynnari Incubi (5)": 85,
    "Ynnari Incubi (10)": 170,
    "Ynnari Raider": 80,
    "Ynnari Reavers (3)": 65,
    "Ynnari Reavers (6)": 120,
    "Ynnari Venom": 70
  },
  "Astra Militarum (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Black Templars (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Blood Angels": {
    "units": {
      "Astorath": 95,
      "Baal Predator": 125,
      "Blood Angels Captain": 80,
      "Chief Librarian Mephiston": 120,
      "Commander Dante": 120,
      "Death Company Captain": 70,
      "Death Company Captain with Jump Pack": 75,
      "Death Company Dreadnought": 180,
      "Death Company Marines": [85, 160],
      "Death Company Marines with Bolt Rifles": [85, 160],
      "Death Company Marines with Jump Packs": [120, 230],
      "Lemartes": 100,
      "Sanguinary Guard": [125, 260],
      "Sanguinary Priest": 75,
      "The Sanguinor": 140,
    },
    "enhancements": {
      "Angelic Inheritors": {
        "Blazing Icon": 20,
        "Ordained Sacrifice": 25,
        "Prescient Flash": 20,
        "Troubling Visions": 15
      },
      "Liberator Assault Group": {
        "Gift of Foresight": 15,
        "Icon of the Angel": 20,
        "Rage-fuelled Warrior": 35,
        "Speed of the Primarch": 25
      },
      "The Angelic Host": {
        "Archangel's Shard": 15,
        "Artisan of War": 20,
        "Gleaming Pinions": 25,
        "Visage of Death": 15
      },
      "The Lost Brethren": {
        "Blood Shard": 25,
        "Sanguinius' Grace": 20,
        "To Slay the Warmaster": 15,
        "Vengeful Onslaught": 10
      }
    }
  },
  "Chaos Daemons (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Chaos Knights (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Chaos Space Marines": {
    "units": {
      "Abaddon the Despoiler": 280,
      "Accursed Cultists": [90, 195],
      "Chaos Bikers": [70, 130],
      "Chaos Land Raider": 240,
      "Chaos Lord": 90,
      "Chaos Lord in Terminator Armour": 95,
      "Chaos Lord with Jump Pack": 80,
      "Chaos Predator Annihilator": 135,
      "Chaos Predator Destructor": 140,
      "Chaos Rhino": 75,
      "Chaos Spawn": 70,
      "Chaos Terminator Squad": [180, 360],
      "Chaos Vindicator": 185,
      "Chosen": [125, 250],
      "Cultist Firebrand": 45,
      "Cultist Mob": [50, 100],
      "Cypher": 90,
      "Dark Apostle": 65,
      "Dark Commune": 80,
      "Defiler": 190,
      "Fabius Bile": 85,
      "Fellgor Beastmen": 70,
      "Forgefiend": 180,
      "Haarken Worldclaimer": 90,
      "Havocs": 125,
      "Helbrute": 130,
      "Heldrake": 205,
      "Heretic Astartes Daemon Prince": 165,
      "Heretic Astartes Daemon Prince with Wings": 180,
      "Huron Blackheart": 80,
      "Khorne Lord of Skulls": 450,
      "Legionaries": [90, 170],
      "Lord Discordant on Helstalker": 160,
      "Master of Executions": 80,
      "Master of Possession": 60,
      "Maulerfiend": 130,
      "Nemesis Claw": [110, 190],
      "Noctilith Crown": 125,
      "Obliterators": 160,
      "Possessed": [120, 240],
      "Raptors": [90, 170],
      "Sorcerer": 60,
      "Sorcerer in Terminator Armour": 80,
      "Traitor Enforcer": 55,
      "Traitor Guardsmen Squad": 70,
      "Vashtorr the Arkifane": 175,
      "Venomcrawler": 120,
      "Warp Talons": [125, 270],
      "Warpsmith": 70,
    },
    "enhancements": {
      "Cabal of Chaos": {
        "Eye of Z’desh": 25,
        "Infernal Avatar": 20,
        "Mind Blade": 25,
        "Touched by the Warp": 10,
      },
      "Chaos Cult": {
        "Amulet of Tainted Vigour": 20,
        "Cultist’s Brand": 20,
        "Incendiary Goad": 15,
        "Warped Foresight": 10,
      },
      "Creations of Bile": {
        "Helm of All-seeing": 25,
        "Living Carapace": 15,
        "Prime Test Subject": 35,
        "Surgical Precision": 10,
      },
      "Deceptors": {
        "Cursed Fang": 10,
        "Falsehood": 10,
        "Shroud of Obfuscation": 15,
        "Soul Link": 5,
      },
      "Dread Talons": {
        "Eater of Dread": 15,
        "Night’s Shroud": 20,
        "Warp‑fuelled Thrusters": 20,
        "Willbreaker": 10,
      },
      "Fellhammer Siege‑host": {
        "Bastion Plate": 10,
        "Iron Artifice": 10,
        "Ironbound Enmity": 15,
        "Warp Tracer": 20,
      },
      "Pactbound Zealots": {
        "Eye of Tzeentch": 15,
        "Intoxicating Elixir": 15,
        "Orbs of Unlife": 15,
        "Talisman of Burning Blood": 15,
      },
      "Renegade Raiders": {
        "Despot’s Claim": 15,
        "Dread Reaver": 15,
        "Mark of the Hound": 25,
        "Tyrant’s Lash": 20,
      },
      "Soulforged Warpack": {
        "Forge’s Blessing": 20,
        "Invigorated Mechatendrils": 15,
        "Tempting Addendum": 25,
        "Soul Harvester": 15,
      },
      "Veterans of the Long War": {
        "Eager for Vengeance": 20,
        "Eye of Abaddon": 15,
        "Mark of Legend": 10,
        "Warmaster’s Gift": 15,
      },
    }
  },
  "Dark Angels (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Death Guard (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Deathwatch (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Drukhari (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Emperor's Children (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Genestealer Cults (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Grey Knights (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Imperial Agents (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Imperial Knights (TODO)": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Leagues of Votann": {
    "units": {
      "Arkanyst Evaluator": 75,
      "Brôkhyr Iron-master": 75,
      "Buri Aegnirssen": 110,
      "Einhyr Champion": 70,
      "Grimnyr": 65,
      "Kâhl": 70,
      "Memnyr Strategist": 45,
      "Ûthar the Destined": 95,
      "Hearthkyn Warriors": 100,
      "Brôkhyr Thunderkyn": [80, 160],
      "Cthonian Beserks": [100, 200],
      "Cthonian Earthshakers": 110,
      "Einhyr Hearthguard": [135, 270],
      "Hekaton Land Fortress": 240,
      "Hernkyn Pioneers": [80, 160],
      "Hernkyn Yaegirs": 90,
      "Ironkin Steeljacks w/ Melee Weapons": [90, 180],
      "Ironkin Steeljacks w/ Volkanite Disintegrators": [90, 180],
      "Kapricus Carrier": 75,
      "Kapricus Defender": [70, 140],
      "Sagitaur": 95
    },
    "enhancements": {
      "Brandfast Oathband": {
        "Precursive Judgement": 15,
        "Signature Restoration": 5,
        "Tactical Alchemy": 10,
        "Trivärg Cyber Implant": 30,
      },
      "Dêlve Assault Shift": {
        "Dêlvwerke Navigator": 25,
        "Multiwave System Jammer": 10,
        "Piledriver": 15,
        "Quake Supervisor": 20,
      },
      "Hearthband": {
        "Bastion Shield": 25,
        "High Kâhl": 30,
        "Ironskein": 10,
        "Quake Multigenerator": 15,
      },
      "Hearthfyre Arsenal": {
        "Calculated Tenacity": 15,
        "Fârstrydr Node": 20,
        "Graviton Vault": 5,
        "Mantle of Elders": 10,
      },
      "Needgaârd Oathband": {
        "Ancestral Crest": 15,
        "Dead Reckoning": 10,
        "Iron Ambassador": 5,
        "Oathbound Specifier": 30,
      },
      "Persecution Prospect": {
        "Eye for Weakness": 25,
        "Nomad Strategist": 20,
        "Surgical Saboteur": 10,
        "Writ of Acquisition": 10,
      },
    }
  },
  "Necrons (refactor)": {
    "Annihilation Barge": 105,
    "C'tan Shard of the Deceiver": 265,
    "C'tan Shard of the Nightbringer": 305,
    "C'tan Shard of the Void Dragon": 300,
    "Canoptek Doomstalker": 145,
    "Canoptek Reanimator": 75,
    "Canoptek Scarab Swarms (3)": 40,
    "Canoptek Scarab Swarms (6)": 80,
    "Canoptek Spyders (1)": 75,
    "Canoptek Spyders (2)": 150,
    "Catacomb Command Barge": 120,
    "Chronomancer": 65,
    "Cryptothralls (2)": 60,
    "Deathmarks (5)": 65,
    "Deathmarks (10)": 130,
    "Doom Scythe": 230,
    "Doomsday Ark": 200,
    "Flayed Ones (5)": 60,
    "Flayed Ones (10)": 120,
    "Ghost Ark": 115,
    "Hexmark Destroyer": 75,
    "Illuminor Szeras": 175,
    "Immortals (5)": 70,
    "Immortals (10)": 150,
    "Imotekh the Stormlord": 100,
    "Lokhust Destroyers (1)": 35,
    "Lokhust Destroyers (2)": 60,
    "Lokhust Destroyers (3)": 90,
    "Lokhust Destroyers (6)": 180,
    "Lokhust Heavy Destroyers (1)": 55,
    "Lokhust Heavy Destroyers (2)": 110,
    "Lokhust Heavy Destroyers (3)": 165,
    "Lokhust Lord": 80,
    "Lychguard (5)": 85,
    "Lychguard (10)": 170,
    "Monolith": 400,
    "Necron Warriors (10)": 90,
    "Necron Warriors (20)": 200,
    "Night Scythe": 145,
    "Obelisk": 300,
    "Ophydian Destroyers (3)": 80,
    "Ophydian Destroyers (6)": 160,
    "Orikan the Diviner": 80,
    "Overlord": 85,
    "Overlord with Translocation Shroud": 85,
    "Plasmancer": 60,
    "Psychomancer": 55,
    "Royal Warden": 50,
    "Skorpekh Destroyers (3)": 90,
    "Skorpekh Destroyers (6)": 180,
    "Skorpekh Lord": 80,
    "Technomancer": 85,
    "Tesseract Vault": 425,
    "The Silent King (3)": 420,
    "Tomb Blades (3)": 75,
    "Tomb Blades (6)": 150,
    "Transcendent C'tan": 295,
    "Trazyn the Infinite": 75,
    "Triarch Praetorians (5)": 100,
    "Triarch Praetorians (10)": 200,
    "Triarch Stalker": 110
  },
  "Orks": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Space Marines": {
    "units": {
      "Adrax Agatone": 85,
      "Aethon Shaan": 85,
      "Aggressor Squad": [100, 200],
      "Ancient": 50,
      "Ancient in Terminator Armour": 75,
      "Apothecary": 50,
      "Apothecary Biologis": 70,
      "Assault Intercessor Squad": [75, 150],
      "Assault Intercessors with Jump Packs": [90, 170],
      "Ballistus Dreadnought": 150,
      "Bladeguard Ancient": 45,
      "Bladeguard Veteran Squad": [80, 170],
      "Brutalis Dreadnought": 160,
      "Captain": 80,
      "Captain in Gravis Armour": 80,
      "Captain in Phobos Armour": 70,
      "Captain in Terminator Armour": 95,
      "Captain Sicarius": 85,
      "Captain with Jump Pack": 75,
      "Centurion Assault Squad": [150, 300],
      "Centurion Devastator Squad": [165, 330],
      "Chaplain": 60,
      "Chaplain in Terminator Armour": 75,
      "Chaplain on Bike": 75,
      "Chaplain with Jump Pack": 75,
      "Chief Librarian Tigurius": 75,
      "Company Heroes": 75,
      "Darnath Lysander": 100,
      "Desolation Squad": 200,
      "Devastator Squad": [120, 200],
      "Dreadnought": 135,
      "Drop Pod": 70,
      "Eliminator Squad": 85,
      "Eradicator Squad": [100, 200],
      "Firestrike Servo-turrets": [75, 150],
      "Gladiator Lancer": 160,
      "Gladiator Reaper": 160,
      "Gladiator Valiant": 150,
      "Hammerfall Bunker": 175,
      "Heavy Intercessor Squad": [100, 200],
      "Hellblaster Squad": [110, 220],
      "Impulsor": 80,
      "Inceptor Squad": [120, 240],
      "Incursor Squad": [80, 160],
      "Infernus Squad": [90, 180],
      "Infiltrator Squad": [100, 200],
      "Intercessor Squad": [80, 160],
      "Invader ATV": 60,
      "Invictor Tactical Warsuit": 125,
      "Iron Father Feirros": 95,
      "Judiciar": 70,
      "Kayvan Shrike": 100,
      "Kor'Sarro Khan": 70,
      "Land Raider": 220,
      "Land Raider Crusader": 220,
      "Land Raider Redeemer": 270,
      "Librarian": 65,
      "Librarian in Phobos Armour": 70,
      "Librarian in Terminator Armour": 75,
      "Lieutenant": 65,
      "Lieutenant in Phobos Armour": 55,
      "Lieutenant in Reiver Armour": 55,
      "Lieutenant with Combi-weapon": 70,
      "Lieutenant Titus": 70,
      "Marneus Calgar": 200,
      "Outrider Squad": [80, 160], /* Invader ATV +60 */
      "Pedro Kantor": 90,
      "Predator Annihilator": 135,
      "Predator Destructor": 140,
      "Razorback": 85,
      "Redemptor Dreadnought": 195,
      "Reiver Squad": [80, 160],
      "Repulsor": 180,
      "Repulsor Executioner": 220,
      "Rhino": 75,
      "Roboute Guilliman": 340,
      "Scout Squad": [70, 140],
      "Sternguard Veteran Squad": [100, 200],
      "Storm Speeder Hailstrike": 115,
      "Storm Speeder Hammerstrike": 125,
      "Storm Speeder Thunderstrike": 150,
      "Stormhawk Interceptor": 155,
      "Stormraven Gunship": 280,
      "Stormtalon Gunship": 165,
      "Suppressor Squad": 75,
      "Tactical Squad": 140,
      "Techmarine": 55,
      "Terminator Assault Squad": [180, 360],
      "Terminator Squad": [170, 340],
      "Tor Garadon": 90,
      "Uriel Ventris": 95,
      "Vanguard Veteran Squad with Jump Packs": [95, 190],
      "Vindicator": 185,
      "Vulkan He'stan": 100,
      "Whirlwind": 190,

      /* imperial armour (forge world models) */
      "Astraeus": 525,
      "Thunderhawk Gunship": 840,
    },
    "enhancements": {
      "1st Company Task Force": {
        "Fear Made Manifest": 30,
        "Iron Resolve": 15,
        "Rites of War": 10,
        "The Imperium's Sword": 25,
      },
      "Anvil Siege Force": {
        "Architect of War": 25,
        "Fleet Commander": 15,
        "Indomitable Fury": 20,
        "Stoic Defender": 15,
      },
      "Emperor's Shield": {
        "Champion of the Feast": 25,
        "Disciple of Rhetoricus": 10,
        "Indomitable Champion": 20,
        "Malodraxian Standard": 20,
      },
      "Firestorm Assault Force": {
        "Adamantine Mantle": 20,
        "Champion of Humanity": 10,
        "Forged in Battle": 15,
        "War-tempered Artifice": 25,
      },
      "Forgefather's Seekers": {
        "Adamantine Mantle": 20,
        "Forged in Battle": 15,
        "Immolator": 10,
        "War-tempered Artifice": 25,
      },
      "Gladius Task Force": {
        "Adept of the Codex": 20,
        "Artificer Armour": 10,
        "Fire Discipline": 25,
        "The Honour Vehement": 15,
      },
      "Ironstorm Spearhead": {
        "Adept of the Omnissiah": 35,
        "Master of Machine War": 20,
        "Target Augury Web": 30,
        "The Flesh is Weak": 10,
      },
      "Librarius Conclave": {
        "Celerity": 30,
        "Fusillade": 35,
        "Obfuscation": 20,
        "Prescience": 25,
      },
      "Shadowmark Talon": {
        "Blackwing Shroud": 25,
        "Coronal Susurrant": 30,
        "Hunter’s Instincts": 25,
        "Umbral Raptor": 15,
      },
      "Stormlance Task Force": {
        "Feinting Withdrawal": 10,
        "Fury of the Storm": 25,
        "Hunter’s Instincts": 25,
        "Portents of Wisdom": 15,
      },
      "Vanguard Spearhead": {
        "Execute and Redeploy": 20,
        "Ghostweave Cloak": 15,
        "Shadow War Veteran": 30,
        "The Blade Driven Deep": 25,
      },
    },
  },
  "Space Wolves": {
    "units": {
      "Arjac Rockfist": 105,
      "Bjorn the Fell-Handed": 170,
      "Blood Claws": [135, 285],
      "Fenrisian Wolves": [40, 80],
      "Grey Hunters": 180,
      "Iron Priest": 60,
      "Logan Grimnar": 110,
      "Murderfang": 160,
      "Njal Stormcaller": 85,
      "Ragnar Blackmane": 100,
      "Thunderwolf Cavalry": [115, 230],
      "Ulrik the Slayer": 70,
      "Venerable Dreadnought": 140,
      "Wolf Guard Battle Leader": 65,
      "Wolf Guard Headtakers": [85, 170],
      "Wolf Guard Headtakers and Hunting Wolves": [110, 220],
      "Wolf Guard Terminators": [170, 340],
      "Wolf Priest": 70,
      "Wulfen": [85, 170],
      "Wulfen Dreadnought": 145,
      "Wulfen with Storm Shields": [100, 200],
    },
    "enhancements": {
      "Champions of Fenris": {
        "Fangrune Pendant": 15,
        "Foes’ Fate": 15,
        "Longstrider": 20,
        "Wolves’ Wisdom": 30,
      },
      "Saga of the Beastslayer": {
        "Elder’s Guidance": 20,
        "Helm of the Beastslayer": 15,
        "Hunter’s Guile": 20,
        "Wolf-touched": 15,
      },
      "Saga of the Bold": {
        "Braggart’s Steel": 20,
        "Hordeslayer": 15,
        "Skjald": 15,
        "Thunderwolf’s Fortitude": 25,
      },
      "Saga of the Hunter": {
        "Fenrisian Grit": 15,
        "Feral Rage": 10,
        "Swift Hunter": 20,
        "Wolf Master": 5,
      },
    }
  },
  "T'au Empire": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Thousand Sons": {
    "units": {
    },
    "enhancements": {
    }
  },
  "Tyranids": {
    "units": {
      "Barbgaunts": [55, 110],
      "Biovores": [50, 100, 150],
      "Broodlord": 80,
      "Carnifexes": [115, 230],
      "Deathleaper": 80,
      "Exocrine": 140,
      "Gargoyles": [85, 170],
      "Genestealers": [75, 150],
      "Harpy": 215,
      "Haruspex": 125,
      "Hive Crone": 200,
      "Hive Guard": [90, 180],
      "Hive Tyrant": 225,
      "Hormagaunts": [65, 130],
      "Lictor": 60,
      "Maleceptor": 170,
      "Mawloc": 145,
      "Mucolid Spores": [30, 60],
      "Neurogaunts": [45, 90],
      "Neurolictor": 80,
      "Neurotyrant": 105,
      "Norn Assimilator": 275,
      "Norn Emissary": 260,
      "Old One Eye": 150,
      "Parasite of Mortrex": 80,
      "Psychophage": 95,
      "Pyrovores": [40, 70, 105],
      "Raveners": [75, 150],
      "Ripper Swarms": [25, 40, 50],
      "Screamer-Killer": 145,
      "Spore Mines": [55, 110],
      "Sporocyst": 145,
      "Termagants": [60, 120],
      "Tervigon": 175,
      "The Swarmlord": 220,
      "Toxicrene": 150,
      "Trygon": 140,
      "Tyranid Warriors with Melee Bio-weapons": [75, 150],
      "Tyranid Warriors with Ranged Bio-weapons": [65, 130],
      "Tyrannocyte": 105,
      "Tyrannofex": 200,
      "Tyrant Guard": [80, 160],
      "Venomthropes": [70, 140],
      "Von Ryan's Leapers": [70, 140],
      "Winged Hive Tyrant": 170,
      "Winged Tyranid Prime": 65,
      "Zoanthropes": [100, 200]
    },
    "enhancements": {
      "Assimilation Swarm": {
        "Biophagic Flow": 10,
        "Instinctive Defence": 15,
        "Parasitic Biomorphology": 25,
        "Regenerating Monstrosity": 20,
      },
      "Crusher Stampede": {
        "Enraged Reserves": 20,
        "Monstrous Nemesis": 25,
        "Null Nodules": 10,
        "Ominous Presence": 15,
      },
      "Invasion Fleet": {
        "Adaptive Biology": 25,
        "Alien Cunning": 30,
        "Perfectly Adapted": 15,
        "Synaptic Linchpin": 20,
      },
      "Subterranean Assault": {
        "Synaptic Strategy": 15,
        "Tremor Senses": 20,
        "Trygon Prime": 20,
        "Vanguard Intellect": 15,
      },
      "Synaptic Nexus": {
        "Power of the Hive Mind": 10,
        "Psychostatic Disruption": 30,
        "Synaptic Control": 20,
        "The Dirgeheart of Kharis": 15,
      },
      "Unending Swarm": {
        "Adrenalised Onslaught": 15,
        "Naturalised Camouflage": 30,
        "Piercing Talons": 25,
        "Relentless Hunger": 20,
      },
      "Vanguard Onslaught": {
        "Chameleonic": 15,
        "Hunting Grounds": 20,
        "Neuronode": 20,
        "Stalker": 10,
      },
      "Warrior Bioform Onslaught": {
        "Elevated Might": 30,
        "Ocular Adaptation": 20,
        "Sensory Assimilation": 20,
        "Synaptic Tyrant": 10,
      },
    }
  },
  "World Eaters": {
    "Angron": 435,
    "Eightbound (3)": 140,
    "Eightbound (6)": 280,
    "Exalted Eightbound (3)": 155,
    "Exalted Eightbound (6)": 310,
    "Jakhals (10)": 65,
    "Jakhals (20)": 130,
    "Khorne Berzerkers (5)": 90,
    "Khorne Berzerkers (10)": 180,
    "Khorne Lord of Skulls": 450,
    "Kharn the Betrayer": 100,
    "Lord Invocatus": 140,
    "World Eaters Chaos Spawn (2)": 70,
    "World Eaters Daemon Prince": 185,
    "World Eaters Daemon Prince with Wings": 155,
    "World Eaters Defiler": 190,
    "World Eaters Forgefiend": 145,
    "World Eaters Helbrute": 130,
    "World Eaters Heldrake": 210,
    "World Eaters Land Raider": 240,
    "World Eaters Lord on Juggernaut": 80,
    "World Eaters Master of Executions": 110,
    "World Eaters Maulerfiend": 140,
    "World Eaters Predator Annihilator": 135,
    "World Eaters Predator Destructor": 140,
    "World Eaters Rhino": 75,
    "World Eaters Terminator Squad (5)": 180,
    "World Eaters Terminator Squad (10)": 360
  }
};

const sortByName = (a, b) => a.name.localeCompare(b.name);
const cachedArmyData = {};

export const get40kArmyData = (faction) => {
  if (!cachedArmyData[faction]) {
    const rawFactionData = ARMIES[faction];
    const points = POINTS[faction];

    // if faction is an (imperium or chaos) space marine chapter, pull the relevant units and points and merge them here
    if (rawFactionData.chapterInfo) {
      const parentFaction = ARMIES[rawFactionData.chapterInfo.parentFaction];
      const parentPoints = POINTS[rawFactionData.chapterInfo.parentFaction];
      if (parentFaction && parentPoints) {
        rawFactionData.characters.push(...parentFaction.characters); rawFactionData.characters.sort(sortByName);
        rawFactionData.battleline.push(...parentFaction.battleline); rawFactionData.battleline.sort(sortByName);
        rawFactionData.otherUnits.push(...parentFaction.otherUnits); rawFactionData.otherUnits.sort(sortByName);
        
        rawFactionData.enhancements = { ...rawFactionData.enhancements, ...parentFaction.enhancements };
        points.units = { ...points.units, ...parentPoints.units };
        points.enhancements = { ...points.enhancements, ...parentPoints.enhancements };
      }
    }

    const dataWithPoints = {
      characters: rawFactionData.characters.map(u => getPointsForUnit(u, points.units)),
      battleline: rawFactionData.battleline.map(u => getPointsForUnit(u, points.units)),
      otherUnits: rawFactionData.otherUnits.map(u => getPointsForUnit(u, points.units)),
      enhancements: getPointsForEnhancements(rawFactionData.enhancements, points.enhancements),
    };
    cachedArmyData[faction] = dataWithPoints;
  }
  return cachedArmyData[faction];
};

const getPointsForUnit = (unit, points) => {
  /*
  data structure:
  ["characters" | "battleline" | "otherUnits"]: [
    { name: "Ministorum Priest", modelCount: 1, tags: ["Penitent"] },
    {
      name: "Arco-flagellants",
      modelCount: [3, 10],
      tags: ["Penitent"],
      unitOptions: {
        unitSize: [3, 10],
      }
    },
    ...
  ]

  points structure:
  {
    "Ministorum Priest": 50,
    "Arco-flagellants": [45, 140],  // multiple unit size options
    ...
  }
  */
  
  const pointsForUnit = points[unit.name] ?? 0;
  return {
    ...unit,
    points: pointsForUnit
  };
};

const getPointsForEnhancements = (enhancementData, pointsData) => {
  let enhancementsWithPoints = {};
  Object.entries(enhancementData).forEach(([detachmentName, enhancements]) => {
    const pointsForDetachment = pointsData[detachmentName] ?? {};
    enhancementsWithPoints[detachmentName] = enhancements.map(enhData => ({
      ...enhData,
      points: pointsForDetachment[enhData.name] ?? 0,
    }));
  }); 
  return enhancementsWithPoints;
};
