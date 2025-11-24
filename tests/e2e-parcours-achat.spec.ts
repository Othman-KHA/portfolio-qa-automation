import { test, expect } from '@playwright/test';

// Données de test (Data Driven) - Simulation de plusieurs profils
const UTILISATEURS = [
  { id: 'standard_user', pass: 'secret_sauce', actif: true },
  { id: 'problem_user', pass: 'secret_sauce', actif: true }
];

test.describe('Parcours E-commerce B2B - SauceDemo', () => {

  // Ce code s'exécute avant chaque test (Setup)
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // POC 1 : Boucle sur les utilisateurs (Data Driven Testing)
  for (const user of UTILISATEURS) {
    test(`Connexion et Vérification Stock pour ${user.id}`, async ({ page }) => {
      // Login
      await page.fill('[data-test="username"]', user.id);
      await page.fill('[data-test="password"]', user.pass);
      await page.click('[data-test="login-button"]');
      
      // Vérification que l'inventaire est visible (Page Object Pattern simplifié)
      await expect(page.locator('.inventory_list')).toBeVisible();
      console.log(`Login succès pour ${user.id}`);
    });
  }

  // POC 2 : Tunnel d'achat complet (E2E)
  test('Tunnel d\'achat complet : De la sélection au paiement', async ({ page }) => {
    // 1. Login Rapide
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // 2. Ajout au panier (Simulation choix produit logistique)
    // Utilisation de locators robustes (pas de xpath fragile)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // 3. Vérification Panier
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await page.click('[data-test="checkout"]');

    // 4. Informations de Livraison (Input Data)
    await page.fill('[data-test="firstName"]', 'Othman');
    await page.fill('[data-test="lastName"]', 'ManutanTest');
    await page.fill('[data-test="postalCode"]', '95200'); // Clin d'oeil Sarcelles
    await page.click('[data-test="continue"]');

    // 5. Validation finale
    await page.click('[data-test="finish"]');
    
    // Assertion finale (Le test réussit si on voit le message)
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});