export const factionData = {
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
          { name: ["HYLas auto rifle", "HYLas rotary cannon", "L7 missile launcher", "EtaCarn plasma beamer", "Magna-rail rifle"], replaces: ["Autoch-pattern bolter", "Ion blaster"], max: 2, selectionType: "anyNoDuplicates" },
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
      ],
      unitOptions: {
        weapons: [
          { name: ["L7 missile launcher & 1 Sagitaur missile launcher", "MATR autocannon"], replaces: "HYLas beam cannon" },
        ]
      }
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
          { name: ["Graviton blast cannon", "SP conversion beamer"], replaces: "Bolt cannon", selectionType: "all" },
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
            per: 5,
            replaces: ["|", "Heavy plasma axe", "Concussion maul"]
          },
          {
            name: "Concussion maul",
            replaces: "Heavy plasma axe"
          },
          {
            name: "Mole grenade launcher",
            max: 1,
            per: 5,
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
          { name: ["HYLas rotary cannon", "Ion beamer"], max: 1, per: 3, selectionType: "any" },
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
      ],
      "unitModifications": [
        { type: "addTag", target: "Cthonian Beserks", value: "Battleline" }
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
};
