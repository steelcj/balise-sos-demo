---
title: Cette copie
summary: D’où vient cette copie du site, quel âge elle a, et comment la garder à jour.
relation: urn:uuid:878f8e32-6292-4bef-8bf3-5de3e882bd8d
order: 40
---
<p class="notice">Version <strong>{{ site.version }}</strong>, produite le <strong>{{ site.buildDay }}</strong>.</p>

## Deux façons d’avoir Balise sans réseau

**Sur le Web, installée.** Ouvrez le site une fois avec une connexion. Le navigateur enregistre alors tout le site sur l’appareil. Ensuite il s’ouvre même sans réseau, et se met à jour seul chaque fois que le réseau revient. Sur un téléphone, ajoutez-le à l’écran d’accueil.

**En fichier, téléchargée.** Téléchargez le fichier zip, décompressez-le sur l’ordinateur ou une clé USB, puis ouvrez `index.html`. Aucune installation, aucun compte, aucun réseau. Pratique pour les postes partagés et les vieux ordinateurs.

<div class="only-web">
<p><a href="/download/{{ site.packageName }}.zip">Télécharger la copie hors ligne ({{ site.packageName }}.zip)</a>, et son <a href="/download/{{ site.packageName }}.zip.sha256">empreinte SHA-256</a> pour la vérifier.</p>
</div>
<div class="only-file">
<p>Vous utilisez déjà une copie téléchargée. Pour en obtenir une plus récente, vérifiez ci-dessous quand le réseau fonctionne.</p>
</div>

## Vérifier les mises à jour

<p><button type="button" data-action="check-update">Vérifier les mises à jour</button></p>
<p class="update-result" id="update-result" aria-live="polite"></p>

Une copie de plus de {{ site.staleAfterDays }} jours affiche un avertissement en bas de chaque page.

## Pour les responsables

Chaque procédure indique son responsable, sa date de révision et sa version. Une procédure se révise au moins une fois par an, et après chaque événement où elle a servi.
