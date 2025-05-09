import { Component } from '@angular/core';
import { toggleAnimation } from '../shared/animations';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type LoginForm = {
    username: FormControl<string>;
    password: FormControl<string>;
};

@Component({
    templateUrl: './login.html',
    animations: [toggleAnimation],
})
export class LoginComponent {
    currYear: number = new Date().getFullYear();

    constructor(
        public router: Router,
        private auth: AuthService,
        private fb: FormBuilder,
    ) {}

    authForm: FormGroup<LoginForm> = this.fb.group({
        username: this.fb.control<string>('', { nonNullable: true }),
        password: this.fb.control<string>('', { nonNullable: true }),
    });

    submit() {
        const { username, password } = this.authForm.value;

        if (!username || !password) {
            alert('Both username and password are required.');
            return;
        }

        this.auth.login({ username, password }).subscribe({
            next: () => (location.href = '/'),
            error: (err) => alert('Login fallido'),
        });
    }
}
