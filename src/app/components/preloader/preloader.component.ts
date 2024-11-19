import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-preloader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './preloader.component.html',
    styleUrl: './preloader.component.css',
})
export class PreloaderComponent {
    isLoading: boolean = true;
    letters: { image: string; class: string }[] = [
        {
            image: '../../../assets/images/letters/cedac-c.svg',
            class: 'letter w-10',
        },
        {
            image: '../../../assets/images/letters/cedac-e.svg',
            class: 'letter w-10',
        },
        {
            image: '../../../assets/images/letters/cedac-d.svg',
            class: 'letter w-11',
        },
        {
            image: '../../../assets/images/letters/cedac-a.svg',
            class: 'letter w-11',
        },
        {
            image: '../../../assets/images/letters/cedac-c.svg',
            class: 'letter w-10',
        },
    ];
    currentIndex = -1; // Controla cuál letra está activa
    animationDuration = 400; // Duración de animación por letra (ms)
    resetDelay = 400; // Espera antes de reiniciar la animación (ms)

    ngOnInit() {
        this.startAnimationSequence();
    }

    startAnimationSequence() {
        this.animateLetter(0); // Inicia desde la primera letra
    }

    animateLetter(index: number) {
        if (index < this.letters.length) {
            this.currentIndex = index; // Activa la letra actual
            setTimeout(() => {
                this.animateLetter(index + 1); // Pasa a la siguiente letra
            }, this.animationDuration); // Espera hasta que la animación de esta letra termine
        } else {
            // Cuando todas las letras hayan caído, espera y reinicia
            setTimeout(() => {
                this.currentIndex = -1; // Resetea para ocultar las letras
                setTimeout(() => {
                    this.startAnimationSequence(); // Reinicia desde la primera letra
                }, this.resetDelay); // Tiempo antes de reiniciar la animación
            }, this.animationDuration); // Espera la duración de la animación antes de reiniciar
        }
    }

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }
}
