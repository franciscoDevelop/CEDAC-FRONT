import { Pipe, PipeTransform } from '@angular/core';

interface Item {
    value: string | number;
    label: string;
}

@Pipe({
    name: 'filter',
    standalone: true,
})
export class FilterPipe implements PipeTransform {
    transform(items: Item[], searchText: string): Item[] {
        if (!items || !searchText) {
            return items;
        }
        return items.filter((item) => item.label.toLowerCase().includes(searchText.toLowerCase()));
    }
}
