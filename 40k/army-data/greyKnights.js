export const factionData = {
  "units": [
    /* characters */
    {
      "name": "Brother-Captain",
      "modelCount": 1,
      "tags": [
        "Brother-Captain",
        "Terminator",
        "Psyker",
        "Infantry",
        "Imperium",
        "Character",
        "Grenades"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter" },
        ]
      }
    },
    {
      "name": "Brother-Captain Stern [Legends]",
      "modelCount": 1,
      "tags": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Imperium",
        "Psyker",
        "Terminator",
        "Brother-Captain Stern"
      ]
    },
    {
      "name": "Brotherhood Champion",
      "modelCount": 1,
      "tags": [
        "Character",
        "Infantry",
        "Psyker",
        "Grenades",
        "Imperium",
        "Brotherhood Champion"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ]
    },
    {
      "name": "Brotherhood Chaplain",
      "modelCount": 1,
      "tags": [
        "Brotherhood Chaplain",
        "Terminator",
        "Psyker",
        "Imperium",
        "Infantry",
        "Character"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Crozius arcanum" },
      ]
    },
    {
      "name": "Brotherhood Librarian",
      "modelCount": 1,
      "tags": [
        "Brotherhood Librarian",
        "Imperium",
        "Terminator",
        "Infantry",
        "Character",
        "Psyker"
      ],
      weapons: [
        { name: "Nemesis force weapon" },
        { name: "Vortex of Doom" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Combi-weapon", "Storm bolter"], max: 1 },
        ]
      }
    },
    {
      "name": "Brotherhood Techmarine",
      "modelCount": 1,
      "tags": [
        "Character",
        "Infantry",
        "Psyker",
        "Grenades",
        "Imperium",
        "Brotherhood Techmarine"
      ],
      weapons: [
        { name: "Forge bolter" },
        { name: "Grav-pistol" },
        { name: "Omnissian power axe" },
        { name: "Servo-arm" },
      ]
    },
    {
      "name": "Castellan Crowe",
      "modelCount": 1,
      "tags": [
        "Castellan Crowe",
        "Psyker",
        "Grenades",
        "Imperium",
        "Epic Hero",
        "Infantry",
        "Character"
      ],
      weapons: [
        { name: "Purifying Flame" },
        { name: "Storm bolter" },
        { name: "Black Blade of Antwyr" },
      ]
    },
    {
      "name": "Grand Master",
      "modelCount": 1,
      "tags": [
        "Infantry",
        "Character",
        "Grenades",
        "Psyker",
        "Terminator",
        "Grand Master",
        "Imperium"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter" },
        ]
      }
    },
    {
      "name": "Grand Master in Nemesis Dreadknight",
      "modelCount": 1,
      "tags": [
        "Character",
        "Vehicle",
        "Walker",
        "Psyker",
        "Imperium",
        "Grand Master in Nemesis Dreadknight"
      ],
      weapons: [
        { name: "Dreadfists" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Nemesis daemon greathammer", "Nemesis flail", "Nemesis greatsword", "Nemesis mace"], replaces: "Dreadfists" },
          { name: ["Gatling psilencer", "Heavy incinerator", "Heavy psycannon", "Sublimator"], max: 2 },
          { name: "Fragstorm grenade launcher", max: 1 }
        ]
      }
    },
    {
      "name": "Grand Master Voldus",
      "modelCount": 1,
      "tags": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Psyker",
        "Imperium",
        "Terminator",
        "Grand Master Voldus"
      ],
      weapons: [
        { name: "Searing Purity" },
        { name: "Storm bolter" },
        { name: "Malleus Argyrum" },
      ]
    },
    {
      "name": "Kaldor Draigo [Legends]",
      "modelCount": 1,
      "tags": [
        "Epic Hero",
        "Infantry",
        "Character",
        "Grenades",
        "Psyker",
        "Terminator",
        "Imperium",
        "Kaldor Draigo"
      ]
    },
    {
      "name": "Venerable Dreadnought",
      "modelCount": 1,
      "tags": [
        "Venerable Dreadnought",
        "Walker",
        "Vehicle",
        "Psyker",
        "Smoke",
        "Imperium",
        "Character"
      ],
      weapons: [
        { name: "Assault cannon" },
        { name: "Storm bolter" },
        { name: "Dreadnought combat weapon" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Heavy plasma cannon", "Twin lascannon"], replaces: "Assault cannon" },
          { name: ["Heavy flamer"], replaces: "Storm bolter" },
        ]
      }
    },
    {
      "name": "Brotherhood Terminator Squad",
      "tags": [
        "Battleline",
        "Infantry",
        "Grenades",
        "Psyker",
        "Imperium",
        "Terminator",
        "Brotherhood Terminator Squad"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 4, 5, 8, 10 ],
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 1 },
          { name: "Apothecary's narthecium", replaces: "Storm bolter", max: 1 },
          { name: "Ancient's banner", max: 1 }
        ]
      }
    },
    {
      "name": "Strike Squad",
      "tags": [
        "Strike Squad",
        "Psyker",
        "Imperium",
        "Grenades",
        "Battleline",
        "Infantry"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 5, 10 ],
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 1 },
        ]
      }
    },
    {
      "name": "Grey Knights Relic Razorback [Legends]",
      "modelCount": 1,
      "tags": [
        "Dedicated Transport",
        "Vehicle",
        "Transport",
        "Smoke",
        "Imperium",
        "Relic Razorback"
      ]
    },
    {
      "name": "Razorback",
      "modelCount": 1,
      "tags": [
        "Razorback",
        "Dedicated Transport",
        "Vehicle",
        "Transport",
        "Smoke",
        "Imperium"
      ],
      weapons: [
        { name: "Twin heavy bolter" },
        { name: "Armoured tracks" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Twin lascannon"], replaces: "Twin heavy bolter" },
          { name: ["Hunter-killer missle"], max: 1 },
          { name: ["Storm bolter"], max: 1 },
        ]
      }
    },
    {
      "name": "Rhino",
      "modelCount": 1,
      "tags": [
        "Rhino",
        "Transport",
        "Vehicle",
        "Dedicated Transport",
        "Imperium",
        "Smoke",
        "Rhino"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Armoured tracks" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Additional storm bolter"], max: 1 },
          { name: ["Hunter-killer missle"], max: 1 },
        ]
      }
    },
    {
      "name": "Grey Knights Dreadnought [Legends]",
      "modelCount": 1,
      "tags": [
        "Dreadnought",
        "Walker",
        "Vehicle",
        "Psyker",
        "Smoke",
        "Imperium"
      ]
    },
    {
      "name": "Grey Knights Thunderhawk Gunship",
      "modelCount": 1,
      "tags": [
        "Thunderhawk Gunship",
        "Titanic",
        "Vehicle",
        "Fly",
        "Transport",
        "Aircraft",
        "Imperium"
      ],
      weapons: [
        { name: "Lascannons", count: 2 },
        { name: "Thunderhawk heavy cannon" },
        { name: "Twin heavy bolters", count: 4 },
        { name: "Armoured hull" },
        { name: "Thunderhawk cluster bombs" },
      ],
      unitOptions: {
        weapons: [
          { name: "Hellstrike missile battery", replaces: "Thunderhawk cluster bombs" },
          { name: "Turbo-laser destructor", replaces: "Thunderhawk heavy cannon" },
        ]
      }
    },
    {
      "name": "Interceptor Squad",
      "tags": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Fly",
        "Psyker",
        "Interceptor Squad"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 5, 10 ],
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 1 },
        ]
      }
    },
    {
      "name": "Land Raider",
      "modelCount": 1,
      "tags": [
        "Vehicle",
        "Smoke",
        "Transport",
        "Imperium",
        "Land Raider"
      ],
      weapons: [
        { name: "Godhammer lascannons", count: 2 },
        { name: "Twin heavy bolter" },
        { name: "Armoured tracks" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Hunter-killer missle"], max: 1 },
          { name: ["Multi-melta"], max: 1 },
          { name: ["Storm bolter"], max: 1 },
        ]
      }
    },
    {
      "name": "Land Raider Crusader",
      "modelCount": 1,
      "tags": [
        "Vehicle",
        "Transport",
        "Smoke",
        "Imperium",
        "Grenades",
        "Land Raider Crusader"
      ],
      weapons: [
        { name: "Hurricane bolters", count: 2 },
        { name: "Twin assault cannon" },
        { name: "Armoured tracks" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Hunter-killer missle"], max: 1 },
          { name: ["Multi-melta"], max: 1 },
          { name: ["Storm bolter"], max: 1 },
        ]
      }
    },
    {
      "name": "Land Raider Redeemer",
      "modelCount": 1,
      "tags": [
        "Land Raider Redeemer",
        "Grenades",
        "Imperium",
        "Vehicle",
        "Transport",
        "Smoke"
      ],
      weapons: [
        { name: "Flamestorm cannons", count: 2 },
        { name: "Twin assault cannon" },
        { name: "Armoured tracks" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Hunter-killer missle"], max: 1 },
          { name: ["Multi-melta"], max: 1 },
          { name: ["Storm bolter"], max: 1 },
        ]
      }
    },
    {
      "name": "Nemesis Dreadknight",
      "modelCount": 1,
      "tags": [
        "Nemesis Dreadknight",
        "Vehicle",
        "Walker",
        "Psyker",
        "Imperium"
      ],
      weapons: [
        { name: "Dreadfists" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Nemesis daemon greathammer", "Nemesis greatsword"], replaces: "Dreadfists" },
          { name: ["Gatling psilencer", "Heavy incinerator", "Heavy psycannon"], max: 2 },
        ]
      }
    },
    {
      "name": "Paladin Squad",
      "tags": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Psyker",
        "Terminator",
        "Paladin Squad"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 4, 5, 8, 10 ],
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 2 },
          { name: "Apothecary's narthecium", replaces: "Storm bolter", max: 1 },
          { name: "Ancient's banner", max: 1 }
        ]
      }
    },
    {
      "name": "Purgation Squad",
      "tags": [
        "Purgation Squad",
        "Psyker",
        "Imperium",
        "Grenades",
        "Infantry"
      ],
      weapons: [
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 5, 10 ],
        weapons: [
          /* note that this isn't quite right but I'm not going to try to untangle it right now */
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 4 },
        ]
      }
    },
    {
      "name": "Purifier Squad",
      "tags": [
        "Purifier Squad",
        "Psyker",
        "Imperium",
        "Grenades",
        "Infantry"
      ],
      weapons: [
        { name: "Purifying Flame" },
        { name: "Storm bolter" },
        { name: "Nemesis force weapon" },
      ],
      "unitOptions": {
        "unitSize": [ 5, 10 ],
        weapons: [
          { name: ["Incinerator", "Psilencer", "Psycannon"], replaces: "Storm bolter", max: 2 },
        ]
      }
    },
    {
      "name": "Stormhawk Interceptor",
      "modelCount": 1,
      "tags": [
        "Stormhawk Interceptor",
        "Vehicle",
        "Aircraft",
        "Fly",
        "Smoke",
        "Imperium"
      ],
      weapons: [
        { name: "Las-talon" },
        { name: "Skyhammer missile launcher" },
        { name: "Twin assault cannon" },
        { name: "Armoured hull" },
      ],
      unitOptions: {
        weapons: [
          { name: "Icarus stormcannon", replaces: "Las-talon" },
          { name: ["Twin heavy bolter", "Typhoon missle launcher"], replaces: "Skyhammer missile launcher" },
        ]
      }
    },
    {
      "name": "Stormraven Gunship",
      "modelCount": 1,
      "tags": [
        "Stormraven Gunship",
        "Aircraft",
        "Vehicle",
        "Transport",
        "Fly",
        "Imperium"
      ],
      weapons: [
        { name: "Stormstrike missile launchers", count: 2 },
        { name: "Twin assault cannon" },
        { name: "Typhoon missile launcher" },
        { name: "Armoured hull" },
      ],
      unitOptions: {
        weapons: [
          { name: "Hurricane bolters", max: 1 },
          { name: ["Twin heavy plasma cannon", "Twin lascannon"], replaces: "Twin assault cannon" },
          { name: ["Twin heavy bolter", "Twin multi-melta"], replaces: "Typhoon missile launcher" },
        ]
      }
    },
    {
      "name": "Stormtalon Gunship",
      "modelCount": 1,
      "tags": [
        "Stormtalon Gunship",
        "Aircraft",
        "Vehicle",
        "Fly",
        "Imperium"
      ],
      weapons: [
        { name: "Skyhammer missile launcher" },
        { name: "Twin assault cannon" },
        { name: "Armoured hull" },
      ],
      unitOptions: {
        weapons: [
          { name: ["Twin heavy bolter", "Twin lascannon", "Typhoon missle launcher"], replaces: "Skyhammer missile launcher" }
        ]
      }
    }
  ],
  "detachments": [
    {
      "name": "Augurium Task Force",
      "enhancements": [
        {
          "name": "A Foot in the Future",
        },
        {
          "name": "Doomseer's Amulet",
        },
        {
          "name": "Grimoire of Conjunctions",
        },
        {
          "name": "Shield of Prophecy",
        }
      ]
    },
    {
      "name": "Banishers",
      "enhancements": [
        {
          "name": "Pyresoul (Psychic)",
        },
        {
          "name": "Sigil of the Hunt",
        },
        {
          "name": "The Ephemeral Tome",
          tags: ["Infantry"]
        },
        {
          "name": "The Sixty-sixth Seal",
        },
      ]
    },
    {
      "name": "Brotherhood Strike",
      "enhancements": [
        {
          "name": "Banishing Wave (Psychic)",
        },
        {
          "name": "Blinding Aura",
        },
        {
          "name": "Purity of Purpose",
        },
        {
          "name": "Tome of Forbidden Ways",
        },
      ]
    },
    {
      "name": "Hallowed Conclave",
      "enhancements": [
        {
          "name": "Eye of the Augurium",
        },
        {
          "name": "Inescapable Judgement (Psychic)",
        },
        {
          "name": "Nemesis Rounds",
          tags: ["Terminator"]
        },
        {
          "name": "Sanctic Reaper",
          tags: ["Terminator"]
        },
      ]
    },
    {
      "name": "Sanctic Spearhead",
      "enhancements": [
        {
          "name": "Driven by Duty",
          tags: ["Walker"]
        },
        {
          "name": "Quickening Foci",
          tags: ["Infantry"]
        },
        {
          "name": "Sigil of Exigence",
        },
        {
          "name": "Spiritus Machina",
          tags: ["Infantry"]
        }
      ]
    },
    {
      "name": "Warpbane Task Force",
      "enhancements": [
        {
          "name": "Mandulian Reliquary",
        },
        {
          "name": "Paragon of Sanctity",
        },
        {
          "name": "Phial of the Abyss",
          tags: ["Infantry"]
        },
        {
          "name": "Radiant Champion",
          tags: ["Infantry"]
        }
      ]
    },
  ]
};
