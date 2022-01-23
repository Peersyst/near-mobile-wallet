const fs = require("fs");

// Images folder
const imgFolder = process.argv[2];
// Array containing all requires
const imgRequires = [];

/**
 * Generates image's name
 * @param filename Image filename
 * @returns {string} Image name
 */
function generateName(filename) {
    return filename.split(".")[0].replace(/^./, (x) => x.toLowerCase());
}

/**
 * Generates image's require inside index
 * @param filename Image filename
 * @returns {string} Require code
 */
function generateRequire(filename) {
    return `${generateName(filename)}: require("./${filename}")`;
}

const filenames = fs.readdirSync(imgFolder);
for (const filename of filenames) {
    if (filename === ".DS_Store" || filename === "index.ts") fs.unlinkSync(imgFolder + filename);
    else imgRequires.push(generateRequire(filename));
}

// Create an index
fs.writeFileSync(
    imgFolder + "index.ts",
    "const image = {\n" + imgRequires.map((require) => "\t" + require).join(",\n") + "\n};\nexport { image };",
);
console.log("images index.ts created");
