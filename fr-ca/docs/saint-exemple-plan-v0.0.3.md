---
title: "Plan municipal de sécurité civile de Saint-Exemple (fictif)"
description: "Plan de sécurité civile fictif, établi d'après le canevas du MSP, pour la démonstration Balise : une seule source produisant un guide externe pour la population et un guide interne pour l'OMSC, centrée sur quatre consignes : alerte, évacuation, mise à l'abri et panne prolongée."
identifier: "urn:uuid:5f0c2e8a-3b7d-4c1e-9a64-2d8e7b1f4c90"
creator: "Christopher Steel"
contributor: "Claude (Anthropic)"
version: 0.0.3
date: 2026-10-06
lang: fr-CA
municipalite: "Saint-Exemple"
resolution_numero: "178-10-2026"
resolution_date: 2026-10-05
---

# Plan municipal de sécurité civile de Saint-Exemple (fictif)

Version : 0.0.3
Statut : Ébauche
Guide de style : style-guide--versioned-documents-in-unrendered-markdown

## Avertissement

**Visibilité :** public

Saint-Exemple est une municipalité fictive. Les noms de personnes, adresses, numéros de téléphone, adresses de courriel et résolutions sont inventés pour la démonstration Balise. Les numéros de téléphone utilisent la plage 555-01XX, réservée à la fiction, et les courriels le domaine réservé `saint-exemple.example`. Seuls les numéros publics provinciaux (9-1-1, 8-1-1, Hydro-Québec) sont réels, parce qu'un guide citoyen les afficherait tels quels.

## Résumé

**Visibilité :** interne

Ce plan suit la structure du canevas *Plan de sécurité civile* du ministère de la Sécurité publique <a id="apa-msp-citation-1"></a>[(Ministère de la Sécurité publique, 2025)](#apa-msp-reference), réduite à une tranche verticale : niveaux d'alerte, organisation municipale, deux centres, moyens d'alerte et quatre consignes générales. Chaque bloc porte une visibilité. Le guide externe ne reprend que les blocs publics, le guide interne reprend les blocs publics et internes, et les blocs restreints ne figurent que dans le bottin imprimé.

## Convention de visibilité

**Visibilité :** interne

| Visibilité | Guide externe (population) | Guide interne (OMSC) | Bottin imprimé | Exemple |
| --- | --- | --- | --- | --- |
| public | Oui | Oui | Non | Consignes, points de rassemblement, niveaux d'alerte |
| interne | Non | Oui | Non | Fiches d'installation, déclencheurs, listes de vérification |
| restreint | Non | Non | Oui | Numéros personnels, liste des sites et clientèles vulnérables |

Règles de compilation :

- Chaque section porte une ligne **Visibilité**. Une sous-section hérite de la visibilité de sa section parente, sauf si elle déclare la sienne.
- Une section qui n'a pas de contenu propre, seulement des sous-sections, n'a pas besoin de visibilité.
- Une section qui a du contenu propre sans visibilité, déclarée ou héritée, fait échouer la compilation.
- Un titre n'apparaît dans un guide que si au moins un de ses blocs y apparaît.
- Aucun bloc restreint n'entre dans une version numérique, guide externe ou interne, en ligne ou hors ligne. Il n'existe que dans le bottin imprimé, conformément au canevas, qui demande d'en conserver une copie papier.

## Mot du maire

**Visibilité :** public

Chères citoyennes, chers citoyens,

Les tempêtes de l'hiver dernier nous ont rappelé qu'une panne d'électricité de quelques jours suffit à couper le téléphone, Internet et le chauffage d'une bonne partie du territoire. Ce plan décrit ce que la Municipalité fera lors d'un sinistre, et surtout ce que chacun de vous peut faire. Il est disponible hors ligne sur vos téléphones et ordinateurs : téléchargez-le aujourd'hui, pendant que le réseau fonctionne.

La sécurité civile est une responsabilité partagée. Préparez votre trousse, connaissez votre point de rassemblement, et prenez des nouvelles de vos voisins.

Gilles Tremblay, maire

## Registre des mises à jour

**Visibilité :** interne

| Version | Date | Modification | Approuvée par |
| --- | --- | --- | --- |
| 0.0.1 | 2026-10-05 | Adoption initiale, résolution 178-10-2026 | Conseil municipal |

## Profil du territoire

**Visibilité :** public

Saint-Exemple compte environ 2 100 résidents répartis en quatre secteurs. La rivière aux Hérons traverse le village du nord au sud, et la route 999 relie la municipalité aux villes voisines.

| Secteur | Description | Particularité |
| --- | --- | --- |
| Village | Noyau urbain, services municipaux, école | Zone inondable en bordure de la rivière |
| Rang du Ruisseau | Agricole, fermes laitières | Routes longues, déneigement tardif |
| Lac-aux-Hérons | Résidences saisonnières et permanentes | Un seul chemin d'accès |
| Domaine des Érables | Quartier résidentiel récent | Population jeune, nombreux enfants |

### Risques connus

- Tempête hivernale et verglas
- Panne d'électricité prolongée
- Inondation printanière de la rivière aux Hérons
- Feu de forêt près du Lac-aux-Hérons
- Accident de transport de matières dangereuses sur la route 999

### Sites et clientèles vulnérables

**Visibilité :** restreint

| Site | Adresse | Clientèle | Personnes | Contact d'urgence |
| --- | --- | --- | --- | --- |
| Résidence Les Pignons (RPA) | 30, rue des Pins | Aînés, dont 6 en fauteuil roulant | 24 | Nathalie Roy, 450 555-0131 |
| CPE Les Petits Pas | 8, rue de l'Église | Enfants de 0 à 5 ans | 48 | Isabelle Côté, 450 555-0132 |
| École primaire des Érables | 210, boulevard des Érables | Enfants de 5 à 12 ans | 165 | Martin Fortin, 450 555-0133 |

La liste nominative des résidents à domicile ayant besoin d'aide pour évacuer est tenue par la mission Services aux sinistrés et n'est pas reproduite ici.

## Niveaux d'alerte

**Visibilité :** public

| Niveau | Signification | Ce que fait la Municipalité | Ce que vous faites |
| --- | --- | --- | --- |
| Jaune : surveillance | Un aléa est annoncé ou possible | Le coordonnateur suit la situation | Vous vous informez et vérifiez votre trousse |
| Orange : alerte | Le sinistre est probable ou imminent | L'OMSC est mobilisée, les centres sont préparés | Vous suivez les consignes d'alerte |
| Rouge : intervention | Le sinistre est en cours | Les centres ouvrent, les mesures de protection sont appliquées | Vous suivez les consignes diffusées |
| Vert : rétablissement | Le danger est passé | Retour progressif des services | Vous attendez l'autorisation avant de rentrer chez vous |

## Organisation municipale de sécurité civile

### Mandats

**Visibilité :** public

L'organisation municipale de sécurité civile (OMSC) réunit le coordonnateur et six missions. Chaque mission agit en trois phases : préparation, intervention et rétablissement.

| Rôle | Mandat principal |
| --- | --- |
| Conseil municipal | Adopte le plan, peut déclarer l'état d'urgence local |
| Maire | Autorise les mesures d'exception, porte-parole principal ; peut déclarer l'état d'urgence pour 48 heures si le conseil ne peut se réunir à temps |
| Coordonnateur municipal | Dirige l'OMSC et le centre de coordination |
| Administration | Dépenses, registres, soutien au centre de coordination |
| Communication | Alerte et information de la population, relations avec les médias |
| Secours | Protection des personnes, évacuation, sécurité incendie |
| Services aux sinistrés | Accueil, inscription, hébergement, alimentation, aide aux personnes vulnérables |
| Services techniques | Eau potable, voirie, génératrices, bâtiments municipaux |
| Transport | Transport des personnes évacuées et du matériel |

### Affectations

**Visibilité :** restreint

| Rôle | Responsable | Substitut | Cellulaire | Ligne 24/7 | Courriel |
| --- | --- | --- | --- | --- | --- |
| Coordonnateur municipal | Sophie Gagnon, directrice générale | Marc Lefebvre | 450 555-0111 | 450 555-0100 | coordination@saint-exemple.example |
| Administration | Julie Morin | Karine Dubé | 450 555-0112 | 450 555-0100 | admin@saint-exemple.example |
| Communication | Alexandre Bouchard | Julie Morin | 450 555-0113 | 450 555-0100 | communication@saint-exemple.example |
| Secours | Éric Pelletier, directeur incendie | Luc Girard | 450 555-0114 | 450 555-0101 | incendie@saint-exemple.example |
| Services aux sinistrés | Chantal Lavoie | Annie Bergeron | 450 555-0115 | 450 555-0100 | sinistres@saint-exemple.example |
| Services techniques | Marc Lefebvre, contremaître | Patrick Ouellet | 450 555-0116 | 450 555-0102 | travaux@saint-exemple.example |
| Transport | Patrick Ouellet | Denis Caron | 450 555-0117 | 450 555-0102 | travaux@saint-exemple.example |

## Centres

### Centre de coordination

**Visibilité :** interne

| Champ | Principal | Substitut |
| --- | --- | --- |
| Nom | Hôtel de ville | Garage municipal |
| Adresse | 100, rue Principale | 45, chemin du Moulin |
| Usage habituel | Bureaux municipaux, salle du conseil | Entretien des véhicules, entrepôt |
| Téléphone fixe | 450 555-0100 | 450 555-0102 |
| Internet | Fibre | Fibre, même fournisseur |
| Télécommunication de relève | Lien satellite, radio VHF | Radio VHF |
| Génératrice | Oui, 60 kW, automatique | Oui, 30 kW, manuelle |
| Prise pour génératrice externe | Non | Oui |
| Autonomie en carburant | 48 heures | 24 heures |
| Équipement | 8 postes, imprimante, copie papier du plan et du bottin, guide Balise hors ligne sur deux portables | 2 postes, copie papier du plan et du bottin |
| Stationnement | 25 places | 10 places, cour des véhicules |
| Responsable de l'ouverture | Marc Lefebvre | Patrick Ouellet |

### Centre de services aux sinistrés et d'hébergement

#### Pour la population

**Visibilité :** public

Lors d'un sinistre, la Municipalité ouvre un centre pour accueillir les personnes touchées, les inscrire et leur offrir de quoi se réchauffer, recharger leurs appareils, boire, manger et, au besoin, dormir. La Municipalité annonce l'ouverture du centre par les moyens décrits dans [Comment vous serez informés](#comment-vous-serez-informés).

| Centre | Nom | Adresse |
| --- | --- | --- |
| Principal | Centre communautaire du Village | 12, rue de l'Église |
| Substitut, s'il est annoncé | École primaire des Érables (gymnase) | 210, boulevard des Érables |

#### Fiche d'installation

**Visibilité :** interne

| Champ | Principal | Substitut |
| --- | --- | --- |
| Nom | Centre communautaire du Village | École primaire des Érables (gymnase) |
| Adresse | 12, rue de l'Église | 210, boulevard des Érables |
| Usage habituel | Loisirs, salle de réception | École |
| Capacité d'accueil de jour | 150 personnes | 120 personnes |
| Capacité d'hébergement de nuit | 60 lits de camp | 40 lits de camp |
| Toilettes, douches | 6 toilettes, 2 douches | 8 toilettes, 4 douches |
| Cuisine | Complète | Cuisine de service |
| Génératrice | Oui, 45 kW, automatique | Non, prise pour génératrice externe |
| Internet | Fibre | Fibre, réseau scolaire |
| Télécommunication de relève | Radio VHF | Radio VHF portative apportée par la mission |
| Accès pour fauteuil roulant | Oui | Oui |
| Animaux | Salle séparée pour animaux en cage | Non |
| Responsable de l'ouverture | Chantal Lavoie | Martin Fortin, direction de l'école |

## Points de rassemblement

**Visibilité :** public

| Secteur | Point de rassemblement | Adresse |
| --- | --- | --- |
| Village | Stationnement de l'église | 10, rue de l'Église |
| Rang du Ruisseau | Salle du Club Optimiste | 455, rang du Ruisseau |
| Lac-aux-Hérons | Stationnement de la plage municipale | 1, chemin du Lac |
| Domaine des Érables | Cour de l'école primaire | 210, boulevard des Érables |

Le point de rassemblement est un lieu de départ, pas un abri. La Municipalité y organise le transport vers le centre de services aux sinistrés.

## Comment vous serez informés

**Visibilité :** public

Lorsque les réseaux fonctionnent :

- Québec En Alerte, message reçu automatiquement sur les téléphones cellulaires compatibles, pour les dangers imminents
- Système d'appels automatisés de la Municipalité, sur inscription, par téléphone, texto ou courriel
- Site web de la Municipalité et guide Balise, mis à jour automatiquement sur vos appareils
- Page Facebook de la Municipalité

Lorsque l'électricité, Internet ou le cellulaire ne fonctionnent plus :

- Radio communautaire CHEX 99,9 FM, à écouter sur une radio à piles ou à manivelle
- Avis affichés à l'hôtel de ville, au dépanneur du village et aux points de rassemblement
- Panneaux à message variable à l'entrée du village (route 999 et rue Principale) et au chemin du Lac
- Porte-à-porte par les pompiers et les employés municipaux, dans les secteurs touchés
- Le guide Balise déjà téléchargé reste lisible sans réseau, recherche comprise

### Opérations

**Visibilité :** interne

- Le maire, ou en son absence le coordonnateur, approuve tout message à la population.
- La mission Communication rédige et diffuse ; elle tient un journal des messages (heure, canal, texte).
- Le porte-parole est le maire ; le substitut est le coordonnateur. Les médias sont reçus à la salle du conseil.
- Les demandes de diffusion Québec En Alerte passent par la direction régionale du MSP, numéro au bottin.

## Consignes générales à la population

**Visibilité :** interne

Les quatre consignes ci-dessous sont le cœur du guide externe. Chacune comporte une partie publique, ce que vous faites, et une partie interne, ce que l'OMSC fait, avec le message type à diffuser.

### Alerte

#### Pour la population

**Visibilité :** public

Vous êtes en alerte lorsque la Municipalité annonce le niveau orange, ou lorsque vous recevez un message Québec En Alerte.

1. Gardez votre calme et écoutez le message jusqu'au bout.
2. Allumez la radio CHEX 99,9 FM ou consultez le guide Balise pour les mises à jour.
3. Préparez votre trousse d'urgence et vos médicaments pour au moins 72 heures.
4. Rechargez votre téléphone et vos batteries de secours pendant que vous avez de l'électricité.
5. Faites le plein de votre véhicule et garez-le dans le sens du départ.
6. Prenez des nouvelles des voisins âgés ou seuls.
7. N'appelez le 9-1-1 qu'en cas d'urgence, pour laisser les lignes libres.
8. Soyez prêts à évacuer ou à vous mettre à l'abri, selon la consigne qui suivra.

#### Opérations

**Visibilité :** interne

- **Déclencheur :** avis de Environnement Canada (tempête, verglas, pluie abondante), crue annoncée de la rivière aux Hérons, signalement d'un danger par le service incendie ou la Sûreté du Québec.
- **Autorise :** le coordonnateur pour le niveau jaune ; le maire pour le niveau orange.
- **Mission responsable :** Communication, avec Secours.
- **Liste de vérification :**
  - Mobiliser l'OMSC selon le schéma d'alerte (bottin)
  - Vérifier le carburant et faire l'essai des génératrices des deux centres
  - Tester la radio VHF et le lien satellite au centre de coordination
  - Préparer le centre de services aux sinistrés, sans l'ouvrir
  - Joindre les responsables des sites vulnérables
  - Publier le message type sur tous les canaux

**Message type**

> ALERTE, Municipalité de Saint-Exemple, [date et heure]. [Aléa] est prévu à partir de [moment]. Préparez votre trousse d'urgence pour 72 heures, rechargez vos appareils et soyez prêts à suivre d'autres consignes. Information : CHEX 99,9 FM, guide Balise, 450 555-0100.

### Évacuation

#### Pour la population

**Visibilité :** public

Évacuez lorsque la Municipalité, les pompiers ou la police vous le demandent, ou immédiatement si vous êtes en danger.

1. Prenez votre trousse d'urgence, vos médicaments, vos papiers d'identité et vos chargeurs.
2. Si le temps le permet, coupez l'eau et l'électricité, mais ne coupez pas le gaz sauf sur instruction.
3. Fermez portes et fenêtres et verrouillez la maison.
4. Emmenez vos animaux en cage ou en laisse, avec leur nourriture.
5. Suivez l'itinéraire indiqué ; n'empruntez jamais une route inondée.
6. Rendez-vous au point de rassemblement de votre secteur si vous n'avez pas de transport, ou directement au centre de services aux sinistrés, le centre communautaire du Village, 12, rue de l'Église, sauf si un autre centre est annoncé.
7. Inscrivez-vous au centre, même si vous logez chez de la famille, pour que l'on sache que vous êtes en sécurité et pour recevoir l'aide prévue, dont l'hébergement.
8. Ne rentrez chez vous qu'après l'autorisation de la Municipalité.

Si vous avez besoin d'aide pour quitter votre domicile, appelez le 450 555-0100 dès l'alerte, sans attendre l'ordre d'évacuation.

#### Opérations

**Visibilité :** interne

- **Déclencheur :** danger imminent pour la vie (crue au-delà de la cote d'alerte, feu de forêt à moins de 2 km d'habitations, fuite de matières dangereuses).
- **Autorise :** le maire, ou le directeur incendie en cas de danger immédiat. Une évacuation obligatoire en dehors d'une urgence immédiate peut exiger une déclaration d'état d'urgence local (voir [Aspects juridiques](#aspects-juridiques)).
- **Missions responsables :** Secours (porte-à-porte, sécurité du périmètre), Transport (autobus scolaire, minibus adapté), Services aux sinistrés (ouverture du centre, inscription).
- **Liste de vérification :**
  - Délimiter la zone et la consigner sur la carte du centre de coordination
  - Ouvrir le centre de services aux sinistrés et l'annoncer
  - Évacuer en priorité les sites vulnérables et les personnes de la liste nominative
  - Faire le porte-à-porte et noter les adresses vides, refus et absences au registre des évacués
  - Demander à la Sûreté du Québec la surveillance des secteurs évacués
  - Tenir le journal des opérations

**Message type**

> ÉVACUATION, Municipalité de Saint-Exemple, [date et heure]. Les résidents de [secteur ou rues] doivent quitter leur domicile maintenant, en raison de [aléa]. Rendez-vous au [centre ou point de rassemblement]. Apportez vos médicaments et votre trousse d'urgence. Besoin d'aide pour partir : 450 555-0100.

### Mise à l'abri

#### Pour la population

**Visibilité :** public

La mise à l'abri, ou confinement, consiste à rester à l'intérieur lorsque sortir serait plus dangereux, par exemple lors d'une fuite de gaz toxique sur la route 999, d'une fumée de feu de forêt ou d'une tempête violente.

1. Entrez dans le bâtiment le plus proche et restez-y.
2. Fermez portes et fenêtres.
3. Arrêtez la ventilation, l'échangeur d'air, la hotte de cuisine et les foyers.
4. Lors d'une fuite toxique, installez-vous dans une pièce intérieure, si possible à l'étage, et bouchez le bas des portes avec des serviettes humides.
5. Lors d'une tempête violente, éloignez-vous des fenêtres ; allez au sous-sol si vous en avez un.
6. N'allez pas chercher les enfants à l'école ou au CPE : le personnel les met à l'abri sur place.
7. Écoutez la radio CHEX 99,9 FM ou consultez le guide Balise.
8. Ne sortez qu'à la fin de l'alerte, puis aérez votre logement.

#### Opérations

**Visibilité :** interne

- **Déclencheur :** nuage ou fuite de matière dangereuse, fumée dense, vents violents ou tornade annoncés par Environnement Canada.
- **Autorise :** le directeur incendie, sur avis des autorités compétentes (Urgences-santé, CANUTEC par l'entremise du service incendie) ; le maire est informé.
- **Missions responsables :** Secours, Communication.
- **Liste de vérification :**
  - Définir la zone de mise à l'abri et sa durée prévue
  - Joindre l'école, le CPE et la résidence Les Pignons pour qu'ils appliquent leur propre procédure
  - Demander la fermeture de la route 999 si nécessaire
  - Diffuser la fin de l'alerte par les mêmes canaux que l'alerte

**Message type**

> MISE À L'ABRI, Municipalité de Saint-Exemple, [date et heure]. En raison de [aléa], les résidents de [secteur] doivent rester à l'intérieur, fermer portes et fenêtres et arrêter la ventilation. N'allez pas chercher vos enfants à l'école. Attendez la fin de l'alerte. Information : CHEX 99,9 FM, guide Balise.

### Panne prolongée

#### Pour la population

**Visibilité :** public

On parle de panne prolongée lorsque l'électricité est coupée depuis plus de 12 heures, ou plus tôt l'hiver. Le téléphone, Internet et le cellulaire peuvent cesser de fonctionner après quelques heures.

1. Signalez la panne à Hydro-Québec au 1 800 790-2424, ou consultez Info-pannes s'il vous reste du réseau.
2. N'utilisez jamais à l'intérieur une génératrice, un barbecue, un réchaud de camping ou un appareil de chauffage d'appoint à combustible conçu pour l'extérieur : le monoxyde de carbone tue sans odeur. Installez la génératrice dehors, loin des portes et fenêtres.
3. Ayez un avertisseur de monoxyde de carbone à piles.
4. Gardez la chaleur : fermez les pièces inutilisées, couvrez les fenêtres, habillez-vous en couches.
5. Gardez le réfrigérateur et le congélateur fermés ; un congélateur plein garde les aliments environ 48 heures.
6. Si votre maison descend sous 10 °C, ou si vous dépendez d'un appareil médical électrique, rendez-vous au centre communautaire du Village, 12, rue de l'Église. Il sert de centre de réchauffement et de recharge et, au besoin, d'hébergement pour la nuit.
7. Pour éviter le gel des tuyaux, laissez couler un mince filet d'eau, ou coupez l'entrée d'eau et videz la tuyauterie si vous quittez la maison.
8. Prenez des nouvelles de vos voisins, surtout des personnes âgées ou seules, en personne si le téléphone ne fonctionne pas.
9. Pour une question de santé non urgente, appelez Info-Santé au 8-1-1 ; pour une urgence, le 9-1-1.
10. Au retour du courant, rallumez les appareils un à un.

#### Opérations

**Visibilité :** interne

- **Déclencheur :** panne de plus de 6 heures touchant plus du quart des abonnés, ou toute panne lorsque la température extérieure est inférieure à -10 °C.
- **Autorise :** le coordonnateur pour l'ouverture du centre de réchauffement ; le maire pour l'hébergement de nuit.
- **Missions responsables :** Services techniques, Services aux sinistrés, Communication.
- **Liste de vérification :**
  - Confirmer la durée estimée auprès d'Hydro-Québec (ligne réservée aux municipalités, au bottin)
  - Passer le centre de coordination sur génératrice et vérifier l'autonomie en carburant ; commander le carburant au fournisseur prioritaire
  - Basculer les communications sur le lien satellite et la radio VHF si la fibre et le cellulaire tombent
  - Ouvrir le centre communautaire comme centre de réchauffement et de recharge
  - Vérifier la station de pompage et la réserve d'eau potable ; émettre un avis d'ébullition si la pression baisse
  - Joindre la résidence Les Pignons et les personnes de la liste nominative qui dépendent d'un appareil électrique
  - Afficher les avis papier aux points habituels lorsque les canaux numériques ne fonctionnent plus
  - Faire le porte-à-porte au Lac-aux-Hérons et dans le rang du Ruisseau après 24 heures

**Message type**

> PANNE PROLONGÉE, Municipalité de Saint-Exemple, [date et heure]. Hydro-Québec prévoit le retour du courant [estimation]. Le centre communautaire, 12, rue de l'Église, est ouvert pour se réchauffer, recharger les appareils et boire de l'eau potable. N'utilisez jamais de génératrice ou de barbecue à l'intérieur. Information : CHEX 99,9 FM, guide Balise, 450 555-0100.

## Préparez-vous à la maison

**Visibilité :** public

Ayez à la maison de quoi tenir 72 heures sans aide :

- Eau potable, deux litres par personne par jour
- Nourriture non périssable et ouvre-boîte manuel
- Lampe frontale ou lampe de poche, piles de rechange
- Radio à piles ou à manivelle
- Batterie de secours pour le téléphone
- Trousse de premiers soins et médicaments
- Copies des papiers importants, argent comptant
- Couvertures et vêtements chauds
- Le guide Balise téléchargé sur au moins un appareil

Faites aussi un plan familial : où vous retrouver, qui prévenir, qui va chercher les enfants. Vérifiez votre couverture d'assurance pour les inondations et les refoulements d'égout.

## Bottin des ressources

**Visibilité :** restreint

Ce bottin n'existe qu'en version imprimée. Une copie papier est conservée aux deux centres de coordination, conformément au canevas.

| Ressource | Contact | Téléphone 24/7 | Remarque |
| --- | --- | --- | --- |
| Ligne d'urgence municipale | Réceptionniste ou relève | 450 555-0100 | Transférée au cellulaire du coordonnateur hors heures |
| Service incendie | Caserne 1 | 450 555-0101 | |
| Travaux publics | Garage municipal | 450 555-0102 | |
| Direction régionale du MSP | Conseiller en sécurité civile | 450 555-0140 | Demandes Québec En Alerte |
| Hydro-Québec, ligne municipale | Répartition régionale | 450 555-0141 | Ne pas diffuser |
| Fournisseur de carburant prioritaire | Pétroles Exemple inc. | 450 555-0142 | Entente, annexe 1 |
| Transport scolaire | Autobus Exemple | 450 555-0143 | 2 autobus, 1 minibus adapté |
| Radio CHEX 99,9 FM | Salle des nouvelles | 450 555-0144 | Diffuse les messages municipaux sur demande |
| Croix-Rouge, région | Répartition | 450 555-0145 | Entente de services aux sinistrés |

## Continuité des services essentiels

**Visibilité :** interne

| Service | Mesure de continuité | Responsable |
| --- | --- | --- |
| Eau potable | Génératrice à la station de pompage, réserve de 36 heures | Services techniques |
| Sécurité incendie | Caserne sur génératrice, entraide avec la municipalité voisine | Secours |
| Voirie et déneigement | Contrat privé, priorité aux accès des centres et au chemin du Lac | Services techniques |
| Télécommunications | Lien satellite au centre de coordination, radios VHF pour les missions, guide Balise hors ligne sur les portables et téléphones des membres de l'OMSC, bottin imprimé | Administration |
| Information à la population | Radio CHEX, panneaux, affichage papier, porte-à-porte | Communication |
| Électricité (non municipal) | Génératrices aux deux centres de coordination et au centre communautaire | Services techniques |

## Aspects juridiques

**Visibilité :** public, composant partagé

Le conseil peut déclarer l'état d'urgence local lorsqu'un sinistre survient ou est imminent et que les règles de fonctionnement habituelles ne permettent pas de prendre les actions immédiates requises pour protéger la vie, la santé ou l'intégrité des personnes. La déclaration vaut pour une période d'au plus 10 jours. Avant son échéance, la Municipalité peut la renouveler elle-même pour d'autres périodes d'au plus 10 jours, tant que ces conditions sont remplies. Si le conseil ne peut se réunir à temps, le maire peut déclarer l'état d'urgence pour au plus 48 heures.

Pendant l'état d'urgence, la Municipalité peut notamment contrôler l'accès aux voies de circulation et au territoire, ordonner l'évacuation ou la mise à l'abri lorsqu'il n'y a pas d'autre moyen de protection, requérir les services de personnes en mesure d'aider et réquisitionner les moyens de secours et les lieux d'hébergement privés nécessaires. Un avis de la déclaration et de tout renouvellement est donné promptement au ministre et à la municipalité régionale, et diffusé à la population par les meilleurs moyens disponibles. Ces règles découlent des articles 19 à 23 de la *Loi sur la sécurité civile visant à favoriser la résilience aux sinistres* <a id="apa-lscrs-citation-1"></a>[(Gouvernement du Québec, 2024)](#apa-lscrs-reference).

Ce texte est un composant partagé entre tous les plans produits avec Balise. Il n'est saisi qu'à un seul endroit et a été vérifié contre la version codifiée à jour au 10 juin 2026.

## Glossaire et acronymes

**Visibilité :** public, composant partagé

| Terme | Définition |
| --- | --- |
| Centre de coordination | Lieu d'où l'OMSC dirige l'intervention |
| Centre de services aux sinistrés | Lieu où les personnes touchées sont accueillies, inscrites et aidées ; peut servir de centre de réchauffement ou d'hébergement |
| Évacuation | Départ ordonné des personnes d'une zone menacée |
| Mise à l'abri | Fait de rester à l'intérieur, portes et fenêtres fermées, lorsque sortir serait plus dangereux |
| Point de rassemblement | Lieu où les personnes sans transport se regroupent pour être conduites à un centre |
| Sinistre | Événement causé par un phénomène naturel ou l'activité humaine, qui cause de graves préjudices aux personnes ou des dommages importants aux biens |
| MSP | Ministère de la Sécurité publique |
| OMSC | Organisation municipale de sécurité civile |
| RPA | Résidence privée pour aînés |
| VHF | Très haute fréquence, bande radio utilisée par les missions |

## Adoption

**Visibilité :** public

Plan adopté par le conseil municipal de Saint-Exemple le 5 octobre 2026, résolution 178-10-2026. Prochaine révision annuelle : octobre 2027.

## Références

**Visibilité :** public

<a id="apa-lscrs-reference"></a>Gouvernement du Québec. (2024). *Loi sur la sécurité civile visant à favoriser la résilience aux sinistres*, LQ 2024, c. 18, RLRQ c. S-2.4 [Version codifiée à jour au 10 juin 2026]. LégisQuébec. https://www.legisquebec.gouv.qc.ca/fr/document/lc/S-2.4
[Retour à la citation](#apa-lscrs-citation-1)

<a id="apa-msp-reference"></a>Ministère de la Sécurité publique. (2025). *Plan de sécurité civile : canevas* (Document 2025-11643, version finale) [Gabarit]. Gouvernement du Québec.
[Retour à la citation](#apa-msp-citation-1)

## Licence

**Visibilité :** public

Ce document, *Plan municipal de sécurité civile de Saint-Exemple (fictif)*, de **Christopher Steel**, rédigé avec l'aide de **Claude Opus 5.5 (Anthropic)**, est publié sous la [GNU Affero General Public License v3.0 ou ultérieure](https://www.gnu.org/licenses/agpl-3.0.html).

## Historique des versions

**Visibilité :** interne

| Version | Statut | Notes |
| --- | --- | --- |
| 0.0.3 | Ébauche, version provisoire | Aspects juridiques vérifiés contre la LSCRS codifiée à jour au 10 juin 2026 : renouvellement par la Municipalité sans autorisation du ministre (art. 19), déclaration par le maire pour 48 heures (art. 20), avis au ministre et à la municipalité régionale (art. 21), pouvoirs extraordinaires (art. 23) ; référence APA complétée ; mandat du maire précisé |
| 0.0.2 | Ébauche, version provisoire | Visibilité restreinte réservée au bottin imprimé, exclue de toute version numérique ; règles de compilation ajoutées (héritage, échec sur bloc sans visibilité, titres vides masqués) ; nom et adresse des centres de services aux sinistrés rendus publics, fiche d'installation interne ; adresse du centre ajoutée aux consignes Évacuation et Panne prolongée ; visibilité déclarée pour Avertissement, Résumé, Convention, Consignes générales, Références, Licence et Historique |
| 0.0.1 | Ébauche, version provisoire | Plan fictif initial d'après le canevas du MSP : convention de visibilité public, interne, restreint ; profil du territoire, niveaux d'alerte, OMSC, deux centres, points de rassemblement, moyens d'information avec et sans réseau ; quatre consignes générales (alerte, évacuation, mise à l'abri, panne prolongée), chacune avec partie publique, opérations internes et message type ; bottin, continuité des services, aspects juridiques et glossaire en composants partagés |
