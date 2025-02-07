import { Component } from '@angular/core';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
  selector: 'app-solution-answer',
  templateUrl: './solution-answer.component.html',
  styleUrl: './solution-answer.component.css'
})
export class SolutionAnswerComponent {
    breadcrumbs: BreadcrumbsInterface[] = [{ name: 'ADMINISTRACIÓN DE SOLUCIONES PERMANENTES - RESPUESTAS PREDEFINIDAS', link: '/administracion/soluciones-respuestas' }];
}
