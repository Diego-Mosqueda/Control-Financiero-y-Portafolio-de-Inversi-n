# 🏗️ ARQUITECTURA TÉCNICA

## Sistema de Control Financiero y Portafolio

---

## 📁 Estructura de Carpetas

```
Control Financiero y Portafolio de Inversión/
├── index.html              # Estructura HTML principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica principal
├── README.md               # Documentación completa
├── QUICK_START.md          # Guía rápida
├── ARCHITECTURE.md         # Este archivo
└── assets/
    ├── css/                # Hojas de estilo adicionales (futuro)
    └── img/                # Imágenes y recursos
```

---

## 🏛️ Arquitectura General

```
┌─────────────────────────────────────────────┐
│         HTML (index.html)                   │
│  ├─ Estructura semántica                    │
│  ├─ Componentes UI                          │
│  └─ Elementos interactivos                  │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│         CSS (styles.css)                    │
│  ├─ Variables CSS                           │
│  ├─ Componentes reutilizables               │
│  ├─ Responsive design                       │
│  └─ Animaciones                             │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│         JavaScript (app.js)                 │
│  ├─ FinanceAppData (Gestión de datos)      │
│  ├─ FinanceCalculator (Cálculos)           │
│  ├─ UIManager (Interfaz)                    │
│  └─ Manejadores globales                    │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│    localStorage (Persistencia)              │
│  └─ financeAppData JSON                     │
└─────────────────────────────────────────────┘
```

---

## 📊 Diagrama de Flujo de Datos

```
Usuario
   │
   ├─→ Autenticación
   │   ├─ Login
   │   ├─ Registro
   │   └─ Demo
   │
   ├─→ Dashboard
   │   ├─ KPI Calculos
   │   ├─ Gráficos
   │   └─ Resumen
   │
   ├─→ Gastos
   │   ├─ Registrar
   │   ├─ Categorizar
   │   ├─ Almacenar
   │   └─ Mostrar
   │
   ├─→ Salud Financiera
   │   ├─ Obtener Datos
   │   ├─ Calcular Indicadores
   │   ├─ Generar Recomendaciones
   │   └─ Mostrar Análisis
   │
   ├─→ Portafolio
   │   ├─ Seleccionar Perfil
   │   ├─ Configurar Activos
   │   ├─ Calcular Rentabilidad
   │   └─ Mostrar Alertas
   │
   └─→ Logout
       └─ Limpiar Sesión
```

---

## 🧠 Clases y Funcionalidades

### 1. FinanceAppData (Gestión de Datos)

```javascript
class FinanceAppData {
    // Propiedades
    users             // Objeto con todos los usuarios
    currentUserId     // ID del usuario actual
    
    // Métodos
    loadFromStorage()           // Cargar de localStorage
    saveToStorage()             // Guardar a localStorage
    createUser()                // Crear nueva cuenta
    authenticateUser()          // Autenticar usuario
    updateUserProfile()         // Actualizar datos
    addExpense()                // Agregar gasto
    deleteExpense()             // Eliminar gasto
    updateRiskProfile()         // Cambiar perfil de riesgo
    updatePortfolio()           // Guardar portafolio
    logout()                    // Cerrar sesión
}
```

**Estructura de Usuario:**
```javascript
{
    id: "string",
    email: "string",
    name: "string",
    password: "string", // Hash en producción
    profile: {
        monthlyIncome: number,
        totalDebt: number,
        emergencyFund: number
    },
    expenses: [
        {
            id: "string",
            date: "YYYY-MM-DD",
            amount: number,
            category: "string",
            description: "string"
        }
    ],
    riskProfile: "conservador|moderado|agresivo",
    portfolio: {
        totalAmount: number,
        fixedIncome: number,
        equity: number
    }
}
```

---

### 2. FinanceCalculator (Cálculos)

```javascript
class FinanceCalculator {
    // Conversiones
    static formatCurrency(amount)       // → "$1,234.56"
    static formatPercentage(value)      // → "12.5%"
    
    // Categorización
    static categorizeExpense(desc)      // Detecta categoría
    
    // Análisis de Gastos
    static calculateMonthlyExpenses()   // Total mes
    static getExpensesByCategory()      // Agrupados
    
    // Indicadores de Salud
    static calculateHealthIndicators()  // Todos los ratios
    static getHealthStatus()            // Estado general
}
```

**Indicadores Calculados:**
- `savingRatio` - % de ahorro mensual
- `debtRatio` - % deuda sobre ingresos
- `emergencyFundMonths` - Meses de cobertura
- `monthlySaving` - Dinero ahorrado
- `monthlyExpense` - Total gasto
- `debtPayoffMonths` - Meses para pagar

---

### 3. UIManager (Interfaz de Usuario)

```javascript
class UIManager {
    // Configuración
    constructor()
    setupEventListeners()
    
    // Autenticación UI
    switchAuthTab()
    handleLogin()
    handleRegister()
    handleLogout()
    showAuth()
    showApp()
    
    // Navegación
    switchModule()
    
    // Gastos
    handleAddExpense()
    renderExpenses()
    renderCategorySummary()
    deleteExpenseHandler()
    
    // Salud Financiera
    handleUpdateHealthData()
    renderHealthFinancial()
    generateHealthRecommendations()
    
    // Portafolio
    handlePortfolioSubmit()
    selectProfile()
    renderPortfolio()
    renderPortfolioChart()
    
    // Gráficos
    renderExpensesChart()
    renderEvolutionChart()
    
    // General
    renderApp()
    showSuccess()
}
```

---

## 🎨 Estructura CSS

### Variables CSS (Temas)

```css
:root {
    --primary-color: #4f46e5
    --primary-dark: #4338ca
    --primary-light: #6366f1
    --success-color: #10b981
    --warning-color: #f59e0b
    --danger-color: #ef4444
    --accent-color: #8b5cf6
    
    --bg-primary: #ffffff
    --bg-secondary: #f3f4f6
    --bg-tertiary: #e5e7eb
    
    --text-primary: #111827
    --text-secondary: #6b7280
    
    --shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
    --spacing-xs ... --spacing-2xl
    --border-radius-sm ... --border-radius-xl
}
```

### Componentes Reutilizables

```css
.card              /* Contenedor general */
.btn               /* Botón base */
.btn-primary       /* Botón primario */
.form-group        /* Grupo de formulario */
.data-table        /* Tabla de datos */
.chart-container   /* Contenedor gráficos */
.modal             /* Modal */
.kpi-card          /* Tarjeta KPI */
```

---

## 📱 Breakpoints Responsive

```css
Desktop:   > 1024px
Tablet:    768px - 1024px
Mobile:    480px - 768px
Small:     < 480px
```

---

## 💾 Estructura localStorage

**Clave:** `financeAppData`

```json
{
    "users": {
        "demo": {
            "id": "demo",
            "email": "demo@test.com",
            "name": "Demo Usuario",
            ...
        },
        "usuario2": {...}
    },
    "currentUserId": "demo",
    "lastSaved": "2025-12-15T10:30:00.000Z"
}
```

---

## 🔄 Flujo de Eventos

### Evento: Registrar Gasto

```
Usuario escribe datos
        ↓
Submit form
        ↓
Validación
        ↓
addExpense() en appData
        ↓
saveToStorage()
        ↓
renderApp() actualiza UI
        ↓
Usuario ve gasto en tabla
```

### Evento: Cambiar Módulo

```
Usuario hace clic en navbar
        ↓
switchModule() recibe nombre
        ↓
Oculta sección actual
        ↓
Muestra sección nueva
        ↓
Si dashboard → renderDashboard()
```

---

## 🧮 Fórmulas Implementadas

### Ratio de Ahorro
```
(Ingresos - Gastos) / Ingresos × 100
```

### Ratio Deuda/Ingresos
```
Deuda Total / Ingresos Mensuales × 100
```

### Meses de Fondo Emergencia
```
Fondo Actual / Ingresos Mensuales
```

### Rentabilidad del Portafolio
```
(Renta Fija % × Retorno Fijo) + (Renta Variable % × Retorno Variable)
```

---

## 📦 Dependencias Externas

```html
<!-- Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

**Nota:** Todo lo demás es JavaScript vanilla sin dependencias.

---

## 🔐 Seguridad

### Implementado
- ✅ Validación de formularios
- ✅ Almacenamiento local (no en servidor)
- ✅ Contraseñas simples (no hasheadas - educativo)
- ✅ Sesiones por usuario

### NO Implementado (Mejoras Futuras)
- ❌ Hashing de contraseñas
- ❌ Encriptación
- ❌ HTTPS forzado
- ❌ Rate limiting
- ❌ CSRF protection

---

## 📈 Perfiles de Riesgo

```javascript
RISK_PROFILES = {
    conservador: {
        fixedIncome: 60,    // Renta Fija
        equity: 40,         // Renta Variable
        expectedReturn: 5,  // 5% anual
        volatility: 'Baja'
    },
    moderado: {
        fixedIncome: 50,
        equity: 50,
        expectedReturn: 7.5,
        volatility: 'Media'
    },
    agresivo: {
        fixedIncome: 30,
        equity: 70,
        expectedReturn: 10,
        volatility: 'Alta'
    }
}
```

---

## 🎯 Indicadores de Salud

```javascript
HEALTH_INDICATORS = {
    savingRatio: {
        ideal: 20,      // 20% o más
        good: 15,
        critical: 5
    },
    debtToIncome: {
        critical: 50,   // > 50%
        warning: 36,    // 36-50%
        good: 20        // < 20%
    },
    emergencyFund: {
        target: 6,      // 6 meses
        minimum: 3      // 3 meses
    }
}
```

---

## 🔄 Ciclo de Vida de la Aplicación

```
1. DOMContentLoaded
   ├─ Crear instancia FinanceAppData
   ├─ Crear instancia UIManager
   └─ Setupear event listeners

2. Usuario no autenticado
   ├─ Mostrar modal de autenticación
   └─ Esperar login/registro

3. Usuario autenticado
   ├─ Mostrar app container
   ├─ Cargar datos del usuario
   ├─ Renderizar dashboard
   └─ Esperar interacciones

4. Interacciones
   ├─ Cambiar módulo
   ├─ Registrar datos
   ├─ Calcular indicadores
   └─ Actualizar UI

5. Logout
   ├─ Limpiar sesión
   ├─ Mostrar auth modal
   └─ Volver a paso 2
```

---

## 🚀 Mejoras Futuras

### Corto Plazo
- [ ] Modo oscuro
- [ ] Exportar a PDF
- [ ] Búsqueda de gastos
- [ ] Presupuestos

### Mediano Plazo
- [ ] Backend en Node.js
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación segura (JWT)
- [ ] Sincronización en la nube
- [ ] Aplicación móvil React Native

### Largo Plazo
- [ ] IA para predicciones
- [ ] Análisis avanzado
- [ ] Integraciones bancarias
- [ ] Notificaciones push
- [ ] Comunidad de usuarios

---

## 📊 Estadísticas del Código

- **Líneas HTML:** ~500
- **Líneas CSS:** ~1000
- **Líneas JavaScript:** ~1500
- **Funciones:** 40+
- **Componentes:** 15+

---

## 🧪 Testing Manual

**Checklist:**

Login/Registro
- [ ] Demo login funciona
- [ ] Nuevo usuario se crea
- [ ] Logout limpia sesión

Gastos
- [ ] Registrar gasto
- [ ] Categorización automática
- [ ] Eliminar gasto
- [ ] Tabla se actualiza

Salud
- [ ] Actualizar datos
- [ ] Indicadores calculan
- [ ] Recomendaciones aparecen

Portafolio
- [ ] Seleccionar perfil
- [ ] Guardar portafolio
- [ ] Gráficos se renderizan
- [ ] Alertas muestran

---

## 📝 Convenciones de Código

**Nomenclatura:**
- Clases: `PascalCase`
- Métodos: `camelCase`
- Constantes: `SCREAMING_SNAKE_CASE`
- IDs HTML: `camelCase`
- Clases CSS: `kebab-case`

**Estructura:**
1. Declaraciones de variables
2. Funciones auxiliares
3. Clases
4. Event listeners
5. Inicialización

---

## 🔗 Relaciones entre Módulos

```
UIManager
├─ usar FinanceAppData
│  └─ leer/escribir users y expenses
├─ usar FinanceCalculator
│  └─ calcular indicadores
└─ usar Chart.js
   └─ renderizar gráficos

FinanceCalculator
├─ usar constantes EXPENSE_CATEGORIES
├─ usar constantes RISK_PROFILES
└─ usar constantes HEALTH_INDICATORS
```

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Mantenedor:** Equipo de Desarrollo
