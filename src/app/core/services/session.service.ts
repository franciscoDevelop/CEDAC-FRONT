import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivityService } from './activity.service';
import { AlertService } from './alert.service';
import { Location } from '@angular/common';
import { CurrentService } from './current.service';
import { RequestService } from './request.service';
import { LoadingService } from './loading.service';
import { UserCurrent } from '../interface/current-interface';
import md5 from 'md5-ts';
import { User, UserInfo, UserLastAccess } from 'src/app/models/user.model';
import { catchError, from, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    static currentInstance: SessionService;
    readonly UID: string = environment.session.uid + '_';
    readonly CHECK_SESSION_TIME = environment.session.check;
    readonly EXPIRATION_TIME = environment.session.time * 60 * 1000;
    readonly APP_KEY = '123'; //environment.backend.app_key;  //Garantiza que el token sea el mismo que apirest
    readonly r_map: any = { J: 1, S: 2, D: 3, A: 4 };
    session: any = {}; // as Session;
    persona: any = {};
    expediente: any = {};
    cat: any = {};
    data: any = {};
    private _recovery: boolean = false;
    private _interval: any = null;
    private _error: boolean = false;
    private _time: boolean = false;
    private _user_active: boolean = false;

    constructor(
        private readonly current: CurrentService,
        private readonly activity: ActivityService,
        private readonly req: RequestService,
        private readonly alert: AlertService,
        public loading: LoadingService,
        private readonly location: Location,
    ) {
        SessionService.currentInstance = this;
    }

    private _token: string = '';

    /**
     * Devuelve el token de la sesión cuando se asigna a una variable
     * ejemplo: token = this.token;
     */
    get token(): string {
        this._token = this._token || this.getStorage('token') || '';
        return this._token || '';
    }

    /**
     * Guarda el token de la sesión, solo se puede asignar por las clase session
     * ejemplo: this.token = token;
     */
    private set token(token: string) {
        this._token = token;
        this.setStorage('token', token);
    }

    private _timestamp: any = 0;

    /**
     * Devuelve el timestamp de expiración de la sesión cuando se asigna a una variable
     * ejemplo: time = this.timestamp;
     */
    get timestamp() {
        this._timestamp = this._timestamp || this.getStorage('timestamp') || 0;
        return this._timestamp;
    }

    // private _role: any = {};

    // get role(): any {
    //     return this.user.role?.name || this.session.account.rol;
    // }

    _centro: any = null;

    get centro() {
        return this.getCentro();
    }

    set centro(data: any) {
        this._centro = data;
        this.set('centro', data);
    }

    get request() {
        return this.req;
    }

    get msg() {
        return this.alert;
    }

    get centro_id(): number {
        return this.centro.id;
    }

    get centro_nombre(): string {
        return this.centro.nombre_centro;
    }

    get centro_tipo(): string {
        return this.centro.centro_tipo;
    }

    get circuito_id(): number {
        return 139; // todo este campo se obtendrá del circuito activo, inyectarlo en la session de usuario
    }

    /**
     * Recuperar el registro del usuario logueado cuando se asigna a una variable
     * ejemplo: user = this.user;
     */
    get user(): User {
        return this.get('user') || new User({});
    }

    set user(user: User) {
        this.set('user', user);
    }

    //set role(role: any) { this.user.role?.name; }
    // get rol(): any {
    //     return this.user.role || 0;
    // }

    get info(): UserInfo {
        return this.get('info') || new UserInfo({});
    }

    set info(info: UserInfo) {
        this.set('info', info);
    }

    get photo(): string {
        return this.get('photo') || 'assets/images/users/avatar-1.jpg';
    }

    set photo(photo: string) {
        this.set('photo', photo);
    }

    /**
     * Recuperar los ultimos 10 registros de acceso del usuario logueado cuando se asigna a una variable
     * ejemplo: permissions = this.permissions;
     */
    get last_access(): UserLastAccess {
        return this.get('last_access') || [];
    }

    set last_access(last_access: UserLastAccess[]) {
        this.set('last_access', last_access);
    }

    change(data: any = {}) {
        this.current.change(data); //dispara el evento de cambio personalizado
    }

    onChange(xFunc: Function) {
        this.current.changeCurrent.subscribe((data: any) => {
            console.log('change_subscribe::', data);
            xFunc(data);
        });
    }

    onTime(xFunc: Function) {
        this.current.timeCurrent.subscribe((data: any) => {
            xFunc(data);
        });
    }

    startTime() {
        if (this._time) return;
        this._time = true;
        this.current.changeTime();
        setInterval(() => {
            this.current.changeTime();
        }, 1000);
    }

    routeSubscribe(name: string, fx: Function) {
        this.current.createSubscription(name, fx);
    }

    routeUnsubscribe(name: string) {
        this.current.destroySubscription(name);
    }

    navigate(path: any) {
        this.current.navigate(path);
    }

    back() {
        this.location.back();
    }

    /**
     *  Guarda un valor en el almacenamiento local del navegador
     * @param name  Nombre del valor
     * @param value Valor a guardar
     */
    setItem(name: string, value: any) {
        this.data[name] = value;
        this.setStorageJson('data', this.data);
    }

    /**
     *  Obtiene un valor del almacenamiento local del navegador
     * @param name  Nombre del valor
     * @param value Valor por defecto
     * @returns  Devuelve el valor guardado
     */
    getItem(name: string, value?: any) {
        if (this.data[name]) return this.data[name];
        this.data = this.getStorageJson('data');
        return this.data[name] || value;
    }

    /**
     * Elimina un valor del almacenamiento local del navegador
     * @param name  Nombre del valor
     * @returns  Devuelve el valor eliminado
     */
    rmItem(name: string) {
        const val = this.data[name];
        delete this.data[name];
        this.setStorageJson('data', this.data);
        return val;
    }

    /**
     *  Guarda un catalogo tipo array[] en el almacenamiento local del navegador
     * @param name  Nombre del catalogo
     * @param value  arreglo de valores de catalogo a guardar
     */
    setCat(name: string, value: any) {
        this.cat[name] = value;
        this.setStorageJson('cat', this.cat);
    }

    /**
     *  Obtiene un catalogo tipo array[] del almacenamiento local del navegador
     * @param name  Nombre del catalogo
     * @param value  arreglo de valores de catalogo por defecto
     * @returns
     */
    getCat(name: string, value?: any) {
        if (this.cat[name]) return this.cat[name];
        this.cat = this.getStorageJson('cat');
        return this.cat[name] || value;
    }

    /**
     *  Elimina un catalogo tipo array[] del almacenamiento local del navegador
     * @param name Nombre del catalogo
     * @returns  Devuelve el catalogo eliminado
     */
    rmCat(name: string) {
        const val = this.cat[name];
        delete this.cat[name];
        this.setStorageJson('cat', this.cat);
        return val;
    }

    /**
     * Guarda un elemento en la session en el almacenamiento local del navegador
     * @param name Nombre del elemento
     * @param value Valor a guardar
     */
    set(name: string, value: any) {
        this.session[name] = value;
        this.setStorageJson('session', this.session);
    }

    /**
     * Obtiene un elemento de la session en el almacenamiento local del navegador
     * @param name Nombre del elemento
     * @returns  Devuelve el elemento guardado
     */
    get(name: string) {
        if (this.session[name]) return this.session[name];
        this.session = this.getStorageJson('session');
        return this.session[name];
    }

    /**
     *  Elimina un elemento de la session en el almacenamiento local del navegador
     * @param name Nombre del elemento
     * @returns  Devuelve el elemento eliminado
     */
    rm(name: string) {
        const val = this.session[name];
        delete this.session[name];
        this.setStorageJson('session', this.session);
        return val;
    }

    /**
     * Genera un timestamp y lo regresa como string
     * @returns Devuelve un timestamp como string
     */
    getTimestamp() {
        return new Date().getTime().toString();
    }

    /**
     * reinicia el timestamp de expiración de la sesión
     */
    resetTimestamp() {
        this._timestamp = this.getTimestamp();
        this.setStorage('timestamp', this._timestamp);
    }

    getCentro(): any {
        this._centro = this._centro || this.get('centro');
        return this._centro;
    }

    allow(...roles: string[]): boolean {
        // return roles.includes(this.r_map[this.role]);
        return true;
    }

    /**
     * Detecta si la sesión está activa
     * @returns true si la sesión está activa, false en caso contrario
     */
    isActive(): boolean {
        this.checkSession(); // todo buscar otro método para validar la session de api
        this.loading.hide();

        return !this.isExpired();
    }

    /**
     * Detecta si la sesión existe
     * @returns
     */
    exists(): boolean {
        return !this.isExpired();
    }

    /**
     * Si ha pasado más tiempo desde el último token que el tiempo de expiración Y
     * ha pasado más tiempo desde la última actividad que el tiempo de expiración,
     * entonces el token ha expirado.
     * @returns  true si el token ha expirado, false en caso contrario
     */
    isExpired(): boolean {
        const token = this.token; //SessionService.getToken();
        if (!token) return true; //NO existe token de la sesión
        const tokenTimestamp = this.timestamp;
        if (!tokenTimestamp) return true; //NO existe timestamp de expiración
        const currentTime = new Date().getTime();
        const timeSinceLastToken = currentTime - Number(tokenTimestamp);
        const timeSinceLastActivity = currentTime - this.activity.getLastActivity();
        //console.log('actual',currentTime,'lastToken',timeSinceLastToken,'lastActivity',timeSinceLastActivity,'exp',this.EXPIRATION_TIME,'timeStampToken',tokenTimestamp);
        //return false; // ya no cierro la session por tiempo de inactividad
        //console.log('timeSinceLastToken:', timeSinceLastToken, 'timeSinceLastActivity:', timeSinceLastActivity);
        return timeSinceLastToken > this.EXPIRATION_TIME && timeSinceLastActivity > this.EXPIRATION_TIME;
    }

    validToken(): Promise<boolean> {
        return lastValueFrom(
            this.req.get('/session/check').pipe(
                map((res: any) => (res.success ? true : false)),
                catchError((err: any) => {
                    console.log('checkSession error - ', err);
                    return of(false);
                }),
            ),
        );
    }

    /**
     * Inicia el proceso de verificación de la sesión cada CHECK_SESSION_TIME segundos
     * asi como la verificación de expiración de la sesión cada EXPIRATION_TIME minutos
     * siempre y cuando no se haya detectado actividad por parte del usuario
     * Si la sesión ha expirado, se muestra un mensaje para recuperar la sesión
     */
    checkSession() {
        if (this.token) {
            let itera = 0;
            this._interval = clearInterval(this._interval);
            this._interval = setInterval(() => {
                //console.log('checkSession - ', itera);
                if (itera++ % this.CHECK_SESSION_TIME == 0) {
                    this.validToken().then((success: any) => {
                        if (success) {
                            this.loading.hide();
                        } else this.recoverySession();
                    });
                } else {
                    if (this.isExpired()) {
                        this.token = '--expired--';
                        this.drop();
                        location.reload();
                    }
                }
            }, 300000); // reviza la sesion cada 5 minutos
        }
    }

    /**
     * Recupera los datos del usuario logueado via apiRest
     * Si la sesión ha expirado, se muestra un mensaje para recuperar la sesión
     * @returns Regresa una promesa que se resuelve en caso de éxito y se rechaza en caso de error
     */
    details(): Promise<boolean> {
        return lastValueFrom(
            this.req.get('/session/user').pipe(
                map((res: any) => {
                    if (res && res.success) {
                        console.log('data user:', res);
                        this.save(res);
                        return true;
                    } else {
                        throw new Error(res.error || 'Credenciales incorrectas');
                    }
                }),
                catchError((err: any) => {
                    console.error('Error de conexión', err);
                    throw new Error('Error de conexión');
                }),
            ),
        );
    }

    update() {
        if (this._user_active) return;
        this._user_active = true;
        this.current.changeUser({
            RPEejec: this.user.RPEejec,
            Nombre: this.user.Nombre,
            R3: this.user.R3,
            IP: this.user.IP,
            Grupo: this.user.Grupo,
            AdminReal: this.user.AdminReal,
            paramInfoPak: this.user.paramInfoPak,
            Intro: this.user.Intro,
            Solic: this.user.Solic,
            Busqueda: this.user.Busqueda,
            Admon: this.user.Admon,
            Directorio: this.user.Directorio,
            InfoDoctal: this.user.InfoDoctal,
            Chat: this.user.Chat,
            ListaEmail: this.user.ListaEmail,
            Vnc: this.user.Vnc,
            VideoConf: this.user.VideoConf,
            comentarios: this.user.comentarios,
            Recursos: this.user.Recursos,
            Sugerencias: this.user.Sugerencias,
            xa: 20,
            Nivel: this.user.Nivel,
            UsuAltas: this.user.UsuAltas,
            UsuModif: this.user.UsuModif,
            UsuBajas: this.user.UsuBajas,
            BaseCon: this.user.BaseCon,
            GradosUrgencia: this.user.GradosUrgencia,
            SolucionesParticulares: this.user.SolucionesParticulares,
            foroAdmin: this.user.foroAdmin,
            foroAcceso: this.user.foroAcceso,
            CoordTiemposAtn: this.user.CoordTiemposAtn,
            ConfigAdmOpciones1: this.user.ConfigAdmOpciones1,
            ConfigAdmOpciones2: this.user.ConfigAdmOpciones2,
            ConfigAdmOpciones3: this.user.ConfigAdmOpciones3,
            HayEscalacionAutomatica: this.user.HayEscalacionAutomatica,
            isSupervisor: this.user.isSupervisor,
            isComite: this.user.isComite,
            photo: this.user.photo + '?' + new Date().getTime(),
        } as UserCurrent);
        //this.loading.hide();
    }

    loadCat(cat: any) {
        if (cat) {
            for (let code in cat) {
                this.setCat(code, cat[code]);
            }
        }
    }

    /**
     * Guarda los datos del usuario logueado en el almacenamiento local del navegador
     * @param res Estructura de datos en json con los datos del usuario logueado
     */
    save(res: any) {
        res = res || {};
        this._user_active = false; //actualizar el usuario activo
        if (res.cat) this.loadCat(res.cat);
        //if (res.user?.photo) this.photo = res.user.photo;
        if (res.user) this.user = new User(res.user);
        if (res.user?.info) this.info = new UserInfo(res.user);
        if (res.last_access) this.last_access = res.last_access;
        if (res.user?.centro) this.centro = res.user?.centro;
        //if (res.user?.centro) this.centro = res.user?.centro;
        //if (res.user?.role) this.role = res.user?.role;
        //if (res.permissions) this.permissions = res.permissions;
        //if (res.roles) this.role = res.role;
        this.update();
    }

    /**
     * Carga los datos del usuario logueado desde el almacenamiento local del navegador
     */
    load() {
        this.startTime();
        this.resetTimestamp();
        this._token = this.token;
        this.session = this.getStorageJson('session') || {};
        this.cat = this.getStorageJson('cat') || {};
        this.data = this.getStorageJson('data') || {};
        this._centro = this.centro || this.get('centro');
        //const user = this.info;
        this.update();
    }

    /**
     * Borra los datos del usuario logueado del almacenamiento local del navegador
     * y detiene el proceso de verificación de la sesión
     */
    drop(): void {
        this.rmStorage('token');
        this.rmStorage('session');
        this.rmStorage('cat');
        this.rmStorage('data');
        this.rmStorage('timestamp');
        this.rmStorage('IsLoggedIn');
        this._token = '';
        this._user_active = false;
        this._timestamp = 0;
        this.session = {};
        this.cat = {};
        this.data = {};
        // todo: desuscribir y desactivar todos los eventos
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            let lon = 0;
            let lat = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                        resolve({ lon, lat });
                    },
                    (error) => {
                        resolve({ lon, lat });
                    },
                );
            } else {
                resolve({ lon, lat });
            }
        });
    }

    /**
     *  Inicia sesión en el sistema via apiRest
     * @param email
     * @param password
     * @returns
     */
    login(email: string, password: string): Observable<any> {
        return from(this.getLocation()).pipe(
            switchMap((location: any) =>
                this.req.post('/login', { email, password, location }).pipe(
                    switchMap((res: any) => {
                        if (res && res.success && res.token) {
                            this.token = res.token;
                            this.setStorage('IsLoggedIn', 'true');
                            return from(this.details());
                        } else {
                            this.setStorage('IsLoggedIn', 'false');
                            return of({ error: res.error || 'Credenciales incorrectas' });
                        }
                    }),
                    catchError((error) => {
                        this.setStorage('IsLoggedIn', 'false');
                        return of({ error });
                    }),
                ),
            ),
        );
    }

    logout() {
        this.setStorage('IsLoggedIn', 'false');
    }

    isLoggedIn(): boolean {
        // Verificamos si la variable de sessionStorage está presente para determinar si el usuario está autenticado
        return this.getStorage('isLoggedIn') === 'true';
    }

    recover(email: string): Observable<any> {
        const token = md5(this.APP_KEY + email);
        return this.req.put(`/recovery/${token}`, { email }).pipe(
            map((res: any) => {
                if (res && res.success) {
                    return true;
                } else {
                    throw new Error(res.error || 'No existe el correo');
                }
            }),
            catchError((error) => {
                return of({ error: error.message });
            }),
        );
    }

    /**
     *  Muestra mensaje de error cuando se pierde la conexión con el servidor
     * @param err
     * @returns
     */
    showError(err: any) {
        if (this._error) return;
        this._error = true;
        err = err || {};
        console.log('error: ', err);
        if (err.status == 401) {
            this.recoverySession();
        } else if (err.status === 422) {
            this.alert.errorConnection({ text: err?.error?.message, title: 'Error' });
            this.loading.hide();
        } else {
            this.alert.errorConnection();
            this.loading.hide(); //quita el loading para que no se quede indefinidamente
        }
        setTimeout(() => {
            this._error = false;
        }, 5000);
    }

    /**
     * Si el usuario no ha iniciado sesión, se muestra un mensaje para recuperar la sesión
     * cunado esta ya ha expirado
     * @param rd  Estructura de datos en json con los datos del mensaje a mostrar
     */
    recoverySession(rd: any = {}): void {
        if (!this._recovery) {
            const user = this.user;
            const text = rd.text || '';
            const url = rd.url || '';
            //console.log('route', url);
            if (url == '/account/login') {
                return;
            }
            this._recovery = true;
            // console.log('recoverySession', this.user);
            // if (!user.email) {
            //     this.drop();
            //     location.reload();
            //     return;
            // }
            this.loading.show();
            // this.alert.sessionExpired({ email: user.email, message: text }).then((result) => {
            //     this._recovery = false;
            //     if (result.value) {
            //         this.login(user.email, result.value)
            //             .then(() => {
            //                 this.loading.hide();
            //                 console.log('recoverySession - login success');
            //             })
            //             .catch((err: any) => {
            //                 this.recoverySession();
            //                 console.log('recoverySession - login fail');
            //             });
            //     } else this.recoverySession();
            // });
        }
    }

    private setStorage(name: string, value: any) {
        localStorage.setItem(this.UID + name, value);
    }

    private getStorage(name: string) {
        return localStorage.getItem(this.UID + name);
    }

    private rmStorage(name: string) {
        localStorage.removeItem(this.UID + name);
    }

    private setStorageJson(name: string, value: any) {
        try {
            this.setStorage(name, JSON.stringify(value));
        } catch (e) {
            console.log('error setStorageJson', e);
        }
    }

    private getStorageJson(name: string) {
        try {
            return JSON.parse(this.getStorage(name) || '{}');
        } catch (e) {
            console.log('error getStorageJson', e);
            return {};
        }
    }
}
