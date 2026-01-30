import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-freelancer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './freelancer.html',
  styleUrl: './freelancer.scss',
})
export class Freelancer {

}
