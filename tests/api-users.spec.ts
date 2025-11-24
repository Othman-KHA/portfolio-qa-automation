import { test, expect } from '@playwright/test';

test.describe('Tests API - Gestion Utilisateurs', () => {

  test('Création d\'un client via API (Simulation CRM)', async ({ request }) => {
    // On change pour JSONPlaceholder qui est plus stable pour les démos
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Nouveau Client Manutan',
        body: 'Profil QA Automation',
        userId: 1
      }
    });

    // JSONPlaceholder renvoie 201 (Created)
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Réponse API:', responseBody);
    
    // Vérifications
    expect(responseBody.title).toBe('Nouveau Client Manutan');
    expect(responseBody.id).toBeDefined();
  });

  test('Récupération liste clients (Performance)', async ({ request }) => {
    const start = Date.now();
    // On récupère un post existant
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const end = Date.now();
    
    expect(response.status()).toBe(200);
    
    // Vérification Perf (< 1 seconde)
    expect(end - start).toBeLessThan(1000); 
  });
});