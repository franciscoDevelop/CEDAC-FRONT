export class User {
    RPEejec: string = '';
    Nombre: string = '';
    R3: string = '';
    IP: string = '';
    Grupo: string = '';
    AdminReal: boolean = true;
    paramInfoPak: string = '';
    Intro: number = 0;
    Solic: number = 0;
    Busqueda: number = 0;
    Admon: number = 0;
    Directorio: number = 0;
    InfoDoctal: number = 0;
    Chat: number = 0;
    ListaEmail: number = 0;
    Vnc: number = 0;
    VideoConf: number = 0;
    comentarios: string = '';
    Recursos: number = 0;
    Sugerencias: number = 0;
    xa: number = 0;
    Nivel: number = 0;
    UsuAltas: number = 0;
    UsuModif: number = 0;
    UsuBajas: number = 0;
    BaseCon: number = 0;
    GradosUrgencia: number = 0;
    SolucionesParticulares: number = 0;
    foroAdmin: number = 0;
    foroAcceso: number = 0;
    CoordTiemposAtn: number = 0;
    ConfigAdmOpciones1: number = 0;
    ConfigAdmOpciones2: number = 0;
    ConfigAdmOpciones3: number = 0;
    HayEscalacionAutomatica: number = 0;
    isSupervisor: number = 0;
    isComite: number = 0;
    photo: string = '';

    constructor(data: any = {}) {
        this.RPEejec = data.RPEejec || '';
        this.Nombre = data.Nombre || '';
        this.R3 = data.R3 || '';
        this.IP = data.IP || '';
        this.Grupo = data.Grupo || '';
        this.AdminReal = data.AdminReal || true;
        this.paramInfoPak = data.paramInfoPak || '';
        this.Intro = data.Intro || 0;
        this.Solic = data.Solic || 0;
        this.Busqueda = data.Busqueda || 0;
        this.Admon = data.Admon || 0;
        this.Directorio = data.Directorio || 0;
        this.InfoDoctal = data.InfoDoctal || 0;
        this.Chat = data.Chat || 0;
        this.ListaEmail = data.ListaEmail || 0;
        this.Vnc = data.Vnc || 0;
        this.VideoConf = data.VideoConf || 0;
        this.comentarios = data.comentarios || '';
        this.Recursos = data.Recursos || 0;
        this.Sugerencias = data.Sugerencias || 0;
        this.xa = data.xa || 0;
        this.Nivel = data.Nivel || 0;
        this.UsuAltas = data.UsuAltas || 0;
        this.UsuModif = data.UsuModif || 0;
        this.UsuBajas = data.UsuBajas || 0;
        this.BaseCon = data.BaseCon || 0;
        this.GradosUrgencia = data.GradosUrgencia || 0;
        this.SolucionesParticulares = data.SolucionesParticulares || 0;
        this.foroAdmin = data.foroAdmin || 0;
        this.foroAcceso = data.foroAcceso || 0;
        this.CoordTiemposAtn = data.CoordTiemposAtn || 0;
        this.ConfigAdmOpciones1 = data.ConfigAdmOpciones1 || 0;
        this.ConfigAdmOpciones2 = data.ConfigAdmOpciones2 || 0;
        this.ConfigAdmOpciones3 = data.ConfigAdmOpciones3 || 0;
        this.HayEscalacionAutomatica = data.HayEscalacionAutomatica || 0;
        this.isSupervisor = data.isSupervisor || 0;
        this.isComite = data.isComite || 0;
        this.photo = data.photo || 'assets/images/users/avatar-1.jpg';
    }
}

export class UserInfo {
    id: number = 0;
    name: string = '';
    email: string = '';
    last_name: string = '';
    photo: string = '';
    tel_mobile: string = '';
    tel_office: string = '';
    tel_home: string = '';
    address: string = '';
    birthday: string = '';
    gender: number = 0;
    about: string = '';

    constructor(data?: any) {
        if (!data) return;
        this.id = data.id || 0;
        this.name = data.name || '';
        this.email = data.email || '';
        // this.last_name = data.last_name || '';
        this.photo = data.photo || 'assets/images/users/avatar-1.jpg';
        // this.tel_mobile = data.tel_mobile || '';
        // this.tel_office = data.tel_office || '';
        // this.tel_home = data.tel_home || '';
        // this.address = data.address || '';
        // this.birthday = data.birthday || '';
        // this.gender = data.gender || 0;
        // this.about = data.about || '';
    }
}

export class UserLastAccess {
    id: number = 0;
    session: string = '';
    device: string = '';
    ip_address: string = '';
    latitude?: string = '';
    longitude?: string = '';
    status: number = 0;
    updated_at?: string = '';
    constructor(data?: any) {
        if (!data) return;
        this.id = data.id || 0;
        this.session = data.session || '';
        this.device = data.device || '';
        this.ip_address = data.ip_address || '';
        this.latitude = data.latitude || '';
        this.longitude = data.longitude || '';
        this.status = data.status || 0;
        this.updated_at = data.updated_at || '';
    }
}

export interface DataUser {
    user: User;
    info: UserInfo;
    lastAccess: UserLastAccess[];
}
