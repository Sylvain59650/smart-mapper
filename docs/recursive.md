# Recursive Data


## entry data (entryData)
    [{
    "Id": 359,
    "Title": "Processus : MANAGEMENT STRATEGIQUE",
    "Childs": [{
        "Id": 589,
        "Title": "PMT vision et note strategique"
      },
      {
        "Id": 590,
        "Title": "vision et volontes strategiques"
      },
      {
        "Id": 671,
        "Title": "Les valeurs et la charte de deontologie",
        "Childs": [{
            "Id": 610,
            "Title": "Code d'integrite des partenaires"
          },
          {
            "Id": 672,
            "Title": "Le code d'integrite"
          }
        ]
      },
      {
        "Id": 362,
        "Title": "Plan à Moyen Terme (PMT)",
        "Childs": [{
          "Id": 583,
          "Title": "Processus PMT 2016-2020",
          "Childs": [{
              "Id": 584,
              "Title": "Note de presentation type par domaines du PMT 2016-2020"
            },
            {
              "Id": 585,
              "Title": "Note de presentation type par domaines du PMT 2016-2020 - Mise à jour du PMT 2015-2019"
            },
            {
              "Id": 586,
              "Title": "Note de presentation type par zones geographiques du PMT 2016-2020"
            },
            {
              "Id": 587,
              "Title": "Note de presentation type par zones geographiques du PMT 2016-2020 - Mise à jour du PMT 2015-2019"
            }
          ]
        }]
      },
      {
        "Id": 364,
        "Title": "Acquisition d'entreprises",
        "Childs": [{
          "Id": 363,
          "Title": "Comite des acquisitions"
        }]
      }
    ]},  
    {
    "Id": 541,
        "Title": "PROCESSUS M2 - Management operationnel",
        "Childs": [{
            "Id": 420,
            "Title": "Referentiel du Directeur General de la filiale"
        },
        {
            "Id": 422,
            "Title": "Integration nouvelles filiales"
        },
        {
            "Id": 424,
            "Title": "Gouvernance des filiales",
            "Childs": [{
                "Id": 418,
                "Title": "Delegation de pouvoirs"
            },
            {
                "Id": 421,
                "Title": "Fiche juridique filiale",
                "Childs": [{
                    "Id": 419,
                    "Title": "Modèle de fiche juridique filiale"
                },
                {
                    "Id": 423,
                    "Title": "Guide de la vie sociale"
                }
                ]
            }
            ]
        },
        {
            "Id": 548,
            "Title": "Rôle et responsabilite des instances de gouvernance du Groupe",
            "Childs": [{
            "Id": 575,
            "Title": "Composition des instances de direction du Groupe"
            }]
        },
        {
            "Id": 430,
            "Title": "Cycle de management.",
            "Childs": [{
            "Id": 594,
            "Title": "Calendrier de management 2017"
            }]
        },
        {
            "Id": 632,
            "Title": "Note d'Organisation"
        },
        {
            "Id": 435,
            "Title": "Procedure de gestion des situations d’urgence et de crise",
            "Childs": [{
                "Id": 436,
                "Title": "Manuel de gestion de la communication de crise"
            },
            {
                "Id": 648,
                "Title": "Test de la procedure de gestion des situations d’urgence et de crise"
            },
            {
                "Id": 649,
                "Title": "Cellule de crise : contacts et localisation"
            }
            ]
        },
        {
            "Id": 431,
            "Title": "Management de la Performance."
        },
        {
            "Id": 540,
            "Title": "maitrise des prestations non-conformes"
        }
        ]
    }
    ]

## template

    let template = {
    mappings: {
        id: "Id",
        title: "Title",
        childs: "Childs"
    },
    childrens: node => node.childs,
    childrenPropertyName: "childrens"
    };    

## Instruction

    let outData = SmartMapper.mapping(template, entryData);

## result (outData)
    
    [
        {"id":359,"title":"Processus : MANAGEMENT STRATEGIQUE",
        "childs":[
            {"id":589,"title":"PMT vision et note strategique"},
            {"id":590,"title":"vision et volontes strategiques"},
            {"id":671,"title":"Les valeurs et la charte de deontologie",
            "childs":[
                {"id":610,"title":"Code d'integrite des partenaires"},
                {"id":672,"title":"Le code d'integrite"}
            ]},
            {"id":362,"title":"Plan à Moyen Terme (PMT)",
                "childs":[
                    {"id":583,"title":"Processus PMT 2016-2020",
                    "childs":[
                        {"id":584,"title":"Note de presentation type par domaines du PMT 2016-2020"},
                        {"id":585,"title":"Note de presentation type par domaines du PMT 2016-2020 - Mise à jour du PMT 2015-2019"},
                        {"id":586,"title":"Note de presentation type par zones geographiques du PMT 2016-2020"},
                        {"id":587,"title":"Note de presentation type par zones geographiques du PMT 2016-2020 - Mise à jour du PMT 2015-2019"}
                    ]
                }
            ]},
            {"id":364,"title":"Acquisition d'entreprises",
            "childs":[
                {"id":363,"title":"Comite des acquisitions"}
            ]
            }
        ]},
        {"id":541,"title":"PROCESSUS M2 - Management operationnel",
        "childs":[
            {"id":420,"title":"Referentiel du Directeur General de la filiale"},
            {"id":422,"title":"Integration nouvelles filiales"},
            {"id":424,"title":"Gouvernance des filiales",
            "childs":[
                {"id":418,"title":"Delegation de pouvoirs"},
                {"id":421,"title":"Fiche juridique filiale",
                "childs":[
                    {"id":419,"title":"Modèle de fiche juridique filiale"},
                    {"id":423,"title":"Guide de la vie sociale"}
                ]
            }
        ]
    },
    {"id":548,"title":"Rôle et responsabilite des instances de gouvernance du Groupe",
    "childs":[
        {"id":575,"title":"Composition des instances de direction du Groupe"}
    ]
    },
    {"id":430,"title":"Cycle de management.",
    "childs":[
        {"id":594,"title":"Calendrier de management 2017"}
    ]},
    {"id":632,"title":"Note d'Organisation"},
    {"id":435,"title":"Procedure de gestion des situations d’urgence et de crise",
    "childs":[
        {"id":436,"title":"Manuel de gestion de la communication de crise"},
        {"id":648,"title":"Test de la procedure de gestion des situations d’urgence et de crise"},
        "id":649,"title":"Cellule de crise : contacts et localisation"}
    ]
    },
    {"id":431,"title":"Management de la Performance."},
    {"id":540,"title":"maitrise des prestations non-conformes"}
    ]
    }
]