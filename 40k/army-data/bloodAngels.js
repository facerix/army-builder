export const factionData = {
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
            { "name": "Archangel's Shard", tags: ["Jump Pack"] },
            { "name": "Artisan of War", tags: ["Jump Pack"] },
            { "name": "Gleaming Pinions", tags: ["Jump Pack"] },
            { "name": "Visage of Death", tags: ["Jump Pack"] }
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
              type: "addTag",
              target: "Death Company Marines",
              value: "Battleline",
            },
            {
              type: "addTag",
              target: "Death Company Marines with Bolt Rifles",
              value: "Battleline",
            },
          ],
        }
      ]
};
