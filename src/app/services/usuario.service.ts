import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlUsuario = 'http://localhost:3000/usuario';
  urlPublicacion = 'http://localhost:3000/publicacion';
  urlAmistad = 'http://localhost:3000/amistad';
  token = '';

  constructor(private http:HttpClient) { }

  //USUARIOS
  getUsuarios(token): Observable<any>{
    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    return this.http.get<any>(this.urlUsuario + '/list',{'headers': headers});
  }

  loginUsuario(email, pass): Observable<any>{
    let parametros = { email: email, pass: pass };
    //console.log(parametros);    
    const headers = {
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlUsuario + '/login', body, {'headers': headers});
  }  

  getUsuarioById(idUsuario, token): Observable<any>{
    let parametros = { id: idUsuario };
    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlUsuario + '/search/id', body, {'headers': headers});
  }

  //PUBLICACIONES
  getPosts(idUsuario, token): Observable<any>{
    let parametros = { idUsuario: idUsuario };
    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlPublicacion + '/search', body, {'headers': headers});
  }

  createPost(idUsuario, idUsuarioP, contenido, fecha, token ): Observable<any>{
    let parametros = { idUsuario: idUsuario, idUsuarioP: idUsuarioP, contenido: contenido,
      fecha: fecha  };

    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlPublicacion + '/create', body, {'headers': headers});
  }

  deletePost(id, token): Observable<any>{
    let parametros = { id: id };

    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlPublicacion + '/delete', body, {'headers': headers});
  }

  //Amistades
  getFriendships(idUsuario, token): Observable<any>{
    let parametros = { idUsuario: idUsuario };
    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlAmistad + '/search', body, {'headers': headers});
  }

  updateFriendship(id, estatus, token): Observable<any>{
    let parametros = { id: id, estatus: estatus };
    const headers = {
      'Authorization': "Bearer "+token, 
      "Accept": "application/json, text/plain, */*",         
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(parametros);
    return this.http.post(this.urlAmistad + '/update', body, {'headers': headers});
  }

}
