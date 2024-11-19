import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    url: string = environment.apiBaseUrl;

    constructor(private readonly http: HttpClient) {}

    public stringifyIfObject(value: any): any {
        if (value && typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value;
    }
    /**
     * Procesa los datos para enviarlos como FormData en una petición POST
     * @param fields Estructura de campos
     * @param files Estructura de archivos
     * @returns  Devuelve un objeto FormData
     */
    public formData(fields: any = {}, files: any = {}): FormData {
        const formData = new FormData();
        for (const key in fields) {
            if (fields[key] !== null && fields[key] !== undefined) {
                formData.append(key, this.stringifyIfObject(fields[key]));
            }
        }
        for (const key in files) {
            if (typeof files[key] === 'object' && files[key].name !== undefined) {
                formData.append(key, files[key], files[key].name);
            }
        }
        return formData;
    }

    /**
     *  Realiza una petición GET
     * @param url URL a la que se realizará la petición
     * @param params parámetros que se enviarán en la petición
     * @returns Devuelve una promesa con la respuesta de la petición
     */
    // public get<T>(url: string, params: any = {}): Observable<T> {
    //     return this.http.get<T>(this.url + url, { params }).subscribe({
    //         next: (rs) => {
    //             resolve(rs);
    //         },
    //         error: (err) => {
    //             reject(err);
    //         },
    //     });
    // }
    public get<T>(url: string, params: any = {}): Observable<T> {
        return this.http.get<T>(this.url + url, { params });
    }

    // get<T>(url: string): Observable<T> {
    //     return this.http.get<T>(url);
    // }

    /**
     * Realiza una petición POST a una URL con los parámetros indicados en params
     *
     * @param url
     * @param params
     * @returns
     */
    public post(url: string, fields: any = {}, files: any = {}) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + url, this.formData(fields, files)).subscribe({
                next: (rs) => {
                    resolve(rs);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    }

    public put(url: string, fields: any = {}, files: any = {}) {
        return new Promise((resolve, reject) => {
            fields['_method'] = 'PUT';
            //fields['_token'] = window['csrf_token'];
            this.http.post(this.url + url, this.formData(fields, files)).subscribe({
                next: (rs) => {
                    resolve(rs);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    }

    /**
     * Realiza una petición DELETE a una URL
     * @param url
     * @param params
     * @returns
     */
    public delete(url: string, params: any = {}) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.url + url, { params }).subscribe({
                next: (rs) => {
                    resolve(rs);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    }
}
