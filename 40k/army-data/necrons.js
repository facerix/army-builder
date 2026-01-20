export const factionData = {
  units: [
    /* characters */
    {
      name: "C'tan Shard of the Deceiver",
      tags: ['Character', 'Monster', 'Fly', 'Epic Hero', "C'tan Shard of the Deceiver"],
    },
    {
      name: "C'tan Shard of the Nightbringer",
      tags: ['Character', 'Monster', 'Fly', 'Epic Hero', "C'tan Shard of the Nightbringer"],
    },
    {
      name: "C'tan Shard of the Void Dragon",
      tags: ['Character', 'Monster', 'Fly', 'Epic Hero', "C'tan Shard of the Void Dragon"],
    },
    {
      name: 'Catacomb Command Barge',
      tags: ['Character', 'Vehicle', 'Fly', 'Catacomb Command Barge'],
      weapons: [{ name: 'Gauss cannon' }, { name: 'Staff of light' }],
      wargear: [],
      unitOptions: {
        weapons: [
          { name: 'Tesla cannon', replaces: 'Gauss cannon' },
          { name: "Overlord's blade", replaces: 'Staff of light' },
        ],
        wargear: [{ name: 'Resurrection orb' }],
      },
    },
    { name: 'Chronomancer', tags: ['Character', 'Infantry', 'Cryptek', 'Chronomancer'] },
    { name: 'Geomancer', tags: ['Character', 'Infantry', 'Cryptek', 'Geomancer'] },
    {
      name: 'Hexmark Destroyer',
      tags: ['Character', 'Infantry', 'Destroyer Cult', 'Hexmark Destroyer'],
    },
    {
      name: 'Illuminor Szeras',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Cryptek', 'Illuminor Szeras'],
    },
    {
      name: 'Imotekh the Stormlord',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Noble', 'Imotekh the Stormlord'],
    },
    {
      name: 'Lokhust Lord',
      tags: ['Character', 'Mounted', 'Fly', 'Destroyer Cult', 'Lokhust Lord'],
      weapons: [{ name: 'Staff of light' }],
      unitOptions: {
        weapons: [{ name: "Lord's blade", replaces: 'Staff of light' }],
        wargear: [{ name: ['Nanoscarab amulet', 'Resurrection orb'], max: 1 }],
      },
    },
    {
      name: 'Nekrosor Ammentar',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Destroyer Cult', 'Nekrosor Ammentar'],
      weapons: ['Enmitic disintegrators', 'Unmaker Gauntlet', 'Blade tail and whip coils'],
      wargear: ['Nullstone Field Generator'],
    },
    {
      name: 'Orikan the Diviner',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Cryptek', 'Chronomancer', 'Orikan the Diviner'],
      weapons: [{ name: 'Staff of Tomorrow' }],
    },
    {
      name: 'Overlord',
      tags: ['Character', 'Infantry', 'Noble', 'Overlord'],
      weapons: [{ name: 'Tachyon arrow' }, { name: "Overlord's blade" }],
      unitOptions: {
        weapons: [
          {
            name: ['Staff of light', 'Voidscythe'],
            replaces: ['&', 'Tachyon arrow', "Overlord's blade"],
            max: 1,
            selectionType: 'any',
          },
        ],
        wargear: [
          {
            name: 'Resurrection orb',
            excludes: ['Tachyon arrow'],
            max: 1,
          },
        ],
      },
    },
    {
      name: 'Overlord with Translocation Shroud',
      tags: ['Character', 'Infantry', 'Noble', 'Overlord', 'Overlord with Translocation Shroud'],
      weapons: [{ name: "Overlord's blade" }],
      wargear: [{ name: 'Resurrection orb' }],
    },
    {
      name: 'Plasmancer',
      tags: ['Character', 'Infantry', 'Cryptek', 'Plasmancer'],
      weapons: [{ name: 'Plasmic lance' }],
    },
    {
      name: 'Psychomancer',
      tags: ['Character', 'Infantry', 'Cryptek', 'Psychomancer'],
      weapons: [{ name: 'Abyssal lance' }],
    },
    {
      name: 'Royal Warden',
      tags: ['Character', 'Infantry', 'Royal Warden'],
      weapons: [{ name: 'Relic gauss blaster' }, { name: 'Close combat weapon' }],
    },
    {
      name: 'Skorpekh Lord',
      tags: ['Character', 'Infantry', 'Destroyer Cult', 'Skorpekh Lord'],
      weapons: [
        { name: 'Enmitic annihilator' },
        { name: 'Flensing claw' },
        { name: 'Hyperphase harvester' },
      ],
    },
    {
      name: 'Technomancer',
      tags: ['Character', 'Infantry', 'Cryptek', 'Fly', 'Technomancer'],
      weapons: [{ name: 'Staff of light' }],
      wargear: [{ name: 'Canoptek cloak' }],
    },
    {
      name: 'The Silent King',
      modelCount: 3,
      tags: ['Character', 'Epic Hero', 'Vehicle', 'Triarch', 'The Silent King'],
    },
    { name: "Transcendent C'tan", tags: ['Character', 'Monster', 'Fly', "Transcendent C'tan"] },
    {
      name: 'Trazyn the Infinite',
      tags: ['Character', 'Epic Hero', 'Infantry', 'Noble', 'Trazyn the Infinite'],
    },

    /* battleline */
    {
      name: 'Immortals',
      modelCount: [5, 10],
      tags: ['Battleline', 'Infantry', 'Immortals'],
      weapons: [{ name: 'Gauss blaster' }, { name: 'Close combat weapon' }],
      unitOptions: {
        unitSize: [5, 10],
        weapons: [{ name: 'Tesla carbine', replaces: 'Gauss blaster' }],
      },
    },
    {
      name: 'Necron Warriors',
      modelCount: [10, 20],
      tags: ['Battleline', 'Infantry', 'Necron Warriors'],
      weapons: [{ name: 'Gauss flayer' }, { name: 'Close combat weapon' }],
      unitOptions: {
        unitSize: [10, 20],
        weapons: [{ name: 'Gauss reaper', replaces: 'Gauss flayer' }],
      },
    },

    /* dedicated transports */
    {
      name: 'Ghost Ark',
      tags: ['Vehicle', 'Fly', 'Transport', 'Dedicated Transport', 'Ghost Ark'],
    },

    /* Fortifications */
    {
      name: 'Convergence Of Dominion',
      tags: ['Fortification', 'Vehicle', 'Convergence Of Dominion'],
      unitOptions: { unitSize: [1, 2, 3] },
    },

    {
      name: 'Annihilation Barge',
      tags: ['Vehicle', 'Fly', 'Annihilation Barge'],
      weapons: [
        { name: 'Gauss cannon' },
        { name: 'Twin tesla destructor' },
        { name: 'Armoured bulk' },
      ],
      unitOptions: {
        weapons: [{ name: 'Tesla cannon', replaces: 'Gauss cannon' }],
      },
    },
    { name: 'Canoptek Doomstalker', tags: ['Vehicle', 'Walker', 'Canoptek', 'Doomstalker'] },
    {
      name: 'Canoptek Macrocytes',
      tags: ['Beasts', 'Fly', 'Canoptek', 'Macrocytes'],
      modelCount: 5,
      weapons: [{ name: 'Gauss scalpel' }, { name: 'Claws' }],
      unitOptions: {
        weapons: [
          { name: 'Tesla caster', replaces: 'Gauss scalpel' },
          {
            name: 'Atomiser beam and nanoscarab projector',
            replaces: ['Gauss scalpel', 'Tesla caster'],
            max: 1,
          },
          { name: 'Accelerator mandible', replaces: ['Gauss scalpel', 'Tesla caster'], max: 1 },
        ],
      },
    },
    { name: 'Canoptek Reanimator', tags: ['Vehicle', 'Walker', 'Canoptek', 'Reanimator'] },
    {
      name: 'Canoptek Scarab Swarms',
      tags: ['Swarm', 'Fly', 'Canoptek', 'Scarab Swarms'],
      unitOptions: { unitSize: [3, 6] },
    },
    {
      name: 'Canoptek Spyders',
      tags: ['Vehicle', 'Fly', 'Canoptek', 'Spyders'],
      weapons: [{ name: 'Automaton claws' }],
      unitOptions: {
        unitSize: [1, 2],
        weapons: [{ name: '2x Particle beamers', max: [1, 2] }],
        wargear: [
          { name: 'Fabricator claw array', max: [1, 2] },
          { name: 'Gloom prism', max: [1, 2] },
        ],
      },
    },
    {
      name: 'Canoptek Tomb Crawlers',
      tags: ['Beasts', 'Canoptek', 'Tomb Crawlers'],
      modelCount: 2,
      weapons: [{ name: 'Twin gauss reaper' }, { name: 'Claws' }],
      unitOptions: {
        weapons: [{ name: 'Transdimensional isolator', replaces: 'Twin gauss reaper', max: 1 }],
      },
    },
    {
      name: 'Canoptek Wraiths',
      tags: ['Beasts', 'Fly', 'Canoptek', 'Wraiths'],
      weapons: [{ name: 'Vicious claws' }],
      unitOptions: {
        unitSize: [3, 6],
        weapons: [
          {
            name: ['Particle caster', 'Transdimensional beamer'],
            max: '[unitSize]',
            selectionType: 'any',
          },
          { name: 'Whip coils', replaces: 'Vicious claws' },
        ],
      },
    },
    { name: 'Cryptothralls', tags: ['Infantry', 'Cryptothralls'], modelCount: 2 },
    { name: 'Deathmarks', tags: ['Infantry', 'Deathmarks'], unitOptions: { unitSize: [5, 10] } },
    { name: 'Doom Scythe', tags: ['Vehicle', 'Aircraft', 'Fly', 'Doom Scythe'] },
    { name: 'Doomsday Ark', tags: ['Vehicle', 'Fly', 'Doomsday Ark'] },
    { name: 'Flayed Ones', tags: ['Infantry', 'Flayed Ones'], unitOptions: { unitSize: [5, 10] } },
    {
      name: 'Lokhust Destroyers',
      tags: ['Mounted', 'Fly', 'Destroyer Cult', 'Lokhust Destroyers'],
      unitOptions: { unitSize: [1, 2, 3, 6] },
    },
    {
      name: 'Lokhust Heavy Destroyers',
      tags: ['Mounted', 'Fly', 'Destroyer Cult', 'Lokhust Heavy Destroyers'],
      weapons: [{ name: 'Gauss destructor' }, { name: 'Close combat weapon' }],
      unitOptions: {
        unitSize: [1, 2, 3],
        weapons: [{ name: 'Enmitic exterminator', replaces: 'Gauss destructor' }],
      },
    },
    {
      name: 'Lychguard',
      tags: ['Infantry', 'Lychguard'],
      weapons: [{ name: 'Warscythe' }],
      unitOptions: {
        unitSize: [5, 10],
        weapons: [{ name: 'Hyperphase sword', replaces: 'Warscythe' }],
        wargear: [{ name: 'Dispersion shield', excludes: ['Warscythe'] }],
      },
    },
    {
      name: 'Monolith',
      tags: ['Vehicle', 'Titanic', 'Fly', 'Towering', 'Monolith'],
      weapons: [
        { name: 'Gauss flux arcs', count: 4 },
        { name: 'Particle whip' },
        { name: 'Portal of exile' },
      ],
      unitOptions: {
        weapons: [{ name: 'Death rays', replaces: 'Gauss flux arcs' }],
      },
    },
    { name: 'Night Scythe', tags: ['Vehicle', 'Aircraft', 'Fly', 'Transport', 'Night Scythe'] },
    { name: 'Obelisk', tags: ['Vehicle', 'Titanic', 'Fly', 'Towering', 'Obelisk'] },
    {
      name: 'Ophydian Destroyers',
      tags: ['Infantry', 'Destroyer Cult', 'Ophydian Destroyers'],
      unitOptions: {
        unitSize: [3, 6],
        wargear: [{ name: 'Plasmacyte', max: 1, per: 3 }],
      },
    },
    {
      name: 'Skorpekh Destroyers',
      tags: ['Infantry', 'Destroyer Cult', 'Skorpekh Destroyers'],
      unitOptions: {
        unitSize: [3, 6],
        wargear: [{ name: 'Plasmacyte', max: 1, per: 3 }],
      },
    },
    { name: 'Tesseract Vault', tags: ['Vehicle', 'Titanic', 'Fly', 'Towering', 'Tesseract Vault'] },
    {
      name: 'Tomb Blades',
      tags: ['Mounted', 'Fly', 'Tomb Blades'],
      weapons: [{ name: 'Twin gauss blaster' }, { name: 'Close combat weapon' }],
      unitOptions: {
        unitSize: [3, 6],
        weapons: [
          { name: ['Particle beamer', 'Twin tesla carbine'], replaces: 'Twin gauss blaster' },
        ],
        wargear: [
          { name: 'Shieldvanes', max: 3, per: 3 },
          { name: ['Nebuloscope', 'Shadowloom'], max: '[unitSize]', selectionType: 'any' },
        ],
      },
    },
    {
      name: 'Triarch Praetorians',
      tags: ['Infantry', 'Fly', 'Triarch', 'Praetorians'],
      weapons: [{ name: 'Rod of covenant' }],
      unitOptions: {
        unitSize: [5, 10],
        weapons: [{ name: ['Particle caster and Voidblade'], replaces: 'Rod of covenant' }],
      },
    },
    {
      name: 'Triarch Stalker',
      tags: ['Vehicle', 'Walker', 'Fly', 'Triarch', 'Stalker'],
      weapons: [{ name: 'Heat ray' }, { name: "Stalker's forelimbs" }],
      unitOptions: {
        weapons: [
          { name: ['Particle shredder', 'Heavy gauss cannon array'], replaces: 'Heat ray' },
        ],
      },
    },
    /* forge world models */
    {
      name: 'Seraptek Heavy Construct',
      tags: ['Vehicle', 'Walker', 'Titanic', 'Towering', 'Seraptek Heavy Construct'],
    },
  ],
  detachments: [
    {
      name: 'Annihilation Legion',
      enhancements: [
        { name: 'Eldritch Nightmare', tags: ['Destroyer Cult'] },
        { name: 'Eternal Madness' },
        { name: 'Ingrained Superiority' },
        { name: 'Soulless Reaper', tags: ['Destroyer Cult'] },
      ],
    },
    {
      name: 'Awakened Dynasty',
      enhancements: [
        { name: 'Enaegic Dermal Bond' },
        { name: 'Nether-realm Casket' },
        { name: 'Phasal Subjugator' },
        { name: 'Veil of Darkness' },
      ],
    },
    {
      name: 'Canoptek Court',
      enhancements: [
        { name: 'Autodivinator', tags: ['Cryptek'] },
        { name: 'Dimensional Sanctum', tags: ['Cryptek'] },
        { name: 'Hyperphasic Fulcrum', tags: ['Cryptek'] },
        { name: 'Metalodermal Tesla Weave', tags: ['Cryptek'] },
      ],
    },
    {
      name: 'Hypercrypt Legion',
      enhancements: [
        { name: 'Arisen Tyrant' },
        { name: 'Dimensional Overseer' },
        { name: 'Hyperspatial Transfer Node' },
        { name: 'Osteoclave Fulcrum' },
      ],
    },
    {
      name: 'Obeisance Phalanx',
      enhancements: [
        { name: 'Eternal Conqueror', tags: ['Overlord'] },
        { name: 'Honourable Combatant', tags: ['Overlord'] },
        { name: 'Unflinching Will', tags: ['Overlord'] },
        { name: 'Warrior Noble', tags: ['Overlord'] },
      ],
    },
    {
      name: 'Starshatter Arsenal',
      enhancements: [
        { name: 'Chrono-impedance Fields' },
        { name: 'Demanding Leader' },
        { name: 'Dread Majesty', tags: ['Overlord', 'Catacomb Command Barge'] },
        { name: 'Miniaturised Nebuloscope' },
      ],
    },
  ],
};
