# Control Financiero y Portafolio de Inversión

## Descripción General

Aplicación web integral para gestionar tus finanzas personales y construir un portafolio de inversión personalizado. Esta herramienta te ayudará a alcanzar la libertad financiera mediante:

✅ **Seguimiento completo de gastos** con categorización automática
✅ **Análisis de salud financiera** con indicadores clave
✅ **Constructor de portafolio de inversión** con perfiles de riesgo
✅ **Visualizaciones interactivas** con gráficos dinámicos
✅ **Recomendaciones personalizadas** basadas en tu situación

---

## Características Principales

### 1. **Módulo de Autenticación**
- Sistema de login y registro con almacenamiento local
- Cuenta demo disponible para pruebas
- Datos persistentes en localStorage
- **Demo:** email: `demo@test.com` | contraseña: `demo123`

### 2. **Dashboard Ejecutivo**
- KPI Cards con métricas clave:
  - Ingresos mensuales
  - Gastos totales
  - Saldo disponible
  - Ratio de ahorro
- Gráficos de distribución de gastos
- Evolución temporal de gastos
- Acceso rápido a otros módulos

### 3. **Gestión de Gastos**
- Registro de gastos con fecha y monto
- Categorización automática basada en descripción
- Palabras clave para cada categoría:
  - 🏠 Vivienda (renta, servicios, internet)
  - 🚗 Transporte (gasolina, uber, taxi)
  - 🍽️ Alimentación (supermercado, restaurante)
  - 🎬 Entretenimiento (cine, netflix, viajes)
  - 💡 Servicios (seguros, gimnasio)
  - ⚕️ Salud (doctor, farmacia)
  - 📚 Educación (cursos, libros)
  - 📦 Otros

- Filtros por mes y categoría
- Tabla histórica con opción de eliminar
- Resumen por categoría

### 4. **Panel de Salud Financiera**
Indicadores calculados automáticamente:

**Ratio de Ahorro**
- Ideal: > 20%
- Fórmula: (Ingresos - Gastos) / Ingresos × 100

**Ratio Deuda/Ingresos**
- Ideal: < 36%
- Fórmula: Deuda Total / Ingresos Mensuales × 100

**Fondo de Emergencia**
- Ideal: 6 meses de gastos
- Fórmula: Fondo Actual / Ingreso Mensual

**Análisis Personalizado**
- Estado general de salud financiera
- Recomendaciones específicas según situación

### 5. **Constructor de Portafolio de Inversión**

**Perfiles de Riesgo:**

| Perfil | Renta Fija | Renta Variable | Rentabilidad | Volatilidad |
|--------|-----------|----------------|--------------|-------------|
| 🛡️ Conservador | 60% | 40% | 4.5-5.5% | Baja |
| ⚖️ Moderado | 50% | 50% | 6.5-7.5% | Media |
| 🚀 Agresivo | 30% | 70% | 8.5-10% | Alta |

**Funcionalidades:**
- Seleccionar perfil de riesgo
- Personalizar distribución de activos
- Visualizar asignación en gráficos
- Comparativa de rendimiento esperado
- Alertas basadas en endeudamiento
- Recomendaciones de rebalanceo

---

## Instalación y Uso

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias externas

### Archivos Incluidos

```
.
├── index.html          # Estructura principal HTML
├── styles.css          # Estilos y diseño responsive
├── app.js              # Lógica de la aplicación
├── README.md           # Este archivo
└── assets/             # Carpeta para imágenes/recursos
```

### Cómo Ejecutar

**Opción 1: Abrir directamente (Para desarrollo local)**
```bash
# Navegar a la carpeta del proyecto
cd "Control Financiero y Portafolio de Inversión"

# Abrir index.html en navegador
start index.html
```

**Opción 2: Usar un servidor local (Recomendado)**
```bash
# Con Python 3
cd "Control Financiero y Portafolio de Inversión"
python -m http.server 8000

# Luego acceder a: http://localhost:8000
```

**Opción 3: Usar Node.js (si lo tienes instalado)**
```bash
# Instalar http-server globalmente (una sola vez)
npm install -g http-server

# Ejecutar en la carpeta del proyecto
http-server

# Acceder a la URL mostrada en consola
```

---

## Cómo Usar la Aplicación

### Primer Inicio

1. **Acceder a la Demo**
   - Email: `demo@test.com`
   - Contraseña: `demo123`
   - O crear una nueva cuenta

2. **Explorar el Dashboard**
   - Ver resumen de métricas clave
   - Revisar gráficos de gastos

### Registrar Gastos

1. Ir a la sección "Gastos"
2. Llenar el formulario:
   - Fecha del gasto
   - Monto en USD
   - Descripción (ej: "Gasolina Petrox")
   - Categoría (se sugiere automáticamente)
3. Hacer clic en "Registrar Gasto"
4. Ver historial actualizado en la tabla

### Configurar Perfil Financiero

1. Ir a "Salud Financiera"
2. Ingresar:
   - Ingreso mensual
   - Deuda total
   - Fondo de emergencia actual
3. Hacer clic en "Actualizar Información"
4. Ver indicadores calculados automáticamente
5. Leer recomendaciones personalizadas

### Crear Portafolio

1. Ir a "Portafolio"
2. Seleccionar perfil de riesgo (Conservador, Moderado, Agresivo)
3. Ingresar monto total a invertir
4. Ajustar distribución (Renta Fija vs Variable)
5. Hacer clic en "Guardar Portafolio"
6. Ver detalles, gráficos y comparativas

---

## Fórmulas y Cálculos

### Ratio de Ahorro
```
Ratio Ahorro (%) = (Ingresos Mensuales - Gastos Mensuales) / Ingresos Mensuales × 100
```

### Ratio Deuda/Ingresos
```
Ratio Deuda/Ingresos (%) = Deuda Total / Ingresos Mensuales × 100
```

### Meses de Fondo de Emergencia
```
Meses FE = Fondo de Emergencia / Ingresos Mensuales
```

### Rentabilidad Esperada del Portafolio
```
Rentabilidad = (Renta Fija % × 4%) + (Renta Variable % × 10%)
```

---

## Características Técnicas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive mobile-first
- **JavaScript Vanilla** - Sin dependencias externas
- **Chart.js** - Visualizaciones interactivas

### Almacenamiento
- **localStorage** - Persistencia de datos local
- Estructura JSON para datos
- Auto-guardado al realizar cambios

### Responsive
- ✅ Mobile (< 480px)
- ✅ Tablet (480px - 768px)
- ✅ Desktop (> 768px)

---

## Recomendaciones Financieras

### Salud Financiera Óptima
✅ Ratio de Ahorro: > 20%
✅ Ratio Deuda/Ingresos: < 36%
✅ Fondo de Emergencia: 6 meses de gastos
✅ Portafolio balanceado según edad y metas

### Objetivos Sugeridos

**Corto Plazo (0-3 meses)**
- Registrar todos los gastos
- Identificar categorías de mayor gasto
- Crear fondo de emergencia básico

**Mediano Plazo (3-12 meses)**
- Alcanzar ratio de ahorro de 15-20%
- Completar 3 meses de fondo de emergencia
- Reducir deudas de alto interés

**Largo Plazo (1+ años)**
- Alcanzar 6 meses de fondo de emergencia
- Implementar portafolio de inversión
- Automatizar ahorro mensual

---

## Avisos Legales

⚠️ **Descargo de Responsabilidad**
Esta aplicación proporciona información educativa únicamente. No constituye asesoramiento financiero profesional. Consulta con un asesor financiero certificado antes de tomar decisiones de inversión.

---

## Soporte y Mejoras Futuras

### Funcionalidades Planeadas
- 📊 Exportar reportes a PDF
- 📈 Histórico de rendimiento del portafolio
- 🔔 Notificaciones y alertas
- 💾 Sincronización en la nube
- 📱 Aplicación móvil nativa
- 🤖 Análisis con IA

### Contacto y Feedback
Para reportar errores o sugerencias, contacta al equipo de desarrollo.

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Licencia:** Educativa - Uso personal y no comercial

¡Bienvenido a tu camino hacia la libertad financiera! 💰
