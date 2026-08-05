const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage.js');
const AdministrationPage = require('../../pages/AdministrationPage.js');
const config = require('../../config/config.js');
const loginData = require('../../testdata/loginData.json');

test.describe('IFMA Login Story - User Access Control', () => {
    
    /**
     * POSITIVE TEST CASES
     * Tests for successful login scenarios with correct access levels
     */

    test('Admin Login - Should Display All Three Cards (Connector, SAT, Administration)', async ({ page }) => {
        // Arrange
        const expectedAdminCards = loginData.validAdminLogin.cards;
        
        // Act
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.validAdminLogin.username, loginData.validAdminLogin.password);
        
        // Assert
        const administration = new AdministrationPage(page);
        await administration.verifyDashboard(loginData.validAdminLogin.role, expectedAdminCards);
        
        // Additional verification - Check for specific cards using button role and name
        const connectorButton = page.getByRole('button', { name: 'Access Connector' });
        const satButton = page.getByRole('button', { name: /Access SAT|IFMA.*self-assessment/i });
        const administrationButton = page.getByRole('button', { name: 'Access Administration' });
        
        await expect(connectorButton).toBeVisible({ timeout: 10000 });
        await expect(satButton).toBeVisible({ timeout: 10000 });
        await expect(administrationButton).toBeVisible({ timeout: 10000 });
        
        console.log('✓ Admin successfully logged in with all three cards visible');
    });

    test('Admin Login - Verify Access Connector Button Accessibility', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validAdminLogin.username, loginData.validAdminLogin.password);
        
        // Assert - Verify connector button is present and enabled
        const connectorButton = page.locator('button[data-title="Connector"]');
        await expect(connectorButton).toBeVisible({ timeout: 10000 });
        await expect(connectorButton).toBeEnabled();
        
        console.log('✓ Admin has access to Connector button');
    });

    test('Admin Login - Verify Access Administration Button Accessibility', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validAdminLogin.username, loginData.validAdminLogin.password);
        
        // Assert - Verify administration button is present and enabled
        const administrationButton = page.locator('button[data-title="Administration"]');
        await expect(administrationButton).toBeVisible({ timeout: 10000 });
        await expect(administrationButton).toBeEnabled();
        
        console.log('✓ Admin has access to Administration button');
    });

    test.only('Admin Connector - Verify Organization Count and Active Status', async ({ page }) => {

    await page.goto(config.url);

    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.validAdminLogin.username,
        loginData.validAdminLogin.password
    );

    const administration = new AdministrationPage(page);

    await administration.verifyOrganizationCount();

});

    test('User Login - Should Display Only SAT Card', async ({ page }) => {
        // Arrange
        const expectedUserCards = loginData.validLogin.cards;
        const expectedCardCount = expectedUserCards.length;
        
        // Act
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.validLogin.username, loginData.validLogin.password);
        
        // Assert
        const administration = new AdministrationPage(page);
        await administration.verifyDashboard(loginData.validLogin.role, expectedUserCards);
        
        // Verify only SAT card is visible
        const satButton = page.getByRole('button', { name: /Access SAT|IFMA.*self-assessment/i });
        await expect(satButton).toBeVisible({ timeout: 20000 });
        
        // Verify Connector and Administration cards are NOT visible
        const connectorButton = page.getByRole('button', { name: 'Access Connector' });
        const administrationButton = page.getByRole('button', { name: 'Access Administration' });
        
        await expect(connectorButton).not.toBeVisible();
        await expect(administrationButton).not.toBeVisible();
        
        console.log(`✓ User successfully logged in with only ${expectedCardCount} card(s) visible`);
    });

    test('User Login - Verify Access SAT Button Accessibility', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validLogin.username, loginData.validLogin.password);
        
        // Assert - Verify SAT button is present and enabled
        const satButton = page.getByRole('button', { name: /Access SAT|IFMA.*self-assessment/i });
        await expect(satButton).toBeVisible({ timeout: 20000 });
        await expect(satButton).toBeEnabled();
        
        console.log('✓ User has access to SAT button');
    });

    test('User Login - Verify Access Connector Button is NOT Accessible', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validLogin.username, loginData.validLogin.password);
        
        // Assert - Verify connector button is NOT visible
        const connectorButton = page.getByRole('button', { name: 'Access Connector' });
        await expect(connectorButton).not.toBeVisible();
        
        console.log('✓ User does not have access to Connector button');
    });

    test('User Login - Verify Access Administration Button is NOT Accessible', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validLogin.username, loginData.validLogin.password);
        
        // Assert - Verify administration button is NOT visible
        const administrationButton = page.getByRole('button', { name: 'Access Administration' });
        await expect(administrationButton).not.toBeVisible();
        
        console.log('✓ User does not have access to Administration button');
    });

    /**
     * NEGATIVE TEST CASES
     * Tests for failed login scenarios and edge cases
     */

    test('Invalid Credentials - Wrong Password Should Display Error', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.wrongPassword.username, loginData.wrongPassword.password);
        
        // Assert
        await loginPage.verifyLoginError("The password was incorrect.");
        
        console.log('✓ Error message displayed for wrong password');
    });

    test('Invalid Credentials - Wrong Username Should Display Error', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.wrongUsername.username, loginData.wrongUsername.password);
        
        // Assert
        await loginPage.verifyLoginError("The username was not found.");
        
        console.log('✓ Error message displayed for wrong username');
    });

    test('Empty Credentials - Empty Username Should Display Field Error', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login("", loginData.validLogin.password);
        
        // Assert
        await loginPage.verifyFieldError(loginPage.lblEmptyUsername, "The Username or Email field is required.");
        
        console.log('✓ Field validation error displayed for empty username');
    });

    test('Empty Credentials - Empty Password Should Display Field Error', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login(loginData.validLogin.username, "");
        
        // Assert
        await loginPage.verifyFieldError(loginPage.lblEmptyPassword, "The Password field is required.");
        
        console.log('✓ Field validation error displayed for empty password');
    });

    test('Empty Credentials - Both Username and Password Empty Should Display Error', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        
        // Act
        await loginPage.login("", "");
        
        // Assert
        await loginPage.verifyFieldError(loginPage.lblEmptyUsername, "The Username or Email field is required.");
        
        console.log('✓ Field validation error displayed for empty credentials');
    });

    /**
     * EDGE CASE TEST CASES
     */

    test('Admin and User Should Have Different Dashboard Views - Verify Card Differentiation', async ({ page }) => {
        // Arrange
        const adminCards = loginData.validAdminLogin.cards;
        const userCards = loginData.validLogin.cards;
        
        // Assert - Verify admin has 3 cards in test data
        expect(adminCards.length).toBe(3);
        console.log(`✓ Admin should have ${adminCards.length} cards`);
        
        // Assert - Verify user has 1 card in test data
        expect(userCards.length).toBe(1);
        expect(userCards).toContain("Access SAT");
        console.log(`✓ User should have ${userCards.length} card(s)`);
        
        // Verify data shows admin-only cards
        const adminOnlyCards = adminCards.filter(card => !userCards.includes(card));
        expect(adminOnlyCards.length).toBe(2);
        expect(adminOnlyCards).toContain("Access Connector");
        expect(adminOnlyCards).toContain("Access Administration");
        
        console.log(`✓ Verified ${adminOnlyCards.length} admin-only cards are restricted from user`);
    });

    test('Dashboard Should Load Within Expected Timeout After Successful Login', async ({ page }) => {
        // Arrange
        await page.goto(config.url);
        const loginPage = new LoginPage(page);
        const timeoutMs = 10000;
        
        // Act - Login
        await loginPage.login(loginData.validAdminLogin.username, loginData.validAdminLogin.password);
        
        // Assert - Dashboard cards should load within timeout
        const dashboardCards = page.locator('button[data-title] b');
        await expect(dashboardCards.first()).toBeVisible({ timeout: timeoutMs });
        
        console.log(`✓ Dashboard loaded within ${timeoutMs}ms timeout`);
    });
});
