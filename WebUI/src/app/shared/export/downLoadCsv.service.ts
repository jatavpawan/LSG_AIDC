import { Injectable } from '@angular/core';

@Injectable()
export class DownloadCsvService {
    constructor() { }

    public downloadCsv(dataTable:any, seperator: string, fileName: string, tableName: string) {
        let csv = '\ufeff';

        //headers
        for (let i = 0; i < dataTable.columns.length; i++) {
            if (dataTable.columns[i].field) {
                csv += dataTable.columns[i].header || dataTable.columns[i].field;
                if (i < (dataTable.columns.length - 1)) {
                    csv += seperator;
                }
            }
        }

        //body        
        dataTable.value.forEach((record: any) => {
            if (tableName === 'AchRejections') {
                //this is logic for AchRejecttions grid
                if (record.IsDeletedRejection === false) {
                    csv += this.buildCsvData(dataTable, record, seperator);
                }
            } else if (tableName === 'DraftRejections') {
                if (record.IsActive) {
                    csv += this.buildCsvData(dataTable, record, seperator);
                }
            } else {
                //this is logic for the rest of grid in general
                csv += this.buildCsvData(dataTable, record, seperator);                
            }
        });

        let blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, fileName + '.csv');
        }
        else {
            let link: any = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', fileName + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }

            document.body.removeChild(link);
        }        
    }

    public buildCsvData(dataTable: any, record: any, seperator: string) {
        let csv = '\n';
        for (let i = 0; i < dataTable.columns.length; i++) {
            if (dataTable.columns[i].field) {
                let data = dataTable.resolveFieldData(record, dataTable.columns[i].field);
                if (!data) {
                    data = '';
                }
                csv += "\"" + data + "\"";

                if (i < (dataTable.columns.length - 1)) {
                    csv += seperator;
                }
            }
        }

        return csv;
    }
}