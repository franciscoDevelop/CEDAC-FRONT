import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
    selector: 'app-dual-list',
    standalone: true,
    imports: [CommonModule, FormsModule, FilterPipe],
    templateUrl: './dual-list.component.html',
    styleUrl: './dual-list.component.css',
})
export class DualListComponent {
    @Input() placeHolderSearch!: string;
    @Input() listLabelOne!: string;
    @Input() listLabelTwo!: string;
    @Input() availableItems: any[] = [];
    @Input() selectedItems: any[] = [];

    @Output() selectedItemsChange = new EventEmitter<any[]>();

    filterText: string = '';
    filterSelectedText: string = '';
    selectedForTransfer: Set<any> = new Set(); // Usar un Set para la selección múltiple de Item

    onKeyDown(event: KeyboardEvent, item: any): void {
        if (event.key === 'Enter') {
            this.selectItem(item);
        }
    }

    selectItem(item: any) {
        if (this.selectedForTransfer.has(item)) {
            this.selectedForTransfer.delete(item); // Deseleccionar si ya estaba seleccionado
        } else {
            this.selectedForTransfer.add(item); // Seleccionar item
        }
    }

    deselectAll() {
        this.selectedForTransfer.clear(); // Limpiar selección
    }

    addItem() {
        // Mover elementos seleccionados de availableItems a selectedItems
        this.selectedForTransfer.forEach((item) => {
            if (!this.selectedItems.some((i) => i.value === item.value)) {
                this.selectedItems.push(item);
            }
        });
        // Filtrar los elementos transferidos de availableItems
        this.availableItems = this.availableItems.filter((item) => !this.selectedForTransfer.has(item));
        this.deselectAll(); // Limpiar selección después de agregar
        this.emitSelectedItems();
    }

    addAllItems() {
        // Mover todos los elementos de availableItems a selectedItems
        this.availableItems.forEach((item) => {
            if (!this.selectedItems.some((i) => i.value === item.value)) {
                this.selectedItems.push(item);
            }
        });
        this.availableItems = [];
        this.emitSelectedItems();
    }

    removeItem() {
        // Mover elementos seleccionados de selectedItems a availableItems
        this.selectedForTransfer.forEach((item) => {
            this.availableItems.push(item);
        });
        this.selectedItems = this.selectedItems.filter((item) => !this.selectedForTransfer.has(item));
        this.deselectAll(); // Limpiar selección después de remover
        this.emitSelectedItems();
    }

    removeAllItems() {
        // Mover todos los elementos de selectedItems a availableItems
        this.availableItems = [...this.availableItems, ...this.selectedItems];
        this.selectedItems = [];
        this.emitSelectedItems();
    }

    private emitSelectedItems() {
        this.selectedItemsChange.emit(this.selectedItems);
    }
}
