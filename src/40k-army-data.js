export const ARMIES = {
    "Adepta Sororitas": {
      "characters": [
        { name: "Aestred Thurga and Agathae Dolan", points: 70, modelCount: 2 },
        { name: "Canoness", points: 50, modelCount: 1 },
        { name: "Canoness with Jump Pack", points: 75, modelCount: 1 },
        { name: "Daemonifuge", points: 95, modelCount: 1 },
        { name: "Dialogus", points: 40, modelCount: 1 },
        { name: "Dogmata", points: 45, modelCount: 1 },
        { name: "Hospitaller", points: 50, modelCount: 1 },
        { name: "Imagifier", points: 65, modelCount: 1 },
        { name: "Junith Eruita", points: 90, modelCount: 1 },
        { name: "Ministorum Priest", points: 50, modelCount: 1, tags: ["Penitent"] },
        { name: "Morvenn Vahl", points: 170, modelCount: 1 },
        { name: "Palatine", points: 50, modelCount: 1 },
        { name: "Saint Celestine", points: 150, modelCount: 3 },
        { name: "Triumph of Saint Katherine", points: 250, modelCount: 1 },
      ],
      "battleline": [
        { name: "Battle Sisters Squad", points: 105, modelCount: 10 },
      ],
      "otherUnits": [
        {
          name: "Arco-flagellants",
          modelCount: [3, 10],
          points: [45, 140],
          tags: ["Penitent"],
          unitOptions: {
            unitSize: {
              "3": 45,
              "10": 140
            }
          }
        },
        {
          name: "Castigator",
          points: 170
        },
        {
          name: "Celestian Sacresants",
          modelCount: [5, 10],
          points: [70, 130],
          unitOptions: {
            unitSize: {
              "5": 70,
              "10": 130
            }
          }
        },
        {
          name: "Dominion Squad",
          points: 115,
          modelCount: 10
        },
        {
          name: "Exorcist",
          points: 210
        },
        {
          name: "Immolator",
          points: 125
        },
        {
          name: "Mortifiers",
          modelCount: [1, 2],
          points: [70, 140],
          tags: ["Penitent"],
          unitOptions: {
            unitSize: {
              "1": 70,
              "2": 140
            }
          }
        },
        {
          name: "Paragon Warsuits",
          points: 220,
          modelCount: 3
        },
        {
          name: "Penitent Engines",
          modelCount: [1, 2],
          points: [75, 150],
          tags: ["Penitent"],
          unitOptions: {
            unitSize: {
              "1": 75,
              "2": 150
            }
          }
        },
        {
          name: "Repentia Squad",
          modelCount: [5, 10],
          points: [85, 170],
          tags: ["Penitent"],
          unitOptions: {
            unitSize: {
              "5": 85,
              "10": 170
            }
          }
        },
        {
          name: "Retributor Squad",
          points: 105,
          modelCount: 5
        },
        {
          name: "Seraphim Squad",
          modelCount: [5, 10],
          points: [85, 170],
          unitOptions: {
            unitSize: {
              "5": 85,
              "10": 170
            }
          }
        },
        {
          name: "Sisters Novitiate Squad",
          points: 100,
          modelCount: 10
        },
        {
          name: "Sororitas Rhino",
          points: 75
        },
        {
          name: "Zephyrim Squad",
          modelCount: [5, 10],
          points: [80, 160],
          unitOptions: {
            unitSize: {
              "5": 80,
              "10": 160
            }
          }
        }
      ],
      "enhancements": {
        "Army of Faith": [
          {
            name: "Blade of Saint Ellynor",
            points: 15,
          },
          {
            name: "Divine Aspect",
            points: 5,
          },
          {
            name: "Litanies of Faith",
            points: 10,
            tags: ["Canoness", "Palatine"],
          },
          {
            name: "Triptych of the Macharian Crusade",
            points: 20,
          },
        ],
        "Bringers of Flame": [
          {
            name: "Fire and Fury",
            points: 30,
          },
          {
            name: "Iron Surplice of Saint Istalela",
            points: 10,
            tags: ["Canoness", "Palatine"],
          },
          {
            name: "Manual of Saint Griselda",
            points: 20,
          },
          {
            name: "Righteous Rage",
            points: 15,
          },
        ],
        "Champions of Faith": [
          {
            name: "Eyes of the Oracle",
            points: 10,
          },
          {
            name: "Mark of Devotion",
            points: 30,
          },
          {
            name: "Sanctified Amulet",
            points: 25,
          },
          {
            name: "Triptych of Judgement",
            points: 15,
          },
        ],
        "Hallowed Martyrs": [
          {
            name: "Chaplet of Sacrifice",
            points: 25,
          },
          {
            name: "Mantle of Ophelia",
            points: 20,
            tags: ["Canoness", "Palatine"],
          },
          {
            name: "Saintly Example",
            points: 10,
          },
          {
            name: "Through Suffering, Strength",
            points: 25,
          },
        ],
        "Penitent Host": [
          {
            name: "Catechism of Divine Penitence",
            points: 20,
            tags: ["Canoness", "Palatine", "Ministorum Priest"]
          },
          {
            name: "Psalm of Righteous Judgement",
            points: 30,
          },
          {
            name: "Refrain of Enduring Faith",
            points: 25,
            tags: ["Penitent"]
          },
          {
            name: "Verse of Holy Piety",
            points: 15,
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
      "models": {},
      "enhancements": {},
    },
    "Black Templars": {
      "models": {},
      "enhancements": {},
    },
  
    "Blood Angels": {
      "characters": [
        { name: "Astorath", points: 105 },
        { name: "Blood Angels Captain", points: 80 },
        { name: "Chief Librarian Mephiston", points: 135 },
        { name: "Commander Dante", points: 130 },
        { name: "Death Company Captain", points: 70 },
        { name: "Death Company Captain with Jump Pack", points: 75 },
        { name: "Lemartes", points: 110 },
        { name: "Sanguinary Priest", points: 90 },
        { name: "The Sanguinor", points: 140 }
      ],
      "battleline": [
        {
          name: "Death Company Marines",
          modelCount: 5,
          points: 85
        },
        {
          name: "Death Company Marines",
          modelCount: 10,
          points: 160
        },
        {
          name: "Death Company Marines with Bolt Rifles",
          modelCount: 5,
          points: 85
        },
        {
          name: "Death Company Marines with Bolt Rifles",
          modelCount: 10,
          points: 160
        },
        {
          name: "Death Company Marines with Jump Packs",
          modelCount: 5,
          points: 130
        },
        {
          name: "Death Company Marines with Jump Packs",
          modelCount: 10,
          points: 240
        },
        {
          name: "Sanguinary Guard",
          modelCount: 3,
          points: 130
        },
        {
          name: "Sanguinary Guard",
          modelCount: 6,
          points: 260
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
  
    "Chaos Daemons": {
      "models": {},
      "enhancements": {},
    },
    "Chaos Knights": {
      "models": {},
      "enhancements": {},
    },
  
    "Chaos Space Marines": {
      "models": {
        "Abaddon the Despoiler": 200,
        "Chaos Lord": 75,
        "Chaos Sorcerer": 60,
        "Chaos Space Marine Squad": {
          "5x": 80,
          "10x": 150
        },
        "Chaos Terminator Squad": {
          "5x": 190,
          "10x": 380
        },
        "Cultists": {
          "10x": 50,
          "20x": 100
        },
        "Helbrute": 130,
        "Khorne Berzerkers": {
          "5x": 90,
          "10x": 180
        },
        "Noise Marines": {
          "5x": 90,
          "10x": 180
        },
        "Plague Marines": {
          "5x": 90,
          "10x": 180
        },
        "Thousand Sons": {
          "5x": 90,
          "10x": 180
        },
        "Vindicator": 185,
        "Predator": 135,
        "Land Raider": 240,
        "Dreadnought": 135,
        "Chaos Rhino": 75
      },
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
        }
      }
    },
  
    "Dark Angels": {
      "models": {},
      "enhancements": {},
    },
    "Death Guard": {
      "models": {},
      "enhancements": {},
    },
    "Deathwatch": {
      "models": {},
      "enhancements": {},
    },
    "Drukhari": {
      "models": {},
      "enhancements": {},
    },
    "Emperor's Children": {
      "models": {},
      "enhancements": {},
    },
    "Genestealer Cults": {
      "models": {},
      "enhancements": {},
    },
    "Grey Knights": {
      "models": {},
      "enhancements": {},
    },
    "Imperial Agents": {
      "models": {},
      "enhancements": {},
    },
    "Imperial Fists": {
      "models": {},
      "enhancements": {},
    },
    "Imperial Knights": {
      "models": {},
      "enhancements": {},
    },
    "Iron Hands": {
      "models": {},
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
            unitSize: {
              "3": 80,
              "6": 160
            }
          }
        },
        {
          name: "Cthonian Beserks",
          modelCount: [5, 10],
          points: [100, 200],
          unitOptions: {
            unitSize: {
              "5": 100,
              "10": 200
            }
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
            unitSize: {
              "5": 135,
              "10": 270
            }
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
            unitSize: {
              "3": 80,
              "6": 160
            }
          }
        },
        {
          name: "Hernkyn Yaegirs",
          points: 90,
          modelCount: 10
        },
        {
          name: "Ironkin Steeljacks",
          modelCount: [3, 6],
          points: [90, 180],
          unitOptions: {
            unitSize: {
              "3": 90,
              "6": 180
            },
            wargear: [
              "Heavy Volkanite Disintegrators",
              "Melee Weapons",
            ]
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
            unitSize: {
              "1": 70,
              "2": 140,
            }
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
      "models": {},
      "enhancements": {},
    },
    "Raven Guard": {
      "models": {},
      "enhancements": {},
    },
    "Salamanders": {
      "models": {},
      "enhancements": {},
    },
    "Space Marines": {
      "models": {
        "Adrax Agatone": 85,
        "Aggressor Squad": {
          "3x": 120,
          "6x": 240
        },
        "Ancient": 50,
        "Ancient in Terminator Armour": 75,
        "Apothecary": 50,
        "Apothecary Biologis": 70,
        "Assault Intercessor Squad": {
          "5x": 75,
          "10x": 150
        },
        "Ballistus Dreadnought": 140,
        "Captain": 80,
        "Captain in Gravis Armour": 80,
        "Captain in Phobos Armour": 70,
        "Captain in Terminator Armour": 95,
        "Centurion Assault Squad": {
          "3x": 150,
          "6x": 300
        },
        "Chaplain": 60,
        "Chaplain in Terminator Armour": 75,
        "Chief Librarian Tigurius": 75,
        "Dreadnought": 135,
        "Eliminator Squad": {
          "3x": 85
        },
        "Eradicator Squad": {
          "3x": 100,
          "6x": 200
        },
        "Intercessor Squad": {
          "5x": 80,
          "10x": 160
        },
        "Inceptor Squad": {
          "3x": 120,
          "6x": 240
        },
        "Librarian": 65,
        "Librarian in Phobos Armour": 70,
        "Librarian in Terminator Armour": 75,
        "Predator Annihilator": 135,
        "Predator Destructor": 140,
        "Redemptor Dreadnought": 210,
        "Repulsor": 180,
        "Rhino": 75,
        "Tactical Squad": {
          "10x": 140
        },
        "Terminator Squad": {
          "5x": 170,
          "10x": 340
        },
        "Vindicator": 185
      },
      "enhancements": {
        "1st Company Task Force": {
          "Fear Made Manifest": 30,
          "Iron Resolve": 15,
          "Rites of War": 10
        },
        "Tactical Flexibility": {
          "Strategic Reserves": 10,
          "Rapid Deployment": 15,
          "Flanking Maneuvers": 20
        }
      }
    },
  
    "Space Wolves": {
      "models": {},
      "enhancements": {},
    },
    "T'au Empire": {
      "models": {},
      "enhancements": {},
    },
    "Thousand Sons": {
      "models": {},
      "enhancements": {},
    },
    "Tyranids": {
      "models": {
        "Barbgaunts": {
          "5x": 55,
          "10x": 110,
        },
        "Biovores": {
          "1x": 50,
          "2x": 100,
          "3x": 150
        },
        "Broodlord": 80,
        "Carnifexes": {
          "1x": 115,
          "2x": 230
        },
        "Deathleaper": 80,
        "Exocrine": 140,
        "Gargoyles": {
          "10x": 85,
          "20x": 170,
        },
        "Genestealers": {
          "5x": 75,
          "10x": 150,
        },
        "Harpy": 215,
        "Haruspex": 125,
        "Hive Crone": 200,
        "Hive Guard": {
          "3x": 100,
          "6x": 200
        },
        "Hive Tyrant": 225,
        "Hormagaunts": {
          "10x": 65,
          "20x": 130,
        },
        "Lictor": 60,
        "Maleceptor": 170,
        "Mawloc": 145,
        "Mucolid Spores": {
          "1x": 30,
          "2x": 60
        },
        "Neurogaunts": {
          "11x": 45,
          "22x": 90,
        },
        "Neurolictor": 80,
        "Neurotyrant": 105,
        "Norn Assimilator": 275,
        "Norn Emissary": 260,
        "Old One Eye": 150,
        "Parasite of Mortrex": 80,
        "Psychophage": 95,
        "Pyrovores": {
          "1x": 40,
          "2x": 70,
          "3x": 105
        },
        "Raveners": {
          "3x": 75,
          "6x": 150,
        },
        "Ripper Swarms": {
          "1x": 25,
          "2x": 40,
          "3x": 50
        },
        "Screamer-Killer": 145,
        "Spore Mines": {
          "3x": 55,
          "6x": 110
        },
        "Sporocyst": 145,
        "Termagants": {
          "10x": 60,
          "20x": 120,
        },
        "Tervigon": 175,
        "The Swarmlord": 240,
        "Toxicrene": 150,
        "Trygon": 140,
        "Tyranid Warriors with Melee Bio-weapons": {
          "3x": 75,
          "6x": 150,
        },
        "Tyranid Warriors with Ranged Bio-weapons": {
          "3x": 65,
          "6x": 130,
        },
        "Tyrannocyte": 105,
        "Tyrannofex": 200,
        "Tyrant Guard": {
          "3x": 80,
          "6x": 160,
        },
        "Venomthropes": {
          "3x": 70,
          "6x": 140
        },
        "Von Ryan's Leapers": {
          "3x": 70,
          "6x": 140,
        },
        "Winged Hive Tyrant": 200,
        "Winged Tyranid Prime": 65,
        "Zoanthropes": {
          "3x": 100,
          "6x": 200,
        }
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
      },
    },
    "Ultramarines": {
      "models": {},
      "enhancements": {},
    },
  
    "White Scars": {
      "models": {
        "Kor'sarro Khan": 70,
        "Jagatai Khan": 130,
        "White Scars Captain": 80,
        "White Scars Chaplain": 60,
        "White Scars Librarian": 75,
        "White Scars Primaris Captain": 85,
        "White Scars Intercessor Squad": {
          "5x": 80,
          "10x": 160
        },
        "White Scars Biker Squad": {
          "3x": 120,
          "6x": 240
        },
        "White Scars Outriders": {
          "3x": 90,
          "6x": 180
        },
        "White Scars Assault Intercessor Squad": {
          "5x": 90,
          "10x": 180
        }
      },
      "enhancements": {
        "Hunt and Kill": {
          "Master of the Hunt": 15,
          "Swift Attack": 20,
          "Lightning Assault": 25
        },
        "Tactical Flexibility": {
          "Strategic Reserves": 10,
          "Rapid Deployment": 15,
          "Flanking Maneuvers": 20
        }
      }
    },
    "World Eaters": {
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
  