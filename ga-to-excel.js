'use strict';

const csvParse = require('csv-parse/lib/sync');
const csvStringify = require('csv-stringify');
const fs = require('fs');

const gaToExcel = {};

const readFile = filename => {
  let data = csvParse(fs.readFileSync(filename), {separator: '\t', columns: true});

  return data;
};


const replaceUsNumbers = csvLineObject => {
  console.log(csvLineObject);
  for (var key in csvLineObject) {
    if (csvLineObject.hasOwnProperty(key)) {
      csvLineObject[key] = csvLineObject[key].replace(/(\d+)\.(\d+)/, '$1,$2');
    }
  }
  console.log(csvLineObject);
  return csvLineObject;
};


const parseAndReplace = fileContents => {
  let replacedData = fileContents.map(replaceUsNumbers);
  console.log(replacedData);
  return replacedData;
};


const writeOutputFile = outputData => {
  csvStringify.stringify(outputData, {delimiter: '\t', header: true}, (err, data) => {
    if(err) {
      console.error(err);
    }
    fs.writefileSync(data, 'output/result.tsv');
  });
};

const main = () => {
  let data = readFile('input/test.tsv');

  data = parseAndReplace(data);
  writeOutputFile(data);
};
