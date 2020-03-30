export const CHAUFFEUR_XTYPE = 'CHAUFFEUR';
export const POMPISTE_XTYPE = 'POMPISTE';
export const ADMIN_XTYPE = 'ADMIN';
export const SUPERADMIN_XTYPE = 'SUPERADMIN';
export const LIST_USER_PUMP_STR = 'LIST_USER_POMP';

export const RACINE_URL_ONF = 'menu/menu/tabs/tabs/';



export const LIST_MENU_HOME = [
    {
        title: 'CONSOMMER',
        subtitle: 'le sous titre du Menu si',
        urlPage: RACINE_URL_ONF + 'consommer',
        icon: 'cart',
        description: 'description de ce menu si',
        level: 2,
    },
    {
        title: 'HISTORIQUE DE CONSOMATION',
        subtitle: 'le sous titre du Menu si',
        urlPage: RACINE_URL_ONF + 'historique',
        icon: 'barcode',
        description: 'description de ce menu si ',
        level: 1,
    },
    {
      title: 'DEFINIR SON CODE PIN',
      subtitle: 'le sous titre du Menu si',
      urlPage: 'default',
      icon: 'create',
      description: 'description de ce menu si ',
      level: 1,
    },
    {
      title: 'SE DECONNECTER',
      subtitle: 'le sous titre du Menu si',
      urlPage: 'default',
      icon: 'log-out',
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
      subtitle: 'le sous titre du Menu si',
      urlPage: 'default',
      icon: 'construct',
      description: 'description de ce menu si ',
      level: 3,
    },
    {
      title: 'SWIFT',
      subtitle: 'le sous titre du Menu si',
      urlPage: 'default',
      icon: 'cellular',
      description: 'description de ce menu si ',
      level: 3,
    }, {
      title: 'DASHBOAD',
      subtitle: 'le sous titre du Menu si',
      urlPage: 'default',
      icon: 'bar-chart',
      description: 'description de ce menu si ',
      level: 3,
    }
];

export const LIST_PAGE_MENU = [
    {
      title: 'Definir le Code Ping',
      icon: 'briefcase',
      url: 'tabs'
    },
    {
      title: 'Modifier le Mot de passe ',
      icon: 'calendar',
      url: 'tabs'
    },
    {
        title: 'UN autre Menu ',
        icon: 'beer',
        url: 'tabs'
      }
  ];

export const LIST_USERS_TEST = [
    {
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
