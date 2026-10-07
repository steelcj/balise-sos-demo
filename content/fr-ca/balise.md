---
title: Balise
summary: D’où vient cette copie de Balise, quel âge elle a, comment elle reste à jour, et si le réseau répond.
relation: urn:uuid:878f8e32-6292-4bef-8bf3-5de3e882bd8d
order: 40
---
<p class="notice">Version <strong>{{ site.version }}</strong>, produite le <strong>{{ site.buildDay }}</strong>.</p>

## Deux façons d’avoir Balise sans réseau

### Sur le Web, installée

Ouvrez le site une fois avec une connexion. Le navigateur enregistre alors tout le site sur l’appareil. Ensuite il s’ouvre même sans réseau. Sur un téléphone, ajoutez-le à l’écran d’accueil.

### En fichier, téléchargée

Téléchargez le fichier zip, décompressez-le sur l’ordinateur ou une clé USB, puis ouvrez `index.html`. Aucune installation, aucun compte, aucun réseau. Pratique pour les postes partagés et les vieux ordinateurs.

<div class="only-web">
<p><a href="/download/{{ site.packageName }}.zip">Télécharger la copie hors ligne ({{ site.packageName }}.zip)</a>, et son <a href="/download/{{ site.packageName }}.zip.sha256">empreinte SHA-256</a> pour la vérifier.</p>
</div>
<div class="only-file">
<p>Vous utilisez déjà une copie téléchargée. Pour en obtenir une plus récente, vérifiez ci-dessous quand le réseau fonctionne.</p>
</div>

## Comment se font les mises à jour

### Sur le Web, installée

Chaque page s’ouvre aussitôt depuis la copie enregistrée sur l’appareil, avec ou sans réseau. Quand le réseau fonctionne, Balise va chercher discrètement la version la plus récente de cette page, que la visite suivante affichera.

Quand la municipalité publie une nouvelle version, le navigateur s’en aperçoit la prochaine fois que Balise est ouvert avec un réseau. Il télécharge toute la nouvelle version en arrière-plan et ne passe à elle qu’une fois tous les fichiers arrivés : on ne voit jamais la moitié d’une version et la moitié d’une autre. Il n’y a rien à faire.

### En fichier, téléchargée

Une copie téléchargée ne change jamais d’elle-même. Appuyez sur « Vérifier les mises à jour » ci-dessous quand le réseau fonctionne. Si une version plus récente existe, téléchargez le nouveau zip et remplacez l’ancien dossier.

### Dans les deux cas

La ligne au bas de chaque page indique la version et la date où la copie a été produite. Une copie de plus de {{ site.staleAfterDays }} jours fait passer cette ligne au rouge, pour rappeler de la mettre à jour.

## Vérifier les mises à jour

<p><button type="button" data-action="check-update">Vérifier les mises à jour</button></p>
<p class="update-result" id="update-result" aria-live="polite"></p>

## En ligne ou hors ligne

L’indicateur en haut de chaque page montre si le réseau fonctionne :

- **En ligne** : Balise a joint son serveur il y a un instant.
- **Hors ligne** : l’appareil n’a pas de réseau, ou la dernière tentative de joindre le serveur a échoué.
- **Réseau non vérifié** : l’appareil signale une connexion, mais Balise ne l’a pas encore essayée.

Appuyez sur l’indicateur pour vérifier la connexion tout de suite. Balise n’utilise le réseau que lorsqu’une page s’ouvre ou que vous le demandez : l’indicateur ne coûte rien pendant la lecture. Tout Balise fonctionne hors ligne dans tous les cas.

## Pour les responsables

Chaque procédure indique son responsable, sa date de révision et sa version. Une procédure se révise au moins une fois par an, et après chaque événement où elle a servi.
