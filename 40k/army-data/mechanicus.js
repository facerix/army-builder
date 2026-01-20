export const factionData = {
  units: [
    /* characters */
    {
      name: 'Belisarius Cawl',
      tags: ['Character', 'Epic Hero', 'Cult Mechanicus', 'Tech-Priest', 'Monster'],
    },
    {
      name: 'Cybernetica Datasmith',
      tags: ['Character', 'Infantry', 'Legio Cybernetica', 'Tech-Priest'],
    },
    { name: 'Skitarii Marshal', tags: ['Character', 'Infantry', 'Skitarii'] },
    { name: 'Sydonian Skatros', tags: ['Character', 'Infantry', 'Skitarii', 'Sydonian'] },
    {
      name: 'Tech-Priest Dominus',
      tags: ['Character', 'Infantry', 'Cult Mechanicus', 'Tech-Priest'],
    },
    {
      name: 'Tech-Priest Enginseer',
      tags: ['Character', 'Infantry', 'Cult Mechanicus', 'Tech-Priest'],
    },
    {
      name: 'Tech-Priest Manipulus',
      tags: ['Character', 'Infantry', 'Cult Mechanicus', 'Tech-Priest'],
    },
    {
      name: 'Technoarcheologist',
      tags: ['Character', 'Infantry', 'Cult Mechanicus', 'Tech-Priest'],
    },
    /* battleline */
    { name: 'Skitarii Rangers', tags: ['Battleline', 'infantry', 'skitarii'], modelCount: 10 },
    { name: 'Skitarii Vanguard', tags: ['Battleline', 'infantry', 'skitarii'], modelCount: 10 },

    { name: 'Archaeopter Fusilave', tags: ['vehicle', 'aircraft', 'fly', 'skitarii'] },
    { name: 'Archaeopter Stratoraptor', tags: ['vehicle', 'aircraft', 'fly', 'skitarii'] },
    {
      name: 'Archaeopter Transvector',
      tags: ['vehicle', 'aircraft', 'transport', 'fly', 'skitarii'],
    },
    {
      name: 'Corpuscarii Electro-Priests',
      modelCount: [5, 10],
      tags: ['infantry', 'cult mechanicus', 'electro-priests'],
    },
    {
      name: 'Fulgurite Electro-Priests',
      modelCount: [5, 10],
      tags: ['infantry', 'cult mechanicus', 'electro-priests'],
    },
    {
      name: 'Ironstrider Ballistarii',
      modelCount: [1, 2, 3],
      tags: ['vehicle', 'walker', 'smoke', 'skitarii'],
    },
    {
      name: 'Kastelan Robots',
      modelCount: [2, 4],
      tags: ['vehicle', 'walker', 'legio cybernetica'],
    },
    {
      name: 'Kataphron Breachers',
      modelCount: [3, 6],
      tags: ['infantry', 'cult mechanicus', 'kataphron'],
    },
    {
      name: 'Kataphron Destroyers',
      modelCount: [3, 6],
      tags: ['infantry', 'cult mechanicus', 'kataphron'],
    },
    { name: 'Onager Dunecrawler', tags: ['vehicle', 'walker', 'skitarii', 'smoke'] },
    {
      name: 'Pteraxii Skystalkers',
      modelCount: [5, 10],
      tags: ['infantry', 'fly', 'jump pack', 'grenades', 'skitarii', 'pteraxii'],
    },
    {
      name: 'Pteraxii Sterylizors',
      modelCount: [5, 10],
      tags: ['infantry', 'fly', 'jump pack', 'skitarii', 'pteraxii'],
    },
    { name: 'Serberys Raiders', modelCount: [3, 6], tags: ['mounted', 'skitarii'] },
    { name: 'Serberys Sulphurhounds', modelCount: [3, 6], tags: ['mounted', 'skitarii'] },
    {
      name: 'Servitor Battleclade',
      modelCount: 9,
      tags: ['infantry', 'cult mechanicus', 'servitor'],
    },
    {
      name: 'Sicarian Infiltrators',
      modelCount: [5, 10],
      tags: ['infantry', 'skitarii', 'sicarian'],
    },
    {
      name: 'Sicarian Ruststalkers',
      modelCount: [5, 10],
      tags: ['infantry', 'skitarii', 'sicarian'],
    },
    { name: 'Skorpius Disintegrator', tags: ['vehicle', 'skitarii', 'smoke'] },
    {
      name: 'Skorpius Dunerider',
      tags: ['vehicle', 'transport', 'dedicated transport', 'skitarii', 'smoke'],
    },
    {
      name: 'Sydonian Dragoons with Radium Jezzails',
      modelCount: [1, 2, 3],
      tags: ['vehicle', 'walker', 'smoke', 'skitarii', 'sydonian'],
    },
    {
      name: 'Sydonian Dragoons with Taser Lances',
      modelCount: [1, 2, 3],
      tags: ['vehicle', 'walker', 'smoke', 'skitarii', 'sydonian'],
    },
  ],
  detachments: [
    {
      name: 'Cohort Cybernetica',
      enhancements: [
        { name: 'Arch-negator', tags: ['Tech-Priest'] },
        { name: 'Emotionless Clarity', tags: ['Tech-Priest'] },
        { name: 'Lord of Machines', tags: ['Tech-Priest'] },
        { name: 'Necromechanic', tags: ['Tech-Priest'] },
      ],
    },
    {
      name: 'Data-psalm Conclave',
      enhancements: [
        { name: 'Data-blessed Autosermon', tags: ['Tech-Priest'] },
        { name: 'Mantle of the Gnosticarch', tags: ['Tech-Priest'] },
        { name: 'Mechanicus Locum', tags: ['Tech-Priest'] },
        { name: 'Temporcopia', tags: ['Tech-Priest'] },
      ],
    },
    {
      name: 'Explorator Maniple',
      enhancements: [
        { name: 'Artisan', tags: ['Tech-Priest'] },
        { name: 'Genetor', tags: ['Tech-Priest'] },
        { name: 'Logis', tags: ['Tech-Priest'] },
        { name: 'Magos', tags: ['Tech-Priest'] },
      ],
    },
    {
      name: 'Haloscreed Battle Clade',
      enhancements: [
        { name: 'Cognitive Reinforcement', tags: ['!Cybernetica Datasmith'] },
        { name: 'Inloaded Lethality', tags: ['Tech-Priest Dominus', 'Tech-Priest Manipulus'] },
        { name: 'Sanctified Ordnance' },
        { name: 'Transoracular Dyad Wafers', tags: ['Cybernetica Datasmith'] },
      ],
    },
    {
      name: 'Rad-zone Corps',
      enhancements: [
        { name: 'Autoclavic Denunciation' },
        { name: 'Malphonic Susurrus' },
        { name: 'Peerless Eradicator' },
        { name: 'Radial Suffusion' },
      ],
    },
    {
      name: 'Skitarii Hunter Cohort',
      enhancements: [
        { name: 'Battle-sphere Uplink', tags: ['Skitarii'] },
        { name: 'Cantic Thrallnet', tags: ['Skitarii Marshal'] },
        { name: 'Clandestine Infiltrator', tags: ['Skitarii'] },
        { name: 'Veiled Hunter', tags: ['Skitarii Marshal'] },
      ],
    },
  ],
};
