export const CHAUFFEUR_XTYPE = 'CHAUFFEUR';
export const POMPISTE_XTYPE = 'POMPISTE';
export const ADMIN_XTYPE = 'ADMIN';
export const SUPERADMIN_XTYPE = 'SUPERADMIN';
export const LIST_USER_PUMP_STR = 'LIST_USER_POMP';
export const LIST_USER_CAR_STR = 'LIST_USER_CAR';

export const RACINE_URL_ONF = 'menu/menu/tabs/tabs/';



export const LIST_MENU_HOME = [{
    title: 'CONSOMMATION DE CARBURANT',
    urlPage: RACINE_URL_ONF + 'consommer',
    icon: 'cart',
    description: 'description de ce menu si',
    level: 2,
  },
  {
    title: 'HISTORIQUE DE CONSOMATION',
    urlPage: RACINE_URL_ONF + 'historique',
    icon: 'barcode',
    description: 'description de ce menu si ',
    level: 1,
  },
  {
    title: 'DISTRIBUTION LUBRIFIANT',
    urlPage: RACINE_URL_ONF + 'distribution',
    icon: 'barcode',
    description: 'description de ce menu si ',
    level: 2,
  },
  {
    title: 'DEFINIR SON CODE PIN',
    subtitle: 'le sous titre du Menu si',
    urlPage: `${RACINE_URL_ONF}change-pin`,
    icon: 'create',
    description: 'description de ce menu si ',
    level: 1,
  },
  {
    title: 'GESTION DES UTILISATEURS',
    subtitle: 'le sous titre du Menu si',
    urlPage: 'default',
    icon: 'people-circle',
    description: 'description de ce menu si ',
    level: 3,
  },
  {
    title: 'GESTION DES POMPES',
    subtitle: 'le sous titre du Menu si',
    urlPage: 'default',
    icon: 'newspaper',
    description: 'description de ce menu si ',
    level: 3,
  },
  {
    title: 'GESTION DES VEHICULES',
    urlPage: 'default',
    icon: 'construct',
    description: 'description de ce menu si ',
    level: 3,
  },
  {
    title: 'SWIFT',
    urlPage: 'default',
    icon: 'cellular',
    description: 'description de ce menu si ',
    level: 3,
  }, {
    title: 'DASHBOAD',
    urlPage: 'default',
    icon: 'bar-chart',
    description: 'description de ce menu si ',
    level: 3,
  }
];

export const ADDITIONAL_POMP_MENU = [
  {
    title: 'DISTRIBUTION DE LUBRIFIANT',
    icon: 'briefcase',
    url: RACINE_URL_ONF + 'distribution',
    type: 'page'
  },
  {
    title: 'CHANGER DE COMPTE ',
    icon: 'briefcase',
    url: 'loggin' ,
    type: 'page'
  },
];

export const LIST_PAGE_MENU = [{
    title: 'Definir le Code Ping',
    icon: 'briefcase',
    url: `${RACINE_URL_ONF}change-pin`,
    type: 'page'
  },
  {
    title: 'Modifier le Mot de passe ',
    icon: 'calendar',
    url: `modif-password`,
    type: 'popup'
  }
];

export const LIST_USERS_TEST = [{
    nom: 'POMPISTE DOE',
    login: 'pompiste',
    password: 'motdepasse',
    type: POMPISTE_XTYPE
  },
  {
    nom: 'POMPISTE DOE',
    login: 'chauffeur',
    password: 'motdepasse',
    type: CHAUFFEUR_XTYPE
  },
  {
    nom: 'ADMIN DOE',
    login: 'administrateur',
    password: 'motdepasse',
    type: ADMIN_XTYPE
  },
  {
    nom: 'SUPER ADMIN DOE',
    login: 'supadmin',
    password: 'motdepasse',
    type: SUPERADMIN_XTYPE
  },
];