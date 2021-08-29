import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public cardForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageLink: ['', [Validators.required]],
      videoLink: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.router.navigate(['search']);
  }
}
