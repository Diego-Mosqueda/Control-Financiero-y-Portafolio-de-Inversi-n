# 🎨 GUÍA VISUAL - ASISTENTE IA

## 📍 Ubicación en Pantalla

### Desktop View (1920px width)
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ 💰 Control Financiero y Portafolio de Inversión                         Logout     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard | Gastos | Salud Financiera | Portafolio                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │   Ingreso   │  │   Gastos    │  │   Balance   │  │   Ahorro    │               │
│  │   $5,000    │  │   $2,500    │  │   $2,500    │  │     50%     │               │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘               │
│                                                                                     │
│  [Gráfico de Gastos]               [Gráfico de Evolución]                         │
│                                                                                     │
│                                                     ┌──────────────────┐          │
│                                                     │ 🤖 Asistente IA  │ X       │
│                                                     ├──────────────────┤          │
│                                                     │                  │          │
│                                                     │ Hola! Soy tu    │          │
│                                                     │ asistente IA     │          │
│                                                     │ personal...      │          │
│                                                     │                  │          │
│                                                     │ [User message]   │          │
│                                                     │ [Bot response]   │          │
│                                                     │                  │          │
│                                                     ├──────────────────┤          │
│                                                     │[Input...] [📤]   │          │
│                                                     └──────────────────┘          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile View (375px width)
```
┌──────────────────────────────┐
│ 💰 Libertad Financiera  ☰    │
├──────────────────────────────┤
│ [Dashboard][Gastos][Salud]   │
├──────────────────────────────┤
│                              │
│  [KPI Cards]                 │
│                              │
│  [Gráficos]                  │
│                              │
│  ┌────────────────────────┐  │
│  │ 🤖 Asistente IA  [−]  │  │
│  ├────────────────────────┤  │
│  │ Hola! ¿En qué        │  │
│  │ puedo ayudarte?      │  │
│  │                      │  │
│  │ [Input...] [📤]      │  │
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

---

## 💬 Estados del Chat

### Estado 1: Chat Expandido
```
┌──────────────────────────┐
│ 🤖 Asistente IA    [−]  │ ← Header (Gradiente azul-púrpura)
├──────────────────────────┤
│                          │
│ Bot: ¡Hola! ¿Cómo      │ ← Mensaje Bot (fondo gris)
│ puedo ayudarte? 💡      │
│                          │
│      User: ¿Cómo       │ ← Mensaje Usuario (fondo azul)
│      registro gastos? → │
│                          │
│ Bot: Ve al módulo      │
│ "Gastos" y completa    │
│ el formulario... 📊    │
│                          │ ← Scroll automático
│      User: Gracias ✓  →  │
│                          │
│ Bot: ¡De nada! ¿Otra  │
│ pregunta? 😊            │
│                          │
├──────────────────────────┤
│ [Escribe tu pregunta...] │ ← Input
│              [📤]        │ ← Send button
└──────────────────────────┘
```

### Estado 2: Chat Minimizado
```
┌──────────────────────────┐
│ 🤖 Asistente IA    [+]  │ ← Solo el header visible
└──────────────────────────┘
```

---

## 🎯 Flujo de Interacción

### Flujo Principal

```
Usuario abre app
        ↓
Se autentifica (login/register)
        ↓
Red Neuronal se entrena (1500 iteraciones) ← Async
        ↓
Chatbot se inicializa
        ↓
Usuario escribe pregunta
        ↓
Presiona Enter o click 📤
        ↓
Mensaje enviado al asistente
        ↓
Red Neuronal analiza mensaje
        ├─ Convierte a vector (10 dimensiones)
        ├─ Forward pass (10 → 16 → 5)
        └─ Obtiene predicción (5 probabilidades)
        ↓
Se selecciona categoría (mayor probabilidad)
        ↓
Se elige respuesta de la BD
        ↓
Se agrega análisis personalizado (si aplica)
        ↓
Respuesta aparece en chat (animación)
        ↓
Auto-scroll al último mensaje
        ↓
Usuario puede hacer otra pregunta
        ↓
Repeat...
```

---

## 🧠 Proceso de Predicción Visual

### Input: "¿Cómo reduzco mis gastos?"

```
Step 1: Análisis de Palabras Clave
┌────────────────────────────────────┐
│ Palabra: "cómo" → Tipo: Pregunta    │
│ Palabra: "reduzco" → Tipo: Acción   │
│ Palabra: "gastos" → Tipo: Categoría │
└────────────────────────────────────┘
                ↓
Step 2: Vectorización
┌────────────────────────────────────┐
│ Vector = [0.9, 0.1, 0.2, 0, ...]  │
│          ├─ 0.9 = Match "gastos"    │
│          ├─ 0.1 = Match "cómo"      │
│          ├─ 0.2 = Match "reduzco"   │
│          └─ ...                     │
└────────────────────────────────────┘
                ↓
Step 3: Forward Pass
┌────────────────────────────────────┐
│ [0.9, 0.1, 0.2, ...] (Input 10)    │
│              ↓                      │
│         W_IH @ X + b_H              │
│              ↓                      │
│         ReLU activation             │
│              ↓                      │
│   [h1, h2, ... h16] (Hidden 16)     │
│              ↓                      │
│         W_HO @ H + b_O              │
│              ↓                      │
│         Sigmoid activation          │
│              ↓                      │
│ [0.88, 0.08, 0.02, 0.01, 0.01]    │
│  (Output 5)                         │
└────────────────────────────────────┘
                ↓
Step 4: Clasificación
┌────────────────────────────────────┐
│ Categoría 0 (Gastos): 0.88 ← ✅     │
│ Categoría 1 (Salud):  0.08          │
│ Categoría 2 (Port):   0.02          │
│ Categoría 3 (Lib):    0.01          │
│ Categoría 4 (Ayuda):  0.01          │
└────────────────────────────────────┘
                ↓
Step 5: Selección de Respuesta
┌────────────────────────────────────┐
│ Categoría: GASTOS (índice 0)        │
│ Respuestas disponibles: 4           │
│ Respuesta seleccionada aleatoria:   │
│                                     │
│ "📊 Para registrar un gasto, ve al │
│ módulo Gastos y completa el        │
│ formulario. El sistema categoriza  │
│ automáticamente..."                │
└────────────────────────────────────┘
                ↓
Step 6: Mostrar en Chat
┌────────────────────────────────────┐
│ 🤖 Bot (animación slideIn)          │
│ "📊 Para registrar un gasto, ve al │
│ módulo Gastos y completa el        │
│ formulario..."                      │
└────────────────────────────────────┘
```

---

## 🎨 Esquema de Colores

### Tema Chatbot

| Elemento | Color | Uso |
|----------|-------|-----|
| **Header Background** | Gradiente #4f46e5 → #8b5cf6 | Fondo header |
| **Header Text** | #ffffff | Texto header |
| **Message Bot BG** | #e5e7eb | Fondo mensajes bot |
| **Message Bot Text** | #111827 | Texto mensajes bot |
| **Message User BG** | #4f46e5 | Fondo mensajes usuario |
| **Message User Text** | #ffffff | Texto mensajes usuario |
| **Input Border** | #e5e7eb | Borde input normal |
| **Input Focus Border** | #4f46e5 | Borde input activo |
| **Button Background** | #4f46e5 | Fondo botón enviar |
| **Button Hover** | #4338ca | Fondo botón hover |
| **Chat Background** | #ffffff | Fondo contenedor |

---

## ⌨️ Controles y Accesos Rápidos

### Navegación por Teclado

| Tecla | Acción |
|-------|--------|
| **Enter** | Enviar mensaje |
| **Shift + Enter** | Nueva línea en input |
| **Tab** | Navegar entre elementos |
| **F12** | Abrir consola (ver logs) |

### Controles de Ratón

| Acción | Resultado |
|--------|-----------|
| Click en [−] | Minimizar chat |
| Click en [+] | Expandir chat |
| Click en [📤] | Enviar mensaje |
| Scroll en mensajes | Ver conversación |
| Click en input | Enfoque para escribir |

---

## 📊 Indicadores Visuales

### Animaciones

```
1. SLIDE IN (Chat abre)
   Duración: 0.3s
   Efecto: Sube desde abajo + fade in
   
2. MESSAGE IN (Nuevo mensaje)
   Duración: 0.3s
   Efecto: Sube + fade in
   
3. PULSE (Indicador de escritura)
   Duración: 2s
   Efecto: Brillo intermitente
```

### Estados Visuales

```
INPUT NORMAL
├─ Border: #e5e7eb
├─ Background: #ffffff
└─ Cursor: Text

INPUT FOCUS
├─ Border: #4f46e5 (blue)
├─ Background: #ffffff
├─ Shadow: 0 0 0 3px rgba(79, 70, 229, 0.1)
└─ Cursor: Text (activo)

BUTTON NORMAL
├─ Background: #4f46e5
├─ Cursor: Pointer
└─ Transform: scale(1)

BUTTON HOVER
├─ Background: #4338ca (más oscuro)
├─ Cursor: Pointer
└─ Transform: scale(1.05)

BUTTON ACTIVE (Click)
├─ Background: #4338ca
├─ Transform: scale(0.95)
└─ Duration: instant
```

---

## 📱 Responsive Breakpoints

### Layout Adaptativo

```
DESKTOP (>1024px)
├─ Ancho: 380px
├─ Alto: 500px
├─ Font: 0.9rem (input), 1rem (header)
└─ Posición: bottom: 20px, right: 20px

TABLET (768px - 1024px)
├─ Ancho: 320px
├─ Alto: 420px
├─ Font: 0.85rem (mensajes)
└─ Posición: bottom: 10px, right: 10px

MOBILE (480px - 768px)
├─ Ancho: calc(100% - 20px)
├─ Alto: 400px
├─ Font: 0.8rem (mensajes)
└─ Posición: bottom: 10px, left: 10px, right: 10px

SMALL PHONE (<480px)
├─ Ancho: calc(100% - 20px) (full width)
├─ Alto: 350px
├─ Font: 0.75rem (reducido)
└─ Posición: bottom: 10px, left/right: 10px
```

---

## 🔍 Elementos Interactivos

### Botón Minimizar/Expandir

```
EXPANDED STATE
┌──────────────────────────┐
│ 🤖 Asistente IA    [−]   │ ← Botón muestra "−"
├──────────────────────────┤
│ [Mensajes visibles]      │
└──────────────────────────┘

COLLAPSED STATE
┌──────────────────────────┐
│ 🤖 Asistente IA    [+]   │ ← Botón muestra "+"
└──────────────────────────┘
```

### Input y Envío

```
ESTADO NORMAL
┌─────────────────────┐
│ [Escribe aquí...] [📤] │
└─────────────────────┘

ESTADO ACTIVO (Focus)
┌─────────────────────┐
│ |Escribiendo...    [📤] │ ← Cursor parpadeando
└─────────────────────┘

ESTADO CON TEXTO
┌─────────────────────┐
│ [¿Cómo empiezo?   [📤] │ ← Texto ingresado
└─────────────────────┘
```

---

## 📈 Flujo de Datos en Tiempo Real

### Durante la Sesión

```
1. Usuario se autentica
   ↓
2. Datos cargados desde localStorage
   ├─ Información de usuario
   ├─ Historial de gastos
   └─ Perfil financiero
   ↓
3. Red neuronal se inicializa
   ├─ Generación de datos de entrenamiento (110 patrones)
   ├─ Inicialización aleatoria de pesos
   └─ Entrenamiento (1500 iteraciones)
   ↓
4. Chatbot se muestra
   ├─ Mensaje de bienvenida
   └─ Listo para interacción
   ↓
5. Usuario escribe mensaje
   ↓
6. Procesamiento de IA
   ├─ Vectorización
   ├─ Forward pass
   ├─ Predicción
   └─ Selección de respuesta
   ↓
7. Respuesta mostrada
   ↓
8. User history actualizado
```

---

## 🎯 Casos de Uso Visuales

### Caso 1: Pregunta sobre Gastos
```
Usuario: "¿Debo categorizar mis gastos?"
                    ↓
              Red Neuronal
         Predicción: [0.91, 0.05, 0.02, 0.01, 0.01]
                    ↓
          Categoría: GASTOS
                    ↓
Respuesta: "📊 Para registrar un gasto, ve al módulo 
Gastos y completa el formulario. El sistema 
categoriza automáticamente según palabras clave..."
```

### Caso 2: Pregunta sobre Portafolio
```
Usuario: "¿Cuál es el perfil agresivo?"
                    ↓
              Red Neuronal
         Predicción: [0.05, 0.08, 0.84, 0.02, 0.01]
                    ↓
        Categoría: PORTAFOLIO
                    ↓
Respuesta: "🚀 Agresivo (30% Renta Fija / 70% Renta 
Variable): Para inversores con horizonte largo. 
Retorno esperado: 10%..."
```

### Caso 3: Pregunta Ambigua
```
Usuario: "¿Qué hago?"
                    ↓
              Red Neuronal
         Predicción: [0.20, 0.20, 0.20, 0.20, 0.40]
                    ↓
        Categoría: AYUDA (más alta)
                    ↓
Respuesta: "🆘 ¿Necesitas ayuda? Puedo asistirte con:
gastos, salud financiera, portafolio, o libertad financiera.
Los pasos iniciales son:
1. Registra tus gastos..."
```

---

## 🖼️ Ejemplo de Pantalla Completa

### Desktop con Chat Abierto

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 💰 Control Financiero y Portafolio                                    Logout     │
├──────────────────────────────────────────────────────────────────────────────────┤
│  Dashboard  │  Gastos  │  Salud Financiera  │  Portafolio                       │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │   INGRESO   │ │   GASTOS    │ │   BALANCE   │ │   AHORRO    │                │
│ │   $5,000    │ │   $1,200    │ │   $3,800    │ │    76%      │                │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                                  │
│  [Gráfico Pie: Distribución de Gastos]  [Gráfico Line: Evolución Mensual]      │
│                                                                                  │
│                                          ┌────────────────────────────┐         │
│                                          │ 🤖 Asistente IA    ×       │         │
│                                          ├────────────────────────────┤         │
│                                          │ Bot: ¡Hola! ¿En qué     │         │
│                                          │ puedo ayudarte? 💡       │         │
│                                          │                          │         │
│                                          │ User: ¿Cómo reduzco mi   │         │
│                                          │ deuda? →                 │         │
│                                          │                          │         │
│                                          │ Bot: Si tu ratio        │         │
│                                          │ deuda/ingresos > 36%,   │         │
│                                          │ considera reducir        │         │
│                                          │ deudas antes de         │         │
│                                          │ invertir. ⚠️             │         │
│                                          │                          │         │
│                                          ├────────────────────────────┤         │
│                                          │ ¿Otra pregunta? [📤]     │         │
│                                          └────────────────────────────┘         │
│                                                                                  │
│ [Tabla de Gastos Recientes]                                                     │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

© 2025 Control Financiero - Todas tus decisiones financieras importan
```

---

## ✨ Efecto Final

El chatbot integrado crea una experiencia completa donde el usuario tiene:

✅ Una **interfaz limpia** y profesional  
✅ Un **asistente inteligente** disponible 24/7  
✅ **Recomendaciones personalizadas** basadas en IA  
✅ Una **comunicación natural** en tiempo real  
✅ Una **experiencia responsive** en todos los dispositivos  
✅ **Privacidad total** (sin datos externos)  

---

*Diseñado para maximizar la usabilidad y proporcionar una experiencia educativa completa.*
