import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('UsuarioRed');
    if (!usuario) {
      this.router.navigate(['/login']);
      console.log("Logeate primero");
    }else{
      console.log("Estas logeado");           
    }
  }

}
