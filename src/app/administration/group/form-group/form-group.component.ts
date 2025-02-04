import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { GroupService } from 'src/app/service/group.service';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrl: './form-group.component.css',
})
export class FormGroupComponent implements OnInit {
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE GRUPOS', link: '/administracion/grupos' },
        { name: 'GRUPOS | MODIFICACIONES', link: '/administracion/grupos' },
    ];
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
                        { controlName: 'ChkUsuASP', label: 'Permitir solo mismo perfil del Experto' },
                        { controlName: 'ChkUsuATodos', label: 'Permitir Todos' },
                    ],
                },
                {
                    title: 'Modificaciones de Usuarios',
                    checkboxes: [
                        { controlName: 'ChkUsuMSP', label: 'Permitir solo mismo perfil del Experto' },
                        { controlName: 'ChkUsuMTodos', label: 'Permitir Todos' },
                    ],
                },
                {
                    title: 'Bajas de Usuarios',
                    checkboxes: [
                        { controlName: 'ChkUsuBSP', label: 'Permitir solo mismo perfil del Experto' },
                        { controlName: 'ChkUsuBTodos', label: 'Permitir Todos' },
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
            ],
        },
    ];

    constructor(
        private readonly groupService: GroupService,
        private readonly route: ActivatedRoute,
        private readonly fb: FormBuilder,
    ) {
        this.form = this.fb.group({
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
            justification: [''],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.groupName = params['id'];
                this.loadGroup(params['id']);
            }
        });
    }

    loadGroup(group: string) {
        this.groupService.getGroupByName(group).subscribe((response) => {
            this.form.patchValue({
                ChkRegSolic: [1, 3, 5, 7].includes(response.data.solic),
                ChkPend: [2, 3, 6, 7].includes(response.data.solic),
                ChkBusquedaBas: [1, 3].includes(response.data.busqueda),
                ChkBusquedaAvz: response.data.busqueda >= 2,
                ChkUsuASP: response.data.usuAltas === 1,
                ChkUsuATodos: response.data.usuAltas === 2,
                UsuModif: response.data.usuModif === 1,
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
                ChkTipoProbs: response.data.admon2 & 2,
                ChkModulos: response.data.admon2 & 1,
                ChkSuplencias: response.data.suplencias === 1,
                ChkEliminarSolic: response.data.admon2 & 4,
                ChkGradosUrgencia: response.data.gradosUrgencia === 1,
                ChkEncuestas: response.data.encuestas === 1,
                ChkSolucionesParticulares: response.data.solucionesParticulares === 1,
                ChkAgrpModulos: response.data.admon2 & 8,
            });
        });
    }

    submitForm() {
        const formValues = this.form.value; // Obtener todos los valores del formulario
        console.log('Valores del formulario:', formValues); // Ver todos los valores

        // Crear un array para almacenar los valores seleccionados
        const selectedValues: number[] = [];

        // Recorremos las entradas del formulario
        for (const [key, value] of Object.entries(formValues)) {
            //   if (value === true) { // Si el checkbox está seleccionado
            //     const checkbox = this.checkboxGroups.find(cb => cb.checkboxes.controlName === key); // Encuentra el checkbox en el array original
            //     if (checkbox) {
            //       selectedValues.push(checkbox.value); // Agrega el valor asociado a la lista
            //     }
            //   }
        }

        console.log('Valores de checkboxes seleccionados:', selectedValues); // Mostrar los valores seleccionados
    }
}
