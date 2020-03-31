import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utilisateur } from '../../MODELS/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public userConnected: Utilisateur;

  constructor(private storage: Storage) {
    this.setUserConnected();
  }

  /**
   * sauvegarder les données dans la memoire du téléphone
   */
  async set(key: string, value: any): Promise < any > {
    try {
      const result = await this.storage.set(key, value);
      console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  /**
   * recupere une valeur de la local storage via la clé
   * @param key:: string
   */
  async get(key: string): Promise < any > {
    try {
      const result = await this.storage.get(key);
      console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  /**
   * 
   * @param key:: string 
   * @param object:: Object
   */
  async setObject(key: string, object: Object) {
    try {
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log('set Object in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  /**
   * 
   * @param key :: string
   */
  async getObject(key: string): Promise < any > {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  /**
   * Supprimer une valeur de lespace de stocage local 
   * @param key 
   */
  remove(key: string) {
    this.storage.remove(key);
  }
  
  /**
   * vide la memoire local de l'objet 
   */
  clear() {
    this.storage.clear();
  }

  /**
   * recupere l'utilisateur connecté
   */
  setUserConnected() {
    this.getObject('MT_ConUser').then((userConn: Utilisateur) => {
      if (!userConn) {
        this.userConnected = null;
      } else {
        this.userConnected = userConn;
      }
    });
  }
}