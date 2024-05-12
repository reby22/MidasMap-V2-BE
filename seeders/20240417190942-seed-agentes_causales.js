'use strict';
const faker = require('faker');
//se supone q los agentes causales dependen de los otros 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const id_bsls=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3
    ];
    const id_tipos=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,1,1,1,1,1,1,1,1,2,2,4,4,4,4,4,4,4,4,4,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
    ];
    const nombres= ['Acinetoobacter baumannii (antes A. calcoaceticus)',
                    'Actinobacillus',
                    'Actinomyces pyogenes (antes Corynebacterium pyogenes)',
                    'Aeromonas hydrophila',
                    'Amycolata autotrophica',
                    'Archanobacterium haemolyticum (antes Corynebacterium)',
                    'Arizona hinshawii',
                    'Bacillus anthracis',
                    'Bartonella henselae',
                    'Bartonella quintana',
                    'Bartonella vinsonii',
                    'Bordetella pertussis y demás',
                    'Borrelia recurrentis',
                    'Borrelia burgdorferi',
                    'Burkholderia (antes Pseudomonas spp)',
                    'Campylobacter coli, fetus y jejuni',
                    'Chlamydia psittaci, trachomatis y pneumoniae',
                    'Clostridium botulinum, chauvoei, haemolyticum, histolyticum, novyi, septicum y tetani',
                    'Coxiella burnetii',
                    'Corynebacterium diphtheriae, pseudotuberculosis y renale',
                    'Dermatophilus congolensis',
                    'Edwardsiella tarda',
                    'Erysipelothrix rhusiopathiae',
                    'Escherichia coli, enteropatogénica, enterotoxigénicas, enteroinvasivas y cepas con K1 incluyendo a E. coli 0157:H7.',
                    'Francisella tularensis subespecie novicida, cepa Utah 112, holarctica, LVS, biovar ATCC 6223, cepa B38',
                    'Haemophilus ducreyi e influenzae','Helicobacter pylori',
                    'Klebsiella, todas las especies excepto Klebsiella oxytoca (Grupo 1)',
                    'Legionella pneumophila','Leptospira interrogans y demas serotipos','Listeria',
                    'Moraxella','Mycoplasma, excepto mycoides y agalactiae','Neisseria gonorrhoeae y meningitidis',
                    'Nocardia asteroides, brasiliensis, otitidiscaviarum, transvalensis',
                    'Pseudomonas aeruginosa','Rhodococcus equi',
                    'Salmonella arizonae, choleraesuis, enteritidis, gallinarum-pullorum, meleagridis, paratyfi, A, B y C,  typhi y typhimurium',
                    'Shigella boydii, dysenteriae, tipo 1, flexneri, sonnei',
                    'Sphaerophorus necrophorus','Staphylococcus aureus','Streptobacillus moniliformis',
                    'Streptococcus pneumoniae y pyogenes','Treponema pallidum, carateum',
                    'Vibrio cholerae, parahaemolyticus, vulnificus','Yersinia enterocolitica',
                    'Yersinia pestis cepas pgm(-) (sin el locus de pigmentación de 102 kb) y cepas  lcr(-) carentes del plásmido LCR.','Blastomyces dermatitidis',
                    'Cladosporium bantianum, Xylohypha, trichoides','Cryptococcus neoformans',
                    'Dactylaria galopava (Ochroconis gallopavum)','Epidermophyton',
                    'Exophiala (Wangiella) dermatitidis','Fonsecaea pedrosoi','Microsporum',
                    'Paracoccidioides braziliensis','Penicillium marneffei','Sporothrix schenckii',
                    'Trichophyton','Ascaris lumbricoides y suum','Babesia divergens y microti',
                    'Brugia filarias malayi y timori','Coccidia','Cryptosporidium parvum',
                    'Cysticercus cellulosae (quiste hidatídico, larva de T. solium)',
                    'Echinococcus granulosis, multilocularis y vogeli','Entamoeba histolytica',
                    'Enterobius','Fasciola gigantica y hepatica','Giardia lamblia y demás','Heterophyes',
                    'Hymenolepis diminuta y nana','Isospora',
                    'Leishmania braziliensis, donovani, ethiopia, major, mexicana, peruviana y tropica',
                    'Loa loa','Microsporidium','Naegleria fowleri','Necator americanus','Onchocerca volvulus','Plasmodium cynomolgi, falciparum, malariae, ovale y vivax',
                    'Sarcocystis sui hominis','Schistosoma haematobium, intercalatum, japonicum, mansoni y mekongi',
                    'Strongyloides stercoralis','Taenia solium','Toxocara canis','Toxoplasma gondii',
                    'Trichinella spiralis','Trypanosoma cruzi, brucei brucei, brucei gambiense y rhodesiense',
                    'Wuchereria bancrofti','Síndrome de Inmunodeficiencia Aguda (SIDA)',
                    'Alphavirus (Togavirus) - Arbovirus del grupo A','Chikungunya cepa vaccinia 181/25',
                    'Virus de Encefalomielitis Equina del Este',
                    'Virus de Encefalomielitis Venezolana cepas TC-83 y V3526',
                    'Virus de Encefalomielitis Equina del Occidente','Arenavirus',
                    'Junin cepa vacunal candid #1','Virus no-neurotrópico de la Coriomeningitis Linfocítica',
                    'Virus del Complejo Tacaribe','Bunyavirus','Bunyamwera',
                    'Virus del Valle Rift cepa vacunal MP-12','Calicivirus',
                    'Coronavirus','Flavivirus - Arbovirus del Grupo B','Dengue serotipos 1, 2, 3 y 4',
                    'Virus de la Encefalitis Japonesa cepa vacunal SA 14-14-2',
                    'Virus de la hepatitis A, B, C, D y E','Herpesvirus - excepto H. simiae (Monkey B virus)',
                    'Cytomegalovirus','Epstein Barr virus','Herpes simplex types 1 and 2','Herpes zoster',
                    'Human herpesvirus types 6 and 7','Orthomyxovirus',
                    'Influenza tipo A, B y C (excepto extracontemporáneas)','Los transmitidos por garrapatas',
                    'Papillomavirus','Paramyxovirus','Virus de la Enfermedad de Newcastle','Sarampion','Paperas',
                    'Parainfluenza tipo 1, 2, 3 y 4','Virus Sincicial Respiratorio','Parvovirus',
                    'Parvovirus humano (B19)','Picornavirus','Virus Coxsackie tipo A y B','Echovirus','Poliovirus',
                    'Rhinovirus','Poxvirus - todos excepto Viruela del mono, Alastrim, Viruela y Whitepox.',
                    'Reovirus, coltivirus, rotavirus humanos y orbivirus (Virus de la Fiebre de Colorado transmitida por garrapatas)',
                    'Rhabdovirus','Virus de la rabia',
                    'Virus de la estomatitis vesicular no-exoticos: Indiana, Glasgow, Mudd-Summers, Orsay, San Juan y New Jersey Ogden y Hazelhurst',
                    'Rubivirus (Togavirus)','Virus de la rubeola','Bartonella','Brucella including abortus, canis y suis',
                    'Burkholderia (Pseudomonas) mallei y pseudomallei','Coxiella burnetii',
                    'Francisella tularensis','Mycobacterium bovis (excepto cepas BCG) y tuberculosis','Orientia tsutsugamushi (antes R. tsutsugamushi)','Pasteurella multocida tipo B -"buffalo" y otras cepas virulentas','Rickettsia akari, australis, canada, conorii, prowazekii, rickettsii,  siberica y typhi (R. mooseri)','Yersinia pestis','Coccidioides immitis y suelos contaminados','Histoplasma capsulatum, y var. duboisii','Priones (agentes RG2 agrupados aquí por seguridad)','Encefalopatías espongiformes transmisibles','Variantes de Enfermedad de Creutzfeldt-Jacob y kuru','Encefalopatía espongiforme bovinas','Encefalopatía espongiforme felina','Encefalopatía espongiforme de ungulados exóticos','Encefalopatía espongiforme ovinas (scrapie)','Encefalopatía espongiforme murinas y del mink','Encefalopatía espongiforme de cérvidos','Parálisis flácida aguda o Síndrome de Guillain-Barré','Síndrome coqueluchoide','Enfermedad febril exantemática','Síndrome de rubéola congénita','Alphavirus (Togavirus) - Arbovirus del Group A','Chikungunya (excepto la cepa vacunal 181/25','Virus del Bosque Semliki','Virus de la encefalitis de San Luis.','Virus de la encefalomielitis equina Venezolana (excepto cepas vacunales TC-83 y V3526).','Arenavirus','Flexal','Virus neurotropicos de la Coriomeningitis Linfocítica (LCM)','Bunyavirus','Hantavirus','Virus de la fiebre del valle Rift','Coronavirus','Coronavirus SARS (SARS-CoV)','Coronavirus MERS (MERS-CoV)','Flavivirus - Abrovirus del Group B','Virus de la encefalitis Japonesa','Virus del Nilo occidental (WNV)','Virus de la fiebre amarilla (YFV)','Orthomyxovirus','Influenza humanos cepas 1918 H1N1, H2N2 (1957-1968), y cepas aviares altamente patogénicas H5N1','Poxvirus','Virus de la viruela del mono','Retrovirus','Virus de la inmunodeficiencia humana (HIV) tipo 1 y 2','Virus linfocitotrópico de células T humanas (HTLV) tipos 1 y 2','Virus de la inmundeficiencia simiana (SIV)','Rhabdovirus','Virus de la estomatitis vesicular','Fiebre hemorrágica','Arenavirus','Guanarito','Lassa','Junin','Machupo virus','Sabia','Bunyavirus (Nairovirus)','Virus de la fiebre hemorrágica de Crimea-Congo','Filovirus','Ebola virus','Marburg virus','Flavirus - Arbovirus del Grupo B','Virus del complejo de encefalitis transmitidas por garrapatas','Herpesvirus (alpha)','Herpesvirus simianos (Herpes B or o virus B del mono)','Paramyxoviruses','Morbilivirus equino (Hendra)','Agentes responsables de fiebres hemorrágicas no-definidos'];

    for (let i = 0; i <nombres.length; i++) {
      data.push({
        id_agente: i + 1,
        id_bsl:id_bsls[i],
        id_tipo: id_tipos[i],
        agente: nombres[i],
      });
    }

    await queryInterface.bulkInsert('agentes_causales', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agentes_causales', null, {});
  }
};
