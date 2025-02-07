import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroupInterface, GroupInterface } from 'src/interface/group-interface';
import { ResponseData } from 'src/interface/response-data';
import moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    url: string = environment.apiBaseUrl;

    constructor(private readonly http: HttpClient) {}

    getGroups(): Observable<ResponseData<GroupInterface[]>> {
        const route = `/groups`;
        return this.http.get<ResponseData<GroupInterface[]>>(this.url + route);
    }

    getGroupByName(id: string): Observable<ResponseData<GroupInterface>> {
        const route = `/groups/${id}`;
        return this.http.get<ResponseData<GroupInterface>>(this.url + route);
    }

    createGroup(group: FormGroupInterface): Observable<ResponseData<GroupInterface>> {
        const route = `/groups`;

        let ChkConfIntro: number = 0;
        if (ChkConfIntro != 0) {
            ChkConfIntro = 2;
        }
        let ChkBorrBit: number = 0;
        if (ChkBorrBit != 0) {
            ChkBorrBit = 1;
        }

        let ChkTimer: number = 0;
        if (ChkTimer != 0) {
            ChkTimer = 4;
        }

        let ChkOtro: number = 0;
        if (ChkOtro != 0) {
            ChkOtro = 8;
        }

        let Intro = ChkConfIntro + ChkBorrBit + ChkTimer + ChkOtro;

        let ChkRegSolic: number = 0;
        if (group.ChkRegSolic) {
            ChkRegSolic = 1;
        }

        let ChkPend: number = 0;
        if (group.ChkPend) {
            ChkPend = 2;
        }

        let ChkMonSol: number = 0;
        if (ChkMonSol != 0) {
            ChkMonSol = 4;
        }

        let Solic = ChkRegSolic + ChkPend + ChkMonSol;

        let ChkBusquedaBas: number = 0;
        if (group.ChkBusquedaBas) {
            ChkBusquedaBas = 1;
        }
        let ChkBusquedaAvz: number = 0;
        if (group.ChkBusquedaAvz) {
            ChkBusquedaAvz = 2;
        }

        let Busqueda = ChkBusquedaBas + ChkBusquedaAvz;

        let ChkAdmonUsers: number = 0;
        if (ChkAdmonUsers != 0) {
            ChkAdmonUsers = 1;
        }

        let ChkAdmonGroups: number = 0;
        if (group.ChkAdmonGroups) {
            ChkAdmonGroups = 2;
        }

        let ChkAdmonBitacora: number = 0;
        if (group.ChkAdmonBitacora) {
            ChkAdmonBitacora = 4;
        }

        let ChkAdmonEstads: number = 0;
        if (group.ChkAdmonEstads) {
            ChkAdmonEstads = 8;
        }

        let ChkProbsSoluciones: number = 0;
        if (group.ChkProbsSoluciones) {
            ChkProbsSoluciones = 16;
        }

        let ChkDocumentos: number = 0;
        if (group.ChkDocumentos) {
            ChkDocumentos = 32;
        }

        let ChkMensajesError: number = 0;
        if (group.ChkMensajesError) {
            ChkMensajesError = 64;
        }

        let Admon = ChkAdmonUsers + ChkAdmonGroups + ChkAdmonBitacora + ChkAdmonEstads + ChkProbsSoluciones + ChkDocumentos + ChkMensajesError;

        let ChkModulos: number = 0;
        if (group.ChkModulos) {
            ChkModulos = 1;
        }

        let ChkTipoProbs: number = 0;
        if (group.ChkTipoProbs) {
            ChkTipoProbs = 2;
        }

        let ChkEliminarSolic: number = 0;
        if (group.ChkEliminarSolic) {
            ChkEliminarSolic = 4;
        }

        let ChkAgrpModulos: number = 0;
        if (group.ChkAgrpModulos) {
            ChkAgrpModulos = 8;
        }

        let Admon2 = ChkModulos + ChkTipoProbs + ChkEliminarSolic + ChkAgrpModulos;

        let ChkLectDir: number = 0;
        if (ChkLectDir != 0) {
            ChkLectDir = 1;
        }

        let Directorio = ChkLectDir;

        let ChkExpDoct: number = 0;
        if (ChkExpDoct != 0) {
            ChkExpDoct = 1;
        }

        let ChkInsertDoct: number = 0;
        if (ChkInsertDoct != 0) {
            ChkInsertDoct = 2;
        }

        let ChkRevDoct: number = 0;
        if (ChkRevDoct != 0) {
            ChkRevDoct = 4;
        }

        let ChkMotorDoct: number = 0;
        if (ChkMotorDoct != 0) {
            ChkMotorDoct = 8;
        }

        let InfoDoctal = ChkExpDoct + ChkInsertDoct + ChkRevDoct + ChkMotorDoct;

        let ChkChatCte: number = 0;
        if (group.ChkChatCte) {
            ChkChatCte = 1;
        }

        let ChkChatEjec: number = 0;
        if (group.ChkChatEjec) {
            ChkChatEjec = 2;
        }

        let ChkChat = ChkChatCte + ChkChatEjec;

        let ChkEmail1: number = 0;
        if (ChkEmail1 != 0) {
            ChkEmail1 = 1;
        }

        let ChkEmail3: number = 0;
        if (ChkEmail3 != 0) {
            ChkEmail3 = 2;
        }

        let ChkEmail = ChkEmail1 + ChkEmail3;

        let ChkManipulacion: number = 0;
        if (group.ChkManipulacion) {
            ChkManipulacion = 1;
        }

        let ChkVideoConf1: number = 0;
        if (ChkVideoConf1 != 0) {
            ChkVideoConf1 = 1;
        }

        let ChkVideoConf2: number = 0;
        if (ChkVideoConf2 != 0) {
            ChkVideoConf2 = 2;
        }

        let ChkVideoConf = ChkManipulacion + ChkVideoConf1 + ChkVideoConf2;

        let ChkRec1: number = 0;
        if (group.ChkRec1) {
            ChkRec1 = 1;
        }

        let ChkRec3: number = 0;
        if (group.ChkRec3) {
            ChkRec3 = 2;
        }

        let ChkRec = ChkRec1 + ChkRec3;

        let ChkSugerenciasVer: number = 0;
        if (group.ChkSugerenciasVer) {
            ChkSugerenciasVer = 1;
        }

        let ChkSugerenciasBorrar: number = 0;
        if (group.ChkSugerenciasBorrar) {
            ChkSugerenciasBorrar = 2;
        }

        let ChkSugerencias = ChkSugerenciasVer + ChkSugerenciasBorrar;

        let BaseCon: number = 0;

        if (group.ChkBaseCon) {
            BaseCon += 1;
        }

        if (group.ChkExpPS) {
            BaseCon += 2;
        }

        if (group.ChkExpDoc) {
            BaseCon += 4;
        }

        if (group.ChkBCMensajesError) {
            BaseCon += 8;
        }

        let ChkReportes: number = 0;
        let reportes_ADMON: number = 0;
        let reportes_ADMON_2: number = 0;
        let reportes_ADMON_3: number = 0;

        if (group.chkRep_Admon01) {
            reportes_ADMON += 1;
        }

        if (group.chkRep_Admon02) {
            reportes_ADMON += 2;
        }

        if (group.chkRep_Admon03) {
            reportes_ADMON += 4;
        }

        if (group.chkRep_Admon04) {
            reportes_ADMON += 8;
        }

        if (group.chkRep_2_Admon01) {
            reportes_ADMON_2 += 1;
        }

        if (group.chkRep_2_Admon02) {
            reportes_ADMON_2 += 2;
        }

        if (group.chkRep_2_Admon03) {
            reportes_ADMON_2 += 4;
        }

        if (group.chkRep_2_Admon04) {
            reportes_ADMON_2 += 8;
        }

        if (group.chkRep_2_Admon05) {
            reportes_ADMON_2 += 16;
        }

        if (group.chkRep_2_Admon06) {
            reportes_ADMON_2 += 32;
        }

        if (group.chkRep_2_Admon07) {
            reportes_ADMON_2 += 64;
        }

        if (group.chkRep_2_Admon08) {
            reportes_ADMON_2 += 128;
        }

        if (group.chkRep_3_Admon01) {
            reportes_ADMON_3 += 1;
        }

        if (group.chkRep_3_Admon02) {
            reportes_ADMON_3 += 2;
        }

        if (group.chkRep_3_Admon03) {
            reportes_ADMON_3 += 4;
        }

        if (group.chkRep_3_Admon04) {
            reportes_ADMON_3 += 8;
        }

        if (group.chkRep_3_Admon05) {
            reportes_ADMON_3 += 16;
        }

        if (group.chkRep_3_Admon06) {
            reportes_ADMON_3 += 32;
        }

        if (group.chkRep_3_Admon07) {
            reportes_ADMON_3 += 64;
        }

        if (group.chkRep_3_Admon08) {
            reportes_ADMON_3 += 128;
        }

        let reportes_COORD: number = 0;

        if (group.chkRep_Coord01) {
            reportes_COORD += 1;
        }

        if (group.chkRep_Coord02) {
            reportes_COORD += 2;
        }

        if (group.chkRep_Coord03) {
            reportes_COORD += 4;
        }

        let reportes_SUPERV: number = 0;

        if (group.chkRep_Superv01) {
            reportes_SUPERV += 1;
        }

        if (group.chkRep_Superv02) {
            reportes_SUPERV += 2;
        }

        if (group.chkRep_Superv03) {
            reportes_SUPERV += 4;
        }

        let reportes_MONIT: number = 0;

        if (group.chkRep_Monit01) {
            reportes_MONIT += 1;
        }

        if (group.chkRep_Monit02) {
            reportes_MONIT += 2;
        }

        if (reportes_ADMON + reportes_ADMON_2 + reportes_ADMON_3 + reportes_COORD + reportes_SUPERV + reportes_MONIT > 0) {
            ChkReportes = 1;
        }

        let ChkSuplencias: number = 0;
        if (group.ChkSuplencias) {
            ChkSuplencias = 1;
        }

        let ChkEncuestas: number = 0;
        if (group.ChkEncuestas) {
            ChkEncuestas = 1;
        }

        let ChkCuentaP: number = 0;
        if (group.ChkCuentaP) {
            ChkCuentaP = 1;
        }

        let ChkGradosUrgencia: number = 0;
        if (group.ChkGradosUrgencia) {
            ChkGradosUrgencia = 1;
        }

        let ChkSolucionesParticulares: number = 0;
        if (group.ChkSolucionesParticulares) {
            ChkSolucionesParticulares = 1;
        }

        let Foro: number = 0;

        if (group.ChkForoAcceso) {
            Foro += 1;
        }

        if (group.ChkForoAdmin) {
            Foro += 2;
        }

        let UsuAltas: number = 0;
        let UsuModif: number = 0;
        let UsuBajas: number = 0;

        if (group.ChkUsuASP) {
            UsuAltas = 1;
        } else if (group.ChkUsuATodos) {
            UsuAltas = 2;
        }

        if (group.ChkUsuMSP) {
            UsuModif = 1;
        } else if (group.ChkUsuMTodos) {
            UsuModif = 2;
        }

        if (group.ChkUsuBSP) {
            UsuBajas = 1;
        } else if (group.ChkUsuBTodos) {
            UsuBajas = 2;
        }

        let ChkTiemposAtnSolic: number = 0;
        if (group.config_tatencionsolic) {
            ChkTiemposAtnSolic = 4;
        }

        let config_1: number = 0;

        if (group.config_tespera) {
            config_1 += 1;
        }

        if (group.config_intro) {
            config_1 += 2;
        }

        if (group.config_mensajesaviso) {
            config_1 += 4;
        }

        let config_2: number = 0;

        if (group.config_banner_gral) {
            config_2 += 1;
        }

        if (group.config_tescalacion) {
            config_2 += 2;
        }

        if (group.config_tatencionsolic) {
            config_2 += 4;
        }

        if (group.config_banner_CEDAC) {
            config_2 += 8;
        }

        if (group.config_banner_SII) {
            config_2 += 16;
        }

        let config_3: number = 0;

        if (group.config_vbitacora) {
            config_3 += 1;
        }

        if (group.config_contador) {
            config_3 += 2;
        }

        if (group.config_escautomatica) {
            config_3 += 4;
        }

        if (group.config_bienvenida) {
            config_3 += 8;
        }

        if (group.config_ligas_interes) {
            config_3 += 16;
        }

        const groups: any = {
            activo: true,
            admon: Admon,
            admon2: Admon2,
            baseCon: BaseCon,
            busqueda: Busqueda,
            chat: ChkChat,
            comentarios: group.comentarios,
            config1: config_1,
            config2: config_2,
            config3: config_3,
            coordTiemposAtn: ChkTiemposAtnSolic,
            cuentaP: ChkCuentaP,
            directorio: Directorio,
            encuestas: ChkEncuestas,
            fechaAlta: this.getFormattedDate(),
            foro: Foro,
            gradosUrgencia: ChkGradosUrgencia,
            horaFin1: null,
            horaFin2: null,
            horaIni1: null,
            horaIni2: null,
            horasEsc: 120,
            infoDoctal: InfoDoctal,
            intro: Intro,
            listaEmail: ChkEmail,
            nivel: -1,
            nombreG: group.NombreG,
            peso: null,
            recursos: ChkRec,
            repADMON: reportes_ADMON,
            repADMON2: reportes_ADMON_2,
            repADMON3: reportes_ADMON_3,
            repCOORD: reportes_COORD,
            repMONIT: reportes_MONIT,
            repSUPERV: reportes_SUPERV,
            reportes: ChkReportes,
            rpeAutAlta: group.RpeAutAlta,
            solic: Solic,
            solucionesParticulares: ChkSolucionesParticulares,
            sugerencias: ChkSugerencias,
            supervision: 0,
            suplencias: ChkSuplencias,
            uso: 1000,
            usuAltas: UsuAltas,
            usuBajas: UsuBajas,
            usuModif: UsuModif,
            videoConf: ChkVideoConf,
            vnc: ChkManipulacion,
        };

        return this.http.post<ResponseData<GroupInterface>>(this.url + route, groups);
    }

    modifyGroup(groupName: string, group: FormGroupInterface): Observable<ResponseData<GroupInterface>> {
        const route = `/groups/${groupName}`;

        let ChkConfIntro: number = 0;
        if (ChkConfIntro != 0) {
            ChkConfIntro = 2;
        }
        let ChkBorrBit: number = 0;
        if (ChkBorrBit != 0) {
            ChkBorrBit = 1;
        }

        let ChkTimer: number = 0;
        if (ChkTimer != 0) {
            ChkTimer = 4;
        }

        let ChkOtro: number = 0;
        if (ChkOtro != 0) {
            ChkOtro = 8;
        }

        let Intro = ChkConfIntro + ChkBorrBit + ChkTimer + ChkOtro;

        let ChkRegSolic: number = 0;
        if (group.ChkRegSolic) {
            ChkRegSolic = 1;
        }

        let ChkPend: number = 0;
        if (group.ChkPend) {
            ChkPend = 2;
        }

        let ChkMonSol: number = 0;
        if (ChkMonSol != 0) {
            ChkMonSol = 4;
        }

        let Solic = ChkRegSolic + ChkPend + ChkMonSol;

        let ChkBusquedaBas: number = 0;
        if (group.ChkBusquedaBas) {
            ChkBusquedaBas = 1;
        }
        let ChkBusquedaAvz: number = 0;
        if (group.ChkBusquedaAvz) {
            ChkBusquedaAvz = 2;
        }

        let Busqueda = ChkBusquedaBas + ChkBusquedaAvz;

        let ChkAdmonUsers: number = 0;
        if (ChkAdmonUsers != 0) {
            ChkAdmonUsers = 1;
        }

        let ChkAdmonGroups: number = 0;
        if (group.ChkAdmonGroups) {
            ChkAdmonGroups = 2;
        }

        let ChkAdmonBitacora: number = 0;
        if (group.ChkAdmonBitacora) {
            ChkAdmonBitacora = 4;
        }

        let ChkAdmonEstads: number = 0;
        if (group.ChkAdmonEstads) {
            ChkAdmonEstads = 8;
        }

        let ChkProbsSoluciones: number = 0;
        if (group.ChkProbsSoluciones) {
            ChkProbsSoluciones = 16;
        }

        let ChkDocumentos: number = 0;
        if (group.ChkDocumentos) {
            ChkDocumentos = 32;
        }

        let ChkMensajesError: number = 0;
        if (group.ChkMensajesError) {
            ChkMensajesError = 64;
        }

        let Admon = ChkAdmonUsers + ChkAdmonGroups + ChkAdmonBitacora + ChkAdmonEstads + ChkProbsSoluciones + ChkDocumentos + ChkMensajesError;

        let ChkModulos: number = 0;
        if (group.ChkModulos) {
            ChkModulos = 1;
        }

        let ChkTipoProbs: number = 0;
        if (group.ChkTipoProbs) {
            ChkTipoProbs = 2;
        }

        let ChkEliminarSolic: number = 0;
        if (group.ChkEliminarSolic) {
            ChkEliminarSolic = 4;
        }

        let ChkAgrpModulos: number = 0;
        if (group.ChkAgrpModulos) {
            ChkAgrpModulos = 8;
        }

        let Admon2 = ChkModulos + ChkTipoProbs + ChkEliminarSolic + ChkAgrpModulos;

        let ChkLectDir: number = 0;
        if (ChkLectDir != 0) {
            ChkLectDir = 1;
        }

        let Directorio = ChkLectDir;

        let ChkExpDoct: number = 0;
        if (ChkExpDoct != 0) {
            ChkExpDoct = 1;
        }

        let ChkInsertDoct: number = 0;
        if (ChkInsertDoct != 0) {
            ChkInsertDoct = 2;
        }

        let ChkRevDoct: number = 0;
        if (ChkRevDoct != 0) {
            ChkRevDoct = 4;
        }

        let ChkMotorDoct: number = 0;
        if (ChkMotorDoct != 0) {
            ChkMotorDoct = 8;
        }

        let InfoDoctal = ChkExpDoct + ChkInsertDoct + ChkRevDoct + ChkMotorDoct;

        let ChkChatCte: number = 0;
        if (group.ChkChatCte) {
            ChkChatCte = 1;
        }

        let ChkChatEjec: number = 0;
        if (group.ChkChatEjec) {
            ChkChatEjec = 2;
        }

        let ChkChat = ChkChatCte + ChkChatEjec;

        let ChkEmail1: number = 0;
        if (ChkEmail1 != 0) {
            ChkEmail1 = 1;
        }

        let ChkEmail3: number = 0;
        if (ChkEmail3 != 0) {
            ChkEmail3 = 2;
        }

        let ChkEmail = ChkEmail1 + ChkEmail3;

        let ChkManipulacion: number = 0;
        if (group.ChkManipulacion) {
            ChkManipulacion = 1;
        }

        let ChkVideoConf1: number = 0;
        if (ChkVideoConf1 != 0) {
            ChkVideoConf1 = 1;
        }

        let ChkVideoConf2: number = 0;
        if (ChkVideoConf2 != 0) {
            ChkVideoConf2 = 2;
        }

        let ChkVideoConf = ChkManipulacion + ChkVideoConf1 + ChkVideoConf2;

        let ChkRec1: number = 0;
        if (group.ChkRec1) {
            ChkRec1 = 1;
        }

        let ChkRec3: number = 0;
        if (group.ChkRec3) {
            ChkRec3 = 2;
        }

        let ChkRec = ChkRec1 + ChkRec3;

        let ChkSugerenciasVer: number = 0;
        if (group.ChkSugerenciasVer) {
            ChkSugerenciasVer = 1;
        }

        let ChkSugerenciasBorrar: number = 0;
        if (group.ChkSugerenciasBorrar) {
            ChkSugerenciasBorrar = 2;
        }

        let ChkSugerencias = ChkSugerenciasVer + ChkSugerenciasBorrar;

        let BaseCon: number = 0;

        if (group.ChkBaseCon) {
            BaseCon += 1;
        }

        if (group.ChkExpPS) {
            BaseCon += 2;
        }

        if (group.ChkExpDoc) {
            BaseCon += 4;
        }

        if (group.ChkBCMensajesError) {
            BaseCon += 8;
        }

        let ChkReportes: number = 0;
        let reportes_ADMON: number = 0;
        let reportes_ADMON_2: number = 0;
        let reportes_ADMON_3: number = 0;

        if (group.chkRep_Admon01) {
            reportes_ADMON += 1;
        }

        if (group.chkRep_Admon02) {
            reportes_ADMON += 2;
        }

        if (group.chkRep_Admon03) {
            reportes_ADMON += 4;
        }

        if (group.chkRep_Admon04) {
            reportes_ADMON += 8;
        }

        if (group.chkRep_2_Admon01) {
            reportes_ADMON_2 += 1;
        }

        if (group.chkRep_2_Admon02) {
            reportes_ADMON_2 += 2;
        }

        if (group.chkRep_2_Admon03) {
            reportes_ADMON_2 += 4;
        }

        if (group.chkRep_2_Admon04) {
            reportes_ADMON_2 += 8;
        }

        if (group.chkRep_2_Admon05) {
            reportes_ADMON_2 += 16;
        }

        if (group.chkRep_2_Admon06) {
            reportes_ADMON_2 += 32;
        }

        if (group.chkRep_2_Admon07) {
            reportes_ADMON_2 += 64;
        }

        if (group.chkRep_2_Admon08) {
            reportes_ADMON_2 += 128;
        }

        if (group.chkRep_3_Admon01) {
            reportes_ADMON_3 += 1;
        }

        if (group.chkRep_3_Admon02) {
            reportes_ADMON_3 += 2;
        }

        if (group.chkRep_3_Admon03) {
            reportes_ADMON_3 += 4;
        }

        if (group.chkRep_3_Admon04) {
            reportes_ADMON_3 += 8;
        }

        if (group.chkRep_3_Admon05) {
            reportes_ADMON_3 += 16;
        }

        if (group.chkRep_3_Admon06) {
            reportes_ADMON_3 += 32;
        }

        if (group.chkRep_3_Admon07) {
            reportes_ADMON_3 += 64;
        }

        if (group.chkRep_3_Admon08) {
            reportes_ADMON_3 += 128;
        }

        let reportes_COORD: number = 0;

        if (group.chkRep_Coord01) {
            reportes_COORD += 1;
        }

        if (group.chkRep_Coord02) {
            reportes_COORD += 2;
        }

        if (group.chkRep_Coord03) {
            reportes_COORD += 4;
        }

        let reportes_SUPERV: number = 0;

        if (group.chkRep_Superv01) {
            reportes_SUPERV += 1;
        }

        if (group.chkRep_Superv02) {
            reportes_SUPERV += 2;
        }

        if (group.chkRep_Superv03) {
            reportes_SUPERV += 4;
        }

        let reportes_MONIT: number = 0;

        if (group.chkRep_Monit01) {
            reportes_MONIT += 1;
        }

        if (group.chkRep_Monit02) {
            reportes_MONIT += 2;
        }

        if (reportes_ADMON + reportes_ADMON_2 + reportes_ADMON_3 + reportes_COORD + reportes_SUPERV + reportes_MONIT > 0) {
            ChkReportes = 1;
        }

        let ChkSuplencias: number = 0;
        if (group.ChkSuplencias) {
            ChkSuplencias = 1;
        }

        let ChkEncuestas: number = 0;
        if (group.ChkEncuestas) {
            ChkEncuestas = 1;
        }

        let ChkCuentaP: number = 0;
        if (group.ChkCuentaP) {
            ChkCuentaP = 1;
        }

        let ChkGradosUrgencia: number = 0;
        if (group.ChkGradosUrgencia) {
            ChkGradosUrgencia = 1;
        }

        let ChkSolucionesParticulares: number = 0;
        if (group.ChkSolucionesParticulares) {
            ChkSolucionesParticulares = 1;
        }

        let Foro: number = 0;

        if (group.ChkForoAcceso) {
            Foro += 1;
        }

        if (group.ChkForoAdmin) {
            Foro += 2;
        }

        let UsuAltas: number = 0;
        let UsuModif: number = 0;
        let UsuBajas: number = 0;

        if (group.ChkUsuASP) {
            UsuAltas = 1;
        } else if (group.ChkUsuATodos) {
            UsuAltas = 2;
        }

        if (group.ChkUsuMSP) {
            UsuModif = 1;
        } else if (group.ChkUsuMTodos) {
            UsuModif = 2;
        }

        if (group.ChkUsuBSP) {
            UsuBajas = 1;
        } else if (group.ChkUsuBTodos) {
            UsuBajas = 2;
        }

        let ChkTiemposAtnSolic: number = 0;
        if (group.config_tatencionsolic) {
            ChkTiemposAtnSolic = 4;
        }

        let config_1: number = 0;

        if (group.config_tespera) {
            config_1 += 1;
        }

        if (group.config_intro) {
            config_1 += 2;
        }

        if (group.config_mensajesaviso) {
            config_1 += 4;
        }

        let config_2: number = 0;

        if (group.config_banner_gral) {
            config_2 += 1;
        }

        if (group.config_tescalacion) {
            config_2 += 2;
        }

        if (group.config_tatencionsolic) {
            config_2 += 4;
        }

        if (group.config_banner_CEDAC) {
            config_2 += 8;
        }

        if (group.config_banner_SII) {
            config_2 += 16;
        }

        let config_3: number = 0;

        if (group.config_vbitacora) {
            config_3 += 1;
        }

        if (group.config_contador) {
            config_3 += 2;
        }

        if (group.config_escautomatica) {
            config_3 += 4;
        }

        if (group.config_bienvenida) {
            config_3 += 8;
        }

        if (group.config_ligas_interes) {
            config_3 += 16;
        }

        const groups: any = {
            activo: true,
            admon: Admon,
            admon2: Admon2,
            baseCon: BaseCon,
            busqueda: Busqueda,
            chat: ChkChat,
            comentarios: group.comentarios,
            config1: config_1,
            config2: config_2,
            config3: config_3,
            coordTiemposAtn: ChkTiemposAtnSolic,
            cuentaP: ChkCuentaP,
            directorio: Directorio,
            encuestas: ChkEncuestas,
            fechaAlta: this.getFormattedDate(),
            foro: Foro,
            gradosUrgencia: ChkGradosUrgencia,
            horaFin1: null,
            horaFin2: null,
            horaIni1: null,
            horaIni2: null,
            horasEsc: 120,
            infoDoctal: InfoDoctal,
            intro: Intro,
            listaEmail: ChkEmail,
            nivel: group.Nivel,
            nombreG: group.NombreG,
            peso: null,
            recursos: ChkRec,
            repADMON: reportes_ADMON,
            repADMON2: reportes_ADMON_2,
            repADMON3: reportes_ADMON_3,
            repCOORD: reportes_COORD,
            repMONIT: reportes_MONIT,
            repSUPERV: reportes_SUPERV,
            reportes: ChkReportes,
            rpeAutAlta: group.RpeAutAlta,
            solic: Solic,
            solucionesParticulares: ChkSolucionesParticulares,
            sugerencias: ChkSugerencias,
            supervision: 0,
            suplencias: ChkSuplencias,
            uso: 1000,
            usuAltas: UsuAltas,
            usuBajas: UsuBajas,
            usuModif: UsuModif,
            videoConf: ChkVideoConf,
            vnc: ChkManipulacion,
        };

        return this.http.put<ResponseData<GroupInterface>>(this.url + route, groups);
    }

    getFormattedDate(): string {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
