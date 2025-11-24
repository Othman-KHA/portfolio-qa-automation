# Documentation des règles métier (BDD)

Fonctionnalité: Gestion des commandes B2B

  Contexte:
    Etant donné que je suis un acheteur connecté avec le profil "Standard"

  Scénario: Validation d'une commande avec stock disponible
    Quand j'ajoute le produit "Diable Manutan ref-123" au panier
    Et que je renseigne le code postal "95500" pour l'entrepôt Gonesse
    Alors les frais de port doivent être calculés automatiquement
    Et le bouton "Valider le devis" doit être actif

  Scénario: Gestion de la rupture de stock (Edge Case)
    Quand j'ajoute 500 unités du produit "Ramettes A4"
    Mais que le stock disponible est de 200 unités
    Alors je dois voir un message d'alerte "Stock partiel disponible"
    Et une proposition de livraison fractionnée doit apparaître