const fs = require('fs');
const csv = require('csv-parser');

// Delete files if they exist
['canada.txt', 'usa.txt'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
});

const writeCountryData = (countryName, fileName) => {
    const writeStream = fs.createWriteStream(fileName, { flags: 'a' });
    writeStream.write('country,year,population\n');

    fs.createReadStream('input_countries.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.country.toLowerCase() === countryName.toLowerCase()) {
                writeStream.write(`${row.country},${row.year},${row.population}\n`);
            }
        })
        .on('end', () => {
            console.log(`Data for ${countryName} written to ${fileName}`);
        });
};

// Write data for Canada and USA
writeCountryData('Canada', 'canada.txt');
writeCountryData('United States', 'usa.txt');
