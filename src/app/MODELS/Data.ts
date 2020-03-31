import { Pump } from './Pompe';
import { Driver } from './Driver';
import { Vehicule } from './Vehicule';
import { Utilisateur } from './Utilisateur';
import { Consumption } from './Consumption';
import { Folder } from './Folder';
export class Data {
    public user?: Utilisateur;
    public cars?: Vehicule[];
    public drivers?: Driver[];
    public pompes?: Pump[];
    public consommation?: Consumption[];
    public folders?: Folder[];
}
