/* ============================================
   CONTROL FINANCIERO Y PORTAFOLIO - APP.JS
   Lógica principal de la aplicación
   ============================================ */

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================

const APP_CONFIG = {
    storageKey: 'financeAppData',
    demoUser: {
        email: 'demo@test.com',
        password: 'demo123',
        name: 'Demo Usuario'
    }
};

// Perfiles de riesgo y sus características
const RISK_PROFILES = {
    conservador: {
        name: 'Conservador',
        icon: '🛡️',
        description: 'Prioriza la seguridad y preservación del capital con bajo riesgo',
        fixedIncome: 60,
        equity: 40,
        expectedReturn: 5,
        volatility: 'Baja',
        suitable: 'Personas cercanas a jubilación o con baja tolerancia al riesgo'
    },
    moderado: {
        name: 'Moderado',
        icon: '⚖️',
        description: 'Busca balance entre crecimiento y seguridad',
        fixedIncome: 50,
        equity: 50,
        expectedReturn: 7.5,
        volatility: 'Media',
        suitable: 'Inversores con horizonte de 5-10 años'
    },
    agresivo: {
        name: 'Agresivo',
        icon: '🚀',
        description: 'Maximiza rendimientos aceptando mayor volatilidad',
        fixedIncome: 30,
        equity: 70,
        expectedReturn: 10,
        volatility: 'Alta',
        suitable: 'Inversores jóvenes con largo horizonte temporal'
    }
};

// Categorías de gastos con palabras clave
const EXPENSE_CATEGORIES = {
    'Vivienda': ['renta', 'hipoteca', 'alquiler', 'luz', 'agua', 'gas', 'internet', 'teléfono', 'seguro hogar', 'mantenimiento'],
    'Transporte': ['uber', 'taxi', 'gasolina', 'gasolinera', 'bus', 'metro', 'auto', 'coche', 'peaje', 'estacionamiento', 'repuesto', 'mantenimiento auto'],
    'Alimentación': ['supermercado', 'mercado', 'restaurante', 'comida', 'almuerzo', 'cena', 'desayuno', 'café', 'pan', 'leche'],
    'Entretenimiento': ['cine', 'netflix', 'spotify', 'juegos', 'bar', 'discoteca', 'concierto', 'viaje', 'vacacion'],
    'Servicios': ['seguro', 'médico', 'doctor', 'hospital', 'farmacia', 'dentista', 'gimnasio', 'suscripción'],
    'Salud': ['farmacia', 'doctor', 'médico', 'hospital', 'dentista', 'psicólogo'],
    'Educación': ['escuela', 'universidad', 'curso', 'libros', 'tutoria'],
    'Otros': []
};

// Indicadores de salud financiera estándar
const HEALTH_INDICATORS = {
    savingRatio: {
        ideal: 20,
        good: 15,
        critical: 5
    },
    debtToIncome: {
        critical: 50,
        warning: 36,
        good: 20
    },
    emergencyFund: {
        target: 6, // meses
        minimum: 3
    }
};

// ============================================
// GESTIÓN DE DATOS
// ============================================

class FinanceAppData {
    constructor() {
        this.users = {};
        this.currentUserId = null;
        this.loadFromStorage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem(APP_CONFIG.storageKey);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.users = data.users || {};
                this.currentUserId = data.currentUserId || null;
            } catch (e) {
                console.error('Error al cargar datos:', e);
                this.initializeDemoData();
            }
        } else {
            this.initializeDemoData();
        }
    }

    saveToStorage() {
        const data = {
            users: this.users,
            currentUserId: this.currentUserId,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(data));
    }

    initializeDemoData() {
        this.users = {
            'demo': {
                id: 'demo',
                email: 'demo@test.com',
                name: 'Demo Usuario',
                profile: {
                    monthlyIncome: 3000,
                    totalDebt: 5000,
                    emergencyFund: 3000
                },
                expenses: [
                    { id: '1', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0], amount: 150, category: 'Alimentación', description: 'Compra supermercado' },
                    { id: '2', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0], amount: 45, category: 'Transporte', description: 'Gasolina' },
                    { id: '3', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], amount: 50, category: 'Entretenimiento', description: 'Netflix' },
                    { id: '4', date: new Date().toISOString().split('T')[0], amount: 200, category: 'Vivienda', description: 'Servicios e internet' }
                ],
                riskProfile: 'moderado',
                portfolio: {
                    totalAmount: 10000,
                    profile: 'moderado'
                }
            }
        };
        this.currentUserId = 'demo';
        this.saveToStorage();
    }

    getCurrentUser() {
        if (!this.currentUserId || !this.users[this.currentUserId]) {
            return null;
        }
        return this.users[this.currentUserId];
    }

    setCurrentUser(userId) {
        if (this.users[userId]) {
            this.currentUserId = userId;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    createUser(email, password, name) {
        const userId = email.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (this.users[userId]) {
            return null; // Usuario ya existe
        }
        this.users[userId] = {
            id: userId,
            email,
            name,
            password: password, // En producción, esto sería hasheado
            profile: {
                monthlyIncome: 0,
                totalDebt: 0,
                emergencyFund: 0
            },
            expenses: [],
            riskProfile: 'moderado',
            portfolio: {}
        };
        this.saveToStorage();
        return this.users[userId];
    }

    authenticateUser(email, password) {
        const userId = email.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (this.users[userId] && this.users[userId].password === password) {
            this.currentUserId = userId;
            this.saveToStorage();
            return this.users[userId];
        }
        return null;
    }

    updateUserProfile(updates) {
        const user = this.getCurrentUser();
        if (!user) return false;
        Object.assign(user.profile, updates);
        this.saveToStorage();
        return true;
    }

    addExpense(expense) {
        const user = this.getCurrentUser();
        if (!user) return false;
        expense.id = Date.now().toString();
        user.expenses.push(expense);
        this.saveToStorage();
        return true;
    }

    deleteExpense(expenseId) {
        const user = this.getCurrentUser();
        if (!user) return false;
        user.expenses = user.expenses.filter(e => e.id !== expenseId);
        this.saveToStorage();
        return true;
    }

    updateRiskProfile(profile) {
        const user = this.getCurrentUser();
        if (!user) return false;
        user.riskProfile = profile;
        this.saveToStorage();
        return true;
    }

    updatePortfolio(portfolio) {
        const user = this.getCurrentUser();
        if (!user) return false;
        user.portfolio = portfolio;
        this.saveToStorage();
        return true;
    }

    logout() {
        this.currentUserId = null;
        this.saveToStorage();
    }
}

// ============================================
// UTILIDADES Y CÁLCULOS
// ============================================

class FinanceCalculator {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    static formatPercentage(value, decimals = 1) {
        return (value).toFixed(decimals) + '%';
    }

    static categorizeExpense(description) {
        const lowerDesc = description.toLowerCase();
        for (const [category, keywords] of Object.entries(EXPENSE_CATEGORIES)) {
            if (keywords.some(keyword => lowerDesc.includes(keyword))) {
                return category;
            }
        }
        return 'Otros';
    }

    static calculateMonthlyExpenses(expenses, monthsBack = 1) {
        const now = new Date();
        const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 1);
        return expenses.filter(e => new Date(e.date) >= cutoffDate)
            .reduce((sum, e) => sum + e.amount, 0);
    }

    static getExpensesByCategory(expenses) {
        const grouped = {};
        expenses.forEach(expense => {
            grouped[expense.category] = (grouped[expense.category] || 0) + expense.amount;
        });
        return grouped;
    }

    static calculateHealthIndicators(profile, expenses) {
        const monthlyExpense = this.calculateMonthlyExpenses(expenses, 1);
        const monthlySaving = Math.max(0, profile.monthlyIncome - monthlyExpense);
        const savingRatio = profile.monthlyIncome > 0 ? (monthlySaving / profile.monthlyIncome) * 100 : 0;
        const debtRatio = profile.monthlyIncome > 0 ? (profile.totalDebt / profile.monthlyIncome) * 100 : 0;
        const emergencyFundMonths = profile.monthlyIncome > 0 ? profile.emergencyFund / profile.monthlyIncome : 0;

        return {
            savingRatio: savingRatio.toFixed(1),
            debtRatio: debtRatio.toFixed(1),
            emergencyFundMonths: emergencyFundMonths.toFixed(1),
            monthlySaving: monthlySaving.toFixed(2),
            monthlyExpense: monthlyExpense.toFixed(2),
            debtPayoffMonths: profile.totalDebt > 0 && monthlySaving > 0 ? (profile.totalDebt / monthlySaving).toFixed(0) : 'N/A'
        };
    }

    static getHealthStatus(indicators) {
        const status = {
            savingRatio: indicators.savingRatio >= 20 ? 'Excelente' : indicators.savingRatio >= 15 ? 'Bueno' : indicators.savingRatio >= 5 ? 'Aceptable' : 'Crítico',
            debtRatio: indicators.debtRatio <= 20 ? 'Excelente' : indicators.debtRatio <= 36 ? 'Aceptable' : 'Preocupante',
            emergencyFund: indicators.emergencyFundMonths >= 6 ? 'Completo' : indicators.emergencyFundMonths >= 3 ? 'Parcial' : 'Insuficiente'
        };
        return status;
    }
}

// ============================================
// GESTIÓN DE UI
// ============================================

class UIManager {
    constructor() {
        this.authModal = document.getElementById('authModal');
        this.appContainer = document.getElementById('appContainer');
        this.userDisplayName = document.getElementById('userDisplayName');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Autenticación
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const authTabs = document.querySelectorAll('.auth-tab-btn');

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());

        authTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchAuthTab(tab));
        });

        // Navegación de módulos
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchModule(btn.dataset.module);
            });
        });

        // Gastos
        document.getElementById('expenseForm').addEventListener('submit', (e) => this.handleAddExpense(e));
        document.getElementById('filterMonth').valueAsDate = new Date();

        // Salud Financiera
        document.getElementById('healthDataForm').addEventListener('submit', (e) => this.handleUpdateHealthData(e));

        // Portafolio
        document.getElementById('riskQuestionnaireForm').addEventListener('submit', (e) => this.handleRiskQuestionnaire(e));
        document.getElementById('portfolioForm').addEventListener('submit', (e) => this.handlePortfolioSubmit(e));

        // Inicializar input de fecha actual
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expenseDateInput').value = today;
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab + '-tab';
        document.getElementById(tabId).classList.add('active');
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = appData.authenticateUser(email, password);
        if (user) {
            this.showApp();
            this.renderApp();
        } else {
            alert('Email o contraseña incorrectos');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;

        if (password !== confirm) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const user = appData.createUser(email, password, name);
        if (user) {
            appData.authenticateUser(email, password);
            this.showApp();
            this.renderApp();
        } else {
            alert('Este email ya está registrado');
        }
    }

    handleLogout() {
        if (confirm('¿Deseas cerrar sesión?')) {
            appData.logout();
            this.showAuth();
            this.resetForms();
        }
    }

    showAuth() {
        this.authModal.classList.add('active');
        this.appContainer.style.display = 'none';
    }

    showApp() {
        this.authModal.classList.remove('active');
        this.appContainer.style.display = 'block';
        const user = appData.getCurrentUser();
        if (user) {
            this.userDisplayName.textContent = user.name;
        }
    }

    switchModule(moduleName) {
        document.querySelectorAll('.module-section').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        const module = document.getElementById(moduleName);
        const btn = document.querySelector(`[data-module="${moduleName}"]`);
        
        if (module) {
            module.classList.add('active');
        }
        if (btn) {
            btn.classList.add('active');
        }
    }

    handleAddExpense(e) {
        e.preventDefault();
        const date = document.getElementById('expenseDateInput').value;
        const amount = parseFloat(document.getElementById('expenseAmountInput').value);
        const description = document.getElementById('expenseDescriptionInput').value;
        let category = document.getElementById('expenseCategoryInput').value;

        if (!category) {
            category = FinanceCalculator.categorizeExpense(description);
        }

        const expense = { date, amount, description, category };
        if (appData.addExpense(expense)) {
            document.getElementById('expenseForm').reset();
            document.getElementById('expenseDateInput').value = new Date().toISOString().split('T')[0];
            this.renderApp();
            this.showSuccess('Gasto registrado exitosamente');
        }
    }

    handleUpdateHealthData(e) {
        e.preventDefault();
        const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
        const totalDebt = parseFloat(document.getElementById('totalDebt').value);
        const emergencyFund = parseFloat(document.getElementById('emergencyFund').value);

        appData.updateUserProfile({
            monthlyIncome,
            totalDebt,
            emergencyFund
        });

        this.renderApp();
        this.showSuccess('Información financiera actualizada');
    }

    handleRiskQuestionnaire(e) {
        e.preventDefault();
        // Aquí iría lógica para calcular perfil basado en respuestas
        // Por ahora usamos selección manual
    }

    handlePortfolioSubmit(e) {
        e.preventDefault();
        const totalAmount = parseFloat(document.getElementById('portfolioAmount').value);
        const fixedIncome = parseFloat(document.getElementById('fixedIncomePercent').value);
        const equity = parseFloat(document.getElementById('equityPercent').value);

        if (fixedIncome + equity !== 100) {
            alert('La suma de porcentajes debe ser 100%');
            return;
        }

        appData.updatePortfolio({
            totalAmount,
            fixedIncome,
            equity
        });

        this.renderApp();
        this.showSuccess('Portafolio guardado exitosamente');
    }

    resetForms() {
        document.querySelectorAll('form').forEach(form => form.reset());
    }

    showSuccess(message) {
        alert('✓ ' + message);
    }

    renderApp() {
        this.renderDashboard();
        this.renderExpenses();
        this.renderHealthFinancial();
        this.renderPortfolio();
    }

    renderDashboard() {
        const user = appData.getCurrentUser();
        if (!user) return;

        const { profile, expenses } = user;
        const monthlyExpense = FinanceCalculator.calculateMonthlyExpenses(expenses, 1);
        const balance = profile.monthlyIncome - monthlyExpense;
        const savingRate = profile.monthlyIncome > 0 ? ((balance / profile.monthlyIncome) * 100).toFixed(1) : 0;

        document.getElementById('dashIncome').textContent = FinanceCalculator.formatCurrency(profile.monthlyIncome);
        document.getElementById('dashExpenses').textContent = FinanceCalculator.formatCurrency(monthlyExpense);
        document.getElementById('dashBalance').textContent = FinanceCalculator.formatCurrency(balance);
        document.getElementById('dashSavingsRate').textContent = savingRate + '%';

        this.renderExpensesChart(expenses);
        this.renderEvolutionChart(expenses);
    }

    renderExpenses() {
        const user = appData.getCurrentUser();
        if (!user) return;

        const tbody = document.getElementById('expensesTableBody');
        tbody.innerHTML = '';

        if (user.expenses.length === 0) {
            tbody.innerHTML = '<tr class="empty-state"><td colspan="5">Sin gastos registrados</td></tr>';
            return;
        }

        const sortedExpenses = [...user.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
        sortedExpenses.forEach(expense => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td class="text-danger">${FinanceCalculator.formatCurrency(expense.amount)}</td>
                <td><button class="btn btn-danger" onclick="deleteExpenseHandler('${expense.id}')">Eliminar</button></td>
            `;
        });

        this.renderCategorySummary(user.expenses);
    }

    renderCategorySummary(expenses) {
        const byCategory = FinanceCalculator.getExpensesByCategory(expenses);
        const summary = document.getElementById('categorySummary');
        summary.innerHTML = '';

        Object.entries(byCategory).forEach(([category, total]) => {
            summary.innerHTML += `
                <div class="category-item">
                    <div class="category-item-name">${category}</div>
                    <div class="category-item-amount">${FinanceCalculator.formatCurrency(total)}</div>
                </div>
            `;
        });
    }

    renderHealthFinancial() {
        const user = appData.getCurrentUser();
        if (!user) return;

        const indicators = FinanceCalculator.calculateHealthIndicators(user.profile, user.expenses);
        const status = FinanceCalculator.getHealthStatus(indicators);

        // Actualizar inputs
        document.getElementById('monthlyIncome').value = user.profile.monthlyIncome;
        document.getElementById('totalDebt').value = user.profile.totalDebt;
        document.getElementById('emergencyFund').value = user.profile.emergencyFund;

        // Actualizar indicadores
        document.getElementById('healthIndicator1').textContent = FinanceCalculator.formatPercentage(indicators.savingRatio);
        document.getElementById('healthIndicator2').textContent = FinanceCalculator.formatPercentage(indicators.debtRatio);
        document.getElementById('healthIndicator3').textContent = indicators.emergencyFundMonths + ' meses';
        document.getElementById('healthIndicator4').textContent = FinanceCalculator.formatPercentage(indicators.debtRatio);

        // Análisis detallado
        const analysis = `
            <h4>Resumen de tu Salud Financiera</h4>
            <p><strong>Ratio de Ahorro:</strong> ${indicators.savingRatio}% (${status.savingRatio})</p>
            <p><strong>Ahorro Mensual:</strong> ${FinanceCalculator.formatCurrency(indicators.monthlySaving)}</p>
            <p><strong>Gasto Mensual:</strong> ${FinanceCalculator.formatCurrency(indicators.monthlyExpense)}</p>
            <p><strong>Deuda Total:</strong> ${FinanceCalculator.formatCurrency(user.profile.totalDebt)}</p>
            <p><strong>Ratio Deuda/Ingresos:</strong> ${indicators.debtRatio}% (${status.debtRatio})</p>
            <p><strong>Fondo de Emergencia:</strong> ${indicators.emergencyFundMonths} meses (${status.emergencyFund})</p>
            ${indicators.debtPayoffMonths !== 'N/A' ? `<p><strong>Meses para pagar deuda:</strong> ${indicators.debtPayoffMonths} meses</p>` : ''}
        `;
        document.getElementById('healthAnalysis').innerHTML = analysis;

        // Recomendaciones
        this.generateHealthRecommendations(indicators, status, user.profile);
    }

    generateHealthRecommendations(indicators, status, profile) {
        const recommendations = document.getElementById('healthRecommendations');
        recommendations.innerHTML = '';

        const recs = [];

        if (indicators.savingRatio < 20) {
            recs.push({
                type: 'warning',
                title: 'Aumenta tu Ratio de Ahorro',
                text: `Actualmente ahorras el ${indicators.savingRatio}% de tus ingresos. Intenta alcanzar al menos el 20%.`
            });
        }

        if (indicators.debtRatio > 36) {
            recs.push({
                type: 'danger',
                title: 'Alto Endeudamiento',
                text: `Tu deuda es el ${indicators.debtRatio}% de tus ingresos. Considera pagar deuda antes de invertir.`
            });
        }

        if (indicators.emergencyFundMonths < 3) {
            recs.push({
                type: 'warning',
                title: 'Fondo de Emergencia Insuficiente',
                text: `Tienes solo ${indicators.emergencyFundMonths} meses de fondo. Intenta acumular 6 meses.`
            });
        }

        if (indicators.savingRatio >= 20 && indicators.debtRatio <= 20 && indicators.emergencyFundMonths >= 6) {
            recs.push({
                type: 'success',
                title: '¡Excelente Salud Financiera!',
                text: 'Tu situación financiera es sólida. Considera invertir para multiplicar tu riqueza.'
            });
        }

        recs.forEach(rec => {
            recommendations.innerHTML += `
                <div class="alert-item ${rec.type}">
                    <div class="alert-icon">${rec.type === 'success' ? '✓' : rec.type === 'danger' ? '⚠️' : '⚡'}</div>
                    <div class="alert-content">
                        <div class="alert-title">${rec.title}</div>
                        <div class="alert-description">${rec.text}</div>
                    </div>
                </div>
            `;
        });
    }

    renderPortfolio() {
        const user = appData.getCurrentUser();
        if (!user) return;

        const profileKey = user.riskProfile;
        const profile = RISK_PROFILES[profileKey];

        if (!profile) return;

        // Mostrar resultado del perfil
        document.getElementById('riskProfileResult').style.display = 'block';
        document.getElementById('profileName').textContent = profile.name;
        document.getElementById('profileDescription').textContent = profile.description;
        document.getElementById('fixedIncome-percent').textContent = profile.fixedIncome + '%';
        document.getElementById('equity-percent').textContent = profile.equity + '%';
        document.getElementById('fixedIncomeBar').style.width = profile.fixedIncome + '%';
        document.getElementById('equityBar').style.width = profile.equity + '%';

        // Configurar inputs del portafolio
        if (user.portfolio.fixedIncome) {
            document.getElementById('fixedIncomePercent').value = user.portfolio.fixedIncome;
            document.getElementById('equityPercent').value = user.portfolio.equity;
            document.getElementById('portfolioAmount').value = user.portfolio.totalAmount || 0;
            this.updatePortfolioPreview();
        }

        // Mostrar tabla de comparativa
        this.renderPortfolioComparison();

        // Mostrar detalles si existe portafolio
        if (user.portfolio.totalAmount) {
            document.getElementById('portfolioDetails').style.display = 'block';
            this.renderPortfolioChart(user.portfolio);
            this.renderAssetsTable(user.portfolio);
            this.generatePortfolioAlerts(user);
        }
    }

    updatePortfolioPreview() {
        const amount = parseFloat(document.getElementById('portfolioAmount').value) || 0;
        const fixed = (parseFloat(document.getElementById('fixedIncomePercent').value) || 0) / 100;
        const equity = (parseFloat(document.getElementById('equityPercent').value) || 0) / 100;

        document.getElementById('previewFixed').textContent = FinanceCalculator.formatCurrency(amount * fixed);
        document.getElementById('previewEquity').textContent = FinanceCalculator.formatCurrency(amount * equity);
    }

    renderPortfolioComparison() {
        // Tabla ya existe en HTML
    }

    renderPortfolioChart(portfolio) {
        const ctx = document.getElementById('portfolioChart');
        if (!ctx) return;

        // Destruir gráfico anterior si existe
        if (window.portfolioChart) {
            window.portfolioChart.destroy();
        }

        window.portfolioChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Renta Fija (Bonos)', 'Renta Variable (Acciones)'],
                datasets: [{
                    data: [portfolio.fixedIncome || 50, portfolio.equity || 50],
                    backgroundColor: ['#3b82f6', '#10b981'],
                    borderColor: ['#1e40af', '#047857'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderAssetsTable(portfolio) {
        const tbody = document.getElementById('assetsTableBody');
        tbody.innerHTML = '';

        const assets = [
            { name: 'Renta Fija (Bonos, Depósitos)', percentage: portfolio.fixedIncome, return: 4 },
            { name: 'Renta Variable (Acciones, ETFs)', percentage: portfolio.equity, return: 10 }
        ];

        const totalAmount = portfolio.totalAmount || 0;
        assets.forEach(asset => {
            const amount = (totalAmount * asset.percentage) / 100;
            tbody.innerHTML += `
                <tr>
                    <td>${asset.name}</td>
                    <td>${asset.percentage}%</td>
                    <td>${FinanceCalculator.formatCurrency(amount)}</td>
                    <td>${asset.return}%</td>
                    <td>${asset.percentage <= 50 ? '🟢 Baja' : '🟡 Media'}</td>
                </tr>
            `;
        });

        // Actualizar información del portafolio
        const expectedReturn = ((portfolio.fixedIncome * 4) + (portfolio.equity * 10)) / 100;
        document.getElementById('portfolioTotalAmount').textContent = FinanceCalculator.formatCurrency(totalAmount);
        document.getElementById('expectedReturn').textContent = expectedReturn.toFixed(2) + '%';
        document.getElementById('potentialRisk').textContent = portfolio.equity > 60 ? 'Alto' : portfolio.equity > 40 ? 'Medio' : 'Bajo';
    }

    generatePortfolioAlerts(user) {
        const alerts = document.getElementById('portfolioAlerts');
        alerts.innerHTML = '';

        const portfolio = user.portfolio;
        const indicators = FinanceCalculator.calculateHealthIndicators(user.profile, user.expenses);

        const alertsList = [];

        if (indicators.debtRatio > 36 && portfolio.equity > 50) {
            alertsList.push({
                type: 'warning',
                title: 'Alto Endeudamiento',
                text: 'Considera reducir tu exposición a renta variable y enfocarte en pagar deuda.'
            });
        }

        if (indicators.emergencyFundMonths < 3) {
            alertsList.push({
                type: 'danger',
                title: 'Fondo de Emergencia Insuficiente',
                text: 'Antes de invertir más, asegúrate de tener 3-6 meses de gastos ahorrados.'
            });
        }

        if (indicators.savingRatio < 10 && portfolio.totalAmount > 0) {
            alertsList.push({
                type: 'warning',
                title: 'Bajo Margen de Ahorro',
                text: 'Tu capacidad de ahorro es limitada. Considera revisar tu portafolio.'
            });
        }

        if (alertsList.length === 0) {
            alertsList.push({
                type: 'success',
                title: '✓ Tu portafolio está bien configurado',
                text: 'Mantén tus inversiones a largo plazo y revisa regularmente tu asignación.'
            });
        }

        alertsList.forEach(alert => {
            alerts.innerHTML += `
                <div class="alert-item ${alert.type}">
                    <div class="alert-icon">${alert.type === 'success' ? '✓' : '⚠️'}</div>
                    <div class="alert-content">
                        <div class="alert-title">${alert.title}</div>
                        <div class="alert-description">${alert.text}</div>
                    </div>
                </div>
            `;
        });
    }

    renderExpensesChart(expenses) {
        const ctx = document.getElementById('expensesChart');
        if (!ctx) return;

        const byCategory = FinanceCalculator.getExpensesByCategory(expenses);
        const labels = Object.keys(byCategory);
        const data = Object.values(byCategory);
        const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1'];

        if (window.expensesChartInstance) {
            window.expensesChartInstance.destroy();
        }

        window.expensesChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + FinanceCalculator.formatCurrency(context.parsed);
                            }
                        }
                    }
                }
            }
        });
    }

    renderEvolutionChart(expenses) {
        const ctx = document.getElementById('evolutionChart');
        if (!ctx) return;

        // Agrupar gastos por mes
        const monthlyData = {};
        expenses.forEach(expense => {
            const date = new Date(expense.date);
            const monthKey = date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit' });
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + expense.amount;
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        const data = sortedMonths.map(m => monthlyData[m]);

        if (window.evolutionChartInstance) {
            window.evolutionChartInstance.destroy();
        }

        window.evolutionChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedMonths,
                datasets: [{
                    label: 'Gastos Mensuales',
                    data,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#4f46e5',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return 'Gastos: ' + FinanceCalculator.formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => FinanceCalculator.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// MANEJADORES GLOBALES
// ============================================

let appData = new FinanceAppData();
let uiManager = new UIManager();

function deleteExpenseHandler(expenseId) {
    if (confirm('¿Deseas eliminar este gasto?')) {
        appData.deleteExpense(expenseId);
        uiManager.renderApp();
    }
}

function selectProfile(profileKey) {
    appData.updateRiskProfile(profileKey);
    uiManager.renderApp();
}

function scrollToModule(moduleName) {
    uiManager.switchModule(moduleName);
}

function applyFilters() {
    // Lógica de filtros si es necesaria
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const user = appData.getCurrentUser();
    if (user) {
        uiManager.showApp();
        uiManager.renderApp();
    } else {
        uiManager.showAuth();
    }
});
