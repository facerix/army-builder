// Loader for 40k army data using dynamic imports
// Replaces the monolithic 40k-army-data.js with per-faction files

import { FACTION_NAMES_TO_CODES } from './army-data/factions.js';
import { POINTS } from './army-data/points.js';

const sortByName = (a, b) => a.name.localeCompare(b.name);
const cachedArmyData = {};

/**
 * Loads faction data dynamically from individual faction files
 * @param {string} faction - Full faction name (e.g., "Adepta Sororitas")
 * @returns {Promise<Object>} Processed army data with points
 */
export const get40kArmyData = async (faction) => {
  // Check cache first
  if (cachedArmyData[faction]) {
    return cachedArmyData[faction];
  }

  // Get faction code for file name
  const factionCode = FACTION_NAMES_TO_CODES[faction];
  if (!factionCode) {
    throw new Error(`Unknown faction: ${faction}`);
  }

  try {
    // Get points data for this faction from consolidated points file
    const points = POINTS[faction] || { units: {}, enhancements: {} };

    // Dynamically import the faction file (army data only, no points)
    const factionModule = await import(`./army-data/${factionCode}.js`);
    const rawFactionData = factionModule.factionData;

    // Process units with points
    const factionUnitsWithPoints = rawFactionData.units.map(u => getPointsForUnit(u, points.units));

    // Handle parent faction loading for Space Marine chapters
    if (rawFactionData.chapterInfo?.parentFaction) {
      const parentFactionName = rawFactionData.chapterInfo.parentFaction;
      
      // Get parent faction points
      const parentPoints = POINTS[parentFactionName] || { units: {}, enhancements: {} };
      
      // Load parent faction data
      const parentModule = await import(`./army-data/${FACTION_NAMES_TO_CODES[parentFactionName]}.js`);
      const parentFaction = parentModule.factionData;
      
      if (parentFaction && parentPoints) {
        // Filter parent units to only include units that are not already in the factionUnitsWithPoints array
        const parentUnitsWithPoints = parentFaction.units.filter((unit) => {
          return !factionUnitsWithPoints.some((t) => t.name === unit.name);
        }).map(u => getPointsForUnit(u, parentPoints.units));
        
        // Merge units arrays
        factionUnitsWithPoints.push(...parentUnitsWithPoints);
        factionUnitsWithPoints.sort(sortByName);

        // Merge enhancements
        if (rawFactionData.enhancements || parentFaction.enhancements) {
          rawFactionData.enhancements = { 
            ...(parentFaction.enhancements || {}), 
            ...(rawFactionData.enhancements || {}) 
          };
        }
        
        // Merge points (parent points override child points for same keys)
        points.units = { ...parentPoints.units, ...points.units };
        points.enhancements = { ...parentPoints.enhancements, ...points.enhancements };
      }
    }

    // Build the final data structure
    const dataWithPoints = {
      units: factionUnitsWithPoints,
      detachments: getPointsForDetachments(rawFactionData.detachments, points.enhancements),
    };
    
    // Cache the result
    cachedArmyData[faction] = dataWithPoints;
    return dataWithPoints;
  } catch (error) {
    console.error(`Error loading faction data for ${faction}:`, error);
    throw new Error(`Failed to load faction data for ${faction}: ${error.message}`);
  }
};

/**
 * Adds points to a unit object
 * @param {Object} unit - Unit object
 * @param {Object} points - Points lookup object
 * @returns {Object} Unit with points added
 */
const getPointsForUnit = (unit, points) => {
  const pointsForUnit = points[unit.name] ?? 0;
  return {
    ...unit,
    points: pointsForUnit
  };
};

/**
 * Adds points to detachment enhancements
 * @param {Array} detachmentData - Array of detachment objects
 * @param {Object} pointsData - Points lookup object
 * @returns {Object} Detachments with points added
 */
const getPointsForDetachments = (detachmentData, pointsData) => {
  let detachmentWithPoints = {};
  detachmentData.forEach(detachment => {
    const pointsForDetachment = pointsData[detachment.name] ?? {};
    detachmentWithPoints[detachment.name] = {
      ...detachment,
      enhancements: detachment.enhancements?.map(enhData => ({
        ...enhData,
        points: pointsForDetachment[enhData.name] ?? 0,
      })),
    };
  });
  return detachmentWithPoints;
};

