export const factionData = {
  units: [
    /* characters */
    {
      name: 'Aleya',
      points: 65,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Anathema Psykana', 'Aleya'],
    },
    { name: 'Blade Champion', points: 120, tags: ['Character', 'Infantry', 'Blade Champion'] },
    {
      name: 'Knight-Centura',
      points: 55,
      tags: ['Character', 'Infantry', 'Anathema Psykana', 'Knight-Centura'],
    },
    { name: 'Shield-Captain', points: 130, tags: ['Character', 'Infantry', 'Shield-Captain'] },
    {
      name: 'Shield-Captain in Allarus Terminator Armour',
      points: 130,
      tags: ['Character', 'Infantry', 'Terminator', 'Shield-Captain'],
    },
    {
      name: 'Shield-Captain on Dawneagle Jetbike',
      points: 150,
      tags: ['Character', 'Mounted', 'Fly', 'Dawneagle Jetbike', 'Shield-Captain'],
    },
    {
      name: 'Trajann Valoris',
      points: 140,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Trajann Valoris'],
    },
    {
      name: 'Valerian',
      points: 110,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Shield-Captain', 'Valerian'],
    },
    /* battleline */
    {
      name: 'Custodian Guard',
      modelCount: [4, 5],
      tags: ['Battleline', 'Infantry', 'Custodian Guard'],
      unitOptions: { unitSize: [4, 5] },
    },
    /* dedicated transports */
    {
      name: 'Anathema Psykana Rhino',
      tags: ['Vehicle', 'Transport', 'Dedicated Transport', 'Smoke', 'Anathema Psykana', 'Rhino'],
    },

    {
      name: 'Allarus Custodians',
      modelCount: [2, 3, 5, 6],
      tags: ['Infantry', 'Terminator', 'Allarus Custodians'],
      unitOptions: { unitSize: [2, 3, 5, 6] },
    },
    {
      name: 'Custodian Wardens',
      modelCount: [4, 5],
      tags: ['Infantry', 'Custodian Wardens'],
      unitOptions: { unitSize: [4, 5] },
    },
    {
      name: 'Prosecutors',
      modelCount: [4, 5, 9, 10],
      tags: ['Infantry', 'Anathema Psykana', 'Prosecutors'],
      unitOptions: { unitSize: [4, 5, 9, 10] },
    },
    {
      name: 'Venerable Contemptor Dreadnought',
      tags: ['Vehicle', 'Walker', 'Venerable Contemptor Dreadnought'],
    },
    {
      name: 'Venerable Land Raider',
      tags: ['Vehicle', 'Transport', 'Smoke', 'Venerable Land Raider'],
    },
    {
      name: 'Vertus Praetors',
      modelCount: [2, 3],
      tags: ['Mounted', 'Fly', 'Vertus Praetors'],
      unitOptions: { unitSize: [2, 3] },
    },
    {
      name: 'Vigilators',
      modelCount: [4, 5, 9, 10],
      tags: ['Infantry', 'Anathema Psykana', 'Vigilators'],
      unitOptions: { unitSize: [4, 5, 9, 10] },
    },
    {
      name: 'Witchseekers',
      modelCount: [4, 5, 9, 10],
      tags: ['Infantry', 'Anathema Psykana', 'Witchseekers'],
      unitOptions: { unitSize: [4, 5, 9, 10] },
    },

    /* forge world models */
    {
      name: 'Agamatus Custodians',
      modelCount: [3, 6],
      tags: ['Mounted', 'Fly', 'Agamatus Custodians'],
      unitOptions: { unitSize: [3, 6] },
    },
    {
      name: 'Aquilon Custodians',
      modelCount: [3, 6],
      tags: ['Infantry', 'Terminator', 'Aquilon Custodians'],
      unitOptions: { unitSize: [3, 6] },
    },
    { name: 'Ares Gunship', tags: ['Vehicle', 'Aircraft', 'Fly', 'Ares Gunship'] },
    { name: 'Caladius Grav-tank', tags: ['Vehicle', 'Fly', 'Caladius Grav-tank'] },
    {
      name: 'Contemptor-Achillus Dreadnought',
      tags: ['Vehicle', 'Walker', 'Contemptor-Achillus Dreadnought'],
    },
    {
      name: 'Contemptor-Galatus Dreadnought',
      tags: ['Vehicle', 'Walker', 'Contemptor-Galatus Dreadnought'],
    },
    { name: 'Coronus Grav-carrier', tags: ['Vehicle', 'Transport', 'Fly', 'Coronus Grav-carrier'] },
    {
      name: 'Custodian Guard with Adrasite and Pyrithite Spears',
      modelCount: 5,
      tags: ['Infantry', 'Custodian Guard with Adrasite and Pyrithite Spears'],
    },
    {
      name: 'Orion Assault Dropship',
      tags: ['Vehicle', 'Transport', 'Aircraft', 'Fly', 'Orion Assault Dropship'],
    },
    { name: 'Pallas Grav-attack', tags: ['Vehicle', 'Fly', 'Pallas Grav-attack'] },
    { name: 'Sagittarum Custodians', modelCount: 5, tags: ['Infantry', 'Sagittarum Custodians'] },
    { name: 'Telemon Heavy Dreadnought', tags: ['Vehicle', 'Walker', 'Telemon Heavy Dreadnought'] },
    {
      name: 'Venatari Custodians',
      modelCount: [3, 6],
      tags: ['Infantry', 'Fly', 'Jump Pack', 'Venatari Custodians'],
      unitOptions: { unitSize: [3, 6] },
    },
  ],
  detachments: [
    {
      name: 'Auric Champions',
      enhancements: [
        { name: 'Blade Imperator' },
        { name: 'Inspirational Exemplar' },
        { name: 'Martial Philosopher' },
        { name: 'Veiled Blade' },
      ],
    },
    {
      name: 'Lions of the Emperor',
      enhancements: [
        { name: 'Admonimortis', tags: ['Shield-Captain'] },
        { name: 'Fierce Conqueror', tags: ['Shield-Captain'] },
        { name: 'Praesidius' },
        { name: 'Superior Creation', tags: ['Infantry'] },
      ],
    },
    {
      name: 'Null Maiden Vigil',
      enhancements: [
        { name: 'Enhanced Voidsheen Cloak', tags: ['Anathema Psykana'] },
        { name: "Huntress' Eye", tags: ['Anathema Psykana'] },
        { name: 'Oblivion Knight', tags: ['Anathema Psykana'] },
        { name: 'Raptor Blade', tags: ['Anathema Psykana'] },
      ],
    },
    {
      name: 'Shield Host',
      enhancements: [
        { name: 'Auric Mantle', tags: ['Shield-Captain', 'Blade Champion'] },
        { name: "Castellan's Mark", tags: ['Shield-Captain'] },
        { name: 'From the Hall of Armouries', tags: ['Shield-Captain'] },
        { name: 'Panoptispex', tags: ['Shield-Captain', 'Blade Champion'] },
      ],
    },
    {
      name: 'Solar Spearhead',
      enhancements: [
        { name: 'Adamantine Talisman' },
        { name: 'Augury Uplink' },
        { name: 'Honoured Fallen', tags: ['Vehicle'] },
        { name: 'Veteran of the Kataphraktoi', tags: ['Infantry', 'Mounted'] },
      ],
      unitModifications: [{ type: 'addTag', target: 'Walker', value: 'Character', max: 2 }],
    },
    {
      name: 'Talons of the Emperor',
      enhancements: [
        { name: 'Aegis Projector' },
        { name: 'Champion of the Imperium' },
        { name: 'Gift of Terran Artifice' },
        { name: 'Radiant Mantle' },
      ],
    },
  ],
};
