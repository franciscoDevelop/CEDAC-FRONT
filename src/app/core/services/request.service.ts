import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    url: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    /**
     * Convierte un valor a JSON si es un objeto.
     * @param value Valor a procesar.
     * @returns Valor procesado.
     */
    private stringifyIfObject(value: any): any {
        if (value && typeof value === 'object' && !(value instanceof File)) {
            return JSON.stringify(value);
        }
        return value;
    }

    /**
     * Crea un objeto FormData para enviar en una petición multipart/form-data.
     * @param fields Campos normales (key-value).
     * @param files Archivos a incluir.
     * @returns Objeto FormData.
     */
    private formData(fields: any = {}, files: any = {}): FormData {
        const formData = new FormData();

        // Agregar campos normales
        Object.keys(fields).forEach((key) => {
            if (fields[key] !== null && fields[key] !== undefined) {
                formData.append(key, new Blob([this.stringifyIfObject(fields[key])], { type: 'application/json' }));
            }
        });

        // Agregar archivos
        Object.keys(files).forEach((key) => {
            const file = files[key];
            if (file instanceof File) {
                formData.append(key, file, file.name);
            }
        });

        return formData;
    }

    /**
     * Realiza una petición GET.
     * @param url URL de la API.
     * @param params Parámetros opcionales.
     * @returns Observable con la respuesta.
     */
    public get<T>(url: string, params: any = {}): Observable<T> {
        return this.http.get<T>(this.url + url, { params });
    }

    /**
     * Realiza una petición POST.
     * @param url URL de la API.
     * @param fields Campos normales.
     * @param files Archivos opcionales.
     * @returns Observable con la respuesta.
     */
    public post<T>(url: string, fields: any = {}, files: any = {}): Observable<T> {
        return this.http.post<T>(this.url + url, this.formData(fields, files));
    }

    /**
     * Realiza una petición PUT.
     * @param url URL de la API.
     * @param fields Campos normales.
     * @param files Archivos opcionales.
     * @returns Observable con la respuesta.
     */
    public put<T>(url: string, fields: any = {}, files: any = {}): Observable<T> {
        fields['_method'] = 'PUT'; // Para compatibilidad con algunas APIs.
        return this.http.post<T>(this.url + url, this.formData(fields, files));
    }

    /**
     * Realiza una petición DELETE.
     * @param url URL de la API.
     * @param params Parámetros opcionales.
     * @returns Observable con la respuesta.
     */
    public delete<T>(url: string, params: any = {}): Observable<T> {
        return this.http.delete<T>(this.url + url, { params });
    }
}
