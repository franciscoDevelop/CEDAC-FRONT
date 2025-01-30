import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor() {}

    confirm(rd: any = {}) {
        return Swal.fire({
            icon: rd.icon || 'info',
            title: rd.title || null,
            text: rd.text || 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonColor: rd.confirmButtonColor || 'red',
            cancelButtonColor: rd.cancelButtonColor || 'green',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
            cancelButtonText: rd.cancelButtonText || 'Cancelar',
        });
    }

    submitInvalid(rd: any = {}) {
        Swal.fire({
            icon: rd.icon || 'warning',
            title: rd.title || 'Falta completar campos obligatorios',
            text: rd.test || 'Por favor, complete los campos obligatorios ' + 'o los campos con valor incorrecto, que se muestran en rojo.',
            confirmButtonColor: rd.confirmButtonColor || 'orange',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
        });
    }

    submitEmpty(rd: any = {}) {
        Swal.fire({
            icon: rd.icon || 'warning',
            title: rd.title || 'Falta ingresar información',
            text: rd.test || 'Por favor, ingrese por lo menos uno de los campos solicitados para realizar el envío.',
            confirmButtonColor: rd.confirmButtonColor || 'orange',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
        });
    }

    public submitWait(rd: any = {}) {
        Swal.fire({
            title: rd.title || 'Enviando...',
            icon: rd.icon || 'info',
            text: rd.text || 'Espere un momento por favor mientras se envía la información.',
            allowOutsideClick: rd.allowOutsideClick || false,
            showConfirmButton: rd.showConfirmButton || false,
            willOpen: () => {
                // Swal.showLoading();
            },
        });
        return function () {
            Swal.close();
        };
    }

    submitSuccess(rd: any = {}) {
        return Swal.fire({
            icon: rd.icon || 'success',
            title: rd.title || 'Envío exitoso',
            text: rd.text || 'Se ha guardado correctamente la información.',
            confirmButtonColor: rd.confirmButtonColor || 'green',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
        });
    }

    mixinSuccess(rd: any = {}) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '2em',
            customClass: rd.customClass || 'sweet-alerts'
        });
        return toast.fire({
            icon: rd.icon || 'success',
            title: rd.title || 'Envío exitoso',
            padding: '2em',
            customClass: rd.customClass || 'sweet-alerts'
        });
    }

    success(rd: any = {}) {
        return Swal.fire({
            icon: rd.icon || 'success',
            title: rd.title || 'Envío exitoso',
            text: rd.message || 'Se ha guardado correctamente la información.',
            confirmButtonColor: rd.confirm?.color || 'green',
            confirmButtonText: rd.confirm?.text || 'Aceptar',
        });
    }

    submitFail(rd: any = {}) {
        Swal.fire({
            icon: rd.icon || 'warning',
            title: rd.title || 'Ocurrió un error',
            text: rd.text || 'El envío de la información falló, por favor intente nuevamente.',
            confirmButtonColor: rd.confirmButtonColor || 'orange',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
            padding: '2em',
            customClass: rd.customClass || 'sweet-alerts'
        });
    }

    errorConnection(rd: any = {}) {
        Swal.fire({
            icon: rd.icon || 'error',
            title: rd.title || 'Error de conexión',
            text: rd.text || 'No se pudo establecer conexión con el servidor, por favor intente nuevamente.',
            confirmButtonColor: rd.confirmButtonColor || 'red',
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
        });
    }

    input(rd: any = {}) {
        return Swal.fire({
            title: rd.title || 'Ingrese la información',
            text: rd.text || 'Ingrese la información solicitada en campo de texto.',
            input: rd.input || 'text',
            showCancelButton: rd.showCancelButton || false,
            confirmButtonText: rd.confirmButtonText || 'Aceptar',
            allowOutsideClick: rd.allowOutsideClick || false,
            willOpen: rd.willOpen || null,
            //showConfirmButton: false || rd.showConfirmButton
        });
    }

    sessionExpired(rd: any = {}) {
        return this.input({
            title: rd.title || 'Su sesión ha expirado',
            text: rd.text || (rd.message || '') + ' Ingrese su contraseña ' + (rd.email ? 'de (' + rd.email + ')' : '') + ' para restablecer la sesión',
            input: 'password',
            confirmButtonText: 'Entrar',
            allowOutsideClick: false,
            //showConfirmButton: false || rd.showConfirmButton,
        });
    }
}
