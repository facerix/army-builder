export const factionData = {
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
};
