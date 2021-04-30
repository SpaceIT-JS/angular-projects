import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';

export type ExportType = 'json' | 'localStorage';

@Injectable({
    providedIn: 'root'
})
export class ExportService {
    importData(type: ExportType, file?: Blob): Observable<object | Array<any>> {
        switch (type) {
            case 'json':
                if (file !== undefined) {
                    return this._loadFile(file);
                } else {
                    console.warn('File not attached');
                }
                return EMPTY;
                case 'localStorage':
                let localData = localStorage.getItem('investData');
                    
                if (localData) {
                    return of(JSON.parse(localData));
                } else {
                    // TODO notify about lack of data in localStorage
                    return EMPTY;
                }
            default:
                console.warn('Unsupported export type');
                return EMPTY;
        }
    }

    exportData(type: ExportType, data: object | Array<any>): void {
        switch (type) {
            case 'json':
                this._downloadFile(data);
                break;
            case 'localStorage':
                localStorage.setItem('investData', JSON.stringify(data));
                break;
            default:
                console.warn('Unsupported export type');
        }
    }

    private _loadFile(file: Blob): Observable<object | Array<any>> {
        const result: Subject<object | Array<any>> = new Subject();
        const reader = new FileReader();
        reader.onload = (_) => {
            result.next(JSON.parse(reader.result as string));
        };

        reader.readAsText(file);
        return result.asObservable();
    }

    private _downloadFile(data: object | Array<any>): void {
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const fileName = `investData_${(new Date()).toLocaleDateString()}.json`;

        const a = document.createElement('a') as HTMLElement;
        document.body.appendChild(a);
        a.classList.add('hide');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName);

        a.click();
        document.body.removeChild(a);
    }
}
