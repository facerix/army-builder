// Script to load the 40k-army-data module and write a transformed output file

// Assume this will be run with Node.js

const fs = require("fs");
const path = require("path");

// Import the ARMIES data from the project.
// You may need to adjust the path as necessary.
const { ARMIES } = require("./40k-army-data.js");

const transformed = {};
Object.entries(ARMIES).forEach(([armyName, data]) => {
    let detachments = data.detachments ?? {};
    if (!Object.keys(detachments).length) {
        detachments = Object.entries(data?.enhancements ?? {}).map(([detachmentName, enhancements]) => {
            return {
                name: detachmentName,
                enhancements: enhancements,
            };
        });
    }
    transformed[armyName] = {
        // units: data.units,
        detachments,
    };
});

// Output file path
const outputPath = path.join(__dirname, "transformed-army-data.json");

// Write the transformed data to a JSON file
fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2), "utf-8");

console.log("Transformed data written to", outputPath);
