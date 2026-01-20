export const factionData = {
  units: [
    /* characters */
    {
      name: 'Asurmen',
      tags: [
        'Character',
        'Epic Hero',
        'Infantry',
        'Grenades',
        'Aspect Warrior',
        'Phoenix Lord',
        'Asuryani',
      ],
    },
    { name: 'Autarch', tags: ['Character', 'Infantry', 'Grenades', 'Asuryani'] },
    {
      name: 'Autarch Wayleaper',
      tags: ['Character', 'Infantry', 'Jump Pack', 'Fly', 'Grenades', 'Asuryani'],
    },
    { name: 'Avatar of Khaine', tags: ['Character', 'Epic Hero', 'Monster', 'Daemon', 'Asuryani'] },
    {
      name: 'Baharroth',
      tags: [
        'Character',
        'Epic Hero',
        'Infantry',
        'Jump Pack',
        'Fly',
        'Grenades',
        'Aspect Warrior',
        'Phoenix Lord',
        'Asuryani',
      ],
    },
    { name: 'Death Jester', tags: ['Character', 'Infantry', 'Harlequin'] },
    {
      name: 'Eldrad Ulthran',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Psyker', 'Farseer', 'Asuryani'],
    },
    { name: 'Farseer', tags: ['Character', 'Infantry', 'Psyker', 'Farseer', 'Asuryani'] },
    {
      name: 'Farseer Skyrunner',
      tags: ['Character', 'Mounted', 'Fly', 'Psyker', 'Farseer', 'Asuryani'],
    },
    {
      name: 'Fuegan',
      tags: [
        'Character',
        'Epic Hero',
        'Infantry',
        'Grenades',
        'Aspect Warrior',
        'Phoenix Lord',
        'Asuryani',
      ],
    },
    {
      name: 'Jain Zar',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Aspect Warrior', 'Phoenix Lord', 'Asuryani'],
    },
    {
      name: 'Lhykhis',
      tags: [
        'Character',
        'Epic Hero',
        'Infantry',
        'Jump Pack',
        'Fly',
        'Aspect Warrior',
        'Phoenix Lord',
        'Asuryani',
      ],
    },
    {
      name: 'Maugan Ra',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Aspect Warrior', 'Phoenix Lord', 'Asuryani'],
    },
    { name: 'Shadowseer', tags: ['Character', 'Infantry', 'Psyker', 'Grenades', 'Harlequin'] },
    {
      name: 'Solitaire',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Harlequin'],
      warlord: false,
    },
    { name: 'Spiritseer', tags: ['Character', 'Infantry', 'Psyker', 'Asuryani'] },
    { name: 'The Visarch', tags: ['Character', 'Epic Hero', 'Infantry', 'Ynnari'] },
    {
      name: 'The Yncarne',
      tags: ['Character', 'Epic Hero', 'Monster', 'Fly', 'Psyker', 'Daemon', 'Ynnari'],
    },
    { name: 'Troupe Master', tags: ['Character', 'Infantry', 'Grenades', 'Harlequin'] },
    { name: 'Warlock', tags: ['Character', 'Infantry', 'Psyker', 'Asuryani'] },
    { name: 'Ynnari Archon', tags: ['Character', 'Infantry', 'Archon', 'Ynnari'] },
    { name: 'Ynnari Succubus', tags: ['Character', 'Infantry', 'Ynnari'] },
    { name: 'Yvraine', tags: ['Character', 'Epic Hero', 'Infantry', 'Psyker', 'Ynnari'] },
    /* battleline */
    {
      name: 'Corsair Voidreavers',
      modelCount: [5, 10],
      tags: ['Battleline', 'Infantry', 'Grenades', 'Anhrathe', 'Corsair Voidreavers', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Guardian Defenders',
      modelCount: 11,
      tags: ['Battleline', 'Infantry', 'Grenades', 'Guardians', 'Guardian Defenders', 'Asuryani'],
    },
    {
      name: 'Storm Guardians',
      modelCount: 11,
      tags: ['Battleline', 'Infantry', 'Grenades', 'Guardians', 'Storm Guardians', 'Asuryani'],
    },
    {
      name: 'Ynnari Kabalite Warriors',
      modelCount: 10,
      tags: ['Battleline', 'Infantry', 'Kabalite Warriors', 'Ynnari'],
    },
    {
      name: 'Ynnari Wyches',
      modelCount: 10,
      tags: ['Battleline', 'Infantry', 'Grenades', 'Wyches', 'Ynnari'],
    },

    /* dedicated transports */
    {
      name: 'Starweaver',
      modelCount: 1,
      tags: [
        'Vehicle',
        'Transport',
        'Dedicated Transport',
        'Smoke',
        'Fly',
        'Starweaver',
        'Harlequin',
      ],
    },
    {
      name: 'Wave Serpent',
      modelCount: 1,
      tags: ['Vehicle', 'Transport', 'Dedicated Transport', 'Fly', 'Wave Serpent', 'Asuryani'],
    },
    {
      name: 'Ynnari Raider',
      modelCount: 1,
      tags: ['Vehicle', 'Transport', 'Dedicated Transport', 'Fly', 'Raider', 'Ynnari'],
    },
    {
      name: 'Ynnari Venom',
      modelCount: 1,
      tags: ['Vehicle', 'Transport', 'Dedicated Transport', 'Fly', 'Venom', 'Ynnari'],
    },

    {
      name: 'Corsair Voidscarred',
      modelCount: [5, 10],
      tags: ['Infantry', 'Grenades', 'Anhrathe', 'Corsair Voidscarred', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Crimson Hunter',
      tags: ['Vehicle', 'Fly', 'Aircraft', 'Aspect Warrior', 'Crimson Hunter', 'Asuryani'],
    },
    {
      name: 'D-cannon Platform',
      tags: ['Infantry', 'Support Weapon', 'D-cannon Platform', 'Asuryani'],
    },
    {
      name: 'Dark Reapers',
      modelCount: [5, 10],
      tags: ['Infantry', 'Aspect Warrior', 'Dark Reapers', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Dire Avengers',
      modelCount: [5, 10],
      tags: ['Infantry', 'Grenades', 'Aspect Warrior', 'Dire Avengers', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    { name: 'Falcon', tags: ['Vehicle', 'Fly', 'Transport', 'Falcon', 'Asuryani'] },
    {
      name: 'Fire Dragons',
      modelCount: [5, 10],
      tags: ['Infantry', 'Grenades', 'Aspect Warrior', 'Fire Dragons', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    { name: 'Fire Prism', tags: ['Vehicle', 'Fly', 'Fire Prism', 'Asuryani'] },
    {
      name: 'Hemlock Wraithfighter',
      tags: [
        'Vehicle',
        'Fly',
        'Aircraft',
        'Psyker',
        'Wraith Construct',
        'Hemlock Wraithfighter',
        'Asuryani',
      ],
    },
    {
      name: 'Howling Banshees',
      modelCount: [5, 10],
      tags: ['Infantry', 'Aspect Warrior', 'Howling Banshees', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    { name: 'Night Spinner', tags: ['Vehicle', 'Fly', 'Night Spinner', 'Asuryani'] },
    {
      name: 'Rangers',
      modelCount: [5, 10],
      tags: ['Infantry', 'Rangers', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Shadow Weaver Platform',
      tags: ['Infantry', 'Support Weapon', 'Shadow Weaver Platform', 'Asuryani'],
    },
    {
      name: 'Shining Spears',
      modelCount: [3, 6],
      tags: ['Mounted', 'Fly', 'Aspect Warrior', 'Shining Spears', 'Asuryani'],
      unitOptions: {
        unitSize: [3, 6],
      },
    },
    {
      name: 'Shroud Runners',
      modelCount: [3, 6],
      tags: ['Mounted', 'Fly', 'Shroud Runners', 'Asuryani'],
      unitOptions: {
        unitSize: [3, 6],
      },
    },
    {
      name: 'Skyweavers',
      modelCount: [2, 4],
      tags: ['Mounted', 'Fly', 'Smoke', 'Skyweavers', 'Harlequin'],
      unitOptions: {
        unitSize: [2, 4],
      },
    },
    {
      name: 'Striking Scorpions',
      modelCount: [5, 10],
      tags: ['Infantry', 'Aspect Warrior', 'Striking Scorpions', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Swooping Hawks',
      modelCount: [5, 10],
      tags: [
        'Infantry',
        'Jump Pack',
        'Fly',
        'Grenades',
        'Aspect Warrior',
        'Swooping Hawks',
        'Asuryani',
      ],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Troupe',
      modelCount: [5, 6, 11, 12],
      tags: ['Infantry', 'Grenades', 'Troupe', 'Harlequin'],
      unitOptions: {
        unitSize: [5, 6, 11, 12],
      },
    },
    {
      name: 'Vibro Cannon Platform',
      tags: ['Infantry', 'Support Weapon', 'Vibro Cannon Platform', 'Asuryani'],
    },
    { name: 'Voidweaver', tags: ['Vehicle', 'Fly', 'Voidweaver', 'Harlequin'] },
    {
      name: 'Vyper',
      modelCount: [1, 2],
      tags: ['Vehicle', 'Fly', 'Vyper', 'Asuryani'],
      unitOptions: {
        unitSize: [1, 2],
      },
    },
    {
      name: 'War Walker',
      modelCount: [1, 2],
      tags: ['Vehicle', 'Walker', 'War Walker', 'Asuryani'],
      unitOptions: {
        unitSize: [1, 2],
      },
    },
    {
      name: 'Warlock Conclave',
      modelCount: [2, 4],
      tags: ['Infantry', 'Psyker', 'Warlock', 'Warlock Conclave', 'Asuryani'],
      unitOptions: {
        unitSize: [2, 4],
      },
    },
    {
      name: 'Warlock Skyrunners',
      modelCount: [1, 2],
      tags: ['Mounted', 'Fly', 'Psyker', 'Warlock', 'Warlock Skyrunners', 'Asuryani'],
      unitOptions: {
        unitSize: [1, 2],
      },
    },
    {
      name: 'Warp Spiders',
      modelCount: [5, 10],
      tags: ['Infantry', 'Jump Pack', 'Fly', 'Aspect Warrior', 'Warp Spiders', 'Asuryani'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Windriders',
      modelCount: [3, 6],
      tags: ['Mounted', 'Fly', 'Windriders', 'Asuryani'],
      unitOptions: {
        unitSize: [3, 6],
      },
    },
    {
      name: 'Wraithblades',
      modelCount: 5,
      tags: ['Infantry', 'Wraith Construct', 'Wraithblades', 'Asuryani'],
    },
    {
      name: 'Wraithguard',
      modelCount: 5,
      tags: ['Infantry', 'Wraith Construct', 'Wraithguard', 'Asuryani'],
    },
    {
      name: 'Wraithknight',
      tags: [
        'Monster',
        'Titanic',
        'Towering',
        'Walker',
        'Wraith Construct',
        'Wraithknight',
        'Asuryani',
      ],
    },
    {
      name: 'Wraithknight with Ghostglaive',
      modelCount: 1,
      tags: [
        'Monster',
        'Titanic',
        'Towering',
        'Walker',
        'Wraith Construct',
        'Wraithknight with Ghostglaive',
        'Asuryani',
      ],
    },
    {
      name: 'Wraithlord',
      modelCount: 1,
      tags: ['Monster', 'Walker', 'Wraith Construct', 'Wraithlord', 'Asuryani'],
    },
    {
      name: 'Ynnari Incubi',
      modelCount: [5, 10],
      tags: ['Infantry', 'Ynnari Incubi', 'Ynnari'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Ynnari Reavers',
      modelCount: [3, 6],
      tags: ['Mounted', 'Fly', 'Ynnari Reavers', 'Ynnari'],
      unitOptions: {
        unitSize: [3, 6],
      },
    },
    {
      name: 'Phantom Titan',
      modelCount: 1,
      tags: [
        'Monster',
        'Titanic',
        'Towering',
        'Walker',
        'Wraith Construct',
        'Phantom Titan',
        'Asuryani',
      ],
    },
    {
      name: 'Revenant Titan',
      modelCount: 1,
      tags: [
        'Monster',
        'Titanic',
        'Towering',
        'Walker',
        'Fly',
        'Wraith Construct',
        'Revenant Titan',
        'Asuryani',
      ],
    },
  ],
  detachments: [
    {
      name: 'Armoured Warhost',
      enhancements: [
        { name: 'Guiding Presence', tags: ['Psyker'] },
        { name: 'Guileful Strategist' },
        { name: 'Harmonisation Matrix' },
        { name: 'Spirit Stone of Raelyth', tags: ['Psyker'] },
      ],
    },
    {
      name: 'Aspect Host',
      enhancements: [
        { name: 'Aspect of Murder', tags: ['Autarch', 'Autarch Wayleaper'] },
        { name: 'Mantle of Wisdom', tags: ['Autarch', 'Autarch Wayleaper'] },
        { name: 'Shimmerstone', tags: ['Autarch', 'Autarch Wayleaper'] },
        { name: 'Strategic Savant', tags: ['Autarch', 'Autarch Wayleaper'] },
      ],
    },
    {
      name: 'Devoted of Ynnead',
      enhancements: [
        { name: 'Borrowed Vigour', tags: ['Archon'] },
        { name: 'Gaze of Ynnead', tags: ['Farseer'] },
        { name: 'Morbid Might', tags: ['Succubus'] },
        { name: 'Storm of Whispers', tags: ['Warlock'] },
      ],
    },
    {
      name: 'Ghosts of the Webway',
      enhancements: [
        { name: 'Cegorach’s Coil', tags: ['Troupe Master'] },
        { name: 'Mask of Secrets', tags: ['Harlequin'] },
        { name: 'Mistweave', tags: ['Shadowseer'] },
        { name: 'Murder’s Jest', tags: ['Death Jester'] },
      ],
    },
    {
      name: 'Guardian Battlehost',
      enhancements: [
        { name: 'Breath of Vaul', tags: ['Asuryani'] },
        { name: 'Craftworld’s Champion', tags: ['Asuryani'] },
        { name: 'Ethereal Pathway', tags: ['Asuryani'] },
        { name: 'Protector of the Paths', tags: ['Asuryani'] },
      ],
    },
    {
      name: 'Seer Council',
      enhancements: [
        { name: 'Lucid Eye', tags: ['Asuryani+Psyker'] },
        { name: 'Runes of Warding', tags: ['Asuryani+Psyker'] },
        { name: 'Stone of Eldritch Fury', tags: ['Asuryani+Psyker'] },
        { name: 'Torc of Morai-Heg', tags: ['Asuryani+Psyker'] },
      ],
    },
    {
      name: 'Spirit Conclave',
      enhancements: [
        { name: 'Higher Duty', tags: ['Spiritseer'] },
        { name: 'Light of Clarity', tags: ['Spiritseer'] },
        { name: 'Rune of Mists', tags: ['Spiritseer'] },
        { name: 'Stave of Kurnous', tags: ['Spiritseer'] },
      ],
    },
    {
      name: 'Warhost',
      enhancements: [
        { name: 'Gift of Foresight', tags: ['Asuryani'] },
        { name: 'Phoenix Gem', tags: ['Asuryani'] },
        { name: 'Psychic Destroyer', tags: ['Asuryani+Psyker'] },
        { name: 'Timeless Strategist', tags: ['Asuryani'] },
      ],
    },
    {
      name: 'Windrider Host',
      enhancements: [
        { name: 'Echoes of Ulthanesh', tags: ['Asuryani+Mounted'] },
        { name: 'Firstdrawn Blade', tags: ['Asuryani+Mounted'] },
        { name: 'Mirage Field', tags: ['Asuryani+Mounted'] },
        { name: 'Seersight Strike', tags: ['Asuryani+Mounted+Psyker'] },
      ],
    },
  ],
};
