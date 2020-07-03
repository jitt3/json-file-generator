import React from 'react';
import {csv} from "d3-fetch";
import agricultureHorticulture from '../../maori/agriculture-horticulture-annual.csv';
import agricultureLandUseInformation from '../../maori/agriculture-land-use-information.csv';
import agricultureLiveStockInformation from '../../maori/agriculture-livestock-information.csv';
import businessDemographyAuthorities from '../../maori/business-demography-enterprises-maori-authorities.csv';
import businessDemographySMEs from '../../maori/business-demography-enterprises-maori-SMEs.csv';
import businessOperationsRates from '../../maori/business-operations-rates.csv';
import leedEstimates from '../../maori/LEED-estimates-of-filled-jobs.csv';
import leedWorker from '../../maori/LEED-worker-turnover-rates.csv';

import "./CsvParser.css"

const csvFilesArray = [
    {'agriculture-horticulture': agricultureHorticulture},
    {'agriculture-land-use-information': agricultureLandUseInformation},
    {'agriculture-livestock': agricultureLiveStockInformation},
    {'business-demography-authorities': businessDemographyAuthorities},
    {'business-demography-smes': businessDemographySMEs},
    {'business-operations-rates': businessOperationsRates},
    {'leed-estimates': leedEstimates},
    {'leed-worker': leedWorker}
];

const CsvParser = () => {
    const createJsonFile = (fileName,data) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
            type: "text/plain"
        }));
        a.setAttribute("download", `${fileName}.json`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const parseFile = (event) => {
        event.preventDefault();
        csvFilesArray.map(csvFile => {
            const [fileName] = Object.keys(csvFile);
            csv(csvFile[fileName])
                .then((responseArray) => {
                    const {columns, ...data} = responseArray;
                    const dataValues = Object.values(data);
                    const dataParsed = dataValues.map(dataValue => {
                        return dataValue;
                    });
                    createJsonFile(fileName,dataParsed);
                })
                .catch((error) => {
                    console.log(error);
                    alert('Something happened, review your csv files and try again!')
                });
        })

    };
    return (<React.Fragment><button className="download-button" onClick={parseFile}>Click to parse files</button></React.Fragment>)
};

export default CsvParser;
