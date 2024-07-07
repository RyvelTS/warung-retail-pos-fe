import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  getDataArray(content: string, delimiter: string): any[] {
    return content.split(/\r?\n/).map((row: any) => {
      return row.split(delimiter);
    }).filter((arr) => arr.length > 0)
      .filter((arr) => arr.some((element: any) => element !== ''));
  }

  parseCsvFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        reject("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content: string | ArrayBuffer | null | undefined = event.target?.result;
        if (content) {
          const parsedCsv = content.toString();
          const firstNewlineIndex = parsedCsv.indexOf('\n');

          if (firstNewlineIndex !== -1) {
            const modifiedCsv = parsedCsv.substring(firstNewlineIndex + 1);
            resolve(modifiedCsv);
          } else {
            resolve(parsedCsv);
          }
        }
      };

      reader.readAsText(file);
    });
  }
}
