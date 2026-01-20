export const factionData = {
  units: [
    /* characters */
    {
      name: 'Aestred Thurga and Agathae Dolan',
      modelCount: 2,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Grenades'],
    },
    { name: 'Canoness', tags: ['Character', 'Infantry', 'Grenades', 'Canoness'] },
    {
      name: 'Canoness with Jump Pack',
      tags: ['Character', 'Infantry', 'Jump Pack', 'Fly', 'Grenades', 'Canoness'],
    },
    {
      name: 'Daemonifuge',
      modelCount: 2,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Grenades', 'Daemonifuge'],
    },
    { name: 'Dialogus', tags: ['Character', 'Infantry', 'Dialogus'] },
    { name: 'Dogmata', tags: ['Character', 'Infantry', 'Grenades', 'Dogmata'] },
    { name: 'Hospitaller', tags: ['Character', 'Infantry', 'Hospitaller'] },
    { name: 'Imagifier', tags: ['Character', 'Infantry', 'Grenades', 'Imagifier'] },
    {
      name: 'Junith Eruita',
      modelCount: 1,
      tags: ['Character', 'Epic Hero', 'Mounted', 'Fly', 'Junith Eruita'],
    },
    {
      name: 'Ministorum Priest',
      modelCount: 1,
      tags: ['Character', 'Infantry', 'Penitent', 'Ministorum Priest'],
    },
    {
      name: 'Morvenn Vahl',
      modelCount: 1,
      tags: ['Character', 'Epic Hero', 'Vehicle', 'Walker', 'Morvenn Vahl'],
    },
    { name: 'Palatine', modelCount: 1, tags: ['Character', 'Infantry', 'Grenades', 'Palatine'] },
    {
      name: 'Saint Celestine',
      modelCount: 3,
      tags: [
        'Character',
        'Epic Hero',
        'Infantry',
        'Jump Pack',
        'Fly',
        'Grenades',
        'Saint Celestine',
      ],
    },
    {
      name: 'Triumph of Saint Katherine',
      modelCount: 1,
      tags: ['Character', 'Epic Hero', 'Infantry', 'Grenades', 'Triumph of Saint Katherine'],
    },
    /* battleline */
    {
      name: 'Battle Sisters Squad',
      modelCount: 10,
      tags: ['Battleline', 'Infantry', 'Grenades', 'Battle Sisters Squad'],
    },
    /* dedicated transports */
    {
      name: 'Immolator',
      tags: ['Vehicle', 'Smoke', 'Transport', 'Dedicated Transport', 'Immolator'],
    },
    {
      name: 'Sororitas Rhino',
      tags: ['Vehicle', 'Transport', 'Dedicated Transport', 'Smoke', 'Sororitas Rhino'],
    },

    {
      name: 'Arco-flagellants',
      modelCount: [3, 10],
      tags: ['Infantry', 'Penitent', 'Arco-flagellants'],
      unitOptions: {
        unitSize: [3, 10],
      },
    },
    { name: 'Castigator', tags: ['Vehicle', 'Smoke', 'Castigator'] },
    {
      name: 'Celestian Sacresants',
      modelCount: [5, 10],
      tags: ['Infantry', 'Grenades', 'Celestian Sacresants'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    { name: 'Dominion Squad', modelCount: 10, tags: ['Infantry', 'Grenades', 'Dominion Squad'] },
    { name: 'Exorcist', tags: ['Vehicle', 'Smoke', 'Exorcist'] },
    {
      name: 'Mortifiers',
      modelCount: [1, 2],
      tags: ['Vehicle', 'Walker', 'Penitent', 'Mortifiers'],
      unitOptions: {
        unitSize: [1, 2],
      },
    },
    {
      name: 'Paragon Warsuits',
      modelCount: 3,
      tags: ['Vehicle', 'Walker', 'Grenades', 'Paragon Warsuits'],
    },
    {
      name: 'Penitent Engines',
      modelCount: [1, 2],
      tags: ['Vehicle', 'Walker', 'Penitent', 'Penitent Engines'],
      unitOptions: {
        unitSize: [1, 2],
      },
    },
    {
      name: 'Repentia Squad',
      modelCount: [5, 10],
      tags: ['Infantry', 'Grenades', 'Penitent', 'Repentia Squad'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    { name: 'Retributor Squad', modelCount: 5, tags: ['Infantry', 'Grenades', 'Retributor Squad'] },
    { name: 'Sanctifiers', modelCount: 9, tags: ['Infantry', 'Grenades', 'Sanctifiers'] },
    {
      name: 'Seraphim Squad',
      modelCount: [5, 10],
      tags: ['Infantry', 'Jump Pack', 'Fly', 'Grenades', 'Seraphim Squad'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
    {
      name: 'Sisters Novitiate Squad',
      modelCount: 10,
      tags: ['Infantry', 'Grenades', 'Sisters Novitiate Squad'],
    },
    {
      name: 'Zephyrim Squad',
      modelCount: [5, 10],
      tags: ['Infantry', 'Jump Pack', 'Fly', 'Grenades', 'Zephyrim Squad'],
      unitOptions: {
        unitSize: [5, 10],
      },
    },
  ],
  detachments: [
    {
      name: 'Army of Faith',
      enhancements: [
        { name: 'Blade of Saint Ellynor' },
        { name: 'Divine Aspect' },
        { name: 'Litanies of Faith', tags: ['Canoness', 'Palatine'] },
        { name: 'Triptych of the Macharian Crusade' },
      ],
    },
    {
      name: 'Bringers of Flame',
      enhancements: [
        { name: 'Fire and Fury' },
        { name: 'Iron Surplice of Saint Istalela', tags: ['Canoness', 'Palatine'] },
        { name: 'Manual of Saint Griselda' },
        { name: 'Righteous Rage' },
      ],
    },
    {
      name: 'Champions of Faith',
      enhancements: [
        { name: 'Eyes of the Oracle' },
        { name: 'Mark of Devotion' },
        { name: 'Sanctified Amulet' },
        { name: 'Triptych of Judgement' },
      ],
    },
    {
      name: 'Hallowed Martyrs',
      enhancements: [
        { name: 'Chaplet of Sacrifice' },
        { name: 'Mantle of Ophelia', tags: ['Canoness', 'Palatine'] },
        { name: 'Saintly Example' },
        { name: 'Through Suffering, Strength' },
      ],
    },
    {
      name: 'Penitent Host',
      enhancements: [
        {
          name: 'Catechism of Divine Penitence',
          tags: ['Canoness', 'Palatine', 'Ministorum Priest'],
        },
        { name: 'Psalm of Righteous Judgement' },
        { name: 'Refrain of Enduring Faith', tags: ['Penitent'] },
        { name: 'Verse of Holy Piety', tags: ['Penitent'] },
      ],
    },
  ],
};
