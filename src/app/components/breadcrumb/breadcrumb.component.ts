import { Component, Input } from '@angular/core';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
    @Input() breadcrumbs!: BreadcrumbsInterface[];
}
