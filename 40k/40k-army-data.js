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
    "units": [
      /* characters */
      { name: "Aestred Thurga and Agathae Dolan", modelCount: 2, tags: ["Character", "Epic Hero", "Infantry", "Grenades"] },
      { name: "Canoness", tags: ["Character", "Infantry", "Grenades", "Canoness"] },
      { name: "Canoness with Jump Pack", tags: ["Character", "Infantry", "Jump Pack", "Fly", "Grenades", "Canoness"] },
      { name: "Daemonifuge", modelCount: 2, tags: ["Character", "Epic Hero", "Infantry", "Grenades", "Daemonifuge"] },
      { name: "Dialogus", tags: ["Character", "Infantry", "Dialogus"] },
      { name: "Dogmata", tags: ["Character", "Infantry", "Grenades", "Dogmata"] },
      { name: "Hospitaller", tags: ["Character", "Infantry", "Hospitaller"] },
      { name: "Imagifier", tags: ["Character", "Infantry", "Grenades", "Imagifier"] },
      { name: "Junith Eruita", modelCount: 1, tags: ["Character", "Epic Hero", "Mounted", "Fly", "Junith Eruita"] },
      { name: "Ministorum Priest", modelCount: 1, tags: ["Character", "Infantry", "Penitent", "Ministorum Priest"] },
      { name: "Morvenn Vahl", modelCount: 1, tags: ["Character", "Epic Hero", "Vehicle", "Walker", "Morvenn Vahl"] },
      { name: "Palatine", modelCount: 1, tags: ["Character", "Infantry", "Grenades", "Palatine"] },
      { name: "Saint Celestine", modelCount: 3, tags: ["Character", "Epic Hero", "Infantry", "Jump Pack", "Fly", "Grenades", "Saint Celestine"] },
      { name: "Triumph of Saint Katherine", modelCount: 1, tags: ["Character", "Epic Hero", "Infantry", "Grenades", "Triumph of Saint Katherine"] },
      /* battleline */
      { name: "Battle Sisters Squad", modelCount: 10, tags: ["Battleline", "Infantry", "Grenades", "Battle Sisters Squad"] },
      /* dedicated transports */
      { name: "Immolator", tags: ["Vehicle", "Smoke", "Transport", "Dedicated Transport", "Immolator"] },
      { name: "Sororitas Rhino", tags: ["Vehicle", "Transport", "Dedicated Transport", "Smoke", "Sororitas Rhino"] },

      {
        name: "Arco-flagellants",
        modelCount: [3, 10],
        tags: ["Infantry", "Penitent", "Arco-flagellants"],
        unitOptions: {
          unitSize: [3, 10],
        }
      },
      { name: "Castigator", tags: ["Vehicle", "Smoke", "Castigator"] },
      {
        name: "Celestian Sacresants",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Celestian Sacresants"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Dominion Squad", modelCount: 10, tags: ["Infantry", "Grenades", "Dominion Squad"] },
      { name: "Exorcist", tags: ["Vehicle", "Smoke", "Exorcist"] },
      {
        name: "Mortifiers",
        modelCount: [1, 2],
        tags: ["Vehicle", "Walker", "Penitent", "Mortifiers"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      { name: "Paragon Warsuits", modelCount: 3, tags: ["Vehicle", "Walker", "Grenades", "Paragon Warsuits"] },
      {
        name: "Penitent Engines",
        modelCount: [1, 2],
        tags: ["Vehicle", "Walker", "Penitent", "Penitent Engines"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "Repentia Squad",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Penitent", "Repentia Squad"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Retributor Squad", modelCount: 5, tags: ["Infantry", "Grenades", "Retributor Squad"] },
      { name: "Sanctifiers", modelCount: 9, tags: ["Infantry", "Grenades", "Sanctifiers"] },
      {
        name: "Seraphim Squad",
        modelCount: [5, 10],
        tags: ["Infantry", "Jump Pack", "Fly", "Grenades", "Seraphim Squad"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Sisters Novitiate Squad", modelCount: 10, tags: ["Infantry", "Grenades", "Sisters Novitiate Squad"] },
      {
        name: "Zephyrim Squad",
        modelCount: [5, 10],
        tags: ["Infantry", "Jump Pack", "Fly", "Grenades", "Zephyrim Squad"],
        unitOptions: {
          unitSize: [5, 10],
        }
      }
    ],
    "detachments": [
      {
        "name": "Army of Faith",
        "enhancements": [
          { "name": "Blade of Saint Ellynor" },
          { "name": "Divine Aspect" },
          { "name": "Litanies of Faith", "tags": ["Canoness", "Palatine"] },
          { "name": "Triptych of the Macharian Crusade" }
        ]
      },
      {
        "name": "Bringers of Flame",
        "enhancements": [
          { "name": "Fire and Fury" },
          { "name": "Iron Surplice of Saint Istalela", "tags": ["Canoness", "Palatine"] },
          { "name": "Manual of Saint Griselda" },
          { "name": "Righteous Rage" }
        ]
      },
      {
        "name": "Champions of Faith",
        "enhancements": [
          { "name": "Eyes of the Oracle" },
          { "name": "Mark of Devotion" },
          { "name": "Sanctified Amulet" },
          { "name": "Triptych of Judgement" }
        ]
      },
      {
        "name": "Hallowed Martyrs",
        "enhancements": [
          { "name": "Chaplet of Sacrifice" },
          { "name": "Mantle of Ophelia", "tags": ["Canoness", "Palatine"] },
          { "name": "Saintly Example" },
          { "name": "Through Suffering, Strength" }
        ]
      },
      {
        "name": "Penitent Host",
        "enhancements": [
          { "name": "Catechism of Divine Penitence", "tags": ["Canoness", "Palatine", "Ministorum Priest"] },
          { "name": "Psalm of Righteous Judgement" },
          { "name": "Refrain of Enduring Faith", "tags": ["Penitent"] },
          { "name": "Verse of Holy Piety", "tags": ["Penitent"] }
        ]
      }
    ]
  },

  "Adeptus Custodes": {
    "units": [
      /* characters */
      { name: "Aleya", points: 65, tags: ["Character", "Epic Hero", "Infantry", "Anathema Psykana", "Aleya"] },
      { name: "Blade Champion", points: 120, tags: ["Character", "Infantry", "Blade Champion"] },
      { name: "Knight-Centura", points: 55, tags: ["Character", "Infantry", "Anathema Psykana", "Knight-Centura"] },
      { name: "Shield-Captain", points: 130, tags: ["Character", "Infantry", "Shield-Captain"] },
      { name: "Shield-Captain in Allarus Terminator Armour", points: 130, tags: ["Character", "Infantry", "Terminator", "Shield-Captain"] },
      { name: "Shield-Captain on Dawneagle Jetbike", points: 150, tags: ["Character", "Mounted", "Fly", "Dawneagle Jetbike", "Shield-Captain"] },
      { name: "Trajann Valoris", points: 140, tags: ["Character", "Epic Hero", "Infantry", "Trajann Valoris"] },
      { name: "Valerian", points: 110, tags: ["Character", "Epic Hero", "Infantry", "Shield-Captain", "Valerian"] },
      /* battleline */
      { name: "Custodian Guard", modelCount: [4, 5], tags: ["Battleline", "Infantry", "Custodian Guard"], unitOptions: { unitSize: [4, 5] } },
      /* dedicated transports */
      { name: "Anathema Psykana Rhino", tags: ["Vehicle", "Transport", "Dedicated Transport", "Smoke", "Anathema Psykana", "Rhino"] },

      { name: "Allarus Custodians", modelCount: [2, 3, 5, 6], tags: ["Infantry", "Terminator", "Allarus Custodians"], unitOptions: { unitSize: [2, 3, 5, 6] } },
      { name: "Custodian Wardens", modelCount: [4, 5], tags: ["Infantry", "Custodian Wardens"], unitOptions: { unitSize: [4, 5] } },
      { name: "Prosecutors", modelCount: [4, 5, 9, 10], tags: ["Infantry", "Anathema Psykana", "Prosecutors"], unitOptions: { unitSize: [4, 5, 9, 10] } },
      { name: "Venerable Contemptor Dreadnought", tags: ["Vehicle", "Walker", "Venerable Contemptor Dreadnought"] },
      { name: "Venerable Land Raider", tags: ["Vehicle", "Transport", "Smoke", "Venerable Land Raider"] },
      { name: "Vertus Praetors", modelCount: [2, 3], tags: ["Mounted", "Fly", "Vertus Praetors"], unitOptions: { unitSize: [2, 3] } },
      { name: "Vigilators", modelCount: [4, 5, 9, 10], tags: ["Infantry", "Anathema Psykana", "Vigilators"], unitOptions: { unitSize: [4, 5, 9, 10] } },
      { name: "Witchseekers", modelCount: [4, 5, 9, 10], tags: ["Infantry", "Anathema Psykana", "Witchseekers"], unitOptions: { unitSize: [4, 5, 9, 10] } },

      /* forge world models */
      { name: "Agamatus Custodians", modelCount: [3, 6], tags: ["Mounted", "Fly", "Agamatus Custodians"], unitOptions: { unitSize: [3, 6] } },
      { name: "Aquilon Custodians", modelCount: [3, 6], tags: ["Infantry", "Terminator", "Aquilon Custodians"], unitOptions: { unitSize: [3, 6] } },
      { name: "Ares Gunship", tags: ["Vehicle", "Aircraft", "Fly", "Ares Gunship"] },
      { name: "Caladius Grav-tank", tags: ["Vehicle", "Fly", "Caladius Grav-tank"] },
      { name: "Contemptor-Achillus Dreadnought", tags: ["Vehicle", "Walker", "Contemptor-Achillus Dreadnought"] },
      { name: "Contemptor-Galatus Dreadnought", tags: ["Vehicle", "Walker", "Contemptor-Galatus Dreadnought"] },
      { name: "Coronus Grav-carrier", tags: ["Vehicle", "Transport", "Fly", "Coronus Grav-carrier"] },
      { name: "Custodian Guard with Adrasite and Pyrithite Spears", modelCount: 5, tags: ["Infantry", "Custodian Guard with Adrasite and Pyrithite Spears"] },
      { name: "Orion Assault Dropship", tags: ["Vehicle", "Transport", "Aircraft", "Fly", "Orion Assault Dropship"] },
      { name: "Pallas Grav-attack", tags: ["Vehicle", "Fly", "Pallas Grav-attack"] },
      { name: "Sagittarum Custodians", modelCount: 5, tags: ["Infantry", "Sagittarum Custodians"] },
      { name: "Telemon Heavy Dreadnought", tags: ["Vehicle", "Walker", "Telemon Heavy Dreadnought"] },
      { name: "Venatari Custodians", modelCount: [3, 6], tags: ["Infantry", "Fly", "Jump Pack", "Venatari Custodians"], unitOptions: { unitSize: [3, 6] } },
    ],
    "detachments": [
      {
        "name": "Auric Champions",
        "enhancements": [
          { "name": "Blade Imperator" },
          { "name": "Inspirational Exemplar" },
          { "name": "Martial Philosopher" },
          { "name": "Veiled Blade" }
        ]
      },
      {
        "name": "Lions of the Emperor",
        "enhancements": [
          { "name": "Admonimortis", "tags": ["Shield-Captain"] },
          { "name": "Fierce Conqueror", "tags": ["Shield-Captain"] },
          { "name": "Praesidius" },
          { "name": "Superior Creation", "tags": ["Infantry"] }
        ]
      },
      {
        "name": "Null Maiden Vigil",
        "enhancements": [
          { "name": "Enhanced Voidsheen Cloak", "tags": ["Anathema Psykana"] },
          { "name": "Huntress' Eye", "tags": ["Anathema Psykana"] },
          { "name": "Oblivion Knight", "tags": ["Anathema Psykana"] },
          { "name": "Raptor Blade", "tags": ["Anathema Psykana"] }
        ]
      },
      {
        "name": "Shield Host",
        "enhancements": [
          { "name": "Auric Mantle", "tags": ["Shield-Captain", "Blade Champion"] },
          { "name": "Castellan's Mark", "tags": ["Shield-Captain"] },
          { "name": "From the Hall of Armouries", "tags": ["Shield-Captain"] },
          { "name": "Panoptispex", "tags": ["Shield-Captain", "Blade Champion"] }
        ]
      },
      {
        "name": "Solar Spearhead",
        "enhancements": [
          { "name": "Adamantine Talisman" },
          { "name": "Augury Uplink" },
          { "name": "Honoured Fallen", "tags": ["Vehicle"] },
          { "name": "Veteran of the Kataphraktoi", "tags": ["Infantry", "Mounted"] }
        ],
        "unitModifications": [
          { type: "addTags", target: "Walker", tags: ["Character"], max: 2 }
        ]
      },
      {
        "name": "Talons of the Emperor",
        "enhancements": [
          { "name": "Aegis Projector" },
          { "name": "Champion of the Imperium" },
          { "name": "Gift of Terran Artifice" },
          { "name": "Radiant Mantle" }
        ]
      }
    ]
  },

  "Adeptus Mechanicus": {
    "units": [
      /* characters */
      { name: "Belisarius Cawl", tags: ["Character", "Epic Hero", "Cult Mechanicus", "Tech-Priest", "Monster"] },
      { name: "Cybernetica Datasmith", tags: ["Character", "Infantry", "Legio Cybernetica", "Tech-Priest"] },
      { name: "Skitarii Marshal", tags: ["Character", "Infantry", "Skitarii"] },
      { name: "Sydonian Skatros", tags: ["Character", "Infantry", "Skitarii", "Sydonian"] },
      { name: "Tech-Priest Dominus", tags: ["Character", "Infantry", "Cult Mechanicus", "Tech-Priest"] },
      { name: "Tech-Priest Enginseer", tags: ["Character", "Infantry", "Cult Mechanicus", "Tech-Priest"] },
      { name: "Tech-Priest Manipulus", tags: ["Character", "Infantry", "Cult Mechanicus", "Tech-Priest"] },
      { name: "Technoarcheologist", tags: ["Character", "Infantry", "Cult Mechanicus", "Tech-Priest"] },
      /* battleline */
      { name: "Skitarii Rangers", tags: ["Battleline", "infantry", "skitarii"], modelCount: 10 },
      { name: "Skitarii Vanguard", tags: ["Battleline", "infantry", "skitarii"], modelCount: 10 },

      { name: "Archaeopter Fusilave", tags: ["vehicle", "aircraft", "fly", "skitarii"] },
      { name: "Archaeopter Stratoraptor", tags: ["vehicle", "aircraft", "fly", "skitarii"] },
      { name: "Archaeopter Transvector", tags: ["vehicle", "aircraft", "transport", "fly", "skitarii"] },
      { name: "Corpuscarii Electro-Priests", modelCount: [5, 10], tags: ["infantry", "cult mechanicus", "electro-priests"] },
      { name: "Fulgurite Electro-Priests", modelCount: [5, 10], tags: ["infantry", "cult mechanicus", "electro-priests"] },
      { name: "Ironstrider Ballistarii", modelCount: [1, 2, 3], tags: ["vehicle", "walker", "smoke", "skitarii"] },
      { name: "Kastelan Robots", modelCount: [2, 4], tags: ["vehicle", "walker", "legio cybernetica"] },
      { name: "Kataphron Breachers", modelCount: [3, 6], tags: ["infantry", "cult mechanicus", "kataphron"] },
      { name: "Kataphron Destroyers", modelCount: [3, 6], tags: ["infantry", "cult mechanicus", "kataphron"] },
      { name: "Onager Dunecrawler", tags: ["vehicle", "walker", "skitarii", "smoke"] },
      { name: "Pteraxii Skystalkers", modelCount: [5, 10], tags: ["infantry", "fly", "jump pack", "grenades", "skitarii", "pteraxii"] },
      { name: "Pteraxii Sterylizors", modelCount: [5, 10], tags: ["infantry", "fly", "jump pack", "skitarii", "pteraxii"] },
      { name: "Serberys Raiders", modelCount: [3, 6], tags: ["mounted", "skitarii"] },
      { name: "Serberys Sulphurhounds", modelCount: [3, 6], tags: ["mounted", "skitarii"] },
      { name: "Servitor Battleclade", modelCount: 9, tags: ["infantry", "cult mechanicus", "servitor"] },
      { name: "Sicarian Infiltrators", modelCount: [5, 10], tags: ["infantry", "skitarii", "sicarian"] },
      { name: "Sicarian Ruststalkers", modelCount: [5, 10], tags: ["infantry", "skitarii", "sicarian"] },
      { name: "Skorpius Disintegrator", tags: ["vehicle", "skitarii", "smoke"] },
      { name: "Skorpius Dunerider", tags: ["vehicle", "transport", "dedicated transport", "skitarii", "smoke"] },
      { name: "Sydonian Dragoons with Radium Jezzails", modelCount: [1, 2, 3], tags: ["vehicle", "walker", "smoke", "skitarii", "sydonian"] },
      { name: "Sydonian Dragoons with Taser Lances", modelCount: [1, 2, 3], tags: ["vehicle", "walker", "smoke", "skitarii", "sydonian"] },
    ],
    "detachments": [
      {
        "name": "Cohort Cybernetica",
        "enhancements": [
          { "name": "Arch-negator", "tags": ["Tech-Priest"] },
          { "name": "Emotionless Clarity", "tags": ["Tech-Priest"] },
          { "name": "Lord of Machines", "tags": ["Tech-Priest"] },
          { "name": "Necromechanic", "tags": ["Tech-Priest"] }
        ]
      },
      {
        "name": "Data-psalm Conclave",
        "enhancements": [
          { "name": "Data-blessed Autosermon", "tags": ["Tech-Priest"] },
          { "name": "Mantle of the Gnosticarch", "tags": ["Tech-Priest"] },
          { "name": "Mechanicus Locum", "tags": ["Tech-Priest"] },
          { "name": "Temporcopia", "tags": ["Tech-Priest"] }
        ]
      },
      {
        "name": "Explorator Maniple",
        "enhancements": [
          { "name": "Artisan", "tags": ["Tech-Priest"] },
          { "name": "Genetor", "tags": ["Tech-Priest"] },
          { "name": "Logis", "tags": ["Tech-Priest"] },
          { "name": "Magos", "tags": ["Tech-Priest"] }
        ]
      },
      {
        "name": "Haloscreed Battle Clade",
        "enhancements": [
          // TODO: add support for tag-negation when looking for enhancement options
          { "name": "Cognitive Reinforcement", "tags": ["!Cybernetica Datasmith"] },
          { "name": "Inloaded Lethality", "tags": ["Tech-Priest Dominus", "Tech-Priest Manipulus"] },
          { "name": "Sanctified Ordnance" },
          { "name": "Transoracular Dyad Wafer", "tags": ["Cybernetica Datasmith"] }
        ]
      },
      {
        "name": "Rad-zone Corps",
        "enhancements": [
          { "name": "Autoclavic Denunciation" },
          { "name": "Malphonic Susurrus" },
          { "name": "Peerless Eradicator" },
          { "name": "Radial Suffusion" }
        ]
      },
      {
        "name": "Skitarii Hunter Cohort",
        "enhancements": [
          { "name": "Battle-sphere Uplink", "tags": ["Skitarii"] },
          { "name": "Cantic Thrallnet", "tags": ["Skitarii Marshal"] },
          { "name": "Clandestine Infiltrator", "tags": ["Skitarii"] },
          { "name": "Veiled Hunter", "tags": ["Skitarii Marshal"] }
        ]
      }
    ]
  },

  "Aeldari": {
    "units": [
      /* characters */
      { name: "Asurmen", tags: ["Character", "Epic Hero", "Infantry", "Grenades", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Autarch", tags: ["Character", "Infantry", "Grenades", "Asuryani"] },
      { name: "Autarch Wayleaper", tags: ["Character", "Infantry", "Jump Pack", "Fly", "Grenades", "Asuryani"] },
      { name: "Avatar of Khaine", tags: ["Character", "Epic Hero", "Monster", "Daemon", "Asuryani"] },
      { name: "Baharroth", tags: ["Character", "Epic Hero", "Infantry", "Jump Pack", "Fly", "Grenades", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Death Jester", tags: ["Character", "Infantry", "Harlequin"] },
      { name: "Eldrad Ulthran", tags: ["Character", "Epic Hero", "Infantry", "Psyker", "Farseer", "Asuryani"] },
      { name: "Farseer", tags: ["Character", "Infantry", "Psyker", "Farseer", "Asuryani"] },
      { name: "Farseer Skyrunner", tags: ["Character", "Mounted", "Fly", "Psyker", "Farseer", "Asuryani"] },
      { name: "Fuegan", tags: ["Character", "Epic Hero", "Infantry", "Grenades", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Jain Zar", tags: ["Character", "Epic Hero", "Infantry", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Lhykhis", tags: ["Character", "Epic Hero", "Infantry", "Jump Pack", "Fly", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Maugan Ra", tags: ["Character", "Epic Hero", "Infantry", "Aspect Warrior", "Phoenix Lord", "Asuryani"] },
      { name: "Shadowseer", tags: ["Character", "Infantry", "Psyker", "Grenades", "Harlequin"] },
      { name: "Solitaire", tags: ["Character", "Epic Hero", "Infantry", "Harlequin"], warlord: false },
      { name: "Spiritseer", tags: ["Character", "Infantry", "Psyker", "Asuryani"] },
      { name: "The Visarch", tags: ["Character", "Epic Hero", "Infantry", "Ynnari"] },
      { name: "The Yncarne", tags: ["Character", "Epic Hero", "Monster", "Fly", "Psyker", "Daemon", "Ynnari"] },
      { name: "Troupe Master", tags: ["Character", "Infantry", "Grenades", "Harlequin"] },
      { name: "Warlock", tags: ["Character", "Infantry", "Psyker", "Asuryani"] },
      { name: "Ynnari Archon", tags: ["Character", "Infantry", "Archon", "Ynnari"] },
      { name: "Ynnari Succubus", tags: ["Character", "Infantry", "Ynnari"] },
      { name: "Yvraine", tags: ["Character", "Epic Hero", "Infantry", "Psyker", "Ynnari"] },
      /* battleline */
      {
        name: "Corsair Voidreavers",
        modelCount: [5, 10],
        tags: ["Battleline", "Infantry", "Grenades", "Anhrathe", "Corsair Voidreavers", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Guardian Defenders", modelCount: 11, tags: ["Battleline", "Infantry", "Grenades", "Guardians", "Guardian Defenders", "Asuryani"] },
      { name: "Storm Guardians", modelCount: 11, tags: ["Battleline", "Infantry", "Grenades", "Guardians", "Storm Guardians", "Asuryani"] },
      { name: "Ynnari Kabalite Warriors", modelCount: 10, tags: ["Battleline", "Infantry", "Kabalite Warriors", "Ynnari"] },
      { name: "Ynnari Wyches", modelCount: 10, tags: ["Battleline", "Infantry", "Grenades", "Wyches", "Ynnari"] },

      /* dedicated transports */
      { name: "Starweaver", modelCount: 1, tags: ["Vehicle", "Transport", "Dedicated Transport", "Smoke", "Fly", "Starweaver", "Harlequin"] },
      { name: "Wave Serpent", modelCount: 1, tags: ["Vehicle", "Transport", "Dedicated Transport", "Fly", "Wave Serpent", "Asuryani"] },
      { name: "Ynnari Raider", modelCount: 1, tags: ["Vehicle", "Transport", "Dedicated Transport", "Fly", "Raider", "Ynnari"] },
      { name: "Ynnari Venom", modelCount: 1, tags: ["Vehicle", "Transport", "Dedicated Transport", "Fly", "Venom", "Ynnari"] },

      {
        name: "Corsair Voidscarred",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Anhrathe", "Corsair Voidscarred", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Crimson Hunter", tags: ["Vehicle", "Fly", "Aircraft", "Aspect Warrior", "Crimson Hunter", "Asuryani"] },
      { name: "D-cannon Platform", tags: ["Infantry", "Support Weapon", "D-cannon Platform", "Asuryani"] },
      {
        name: "Dark Reapers",
        modelCount: [5, 10],
        tags: ["Infantry", "Aspect Warrior", "Dark Reapers", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Dire Avengers",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Aspect Warrior", "Dire Avengers", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Falcon", tags: ["Vehicle", "Fly", "Transport", "Falcon", "Asuryani"] },
      {
        name: "Fire Dragons",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Aspect Warrior", "Fire Dragons", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Fire Prism", tags: ["Vehicle", "Fly", "Fire Prism", "Asuryani"] },
      { name: "Hemlock Wraithfighter", tags: ["Vehicle", "Fly", "Aircraft", "Psyker", "Wraith Construct", "Hemlock Wraithfighter", "Asuryani"] },
      {
        name: "Howling Banshees",
        modelCount: [5, 10],
        tags: ["Infantry", "Aspect Warrior", "Howling Banshees", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Night Spinner", tags: ["Vehicle", "Fly", "Night Spinner", "Asuryani"] },
      {
        name: "Rangers",
        modelCount: [5, 10],
        tags: ["Infantry", "Rangers", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      { name: "Shadow Weaver Platform", tags: ["Infantry", "Support Weapon", "Shadow Weaver Platform", "Asuryani"] },
      {
        name: "Shining Spears",
        modelCount: [3, 6],
        tags: ["Mounted", "Fly", "Aspect Warrior", "Shining Spears", "Asuryani"],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Shroud Runners", modelCount: [3, 6], tags: ["Mounted", "Fly", "Shroud Runners", "Asuryani"],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      {
        name: "Skyweavers", modelCount: [2, 4], tags: ["Mounted", "Fly", "Smoke", "Skyweavers", "Harlequin"],
        unitOptions: {
          unitSize: [2, 4],
        }
      },
      {
        name: "Striking Scorpions", modelCount: [5, 10], tags: ["Infantry", "Aspect Warrior", "Striking Scorpions", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Swooping Hawks", modelCount: [5, 10], tags: ["Infantry", "Jump Pack", "Fly", "Grenades", "Aspect Warrior", "Swooping Hawks", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Troupe", modelCount: [5, 6, 11, 12], tags: ["Infantry", "Grenades", "Troupe", "Harlequin"],
        unitOptions: {
          unitSize: [5, 6, 11, 12],
        }
      },
      { name: "Vibro Cannon Platform", tags: ["Infantry", "Support Weapon", "Vibro Cannon Platform", "Asuryani"] },
      { name: "Voidweaver", tags: ["Vehicle", "Fly", "Voidweaver", "Harlequin"] },
      {
        name: "Vyper", modelCount: [1, 2], tags: ["Vehicle", "Fly", "Vyper", "Asuryani"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "War Walker", modelCount: [1, 2], tags: ["Vehicle", "Walker", "War Walker", "Asuryani"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "Warlock Conclave", modelCount: [2, 4], tags: ["Infantry", "Psyker", "Warlock", "Warlock Conclave", "Asuryani"],
        unitOptions: {
          unitSize: [2, 4],
        }
      },
      {
        name: "Warlock Skyrunners", modelCount: [1, 2], tags: ["Mounted", "Fly", "Psyker", "Warlock", "Warlock Skyrunners", "Asuryani"],
        unitOptions: {
          unitSize: [1, 2],
        }
      },
      {
        name: "Warp Spiders", modelCount: [5, 10], tags: ["Infantry", "Jump Pack", "Fly", "Aspect Warrior", "Warp Spiders", "Asuryani"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Windriders", modelCount: [3, 6], tags: ["Mounted", "Fly", "Windriders", "Asuryani"],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      { name: "Wraithblades", modelCount: 5, tags: ["Infantry", "Wraith Construct", "Wraithblades", "Asuryani"] },
      { name: "Wraithguard", modelCount: 5, tags: ["Infantry", "Wraith Construct", "Wraithguard", "Asuryani"] },
      { name: "Wraithknight", tags: ["Monster", "Titanic", "Towering", "Walker", "Wraith Construct", "Wraithknight", "Asuryani"] },
      { name: "Wraithknight with Ghostglaive", modelCount: 1, tags: ["Monster", "Titanic", "Towering", "Walker", "Wraith Construct", "Wraithknight with Ghostglaive", "Asuryani"] },
      { name: "Wraithlord", modelCount: 1, tags: ["Monster", "Walker", "Wraith Construct", "Wraithlord", "Asuryani"] },
      {
        name: "Ynnari Incubi", modelCount: [5, 10], tags: ["Infantry", "Ynnari Incubi", "Ynnari"],
        unitOptions: {
          unitSize: [5, 10],
        }
      },
      {
        name: "Ynnari Reavers", modelCount: [3, 6], tags: ["Mounted", "Fly", "Ynnari Reavers", "Ynnari"],
        unitOptions: {
          unitSize: [3, 6],
        }
      },
      { name: "Phantom Titan", modelCount: 1, tags: ["Monster", "Titanic", "Towering", "Walker", "Wraith Construct", "Phantom Titan", "Asuryani"] },
      { name: "Revenant Titan", modelCount: 1, tags: ["Monster", "Titanic", "Towering", "Walker", "Fly", "Wraith Construct", "Revenant Titan", "Asuryani"] },
    ],
    "detachments": [
      {
        "name": "Armoured Warhost",
        "enhancements": [
          { "name": "Guiding Presence", "tags": ["Psyker"] },
          { "name": "Guileful Strategist" },
          { "name": "Harmonisation Matrix" },
          { "name": "Spirit Stone of Raelyth", "tags": ["Psyker"] }
        ]
      },
      {
        "name": "Aspect Host",
        "enhancements": [
          { "name": "Aspect of Murder", "tags": ["Autarch", "Autarch Wayleaper"] },
          { "name": "Mantle of Wisdom", "tags": ["Autarch", "Autarch Wayleaper"] },
          { "name": "Shimmerstone", "tags": ["Autarch", "Autarch Wayleaper"] },
          { "name": "Strategic Savant", "tags": ["Autarch", "Autarch Wayleaper"] }
        ]
      },
      {
        "name": "Devoted of Ynnead",
        "enhancements": [
          { "name": "Borrowed Vigour", "tags": ["Archon"] },
          { "name": "Gaze of Ynnead", "tags": ["Farseer"] },
          { "name": "Morbid Might", "tags": ["Succubus"] },
          { "name": "Storm of Whispers", "tags": ["Warlock"] }
        ]
      },
      {
        "name": "Ghosts of the Webway",
        "enhancements": [
          { "name": "Cegorach’s Coil", "tags": ["Troupe Master"] },
          { "name": "Mask of Secrets", "tags": ["Harlequin"] },
          { "name": "Mistweave", "tags": ["Shadowseer"] },
          { "name": "Murder’s Jest", "tags": ["Death Jester"] }
        ]
      },
      {
        "name": "Guardian Battlehost",
        "enhancements": [
          { "name": "Breath of Vaul", "tags": ["Asuryani"] },
          { "name": "Craftworld’s Champion", "tags": ["Asuryani"] },
          { "name": "Ethereal Pathway", "tags": ["Asuryani"] },
          { "name": "Protector of the Paths", "tags": ["Asuryani"] }
        ]
      },
      {
        "name": "Seer Council",
        "enhancements": [
          // TODO: add support for multi-tag matching
          { "name": "Lucid Eye", "tags": ["Asuryani+Psyker"] },
          { "name": "Runes of Warding", "tags": ["Asuryani+Psyker"] },
          { "name": "Stone of Eldritch Fury", "tags": ["Asuryani+Psyker"] },
          { "name": "Torc of Morai-Heg", "tags": ["Asuryani+Psyker"] }
        ]
      },
      {
        "name": "Spirit Conclave",
        "enhancements": [
          { "name": "Higher Duty", "tags": ["Spiritseer"] },
          { "name": "Light of Clarity", "tags": ["Spiritseer"] },
          { "name": "Rune of Mists", "tags": ["Spiritseer"] },
          { "name": "Stave of Kurnous", "tags": ["Spiritseer"] }
        ]
      },
      {
        "name": "Warhost",
        "enhancements": [
          { "name": "Gift of Foresight", "tags": ["Asuryani"] },
          { "name": "Phoenix Gem", "tags": ["Asuryani"] },
          { "name": "Psychic Destroyer", "tags": ["Asuryani+Psyker"] },
          { "name": "Timeless Strategist", "tags": ["Asuryani"] }
        ]
      },
      {
        "name": "Windrider Host",
        "enhancements": [
          { "name": "Echoes of Ulthanesh", "tags": ["Asuryani+Mounted"] },
          { "name": "Firstdrawn Blade", "tags": ["Asuryani+Mounted"] },
          { "name": "Mirage Field", "tags": ["Asuryani+Mounted"] },
          { "name": "Seersight Strike", "tags": ["Asuryani+Mounted+Psyker"] }
        ]
      }
    ]
  },

  "Astra Militarum": {
    "units": [],
    "detachments": []
  },

  "Black Templars": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more BLACK TEMPLARS units, it cannot include any ADEPTUS ASTARTES PSYKER models, and cannot include any of the following models that do not have the Black Templars keyword: GLADIATOR LANCER; GLADIATOR REAPER; GLADIATOR VALIANT; IMPULSOR; REPULSOR; REPULSOR EXECUTIONER.
      */
    },
    "units": [],
    "detachments": []
  },

  "Blood Angels": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more DEATHWATCH units, it cannot include any of the following units: DEVASTATOR SQUAD; SCOUT SQUAD; TACTICAL SQUAD.
      */
    },
    "units": [
      /* characters */
      { name: "Astorath", points: 105, tags: ["Character", "Epic Hero"] },
      { name: "Blood Angels Captain", points: 80, tags: ["Character"] },
      { name: "Chief Librarian Mephiston", points: 135, tags: ["Character", "Epic Hero"] },
      { name: "Commander Dante", points: 130, tags: ["Character", "Epic Hero"] },
      { name: "Death Company Captain", points: 70, tags: ["Character"] },
      { name: "Death Company Captain with Jump Pack", points: 75, tags: ["Character"] },
      { name: "Lemartes", points: 110, tags: ["Character", "Epic Hero"] },
      { name: "Sanguinary Priest", points: 90, tags: ["Character"] },
      { name: "The Sanguinor", points: 140, tags: ["Character", "Epic Hero"] },
      /* battleline */
      {
        name: "Death Company Marines",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Tacticus", "Death Company", "Death Company Marines"],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Death Company Marines with Bolt Rifles",
        modelCount: [5, 10],
        tags: ["Infantry", "Grenades", "Tacticus", "Death Company", "Death Company Marines with Bolt Rifles"],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Death Company Marines with Jump Packs",
        modelCount: [5, 10],
        tags: ["Infantry", "Jump Pack", "Fly", "Grenades", "Tacticus", "Death Company", "Death Company Marines with Jump Packs"],
        unitOptions: { unitSize: [5, 10] }
      },
      {
        name: "Sanguinary Guard",
        modelCount: [3, 6],
        tags: ["Infantry", "Fly", "Jump Pack", "Grenades", "Tacticus", "Sanguinary Guard"],
        unitOptions: { unitSize: [3, 6] }
      },
      {
        name: "Baal Predator",
        points: 135,
        tags: ["Vehicle", "Smoke", "Baal Predator"]
      },
      {
        name: "Death Company Dreadnought",
        points: 180,
        tags: ["Vehicle", "Walker", "Dreadnought", "Death Company", "Death Company Dreadnought"]
      }
    ],
    "detachments": [
      {
        "name": "Angelic Inheritors",
        "enhancements": [
          { "name": "Blazing Icon", tags: ["Infantry"] },
          { "name": "Ordained Sacrifice" },
          { "name": "Prescient Flash" },
          { "name": "Troubling Visions" }
        ]
      },
      {
        "name": "Liberator Assault Group",
        "enhancements": [
          { "name": "Gift of Foresight" },
          { "name": "Icon of the Angel" },
          { "name": "Rage-fuelled Warrior" },
          { "name": "Speed of the Primarch" }
        ]
      },
      {
        "name": "The Angelic Host",
        "enhancements": [
          { "name": "Archangel's Shard", tags: ["Jump Pack"]  },
          { "name": "Artisan of War", tags: ["Jump Pack"] },
          { "name": "Gleaming Pinions", tags: ["Jump Pack"]  },
          { "name": "Visage of Death", tags: ["Jump Pack"]  }
        ]
      },
      {
        "name": "The Lost Brethren",
        "enhancements": [
          { "name": "Blood Shard", tags: ["Death Company"] },
          { "name": "Sanguinius' Grace", tags: ["Death Company"] },
          { "name": "To Slay the Warmaster", tags: ["Death Company"] },
          { "name": "Vengeful Onslaught", tags: ["Death Company"] }
        ],
        "unitModifications": [
          {
            type: "addTags",
            target: "Death Company Marines",
            tags: ["Battleline"],
          },
          {
            type: "addTags",
            target: "Death Company Marines with Bolt Rifles",
            tags: ["Battleline"],
          },
        ],
      }
    ]
  },

  "Chaos Daemons": {
    "units": [],
    "detachments": []
  },

  "Chaos Knights": {
    "units": [],
    "detachments": []
  },

  "Chaos Space Marines": {
    "units": [
      /* characters */
      { name: "Abaddon the Despoiler", tags: ["Character", "Epic Hero"] },
      { name: "Chaos Lord", tags: ["Character", "Chaos Lord"] },
      { name: "Chaos Lord In Terminator Armour", tags: ["Character", "Chaos Lord"] },
      { name: "Chaos Lord with Jump Pack", tags: ["Character", "Chaos Lord"] },
      { name: "Cultist Firebrand", tags: ["Character", "Damned"] },
      { name: "Cypher", tags: ["Character", "Epic Hero", "Fallen"] },
      { name: "Dark Apostle", tags: ["Character"] },
      { name: "Dark Commune", tags: ["Character", "Damned"] },
      { name: "Fabius Bile", tags: ["Character", "Epic Hero"] },
      { name: "Haarken Worldclaimer", tags: ["Character", "Epic Hero"] },
      { name: "Heretic Astartes Daemon Prince", tags: ["Character", "Daemon Prince"] },
      { name: "Heretic Astartes Daemon Prince With Wings", tags: ["Character", "Daemon Prince"] },
      { name: "Huron Blackheart", tags: ["Character", "Epic Hero"] },
      { name: "Lord Discordant On Helstalker", tags: ["Character"] },
      { name: "Master of Executions", tags: ["Character"] },
      { name: "Master of Possession", tags: ["Character"] },
      { name: "Sorcerer", tags: ["Character"] },
      { name: "Sorcerer In Terminator Armour", tags: ["Character"] },
      { name: "Traitor Enforcer", tags: ["Character", "Damned"] },
      { name: "Vashtorr The Arkifane", tags: ["Character", "Epic Hero"] },
      { name: "Warpsmith", tags: ["Character"] },
      /* battleline */
      { name: "Cultist Mob", tags: ["Battleline", "Damned"], unitOptions: { unitSize: [8, 16] } },
      { name: "Legionaries", tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      // { name: "Khorne Berzerkers", tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      // { name: "Plague Marines", tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      // { name: "Rubric Marines", tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      { name: "Accursed Cultists", tags: ["Damned"], unitOptions: { unitSize: [8, 16] } },
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
      { name: "Fellgor Beastmen", tags: ["Damned"] },
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
      { name: "Traitor Guardsmen Squad", tags: ["Damned"], unitOptions: { unitSize: [5, 10] } },
      { name: "Venomcrawler" },
      { name: "Warp Talons" },
      // { name: "Noise Marines", unitOptions: { unitSize: [5, 10] } },
    ],
    "detachments": [
      {
        "name": "Cabal of Chaos",
        "enhancements": [
          { name: "Eye of Z’desh" },
          { name: "Infernal Avatar", tags: ["Daemon Prince"] },
          { name: "Mind Blade", tags: ["Psyker"] },
          { name: "Touched by the Warp", tags: ["!Khorne"] },
        ]
      },
      {
        "name": "Chaos Cult",
        "enhancements": [
          { name: "Amulet of Tainted Vigour", tags: ["Dark Apostle"] },
          { name: "Cultist’s Brand", tags: ["Dark Apostle", "Damned"] },
          { name: "Incendiary Goad", tags: ["Dark Apostle", "Damned"] },
          { name: "Warped Foresight", tags: ["Dark Apostle", "Damned"] }
        ]
      },
      {
        "name": "Creations of Bile",
        "enhancements": [
          { name: "Helm of All-seeing", tags: ["Infantry"] },
          { name: "Living Carapace", tags: ["Chaos Lord"] },
          { name: "Prime Test Subject", tags: ["Infantry"] },
          { name: "Surgical Precision", tags: ["!Damned"] },
        ]
      },
      {
        "name": "Deceptors",
        "enhancements": [
          { "name": "Cursed Fang", tags: ["Infantry"] },
          { "name": "Falsehood", tags: ["Chaos Lord+!Terminator+!Jump Pack"] },
          { "name": "Shroud of Obfuscation", tags: ["Infantry"] },
          { "name": "Soul Link", tags: ["Infantry"] },
        ]
      },
      {
        "name": "Dread Talons",
        "enhancements": [
          { "name": "Eater of Dread" },
          { "name": "Night’s Shroud", tags: ["Chaos Lord+!Terminator"] },
          { "name": "Warp-fuelled Thrusters", tags: ["Chaos Lord with Jump Pack"] },
          { "name": "Willbreaker" }
        ]
      },
      {
        "name": "Fellhammer Siege-host",
        "enhancements": [
          { "name": "Bastion Plate", tags: ["Chaos Lord+!Jump Pack"] },
          { "name": "Iron Artifice", tags: ["Infantry"] },
          { "name": "Ironbound Enmity" },
          { "name": "Warp Tracer" }
        ]
      },
      {
        "name": "Pactbound Zealots",
        "enhancements": [
          { name: "Eye of Tzeentch", tags: ["Tzeentch"] },
          { name: "Intoxicating Elixir", tags: ["Slaanesh"] },
          { name: "Orbs of Unlife", tags: ["Nurgle"] },
          { name: "Talisman of Burning Blood", tags: ["Khorne"] },
        ]
      },
      {
        "name": "Renegade Raiders",
        "enhancements": [
          { "name": "Despot’s Claim" },
          { "name": "Dread Reaver" },
          { "name": "Mark of the Hound" },
          { "name": "Tyrant’s Lash" }
        ]
      },
      {
        "name": "Soulforged Warpack",
        "enhancements": [
          { name: "Forge’s Blessing" },
          { name: "Invigorated Mechatendrils", tags: ["Warpsmith"] },
          { name: "Tempting Addendum" },
          { name: "Soul Harvester" },
        ]
      },
      {
        "name": "Veterans of the Long War",
        "enhancements": [
          { "name": "Eager for Vengeance", tags: ["!Damned"]  },
          { "name": "Eye of Abaddon", tags: ["!Damned"]  },
          { "name": "Mark of Legend", tags: ["!Damned"] },
          { "name": "Warmaster’s Gift", tags: ["Chaos Lord"] },
        ]
      }
    ]
  },

  "Dark Angels": {
    "chapterInfo": {
      parentFaction: "Space Marines",
    },
    "units": [],
    "detachments": []
  },

  "Death Guard": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "units": [],
    "detachments": []
  },

  "Deathwatch": {
    "chapterInfo": {
      parentFaction: "Space Marines",
      /*
      If your army includes one or more DEATHWATCH units, it cannot include any of the following units: DEVASTATOR SQUAD; SCOUT SQUAD; TACTICAL SQUAD.
      */
    },
    "units": [],
    "detachments": []
  },

  "Drukhari": {
    "units": [],
    "detachments": []
  },

  "Emperor's Children": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "units": [],
    "detachments": []
  },

  "Genestealer Cults": {
    "units": [],
    "detachments": []
  },

  "Grey Knights": {
    "units": [],
    "detachments": []
  },

  "Imperial Agents": {
    "units": [],
    "detachments": []
  },

  "Imperial Knights": {
    "units": [],
    "detachments": []
  },

  "Leagues of Votann": {
    "units": [
      /* characters */
      {
        name: "Arkanyst Evaluator",
        tags: ["Character", "Infantry", "Arkanyst Evaluator"],
        weapons: [
          { name: "Transmatter inverter" },
          { name: "Close combat weapon" },
        ]
      },
      {
        name: "Brôkhyr Iron-master",
        tags: ["Character", "Infantry", "Brôkhyr", "Brôkhyr Iron-master"],
        weapons: [
          { name: "Graviton rifle" },
          { name: "Graviton hammer" },
        ]
      },
      {
        name: "Buri Aegnirssen",
        tags: ["Character", "Infantry", "Epic Hero"],
        weapons: [
          { name: "Autoch-pattern bolt pistol" },
          { name: "Bane" },
        ]
      },
      {
        name: "Einhyr Champion",
        tags: ["Character", "Infantry", "Exoarmor"],
        weapons: [
          { name: "Autoch-pattern combi-bolter", count: 0 },
          { name: "Mass hammer", count: 0 },
        ],
        wargear: [
          { name: "Weavefield crest", count: 0 },
        ],
        unitOptions: {
          weapons: [
            { name: "Darkstar axe", replaces: "Mass hammer" },
          ],
          wargear: [
            { name: "Teleport crest", replaces: "Weavefield crest" },
          ]
        }
      },
      {
        name: "Grimnyr",
        tags: ["Character", "Infantry", "Psyker", "Grimnyr"],
        weapons: [
          { name: "Ancestral Wrath" },
          { name: "Ancestral Ward Stave" },
        ],
      },
      {
        name: "Kâhl",
        tags: ["Character", "Infantry", "Kâhl"],
        weapons: [
          { name: "Autoch-pattern combi-bolter" },
          { name: "Forgewrought plasma axe" },
        ],
        wargear: [
          { name: "Rampart crest" },
        ],
        unitOptions: {
          weapons: [
            { name: "Volkanite disintegrator", replaces: "Autoch-pattern combi-bolter" },
            { name: "Mass gauntlet", replaces: "Forgewrought plasma axe" },
          ],
          wargear: [
            { name: "Teleport crest", replaces: "Rampart crest" },
          ]
        }
      },
      {
        name: "Memnyr Strategist",
        tags: ["Character", "Infantry", "Memnyr Strategist"],
        weapons: [
          { name: "Autoch-pattern bolt pistol" },
          { name: "Close combat weapon" },
        ]
      },
      {
        name: "Ûthar the Destined", tags: ["Character", "Infantry", "Kâhl", "Epic Hero"],
        weapons: [
          { name: "Volkanite disintegrator" },
          { name: "Blade of the Ancestors" },
        ],
        wargear: [
          { name: "Rampart crest" },
        ],
      },
      /* battleline */
      {
        name: "Hearthkyn Warriors",
        modelCount: 10,
        tags: ["Battleline", "Infantry", "Grenades", "Hearthkyn Warriors"],
        weapons: [
          { name: "Theyn’s autoch-pattern bolt pistol", count: 1 },
          { name: "Theyn’s autoch-pattern bolter", count: 1 },
          { name: "Theyn’s close combat weapon", count: 1 },
          { name: "Autoch-pattern bolt pistol", count: 9 },
          { name: "Autoch-pattern bolter", count: 9 },
          { name: "Close combat weapon", count: 9 },
        ],
        wargear: [
          { name: "Weavefield crest", count: 1 },
        ],
        unitOptions: {
          weapons: [
            { name: ["Theyn’s ion blaster", "Theyn’s pistol"], replaces: "Theyn’s autoch-pattern bolter", max: 1 },
            { name: "Theyn’s melee weapon", replaces: "Theyn’s close combat weapon", max: 1 },
            { name: "Ion blaster", replaces: "Autoch-pattern bolter", max: 9 },
            { name: "Plasma knife", replaces: ["Autoch-pattern bolter", "Ion blaster"], max: 2 },
            /* whew no idea how to encode this:
              Up to 2 Hearthkyn Warriors can each have their Autoch-pattern bolter or ion blaster replaced with one of the following (duplicates are not allowed):
                1 HYLas auto rifle
                1 HYLas rotary cannon
                1 L7 missile launcher
                1 EtaCarn plasma beamer
                1 magna-rail rifle
            */
            { name: ["HYLas auto rifle", "HYLas rotary cannon", "L7 missile launcher", "EtaCarn plasma beamer", "Magna-rail rifle"], replaces: ["Autoch-pattern bolter", "Ion blaster"], max: 2 },
          ]
        }
      },

      /* dedicated transports */
      {
        name: "Kapricus Carrier",
        tags: ["Vehicle", "Fly", "Transport", "Dedicated Transport", "Hernkyn", "Kapricus"],
        weapons: [
          { name: "Magna-coil autocannon" },
          { name: "Twin magna-coil autocannon" },
          { name: "Armoured hull" },
        ],
        wargear: [
          { name: "Smoke launcher" },
        ]
      },
      {
        name: "Sagitaur",
        tags: ["Vehicle", "Transport", "Dedicated Transport"],
        weapons: [
          { name: "HYLas beam cannon" },
          { name: "Twin bolt cannon" },
          { name: "Armoured wheels" },
        ]
      },

      {
        name: "Brôkhyr Thunderkyn",
        modelCount: [3, 6],
        tags: ["Infantry", "Exoframe", "Brôkhyr", "Thunderkyn"],
        weapons: [
          { name: "Bolt cannon", count: 0 },
          { name: "Close combat weapon", count: 0 },
        ],
        unitOptions: {
          unitSize: [3, 6],
          weapons: [
            { name: ["Graviton blast cannon", "SP conversion beamer"], replaces: "Bolt cannon" },
          ]
        },
      },
      {
        name: "Cthonian Beserks",
        modelCount: [5, 10],
        tags: ["Infantry", "Cthonian", "Beserks"],
        weapons: [
          { name: "Heavy plasma axe", count: 0 },
        ],
        unitOptions: {
          unitSize: [5, 10],
          weapons: [
            {
              name: "Twin concussion gauntlets",
              max: 1,
              replaces: ["Heavy plasma axe", "Concussion maul"] 
            },
            {
              name: "Concussion maul",
              replaces: "Heavy plasma axe"
            },
            {
              name: "Mole grenade launcher",
              max: 1
            }
          ]
        }
      },
      {
        name: "Cthonian Earthshakers",
        tags: ["Infantry", "Artillery", "Cthonian", "Earthshakers"],
        modelCount: 2,
        weapons: [
          { name: "Plasma picks", count: 0 },
          { name: "Autoch-pattern bolt pistol", count: 4 },
          { name: "Breacher ordnance", count: 0 },
        ],
        unitOptions: {
          weapons: [
            {
              name: "Tremor shells",
              replaces: "Breacher ordnance",
            }
          ]
        }
      },
      {
        name: "Einhyr Hearthguard",
        modelCount: [5, 10],
        tags: ["Infantry", "Exoarmor", "Einhyr Hearthguard"],
        weapons: [
          { name: "Exo-armour grenade launcher", count: 0 },
          { name: "EtaCarn plasma gun", count: 0 },
          { name: "Concussion gauntlet", count: 0 },
        ],
        wargear: [
          { name: "Weavefield crest", count: 1 },
        ],
        unitOptions: {
          unitSize: [5, 10],
          weapons: [
            { name: "Volkanite disintegrator", replaces: "EtaCarn plasma gun" },
            { name: "Plasma blade gauntlet", replaces: "Concussion gauntlet" },
            { name: "Hesyr’s Graviton hammer", replaces: ["Concussion gauntlet", "Plasma blade gauntlet"], max: 1 },
          ],
          wargear: [
            { name: "Teleport crest", replaces: "Weavefield crest" },
          ]
        }
      },
      {
        name: "Hekaton Land Fortress",
        tags: ["Vehicle", "Transport"],
        weapons: [
          { name: "Cyclic ion cannon" },
          { name: "MATR autocannon" },
          { name: "2 Twin bolt cannons", count: 2 },
          { name: "Armoured wheels" },
        ],
        wargear: [
          { name: "Pan spectral scanner" },
        ]
      },
      {
        name: "Hernkyn Pioneers",
        tags: ["Mounted", "Grenades", "Fly", "Hernkyn", "Pioneers"],
        weapons: [
          { name: "Bolt revolver" },
          { name: "Bolt shotgun" },
          { name: "Magna-coil autocannon" },
          { name: "Plasma knife" },
        ],
        unitOptions: {
          unitSize: [3, 6],
          weapons: [
            // For every 3 models in this unit, 1 model can be equipped with one of the following:
            { name: ["HYLas rotary cannon", "Ion beamer"], max: 1 },
          ],
          wargear: [
            // 1 model that is not equipped with either a HYLas rotary cannon or an ion beamer can be equipped with...
            { name: "Multiwave Comms Array", max: 1 },
            { name: "Panspectral Scanner", max: 1 },
            { name: "Rollbar Searchlight", max: 1 },
          ]
        }
      },
      {
        name: "Hernkyn Yaegirs",
        modelCount: 10,
        tags: ["Infantry", "Grenades", "Hernkyn Yaegirs"],
        weapons: [
          { name: "Bolt shotgun" },
          { name: "Close combat weapon" },
        ],
        unitOptions: {
          weapons: [
            { name: "Bolt revolver & Plasma knife", replaces: "Bolt shotgun" },
            { name: "Magna-coil rifle", replaces: ["Bolt revolver & Plasma knife", "Bolt shotgun"], max: 1 },
            { name: "APM launcher", replaces: ["Bolt revolver & Plasma knife", "Bolt shotgun"], max: 1 },
          ]
        }
      },
      {
        name: "Ironkin Steeljacks w/ Volkanite Disintegrators",
        modelCount: [3, 6],
        tags: ["Infantry", "Ironkin Steeljacks", "Ironkin Steeljacks with Heavy Volkanite Disintegrators"],
        weapons: [
          { name: "Heavy volkanite disintegrator & Plasma knife" },
        ],
        wargear: [
          { name: "Preymark crest" },
        ],
        unitOptions: {
          unitSize: [3, 6],
          weapons: [
            // (these upgrades are paired, if you take one you have to take the other too; there's probably a better way to encode this)
            { name: "Steeljack Theyn’s autoch-pattern bolter & Plasma sword", replaces: "Heavy volkanite disintegrator & Plasma knife", max: 1 },
          ]
        }
      },
      {
        name: "Ironkin Steeljacks w/ Melee Weapons",
        modelCount: [3, 6],
        tags: ["Infantry", "Ironkin Steeljacks", "Ironkin Steeljacks with Melee Weapons"],
        weapons: [
          { name: "Autoch-pattern bolter" },
          { name: "Plasma sword" },
        ],
        wargear: [
          { name: "Preymark crest" },
        ],
        unitOptions: {
          unitSize: [3, 6],
          weapons: [
            { name: "Concussion gauntlet", replaces: "Plasma sword" },
          ]
        }
      },
      {
        name: "Kapricus Defender",
        modelCount: [1, 2],
        tags: ["Vehicle", "Fly", "Hernkyn", "Kapricus", "Defenders"],
        weapons: [
          { name: "Magna-rail cannon" },
          { name: "Twin magna-coil autocannon" },
          { name: "Armoured hull" },
        ],
        wargear: [
          { name: "Smoke launcher" },
        ],
        unitOptions: {
          unitSize: [1, 2],
          weapons: [
            { name: "HYLas rotary cannon", replaces: "Magna-rail cannon" },
          ]
        }
      },
    ],
    "detachments": [
      {
        "name": "Brandfast Oathband",
        "enhancements": [
          { "name": "Precursive Judgement" },
          { "name": "Signature Restoration" },
          { "name": "Tactical Alchemy" },
          { "name": "Trivärg Cyber Implant" }
        ]
      },
      {
        "name": "Dêlve Assault Shift",
        "enhancements": [
          { "name": "Dêlvwerke Navigator" },
          { "name": "Multiwave System Jammer" },
          { "name": "Piledriver" },
          { "name": "Quake Supervisor" }
        ]
      },
      {
        "name": "Hearthband",
        "enhancements": [
          { "name": "Bastion Shield" },
          { "name": "High Kâhl", "tags": ["Kâhl"] },
          { "name": "Ironskein" },
          { "name": "Quake Multigenerator", "tags": ["Kâhl"] }
        ]
      },
      {
        "name": "Hearthfyre Arsenal",
        "enhancements": [
          { "name": "Calculated Tenacity", "tags": ["Brôkhyr Iron-master", "Memnyr Strategist"] },
          { "name": "Fârstrydr Node", "tags": ["Brôkhyr Iron-master", "Memnyr Strategist"] },
          { "name": "Graviton Vault", "tags": ["Brôkhyr Iron-master"] },
          { "name": "Mantle of Elders", "tags": ["Memnyr Strategist"] }
        ]
      },
      {
        "name": "Needgaârd Oathband",
        "enhancements": [
          { "name": "Ancestral Crest" },
          { "name": "Dead Reckoning" },
          { "name": "Iron Ambassador" },
          { "name": "Oathbound Speculator" }
        ]
      },
      {
        "name": "Persecution Prospect",
        "enhancements": [
          { "name": "Eye for Weakness" },
          { "name": "Nomad Strategist" },
          { "name": "Surgical Saboteur" },
          { "name": "Writ of Acquisition" }
        ]
      }
    ]
  },

  "Necrons": {
    "units": [
      /* characters */
      { name: "C'tan Shard of the Deceiver", tags: ["Character", "Monster", "Fly", "Epic Hero", "C'tan Shard of the Deceiver"] },
      { name: "C'tan Shard of the Nightbringer", tags: ["Character", "Monster", "Fly", "Epic Hero", "C'tan Shard of the Nightbringer"] },
      { name: "C'tan Shard of the Void Dragon", tags: ["Character", "Monster", "Fly", "Epic Hero", "C'tan Shard of the Void Dragon"] },
      { name: "Catacomb Command Barge", tags: ["Character", "Vehicle", "Fly", "Catacomb Command Barge"] },
      { name: "Chronomancer", tags: ["Character", "Infantry", "Cryptek", "Chronomancer"] },
      { name: "Geomancer", tags: ["Character", "Infantry", "Cryptek", "Geomancer"] },
      { name: "Hexmark Destroyer", tags: ["Character", "Infantry", "Destroyer Cult", "Hexmark Destroyer"] },
      { name: "Illuminor Szeras", tags: ["Character", "Epic Hero", "Infantry", "Cryptek", "Illuminor Szeras"] },
      { name: "Imotekh the Stormlord", tags: ["Character", "Epic Hero", "Infantry", "Noble", "Imotekh the Stormlord"] },
      { name: "Lokhust Lord", tags: ["Character", "Mounted", "Fly", "Destroyer Cult", "Lokhust Lord"] },
      { name: "Orikan the Diviner", tags: ["Character", "Epic Hero", "Infantry", "Cryptek", "Chronomancer", "Orikan the Diviner"] },
      { name: "Overlord", tags: ["Character", "Infantry", "Noble", "Overlord"] },
      { name: "Overlord with Translocation Shroud", tags: ["Character", "Infantry", "Noble", "Overlord", "Overlord with Translocation Shroud"] },
      { name: "Plasmancer", tags: ["Character", "Infantry", "Cryptek", "Plasmancer"] },
      { name: "Psychomancer", tags: ["Character", "Infantry", "Cryptek", "Psychomancer"] },
      { name: "Royal Warden", tags: ["Character", "Infantry", "Royal Warden"] },
      { name: "Skorpekh Lord", tags: ["Character", "Infantry", "Destroyer Cult", "Skorpekh Lord"] },
      { name: "Technomancer", tags: ["Character", "Infantry", "Cryptek", "Fly", "Technomancer"] },
      { name: "The Silent King", modelCount: 3, tags: ["Character", "Epic Hero", "Vehicle", "Triarch", "The Silent King"] },
      { name: "Transcendent C'tan", tags: ["Character", "Monster", "Fly", "Transcendent C'tan"] },
      { name: "Trazyn the Infinite", tags: ["Character", "Epic Hero", "Infantry", "Noble", "Trazyn the Infinite"] },

      /* battleline */
      { name: "Immortals", modelCount: [5, 10], tags: ["Battleline", "Infantry", "Immortals"], unitOptions: { unitSize: [5, 10] } },
      { name: "Necron Warriors", modelCount: [10, 20], tags: ["Battleline", "Infantry", "Necron Warriors"], unitOptions: { unitSize: [10, 20] } },

      /* dedicated transports */
      { name: "Ghost Ark", tags: ["Vehicle", "Fly", "Transport", "Dedicated Transport"] },

      /* Fortifications */
      { name: "Convergence Of Dominion", tags: ["Fortification", "Vehicle", "Convergence Of Dominion"], unitOptions: { unitSize: [1, 2, 3] } },

      { name: "Annihilation Barge", tags: ["Vehicle", "Fly"] },
      { name: "Canoptek Doomstalker", tags: ["Vehicle", "Walker", "Canoptek", "Doomstalker"] },
      { name: "Canoptek Macrocytes", tags: ["Beasts", "Fly", "Canoptek", "Macrocytes"], modelCount: 5 },
      { name: "Canoptek Reanimator", tags: ["Vehicle", "Walker", "Canoptek", "Reanimator"] },
      { name: "Canoptek Scarab Swarms", tags: ["Swarm", "Fly", "Canoptek", "Scarab Swarms"], unitOptions: { unitSize: [3, 6] } },
      { name: "Canoptek Spyders", tags: ["Vehicle", "Fly", "Canoptek", "Spyders"], unitOptions: { unitSize: [1, 2] } },
      { name: "Canoptek Tomb Crawlers", tags: ["Beasts", "Canoptek", "Tomb Crawlers"], modelCount: 2 },
      { name: "Canoptek Wraiths", tags: ["Beasts", "Fly", "Canoptek", "Wraiths"], unitOptions: { unitSize: [3, 6] } },
      { name: "Cryptothralls", tags: ["Infantry", "Cryptothralls"], modelCount: 2 },
      { name: "Deathmarks", tags: ["Infantry", "Deathmarks"], unitOptions: { unitSize: [5, 10] } },
      { name: "Doom Scythe", tags: ["Vehicle", "Aircraft", "Fly", "Doom Scythe"] },
      { name: "Doomsday Ark", tags: ["Vehicle", "Fly", "Doomsday Ark"] },
      { name: "Flayed Ones", tags: ["Infantry", "Flayed Ones"], unitOptions: { unitSize: [5, 10] } },
      { name: "Lokhust Destroyers", tags: ["Mounted", "Fly", "Destroyer Cult", "Lokhust Destroyers"], unitOptions: { unitSize: [1, 2, 3, 6] } },
      { name: "Lokhust Heavy Destroyers", tags: ["Mounted", "Fly", "Destroyer Cult", "Lokhust Heavy Destroyers"], unitOptions: { unitSize: [1, 2, 3] } },
      { name: "Lychguard", tags: ["Infantry", "Lychguard"], unitOptions: { unitSize: [5, 10] } },
      { name: "Monolith", tags: ["Vehicle", "Titanic", "Fly", "Towering", "Monolith"] },
      { name: "Night Scythe", tags: ["Vehicle", "Aircraft", "Fly", "Transport", "Night Scythe"] },
      { name: "Obelisk", tags: ["Vehicle", "Titanic", "Fly", "Towering", "Obelisk"] },
      { name: "Ophydian Destroyers", tags: ["Infantry", "Destroyer Cult", "Ophydian Destroyers"], unitOptions: { unitSize: [3, 6] } },
      { name: "Skorpekh Destroyers", tags: ["Infantry", "Destroyer Cult", "Skorpekh Destroyers"], unitOptions: { unitSize: [3, 6] } },
      { name: "Tesseract Vault", tags: ["Vehicle", "Titanic", "Fly", "Towering", "Tesseract Vault"] },
      { name: "Tomb Blades", tags: ["Mounted", "Fly", "Tomb Blades"], unitOptions: { unitSize: [3, 6] } },
      { name: "Triarch Praetorians", tags: ["Infantry", "Fly", "Triarch", "Praetorians"], unitOptions: { unitSize: [5, 10] } },
      { name: "Triarch Stalker", tags: ["Vehicle", "Walker", "Fly", "Triarch", "Stalker"] },
      /* forge world models */
      { name: "Seraptek Heavy Construct", tags: ["Vehicle", "Walker", "Titanic", "Towering", "Seraptek Heavy Construct"] },
    ],
    "detachments": [
      {
        "name": "Annihilation Legion",
        "enhancements": [
          { "name": "Eldritch Nightmare", tags: ["Destroyer Cult"] },
          { "name": "Eternal Madness" },
          { "name": "Ingrained Superiority" },
          { "name": "Soulless Reaper", tags: ["Destroyer Cult"] }
        ]
      },
      {
        "name": "Awakened Dynasty",
        "enhancements": [
          { "name": "Enaegic Dermal Bond" },
          { "name": "Nether-realm Casket" },
          { "name": "Phasal Subjugator" },
          { "name": "Veil of Darkness" }
        ]
      },
      {
        "name": "Canoptek Court",
        "enhancements": [
          { name: "Autodivinator", tags: ["Cryptek"] },
          { name: "Dimensional Sanctum", tags: ["Cryptek"] },
          { name: "Hyperphasic Fulcrum", tags: ["Cryptek"] },
          { name: "Metalodermal Tesla Weave", tags: ["Cryptek"] },
        ]
      },
      {
        "name": "Hypercrypt Legion",
        "enhancements": [
          { name: "Arisen Tyrant" },
          { name: "Dimensional Overseer" },
          { name: "Hyperspatial Transfer Node" },
          { name: "Osteoclave Fulcrum" },
        ]
      },
      {
        "name": "Obeisance Phalanx",
        "enhancements": [
          { name: "Eternal Conqueror", tags: ["Overlord"] },
          { name: "Honourable Combatant", tags: ["Overlord"] },
          { name: "Unflinching Will", tags: ["Overlord"] },
          { name: "Warrior Noble", tags: ["Overlord"] },
        ]
      },
      {
        "name": "Starshatter Arsenal",
        "enhancements": [
          { name: "Chrono-impedance Fields" },
          { name: "Demanding Leader" },
          { name: "Dread Majesty", tags: ["Overlord", "Catacomb Command Barge"] },
          { name: "Miniaturised Nebuloscope" },
        ]
      }
    ]
  },

  "Orks": {
    "units": [],
    "detachments": []
  },

  "Space Marines": {
    "units": [
      { name: "Adrax Agatone", tags: ["Character", "Epic Hero", "Salamanders"] },
      { name: "Aethon Shaan", tags: ["Character", "Epic Hero"] },
      { name: "Ancient", tags: ["Character", "Ancient"] },
      { name: "Ancient in Terminator Armour", tags: ["Character", "Ancient"] },
      { name: "Apothecary", tags: ["Character"] },
      { name: "Apothecary Biologis", tags: ["Character", "Gravis"] },
      { name: "Bladeguard Ancient", tags: ["Character", "Ancient"] },
      { name: "Captain", tags: ["Character"] },
      { name: "Captain in Gravis Armour", tags: ["Character", "Gravis"] },
      { name: "Captain in Phobos Armour", tags: ["Character", "Phobos"] },
      { name: "Captain in Terminator Armour", tags: ["Character"] },
      { name: "Captain Sicarius", tags: ["Character", "Epic Hero"] },
      { name: "Captain with Jump Pack", tags: ["Character"] },
      { name: "Chaplain", tags: ["Character"] },
      { name: "Chaplain in Terminator Armour", tags: ["Character"] },
      { name: "Chaplain on Bike", tags: ["Character", "Mounted"] },
      { name: "Chaplain with Jump Pack", tags: ["Character"] },
      { name: "Chief Librarian Tigurius", tags: ["Character", "Epic Hero"] },
      { name: "Darnath Lysander", tags: ["Character", "Epic Hero", "Imperial Fists"] },
      { name: "Iron Father Feirros", tags: ["Character", "Epic Hero"] },
      { name: "Judiciar", tags: ["Character"] },
      { name: "Kayvan Shrike", tags: ["Character", "Epic Hero"] },
      { name: "Kor'Sarro Khan", tags: ["Character", "Epic Hero"] },
      { name: "Librarian", tags: ["Character"] },
      { name: "Librarian in Phobos Armour", tags: ["Character", "Phobos"] },
      { name: "Librarian in Terminator Armour", tags: ["Character"] },
      { name: "Lieutenant", tags: ["Character"] },
      { name: "Lieutenant in Phobos Armour", tags: ["Character", "Phobos"] },
      { name: "Lieutenant in Reiver Armour", tags: ["Character", "Phobos"] },
      { name: "Lieutenant with Combi-weapon", tags: ["Character", "Phobos"] },
      { name: "Lieutenant Titus", tags: ["Character", "Epic Hero"] },
      { name: "Marneus Calgar", tags: ["Character", "Epic Hero"] },
      { name: "Pedro Kantor", tags: ["Character", "Epic Hero", "Imperial Fists"] },
      { name: "Roboute Guilliman", tags: ["Character", "Epic Hero"] },
      { name: "Techmarine", tags: ["Character"] },
      { name: "Tor Garadon", tags: ["Character", "Epic Hero", "Imperial Fists"] },
      { name: "Uriel Ventris", tags: ["Character", "Epic Hero"] },
      { name: "Vulkan He'stan", tags: ["Character", "Epic Hero", "Salamanders"] },
      { name: "Assault Intercessor Squad", modelCount: [5, 10], tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      { name: "Heavy Intercessor Squad", modelCount: [5, 10], tags: ["Battleline", "Gravis"], unitOptions: { unitSize: [5, 10] } },
      { name: "Intercessor Squad", modelCount: [5, 10], tags: ["Battleline"], unitOptions: { unitSize: [5, 10] } },
      { name: "Tactical Squad", modelCount: 10, tags: ["Battleline"] },
      { name: "Aggressor Squad", modelCount: [3, 6], tags: ["Gravis"], unitOptions: { unitSize: [3, 6] } },
      { name: "Assault Intercessors with Jump Packs", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Ballistus Dreadnought", modelCount: 140 },
      { name: "Bladeguard Veteran Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Brutalis Dreadnought", modelCount: 160 },
      { name: "Centurion Assault Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Centurion Devastator Squad", modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Company Heroes", modelCount: 4, tags: ["Ancient"] },
      { name: "Desolation Squad", modelCount: 5 },
      { name: "Devastator Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Dreadnought", modelCount: 1 },
      { name: "Drop Pod", modelCount: 1 },
      { name: "Eliminator Squad", modelCount: 3, tags: ["Phobos"] },
      { name: "Eradicator Squad", modelCount: [3, 6], tags: ["Gravis"], unitOptions: { unitSize: [3, 6] } },
      { name: "Firestrike Servo-turrets", modelCount: [1, 2], unitOptions: { unitSize: [1, 2] } },
      { name: "Gladiator Lancer", modelCount: 1 },
      { name: "Gladiator Reaper", modelCount: 1 },
      { name: "Gladiator Valiant", modelCount: 1 },
      { name: "Hammerfall Bunker", modelCount: 1 },
      { name: "Hellblaster Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Impulsor", modelCount: 1 },
      { name: "Inceptor Squad", modelCount: [3, 6], tags: ["Gravis"], unitOptions: { unitSize: [3, 6] } },
      { name: "Incursor Squad", modelCount: [5, 10], tags: ["Phobos"], unitOptions: { unitSize: [5, 10] } },
      { name: "Infernus Squad", modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Infiltrator Squad", modelCount: [5, 10], tags: ["Phobos"], unitOptions: { unitSize: [5, 10] } },
      { name: "Invader ATV", modelCount: 1, tags: ["Mounted"] },
      { name: "Invictor Tactical Warsuit", modelCount: 1, tags: ["Phobos"] },
      { name: "Land Raider", modelCount: 1 },
      { name: "Land Raider Crusader", modelCount: 1 },
      { name: "Land Raider Redeemer", modelCount: 1 },
      { name: "Outrider Squad", modelCount: [3, 6], tags: ["Mounted"], unitOptions: { unitSize: [3, 6] } },  // figure out how to handle Invader ATV +60
      { name: "Predator Annihilator", modelCount: 1 },
      { name: "Predator Destructor", modelCount: 1 },
      { name: "Razorback", modelCount: 1 },
      { name: "Redemptor Dreadnought", modelCount: 1 },
      { name: "Reiver Squad", modelCount: [5, 10], tags: ["Phobos"], unitOptions: { unitSize: [5, 10] } },
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
    "detachments": [
      {
        name: "1st Company Task Force",
        "enhancements": [
          { name: "Fear Made Manifest" },
          { name: "Iron Resolve", tags: ["Terminator"] },
          { name: "Rites of War", tags: ["Terminator"] },
          { name: "The Imperium's Sword" },
        ],
      },
      {
        name: "Anvil Siege Force",
        enhancements: [
          { name: "Architect of War" },
          { name: "Fleet Commander", tags: ["Captain"] },
          { name: "Indomitable Fury", tags: ["Gravis"] },
          { name: "Stoic Defender" },
        ],
      },
      {
        name: "Emperor's Shield",
        enhancements: [
          { name: "Champion of the Feast", tags: ["Imperial Fists"] },
          { name: "Disciple of Rhetoricus", tags: ["Imperial Fists+Terminator"] },
          { name: "Indomitable Champion", tags: ["Imperial Fists+Terminator"] },
          { name: "Malodraxian Standard", tags: ["Imperial Fists+Ancient"] },
        ],
        "restrictions": ["Imperial Fists"],
      },
      {
        name: "Firestorm Assault Force",
        enhancements: [
          { name: "Adamantine Mantle" },
          { name: "Champion of Humanity", tags: ["Tacticus"] },
          { name: "Forged in Battle" },
          { name: "War-tempered Artifice", tags: ["Infantry"] },
        ],
      },
      {
        name: "Forgefather's Seekers",
        enhancements: [
          { name: "Adamantine Mantle", tags: ["Salamanders"] },
          { name: "Forged in Battle", tags: ["Salamanders"] },
          { name: "Immolator", tags: ["Salamanders"] },
          { name: "War-tempered Artifice", tags: ["Salamanders+Infantry"] },
        ],
        "restrictions": ["Salamanders"],
      },
      {
        name: "Gladius Task Force",
        enhancements: [
          { name: "Adept of the Codex", tags: ["Captain"] },
          { name: "Artificer Armour" },
          { name: "Fire Discipline" },
          { name: "The Honour Vehement" },
        ],
      },
      {
        name: "Ironstorm Spearhead",
        enhancements: [
          { name: "Adept of the Omnissiah", tags: ["Techmarine"] },
          { name: "Master of Machine War" },
          { name: "Target Augury Web", tags: ["Techmarine"] },
          { name: "The Flesh is Weak" },
        ],
      },
      {
        name: "Librarius Conclave",
        enhancements: [
          { name: "Celerity", tags: ["Psyker"] },
          { name: "Fusillade", tags: ["Psyker"] },
          { name: "Obfuscation", tags: ["Psyker"] },
          { name: "Prescience", tags: ["Psyker"] },
        ]
      },
      {
        name: "Shadowmark Talon",
        enhancements: [
          { name: "Blackwing Shroud", tags: ["Infantry+Raven Guard"] },
          { name: "Coronal Susurrant", tags: ["Phobos+Raven Guard"] },
          { name: "Hunter’s Instincts", tags: ["Raven Guard"] },
          { name: "Umbral Raptor", tags: ["Raven Guard"] },
        ],
        "restrictions": ["Raven Guard"],
      },
      {
        name: "Stormlance Task Force",
        enhancements: [
          { name: "Feinting Withdrawal" },
          { name: "Fury of the Storm", tags: ["Mounted"] },
          { name: "Hunter’s Instincts", tags: ["Mounted"] },
          { name: "Portents of Wisdom" },
        ],
      },
      {
        name: "Vanguard Spearhead",
        enhancements: [
          { name: "Execute and Redeploy", tags: ["Phobos"] },
          { name: "Ghostweave Cloak" },
          { name: "Shadow War Veteran", tags: ["Phobos"] },
          { name: "The Blade Driven Deep", tags: ["Infantry"] },
        ],
      },
    ],
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
    "units": [
      { name: "Arjac Rockfist", tags: ["Character", "Epic Hero"] },
      { name: "Bjorn the Fell-Handed", tags: ["Character", "Epic Hero"] },
      { name: "Iron Priest", tags: ["Character"] },
      { name: "Logan Grimnar", tags: ["Character", "Epic Hero"] },
      { name: "Murderfang", tags: ["Character", "Epic Hero"] },
      { name: "Njal Stormcaller", tags: ["Character", "Epic Hero"] },
      { name: "Ragnar Blackmane", tags: ["Character", "Epic Hero"] },
      { name: "Ulrik the Slayer", tags: ["Character", "Epic Hero"] },
      { name: "Wolf Guard Battle Leader", tags: ["Character"] },
      { name: "Wolf Priest", tags: ["Character"] },
      { name: "Blood Claws", modelCount: [10, 20], tags: ["Battleline"], unitOptions: { unitSize: [10, 20] } },
      { name: "Grey Hunters", modelCount: 10, tags: ["Battleline"] },
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
        { name: "Fangrune Pendant", tags: ["Terminator"] },
        { name: "Foes’ Fate", tags: ["Terminator"] },
        { name: "Longstrider" },
        { name: "Wolves’ Wisdom", tags: ["Infantry"] },
      ],
      "Saga of the Beastslayer": [
        { name: "Elder’s Guidance", tags: ["Space Wolves"] },
        { name: "Helm of the Beastslayer" },
        { name: "Hunter’s Guile" },
        { name: "Wolf-touched", tags: ["Space Wolves"] },
      ],
      "Saga of the Bold": [
        { name: "Braggart’s Steel", tags: ["Space Wolves"] },
        { name: "Hordeslayer", tags: ["Space Wolves"] },
        { name: "Skjald" },
        { name: "Thunderwolf’s Fortitude" },
      ],
      "Saga of the Hunter": [
        { name: "Fenrisian Grit" },
        { name: "Feral Rage" },
        { name: "Swift Hunter", tags: ["Space Wolves"] },
        { name: "Wolf Master", tags: ["Space Wolves"] },
      ],
    }
  },

  "T'au Empire": {
    "units": [],
    "detachments": []
  },

  "Thousand Sons": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "units": [],
    "detachments": []
  },

  "Tyranids": {
    "units": [
      { name: "Broodlord", tags: ["Character", "Vanguard Invader", "Psyker", "Synapse"] },
      { name: "Deathleaper", tags: ["Character", "Epic Hero", "Vanguard Invader"] },
      { name: "Hive Tyrant", tags: ["Character", "Monster", "Psyker", "Synapse"] },
      { name: "Hyperadapted Raveners", tags: ["Character", "Vanguard Invader", "Synapse"], modelCount: 5 },
      { name: "Neurotyrant", tags: ["Character", "Monster", "Psyker", "Synapse"] },
      { name: "Old One Eye", tags: ["Character", "Epic Hero", "Monster"] },
      { name: "Parasite of Mortrex", tags: ["Character", "Vanguard Invader", "Synapse"] },
      { name: "Tervigon", tags: ["Character", "Monster", "Psyker", "Synapse"] },
      { name: "The Swarmlord", tags: ["Character", "Epic Hero", "Monster", "Psyker", "Synapse"] },
      { name: "Winged Hive Tyrant", tags: ["Character", "Monster", "Vanguard Invader", "Psyker", "Synapse"] },
      { name: "Winged Tyranid Prime", tags: ["Character", "Vanguard Invader", "Synapse"] },
      { name: "Gargoyles", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] }, tags: ["Battleline", "Vanguard Invader"] },
      { name: "Hormagaunts", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] }, tags: ["Battleline"] },
      { name: "Termagants", modelCount: [10, 20], unitOptions: { unitSize: [10, 20] }, tags: ["Battleline"] },
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
    "detachments": [
      {
        name: "Assimilation Swarm",
        enhancements: [
          { name: "Biophagic Flow" },
          { name: "Instinctive Defence" },
          { name: "Parasitic Biomorphology" },
          { name: "Regenerating Monstrosity" },
        ],
      },
      {
        name: "Crusher Stampede",
        enhancements: [
          { name: "Enraged Reserves", tags: ["Monster"] },
          { name: "Monstrous Nemesis", tags: ["Monster"] },
          { name: "Null Nodules", tags: ["Monster"] },
          { name: "Ominous Presence", tags: ["Monster"] },
        ],
      },
      {
        name: "Invasion Fleet",
        enhancements: [
          { name: "Adaptive Biology" },
          { name: "Alien Cunning" },
          { name: "Perfectly Adapted" },
          { name: "Synaptic Linchpin" },
        ],
      },
      {
        name: "Subterranean Assault",
        enhancements: [
          { name: "Synaptic Strategy" },
          { name: "Tremor Senses" },
          { name: "Trygon Prime", tags: ["Trygon"] },
          { name: "Vanguard Intellect" },
        ],
      },
      {
        name: "Synaptic Nexus",
        enhancements: [
          { name: "Power of the Hive Mind", tags: ["Psyker"] },
          { name: "Psychostatic Disruption", tags: ["Synapse"] },
          { name: "Synaptic Control", tags: ["Synapse"] },
          { name: "The Dirgeheart of Kharis", tags: ["Synapse"] },
        ],
      },
      {
        name: "Unending Swarm",
        enhancements: [
          { name: "Adrenalised Onslaught" },
          { name: "Naturalised Camouflage" },
          { name: "Piercing Talons" },
          { name: "Relentless Hunger" },
        ],
      },
      {
        name: "Vanguard Onslaught",
        enhancements: [
          { name: "Chameleonic", tags: ["Vanguard Invader"] },
          { name: "Hunting Grounds" },
          { name: "Neuronode" },
          { name: "Stalker", tags: ["Vanguard Invader"] },
        ],
      },
      {
        name: "Warrior Bioform Onslaught",
        enhancements: [
          { name: "Elevated Might" },
          { name: "Ocular Adaptation", tags: ["Winged Tyranid Prime"] },
          { name: "Sensory Assimilation", tags: ["Winged Tyranid Prime"] },
          { name: "Synaptic Tyrant", tags: ["Neurotyrant"] },
        ],
      },
    ]
  },

  "World Eaters": {
    "chapterInfo": {
      parentFaction: "Chaos Space Marines",
    },
    "models": [
      { name: "Angron", tags: ["Character", "Epic Hero"] },
      { name: "Eightbound", tags: ["Battleline"], modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Exalted Eightbound", tags: ["Battleline"], modelCount: [3, 6], unitOptions: { unitSize: [3, 6] } },
      { name: "Jakhals", tags: ["Battleline"], modelCount: [10, 20], unitOptions: { unitSize: [10, 20] } },
      { name: "Khorne Berzerkers", tags: ["Battleline"], modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
      { name: "Khorne Lord of Skulls", tags: ["Character", "Epic Hero"] },
      { name: "Kharn the Betrayer", tags: ["Character", "Epic Hero"] },
      { name: "Lord Invocatus", tags: ["Character"] },
      { name: "World Eaters Chaos Spawn", tags: ["Battleline"], modelCount: 2, unitOptions: { unitSize: [2, 4] } },
      { name: "World Eaters Daemon Prince", tags: ["Character", "Daemon Prince"], modelCount: 185 },
      { name: "World Eaters Daemon Prince with Wings", tags: ["Character", "Daemon Prince"], modelCount: 155 },
      { name: "World Eaters Defiler", tags: ["Character"], modelCount: 190 },
      { name: "World Eaters Forgefiend", tags: ["Character"], modelCount: 145 },
      { name: "World Eaters Helbrute", tags: ["Character"], modelCount: 130 },
      { name: "World Eaters Heldrake", tags: ["Character"], modelCount: 210 },
      { name: "World Eaters Land Raider", tags: ["Character"], modelCount: 240 },
      { name: "World Eaters Lord on Juggernaut", tags: ["Character"], modelCount: 80 },
      { name: "World Eaters Master of Executions", tags: ["Character"], modelCount: 110 },
      { name: "World Eaters Maulerfiend", tags: ["Character"], modelCount: 140 },
      { name: "World Eaters Predator Annihilator", tags: ["Character"], modelCount: 135 },
      { name: "World Eaters Predator Destructor", tags: ["Character"], modelCount: 140 },
      { name: "World Eaters Rhino", tags: ["Character"], modelCount: 75 },
      { name: "World Eaters Terminator Squad", tags: ["Battleline"], modelCount: [5, 10], unitOptions: { unitSize: [5, 10] } },
    ],
    "detachments": [
      {
        "name": "Berzerker Warband",
        "enhancements": [
          { name: "Battle-lust", tags: ["World Eaters"] },
          { name: "Berzerker Glaive", tags: ["World Eaters"] },
          { name: "Favoured of Khorne", tags: ["World Eaters"] },
          { name: "Helm of Brazen Ire", tags: ["World Eaters"] },
        ],
      },
      {
        "name": "Cult of Blood",
        "enhancements": [
          { name: "Chosen of the Blood God", tags: ["World Eaters+Monster"] },
          { name: "Butcher Lord", tags: ["World Eaters+Infantry"] },
          { name: "Brazen Form", tags: ["World Eaters+Monster"] },
          { name: "Strategic Slaughter", tags: ["World Eaters"] },
        ],
      }
      {
        "name": "Vessels of Wrath",
        "enhancements": [
          { name: "Archslaughterer", tags: ["World Eaters"] },
          { name: "Avenger's Crown", tags: ["World Eaters"] },
          { name: "Gateways to Glory", tags: ["World Eaters"] },
          { name: "Vox-diabolus", tags: ["World Eaters"] },
        ],
      }
    ]
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
  "Adeptus Custodes": {
    "units": {
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
    "enhancements": {
      "Auric Champions": {
        "Blade Imperator": 25,
        "Inspirational Exemplar": 10,
        "Martial Philosopher": 30,
        "Veiled Blade": 25,
      },
      "Lions of the Emperor": {
        "Admonimortis": 10,
        "Fierce Conqueror": 15,
        "Praesidius": 25,
        "Superior Creation": 25,
      },
      "Null Maiden Vigil": {
        "Enhanced Voidsheen Cloak": 10,
        "Huntress' Eye": 15,
        "Oblivion Knigh": 25,
        "Raptor Blade": 5,
      },
      "Shield Host": {
        "Auric Mantle": 15,
        "Castellan's Mark": 20,
        "From the Hall of Armouries": 25,
        "Panoptispex": 5,
      },
      "Solar Spearhead": {
        "Adamantine Talisman": 25,
        "Augury Uplink": 35,
        "Honoured Fallen": 15,
        "Veteran of the Kataphraktoi": 10,
      },
      "Talons of the Emperor": {
        "Aegis Projector": 20,
        "Champion of the Imperium": 25,
        "Gift of Terran Artifice": 15,
        "Radiant Mantle": 30,
      },
    }
  },
  "Adeptus Mechanicus": {
    "units": {
      "Archaeopter Fusilave": 160,
      "Archaeopter Stratoraptor": 185,
      "Archaeopter Transvector": 150,
      "Belisarius Cawl": 175,
      "Corpuscarii Electro-Priests": [65, 130],
      "Cybernetica Datasmith": 35,
      "Fulgurite Electro-Priests": [70, 140],
      "Ironstrider Ballistarii": [75, 150, 225],
      "Kastelan Robots": [180, 360],
      "Kataphron Breachers": [160, 320],
      "Kataphron Destroyers": [105, 210],
      "Onager Dunecrawler": 155,
      "Pteraxii Skystalkers": [70, 140],
      "Pteraxii Sterylizors": [80, 160],
      "Serberys Raiders": [60, 120],
      "Serberys Sulphurhounds": [55, 110],
      "Servitor Battleclade": 60,
      "Sicarian Infiltrators": [70, 140],
      "Sicarian Ruststalkers": [75, 150],
      "Skitarii Marshal": 35,
      "Skitarii Rangers": 85,
      "Skitarii Vanguard": 95,
      "Skorpius Disintegrator": 165,
      "Skorpius Dunerider": 85,
      "Sydonian Dragoons with Radium Jezzails": [55, 100, 150],
      "Sydonian Dragoons with Taser Lances": [65, 130, 195],
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
        "Transoracular Dyad Wafers": 15
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
    "units": {
      "Asurmen": 125,
      "Autarch": 85,
      "Autarch Wayleaper": 80,
      "Avatar of Khaine": 280,
      "Baharroth": 115,
      "Corsair Voidreavers": [65, 110],
      "Corsair Voidscarred": [80, 160],
      "Crimson Hunter": 160,
      "D-cannon Platform": 125,
      "Dark Reapers": [90, 195],
      "Death Jester": 90,
      "Dire Avengers": [75, 150],
      "Eldrad Ulthran": 110,
      "Falcon": 130,
      "Farseer": 70,
      "Farseer Skyrunner": 80,
      "Fire Dragons": [120, 220],
      "Fire Prism": 150,
      "Fuegan": 120,
      "Guardian Defenders": 100,
      "Hemlock Wraithfighter": 155,
      "Howling Banshees": [95, 190],
      "Jain Zar": 105,
      "Lhykhis": 120,
      "Maugan Ra": 100,
      "Night Spinner": 190,
      "Rangers": [55, 110],
      "Shadow Weaver Platform": 75,
      "Shadowseer": 60,
      "Shining Spears": [110, 220],
      "Shroud Runners": [80, 160],
      "Skyweavers": [95, 190],
      "Solitaire": 115,
      "Spiritseer": 65,
      "Starweaver": 80,
      "Storm Guardians": 100,
      "Striking Scorpions": [85, 150],
      "Swooping Hawks": [85, 190],
      "Troupe": [85, 100, 190, 205],
      "Troupe Master": 75,
      "Vibro Cannon Platform": 60,
      "Voidweaver": 125,
      "Vyper": [65, 130],
      "War Walker": [85, 170],
      "Warlock": 45,
      "Warlock Conclave": [55, 130],
      "Warlock Skyrunners": [45, 90],
      "Warp Spiders": [95, 190],
      "Wave Serpent": 125,
      "Windriders": [80, 160],
      "Wraithblades": 160,
      "Wraithguard": 170,
      "Wraithknight": 435,
      "Wraithknight with Ghostglaive": 420,
      "Wraithlord": 140,

      /* Ynnari are separate in the Munitorium docs */
      "The Visarch": 90,
      "The Yncarne": 260,
      "Ynnari Archon": 85,
      "Ynnari Incubi": [85, 170],
      "Ynnari Kabalite Warriors": 110,
      "Ynnari Raider": 80,
      "Ynnari Reavers": [65, 120],
      "Ynnari Succubus": 45,
      "Ynnari Venom": 70,
      "Ynnari Wyches": 90,
      "Yvraine": 100,

      /* forge world models */
      "Phantom Titan": 2100,
      "Revenant Titan": 1100,
    },
    "enhancements": {
      "Armored Warhost": {
        "Guiding Presence": 25,
        "Guileful Strategist": 15,
        "Harmonisation Matrix": 30,
        "Spirit Stone of Raelyth": 20,
      },
      "Aspect Host": {
        "Aspect of Murder": 25,
        "Mantle of Wisdom": 30,
        "Shimmerstone": 15,
        "Strategic Savant": 15,
      },
      "Devoted of Ynnead": {
        "Borrowed Vigour": 10,
        "Gaze of Ynnead": 15,
        "Morbid Might": 15,
        "Storm of Whispers": 10,
      },
      "Ghosts of the Webway": {
        "Cegorach’s Coil": 25,
        "Mask of Secrets": 15,
        "Mistweave": 30,
        "Murder’s Jest": 20,
      },
      "Guardian Battlehost": {
        "Breath of Vaul": 10,
        "Craftworld’s Champion": 25,
        "Ethereal Pathway": 30,
        "Protector of the Paths": 20,
      },
      "Seer Council": {
        "Lucid Eye": 30,
        "Runes of Warding": 25,
        "Stone of Eldritch Fury": 15,
        "Torc of Morai-Heg": 20,
      },
      "Spirit Conclave": {
        "Higher Duty": 25,
        "Light of Clarity": 30,
        "Rune of Mists": 10,
        "Stave of Kurnous": 15,
      },
      "Warhost": {
        "Gift of Foresight": 15,
        "Phoenix Gem": 35,
        "Psychic Destroyer": 30,
        "Timeless Strategist": 15,
      },
      "Windrider Host": {
        "Echoes of Ulthanesh": 20,
        "Firstdrawn Blade": 10,
        "Mirage Field": 25,
        "Seersight Strike": 15,
      },
    }
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
      "Abaddon the Despoiler": 270,
      "Accursed Cultists": [90, 195],
      "Chaos Bikers": [70, 130],
      "Chaos Land Raider": 220,
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
      "Dark Commune": 90,
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
      "Venomcrawler": 110,
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
        "Warp-fuelled Thrusters": 20,
        "Willbreaker": 10,
      },
      "Fellhammer Siege-host": {
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
  "Necrons": {
    "units": {
      "Annihilation Barge": 105,
      "C'tan Shard of the Deceiver": 265,
      "C'tan Shard of the Nightbringer": 305,
      "C'tan Shard of the Void Dragon": 300,
      "Canoptek Doomstalker": 140,
      "Canoptek Macrocytes": 85,
      "Canoptek Reanimator": 75,
      "Canoptek Scarab Swarms": [40, 80],
      "Canoptek Spyders": [75, 150],
      "Canoptek Tomb Crawlers": 50,
      "Canoptek Wraiths": [110, 220],
      "Catacomb Command Barge": 120,
      "Chronomancer": 65,
      "Convergence Of Dominion": [60, 120, 180],
      "Cryptothralls": 60,
      "Deathmarks": [60, 120],
      "Doom Scythe": 230,
      "Doomsday Ark": 200,
      "Flayed Ones": [60, 120],
      "Geomancer": 75,
      "Ghost Ark": 115,
      "Hexmark Destroyer": 75,
      "Illuminor Szeras": 165,
      "Immortals": [70, 150],
      "Imotekh the Stormlord": 100,
      "Lokhust Destroyers": [40, 60, 90, 180],
      "Lokhust Heavy Destroyers": [55, 110, 165],
      "Lokhust Lord": 80,
      "Lychguard": [85, 170],
      "Monolith": 400,
      "Necron Warriors": [90, 200],
      "Night Scythe": 145,
      "Obelisk": 300,
      "Ophydian Destroyers": [80, 160],
      "Orikan the Diviner": 80,
      "Overlord": 85,
      "Overlord with Translocation Shroud": 85,
      "Plasmancer": 55,
      "Psychomancer": 55,
      "Royal Warden": 50,
      "Skorpekh Destroyers": [90, 180],
      "Skorpekh Lord": 90,
      "Technomancer": 80,
      "Tesseract Vault": 425,
      "The Silent King": 400,
      "Tomb Blades": [75, 150],
      "Transcendent C'tan": 295,
      "Trazyn the Infinite": 75,
      "Triarch Praetorians": [90, 180],
      "Triarch Stalker": 110,
      "Seraptek Heavy Construct": 540,
    },
    "enhancements": {
      "Annihilation Legion": {
        "Eldritch Nightmare": 15,
        "Eternal Madness": 25,
        "Ingrained Superiority": 10,
        "Soulless Reaper": 20,
      },
      "Awakened Dynasty": {
        "Enaegic Dermal Bond": 30,
        "Nether-realm Casket": 20,
        "Phasal Subjugator": 35,
        "Veil of Darkness": 20,
      },
      "Canoptek Court": {
        "Autodivinator": 15,
        "Dimensional Sanctum": 20,
        "Hyperphasic Fulcrum": 15,
        "Metalodermal Tesla Weave": 10,
      },
      "Hypercrypt Legion": {
        "Arisen Tyrant": 25,
        "Dimensional Overseer": 25,
        "Hyperspatial Transfer Node": 15,
        "Osteoclave Fulcrum": 20,
      },
      "Obeisance Phalanx": {
        "Eternal Conqueror": 25,
        "Honourable Combatant": 10,
        "Unflinching Will": 20,
        "Warrior Noble": 15,
      },
      "Starshatter Arsenal": {
        "Chrono-impedance Fields": 25,
        "Demanding Leader": 10,
        "Dread Majesty": 30,
        "Miniaturised Nebuloscope": 15,
      },
    }
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
      "Hyperadapted Raveners": 165,
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
        // Merge units arrays
        if (!rawFactionData.units) {
          rawFactionData.units = [];
        }
        rawFactionData.units.push(...parentFaction.units);
        rawFactionData.units.sort(sortByName);

        rawFactionData.enhancements = { ...rawFactionData.enhancements, ...parentFaction.enhancements };
        points.units = { ...points.units, ...parentPoints.units };
        points.enhancements = { ...points.enhancements, ...parentPoints.enhancements };
      }
    }

    const dataWithPoints = {
      units: rawFactionData.units.map(u => getPointsForUnit(u, points.units)),
      detachments: getPointsForDetachments(rawFactionData.detachments, points.enhancements),
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

const getPointsForDetachments = (detachmentData, pointsData) => {
  let detachmentWithPoints = {};
  detachmentData.forEach(detachment => {
    const pointsForDetachment = pointsData[detachment.name] ?? {};
    detachmentWithPoints[detachment.name] = {
      enhancements: detachment.enhancements.map(enhData => ({
        ...enhData,
        points: pointsForDetachment[enhData.name] ?? 0,
      })),
    };
  });
  return detachmentWithPoints; 
};
