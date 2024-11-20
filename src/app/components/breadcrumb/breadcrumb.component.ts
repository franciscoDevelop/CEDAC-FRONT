import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
    @Input() breadcrumbs!: BreadcrumbsInterface[];
}
