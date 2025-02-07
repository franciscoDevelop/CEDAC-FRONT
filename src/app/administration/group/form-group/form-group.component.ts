import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/service/group.service';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { FormGroupInterface } from 'src/interface/group-interface';

@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrl: './form-group.component.css',
})
export class FormGroupComponent implements OnInit {
    breadcrumbs!: BreadcrumbsInterface[];
    groupName: string = '';
    form!: FormGroup;
    checkboxGroups = [
        {
            title: 'SOLICITUDES',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkRegSolic', label: 'Registro de solicitudes' },
                        { controlName: 'ChkPend', label: 'Atención Pendientes' },
                    ],
                },
            ],
        },
        {
            title: 'BÚSQUEDA DE SOLICITUDES',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkBusquedaBas', label: 'Básica' },
                        { controlName: 'ChkBusquedaAvz', label: 'Avanzada (filtros)' },
                    ],
                },
            ],
        },
        {
            title: 'USUARIOS',
            checkboxes: [
                {
                    title: 'Altas de Usuarios',
                    checkboxes: [
                        { controlName: 'ChkUsuASP', label: 'Permitir solo mismo perfil del Experto', onChange: (checked: boolean) => this.onUserUp(checked) },
                        { controlName: 'ChkUsuATodos', label: 'Permitir Todos', onChange: (checked: boolean) => this.onUserUpAll(checked) },
                    ],
                },
                {
                    title: 'Modificaciones de Usuarios',
                    checkboxes: [
                        { controlName: 'ChkUsuMSP', label: 'Permitir solo mismo perfil del Experto', onChange: (checked: boolean) => this.onUserMod(checked) },
                        { controlName: 'ChkUsuMTodos', label: 'Permitir Todos', onChange: (checked: boolean) => this.onUserModAll(checked) },
                    ],
                },
                {
                    title: 'Bajas de Usuarios',
                    checkboxes: [
                        { controlName: 'ChkUsuBSP', label: 'Permitir solo mismo perfil del Experto', onChange: (checked: boolean) => this.onUserDel(checked) },
                        { controlName: 'ChkUsuBTodos', label: 'Permitir Todos', onChange: (checked: boolean) => this.onUserDelAll(checked) },
                    ],
                },
            ],
        },
        {
            title: 'ADMINISTRACIÓN DEL SISTEMA',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkAdmonBitacora', label: 'Bitácora' },
                        { controlName: 'ChkAdmonGroups', label: 'Grupos' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkProbsSoluciones', label: 'Problemas - Soluciones' },
                        { controlName: 'ChkAdmonEstads', label: 'Estadísticas' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkMensajesError', label: 'Mensajes de error' },
                        { controlName: 'ChkDocumentos', label: 'Documentos' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkTipoProbs', label: 'Servicios' },
                        { controlName: 'ChkModulos', label: 'Módulos' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkSuplencias', label: 'Suplencias' },
                        { controlName: 'ChkEliminarSolic', label: 'Cancelar solicitudes' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkGradosUrgencia', label: 'Grados de Urgencia' },
                        { controlName: 'ChkEncuestas', label: 'Encuestas de Evaluación de Servicio' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkSolucionesParticulares', label: 'Control y monit. de Soluciones Particulares' },
                        { controlName: 'ChkAgrpModulos', label: 'Agrupación de Módulos' },
                    ],
                },
                {
                    title: 'REPORTES - Administración',
                    checkboxes: [
                        { controlName: 'chkRep_Admon01', label: 'Expertos con total de solicitudes' },
                        { controlName: 'chkRep_Admon02', label: 'Atención de Expertos por módulo' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_Admon03', label: 'Asignación de expertos por nivel y centro beneficio' },
                        { controlName: 'chkRep_Admon04', label: 'Total de expertos por centro beneficio' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_2_Admon01', label: 'Expertos con más/menos solicitudes' },
                        { controlName: 'chkRep_2_Admon02', label: 'Solicitudes por status' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_2_Admon03', label: 'Solicitudes por nivel y módulo' },
                        { controlName: 'chkRep_2_Admon04', label: 'Solicitudes autoconfirmadas' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_2_Admon05', label: 'Flujo de Solicitudes' },
                        { controlName: 'chkRep_2_Admon06', label: 'Tiempos de Solicitudes' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_3_Admon01', label: 'Usuarios externos registrados' },
                        { controlName: 'chkRep_3_Admon02', label: 'Experto por nivel y área' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_3_Admon03', label: 'Solicitudes fuera de ámbito por nivel y módulo' },
                        { controlName: 'chkRep_3_Admon04', label: 'Catálogo Usuarios' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_3_Admon05', label: 'Indicadores de solicitudes w/ Detalle' },
                        { controlName: 'chkRep_3_Admon06', label: 'Reporte Solicitudes x Usuario' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'chkRep_3_Admon07', label: 'Resultados Encuesta' },
                        { controlName: 'chkRep_2_Admon07', label: 'Reporte Clasificación Solicitudes' },
                    ],
                },
                {
                    title: 'REPORTES - Coordinación',
                    checkboxes: [
                        { controlName: 'chkRep_Coord01', label: 'Solicitudes sin atención' },
                        { controlName: 'chkRep_Coord02', label: 'Solicitudes en autorización' },
                    ],
                },
                {
                    checkboxes: [{ controlName: 'chkRep_Coord03', label: 'Solicitudes con tiempo excedido' }],
                },
                {
                    title: 'REPORTES - Supervisión',
                    checkboxes: [
                        { controlName: 'chkRep_Superv01', label: 'Solicitudes sin atención' },
                        { controlName: 'chkRep_Superv02', label: 'Solicitudes en autorización' },
                    ],
                },
                {
                    checkboxes: [{ controlName: 'chkRep_Superv03', label: 'Solicitudes con tiempo excedido' }],
                },
                {
                    title: 'REPORTES - Monitoreo',
                    checkboxes: [
                        { controlName: 'chkRep_Monit01', label: 'Accesos al sitio CEDAC' },
                        { controlName: 'chkRep_Monit02', label: 'Comité' },
                    ],
                },
                {
                    title: 'REPORTES - Listados Rápidos',
                    checkboxes: [{ controlName: 'chkRep_2_Admon08', label: 'Coordinadores SAP' }],
                },
                {
                    title: 'REPORTES - CEDAC desde otras plataformas',
                    checkboxes: [{ controlName: 'chkRep_3_Admon08', label: 'Reportes CEDAC en WEBFOCUS' }],
                },
            ],
        },
        {
            title: 'ADMINISTRACIÓN DEL CONOCIMIENTO',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkBaseCon', label: 'Base de Conocimiento' },
                        { controlName: 'ChkExpPS', label: 'Explorador de Problemas-Solución' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'ChkExpDoc', label: 'Explorador de Documentos' },
                        { controlName: 'ChkBCMensajesError', label: 'Mensajes de Error' },
                    ],
                },
            ],
        },
        {
            title: 'CHAT Y VIDEO',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkChatCte', label: 'Cliente' },
                        { controlName: 'ChkChatEjec', label: 'Experto' },
                    ],
                },
            ],
        },
        {
            title: 'CONTROL REMOTO',
            checkboxes: [
                {
                    checkboxes: [{ controlName: 'ChkManipulacion', label: 'Acceso a Control Remoto' }],
                },
            ],
        },
        {
            title: 'RECURSOS',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkRec1', label: 'Bajar Archivos' },
                        { controlName: 'ChkRec3', label: 'Subir Archivos' },
                    ],
                },
            ],
        },
        {
            title: 'CONFIGURACIÓN',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'config_tespera', label: 'Tiempo espera de Confirmación de solic.' },
                        { controlName: 'config_intro', label: 'Cambios en Página Inicio' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'config_mensajesaviso', label: 'Mensajes de Aviso' },
                        { controlName: 'config_banner_gral', label: 'Banner de Noticias' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'config_banner_CEDAC', label: 'Banner Noticias CEDAC' },
                        { controlName: 'config_banner_SII', label: 'Banner Noticias SII (SAP)' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'config_tescalacion', label: 'Tiempos de escalación de niveles' },
                        { controlName: 'config_tatencionsolic', label: 'Tiempos de atención de solicitudes' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'config_vbitacora', label: 'Vaciado de Bitácora' },
                        { controlName: 'config_contador', label: 'Contador de visitas' },
                    ],
                },
                {
                    checkboxes: [
                        { controlName: 'config_escautomatica', label: 'Escalación Automática' },
                        { controlName: 'config_bienvenida', label: 'Correo automótico de Bienvenida' },
                    ],
                },
                {
                    checkboxes: [{ controlName: 'config_ligas_interes', label: 'Administración de ligas de interés' }],
                },
            ],
        },
        {
            title: 'BUZÓN DE SUGERENCIAS',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkSugerenciasVer', label: 'Ver sugerencias', onChange: (checked: boolean) => this.onCheckboxChange(checked) },
                        { controlName: 'ChkSugerenciasBorrar', label: 'Borrado de sugerencias' },
                    ],
                },
            ],
        },
        {
            title: 'MI CUENTA',
            checkboxes: [
                {
                    checkboxes: [{ controlName: 'ChkCuentaP', label: 'Cambio de Password' }],
                },
            ],
        },
        {
            title: 'FORO DE DISCUSIÓN',
            checkboxes: [
                {
                    checkboxes: [
                        { controlName: 'ChkForoAcceso', label: 'Acceder al Foro de Discusión', onChange: (checked: boolean) => this.onAccessForo(checked) },
                        { controlName: 'ChkForoAdmin', label: 'Administrar Foro de Discusión', onChange: (checked: boolean) => this.onAdminForo(checked) },
                    ],
                },
            ],
        },
    ];
    buttonTitle: string = 'Crear Grupo';
    editMode: boolean = false;
    group!: string;

    constructor(
        private readonly groupService: GroupService,
        private readonly route: ActivatedRoute,
        private readonly fb: FormBuilder,
        private readonly router: Router,
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.breadcrumbs = [
                    { name: 'ADMINISTRACIÓN DE GRUPOS', link: '/administracion/grupos' },
                    { name: 'GRUPOS | MODIFICACIONES', link: '/administracion/grupos' },
                ];
                this.group = params['id'];
                this.editMode = true;
                this.groupName = `REALICE LOS AJUSTES A LOS DATOS DEL GRUPO ${params['id']}`;
                this.buttonTitle = 'Modificar Grupo';
                this.loadGroup(params['id']);
            } else {
                this.breadcrumbs = [
                    { name: 'ADMINISTRACIÓN DE GRUPOS', link: '/administracion/grupos' },
                    { name: 'GRUPOS | ALTAS', link: '/administracion/grupos' },
                ];
                this.groupName = 'INGRESE LOS DATOS PARA CREAR EL GRUPO';
            }
        });
    }

    initForm(): void {
        this.form = this.fb.group({
            RpeAutAlta: ['2B366'],
            Nivel: [''],
            NombreG: [''],
            ChkRegSolic: [null],
            ChkPend: [null],
            ChkBusquedaBas: [null],
            ChkBusquedaAvz: [null],
            ChkUsuASP: [null],
            ChkUsuATodos: [null],
            ChkUsuMSP: [null],
            ChkUsuMTodos: [null],
            ChkUsuBSP: [null],
            ChkUsuBTodos: [null],
            ChkAdmonBitacora: [null],
            ChkAdmonGroups: [null],
            ChkProbsSoluciones: [null],
            ChkAdmonEstads: [null],
            ChkMensajesError: [null],
            ChkDocumentos: [null],
            ChkTipoProbs: [null],
            ChkModulos: [null],
            ChkSuplencias: [null],
            ChkEliminarSolic: [null],
            ChkGradosUrgencia: [null],
            ChkEncuestas: [null],
            ChkSolucionesParticulares: [null],
            ChkAgrpModulos: [null],
            chkRep_Admon01: [null],
            chkRep_Admon02: [null],
            chkRep_Admon03: [null],
            chkRep_Admon04: [null],
            chkRep_2_Admon01: [null],
            chkRep_2_Admon02: [null],
            chkRep_2_Admon03: [null],
            chkRep_2_Admon04: [null],
            chkRep_2_Admon05: [null],
            chkRep_2_Admon06: [null],
            chkRep_3_Admon01: [null],
            chkRep_3_Admon02: [null],
            chkRep_3_Admon03: [null],
            chkRep_3_Admon04: [null],
            chkRep_3_Admon05: [null],
            chkRep_3_Admon06: [null],
            chkRep_3_Admon07: [null],
            chkRep_2_Admon07: [null],
            chkRep_Coord01: [null],
            chkRep_Coord02: [null],
            chkRep_Coord03: [null],
            chkRep_Superv01: [null],
            chkRep_Superv02: [null],
            chkRep_Superv03: [null],
            chkRep_Monit01: [null],
            chkRep_Monit02: [null],
            chkRep_2_Admon08: [null],
            chkRep_3_Admon08: [null],
            ChkBaseCon: [null],
            ChkExpPS: [null],
            ChkExpDoc: [null],
            ChkBCMensajesError: [null],
            ChkChatCte: [null],
            ChkChatEjec: [null],
            ChkManipulacion: [null],
            ChkRec1: [null],
            ChkRec3: [null],
            config_tespera: [null],
            config_intro: [null],
            config_mensajesaviso: [null],
            config_banner_gral: [null],
            config_banner_CEDAC: [null],
            config_banner_SII: [null],
            config_tescalacion: [null],
            config_tatencionsolic: [null],
            config_vbitacora: [null],
            config_contador: [null],
            config_escautomatica: [null],
            config_bienvenida: [null],
            config_ligas_interes: [null],
            ChkSugerenciasVer: [null],
            ChkSugerenciasBorrar: [null],
            ChkCuentaP: [null],
            ChkForoAcceso: [null],
            ChkForoAdmin: [null],
            comentarios: [''],
        });
    }

    loadGroup(group: string) {
        this.groupService.getGroupByName(group).subscribe((response) => {
            this.form.patchValue({
                Nivel: response.data.nivel,
                NombreG: response.data.nombreG,
                ChkRegSolic: [1, 3, 5, 7].includes(response.data.solic),
                ChkPend: [2, 3, 6, 7].includes(response.data.solic),
                ChkBusquedaBas: [1, 3].includes(response.data.busqueda),
                ChkBusquedaAvz: response.data.busqueda >= 2,
                ChkUsuASP: response.data.usuAltas === 1,
                ChkUsuATodos: response.data.usuAltas === 2,
                ChkUsuMSP: response.data.usuModif === 1,
                ChkUsuMTodos: response.data.usuModif === 2,
                ChkUsuBSP: response.data.usuBajas === 1,
                ChkUsuBTodos: response.data.usuBajas === 2,
                ChkAdmonBitacora: [
                    4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63, 68, 69, 70, 71,
                    76, 77, 78, 79, 84, 85, 86, 87, 92, 93, 94, 95, 100, 101, 102, 103, 108, 109, 110, 111, 116, 117, 118, 119, 124, 125, 126, 127,
                ].includes(response.data.admon),
                ChkAdmonGroups: [
                    2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63, 66, 67, 70, 71,
                    74, 75, 78, 79, 82, 83, 86, 87, 90, 91, 94, 95, 98, 99, 102, 103, 106, 107, 110, 111, 114, 115, 118, 119, 122, 123, 126, 127,
                ].includes(response.data.admon),
                ChkProbsSoluciones: [
                    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 80, 81, 82,
                    83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
                ].includes(response.data.admon),
                ChkAdmonEstads: [
                    8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63, 72, 73, 74,
                    75, 76, 77, 78, 79, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 120, 121, 122, 123, 124, 125, 126, 127,
                ].includes(response.data.admon),
                ChkMensajesError: response.data.admon >= 64,
                ChkDocumentos: (response.data.admon >= 32 && response.data.admon <= 63) || response.data.admon >= 96,
                ChkTipoProbs: (response.data.admon2 & 2) !== 0,
                ChkModulos: (response.data.admon2 & 1) !== 0,
                ChkSuplencias: response.data.suplencias === 1,
                ChkEliminarSolic: (response.data.admon2 & 4) !== 0,
                ChkGradosUrgencia: response.data.gradosUrgencia === 1,
                ChkEncuestas: response.data.encuestas === 1,
                ChkSolucionesParticulares: response.data.solucionesParticulares === 1,
                ChkAgrpModulos: (response.data.admon2 & 8) !== 0,
                chkRep_Admon01: (response.data.repADMON & 1) !== 0,
                chkRep_Admon02: (response.data.repADMON & 2) !== 0,
                chkRep_Admon03: (response.data.repADMON & 4) !== 0,
                chkRep_Admon04: (response.data.repADMON & 8) !== 0,
                chkRep_2_Admon01: (response.data.repADMON2 & 1) !== 0,
                chkRep_2_Admon02: (response.data.repADMON2 & 2) !== 0,
                chkRep_2_Admon03: (response.data.repADMON2 & 4) !== 0,
                chkRep_2_Admon04: (response.data.repADMON2 & 8) !== 0,
                chkRep_2_Admon05: (response.data.repADMON2 & 16) !== 0,
                chkRep_2_Admon06: (response.data.repADMON2 & 32) !== 0,
                chkRep_3_Admon01: (response.data.repADMON3 & 1) !== 0,
                chkRep_3_Admon02: (response.data.repADMON3 & 2) !== 0,
                chkRep_3_Admon03: (response.data.repADMON3 & 4) !== 0,
                chkRep_3_Admon04: (response.data.repADMON3 & 8) !== 0,
                chkRep_3_Admon05: (response.data.repADMON3 & 16) !== 0,
                chkRep_3_Admon06: (response.data.repADMON3 & 32) !== 0,
                chkRep_3_Admon07: (response.data.repADMON3 & 64) !== 0,
                chkRep_2_Admon07: (response.data.repADMON2 & 64) !== 0,
                chkRep_Coord01: [1, 3, 5, 7, 9, 11, 13, 15].includes(response.data.repCOORD),
                chkRep_Coord02: [2, 3, 6, 7, 10, 11, 14, 15].includes(response.data.repCOORD),
                chkRep_Coord03: [4, 5, 6, 7, 12, 13, 14, 15].includes(response.data.repCOORD),
                chkRep_Superv01: [1, 3, 5, 7].includes(response.data.repSUPERV),
                chkRep_Superv02: [2, 3, 6, 7].includes(response.data.repSUPERV),
                chkRep_Superv03: [4, 5, 6, 7].includes(response.data.repSUPERV),
                chkRep_Monit01: [1, 3].includes(response.data.repMONIT),
                chkRep_Monit02: [2, 3].includes(response.data.repMONIT),
                chkRep_2_Admon08: (response.data.repADMON2 & 128) !== 0,
                chkRep_3_Admon08: (response.data.repADMON3 & 128) !== 0,
                ChkBaseCon: [1, 3, 5, 7, 9, 11, 13, 15].includes(response.data.baseCon),
                ChkExpPS: [2, 3, 6, 7, 10, 11, 14, 15].includes(response.data.baseCon),
                ChkExpDoc: [4, 5, 6, 7, 12, 13, 14, 15].includes(response.data.baseCon),
                ChkBCMensajesError: [8, 9, 10, 11, 12, 13, 14, 15].includes(response.data.baseCon),
                ChkChatCte: [1, 3].includes(response.data.chat),
                ChkChatEjec: response.data.chat >= 2,
                ChkManipulacion: response.data.vnc === 1,
                ChkRec1: [1, 3].includes(response.data.recursos),
                ChkRec3: response.data.recursos >= 2,
                config_tespera: [1, 3, 5, 7].includes(response.data.config1),
                config_intro: [2, 3, 6, 7].includes(response.data.config1),
                config_mensajesaviso: [4, 5, 6, 7].includes(response.data.config1),
                config_banner_gral: (response.data.config2 & 1) !== 0,
                config_banner_CEDAC: (response.data.config2 & 8) !== 0,
                config_banner_SII: (response.data.config2 & 16) !== 0,
                config_tescalacion: [2, 3, 6, 7].includes(response.data.config2),
                config_tatencionsolic: [4, 5, 6, 7].includes(response.data.config2),
                config_vbitacora: [1, 3, 5, 7, 9, 11, 13, 15].includes(response.data.config3),
                config_contador: [2, 3, 6, 7, 10, 11, 14, 15].includes(response.data.config3),
                config_escautomatica: [4, 5, 6, 7, 12, 13, 14, 15].includes(response.data.config3),
                config_bienvenida: [8, 9, 10, 11, 12, 13, 14, 15].includes(response.data.config3),
                config_ligas_interes: (response.data.config3 & 16) !== 0,
                ChkSugerenciasVer: [1, 3].includes(response.data.sugerencias),
                ChkSugerenciasBorrar: [2, 3].includes(response.data.sugerencias),
                ChkCuentaP: response.data.cuentaP === 1,
                ChkForoAcceso: [1, 3].includes(response.data.foro),
                ChkForoAdmin: [2, 3].includes(response.data.foro),
                comentarios: response.data.comentarios,
            });
        });
    }

    onUserUp(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuATodos: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onUserUpAll(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuASP: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onUserMod(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuMTodos: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onUserModAll(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuMSP: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onUserDel(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuBTodos: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onUserDelAll(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkUsuBSP: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onCheckboxChange(checked: boolean): void {
        if (!checked) {
            this.form.patchValue({
                ChkSugerenciasBorrar: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onAccessForo(checked: boolean): void {
        if (!checked) {
            this.form.patchValue({
                ChkForoAdmin: false, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onAdminForo(checked: boolean): void {
        if (checked) {
            this.form.patchValue({
                ChkForoAcceso: true, // Esto ahora funciona porque 'this.form' es accesible
            });
        }
    }

    onCancel() {
        this.router.navigate(['/administracion/grupos']);
    }

    onSubmit() {
        const formValues: FormGroupInterface = this.form.value;

        if (this.group) {
            this.groupService.modifyGroup(this.group, formValues).subscribe((response) => {
                this.router.navigate(['/administracion/grupos']);
            });
        } else {
            this.groupService.createGroup(formValues).subscribe((response) => {
                this.router.navigate(['/administracion/grupos']);
            });
        }
    }
}
