/**
 * ASISTENTE IA CON RED NEURONAL
 * Sistema de inteligencia artificial con aprendizaje automático
 * Versión: 1.0.0
 * Características: Red neuronal simple con 1000+ iteraciones de entrenamiento
 */

// ============================================
// CLASE: RED NEURONAL SIMPLE
// ============================================
class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;
        this.learningRate = 0.1;
        
        // Inicializar pesos con valores aleatorios
        this.weightsIH = this.randomMatrix(inputSize, hiddenSize);
        this.weightsHO = this.randomMatrix(hiddenSize, outputSize);
        this.biasH = this.randomMatrix(1, hiddenSize);
        this.biasO = this.randomMatrix(1, outputSize);
        
        // Historial de aprendizaje
        this.trainingHistory = [];
    }
    
    // Generar matriz de valores aleatorios entre -1 y 1
    randomMatrix(rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = Math.random() * 2 - 1;
            }
        }
        return matrix;
    }
    
    // Función de activación: Sigmoid
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    // Derivada de Sigmoid
    sigmoidDerivative(x) {
        return x * (1 - x);
    }
    
    // Función ReLU (Rectified Linear Unit)
    relu(x) {
        return Math.max(0, x);
    }
    
    // Derivada de ReLU
    reluDerivative(x) {
        return x > 0 ? 1 : 0;
    }
    
    // Multiplicar matrices
    matrixMultiply(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < b[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < b.length; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }
    
    // Sumar matrices elemento a elemento
    matrixAdd(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < a[i].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }
    
    // Restar matrices elemento a elemento
    matrixSubtract(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < a[i].length; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    }
    
    // Multiplicar matriz por escalar
    matrixScalarMultiply(matrix, scalar) {
        const result = [];
        for (let i = 0; i < matrix.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix[i].length; j++) {
                result[i][j] = matrix[i][j] * scalar;
            }
        }
        return result;
    }
    
    // Transponer matriz
    matrixTranspose(matrix) {
        const result = [];
        for (let j = 0; j < matrix[0].length; j++) {
            result[j] = [];
            for (let i = 0; i < matrix.length; i++) {
                result[j][i] = matrix[i][j];
            }
        }
        return result;
    }
    
    // Propagación hacia adelante (Forward pass)
    forward(input) {
        // Input a Hidden
        const hiddenInput = this.matrixAdd(
            this.matrixMultiply([input], this.weightsIH),
            this.biasH
        );
        const hiddenOutput = hiddenInput[0].map(x => this.relu(x));
        
        // Hidden a Output
        const finalInput = this.matrixAdd(
            this.matrixMultiply([hiddenOutput], this.weightsHO),
            this.biasO
        );
        const finalOutput = finalInput[0].map(x => this.sigmoid(x));
        
        return { hiddenOutput, finalOutput };
    }
    
    // Propagación hacia atrás (Backpropagation)
    backward(input, target, forward) {
        // Output error
        const outputError = target.map((t, i) => t - forward.finalOutput[i]);
        
        // Output gradient
        const outputGradient = outputError.map((e, i) => 
            e * this.sigmoidDerivative(forward.finalOutput[i])
        );
        
        // Hidden to Output weight adjustment
        const hiddenT = this.matrixTranspose([forward.hiddenOutput]);
        const deltaWHO = this.matrixMultiply(hiddenT, [outputGradient]);
        
        // Actualizar pesos y bias
        this.weightsHO = this.matrixAdd(
            this.weightsHO,
            this.matrixScalarMultiply(deltaWHO, this.learningRate)
        );
        this.biasO = this.matrixAdd(
            this.biasO,
            [this.matrixScalarMultiply([outputGradient], this.learningRate)[0]]
        );
        
        // Hidden error
        const weightsHOT = this.matrixTranspose(this.weightsHO);
        const hiddenError = this.matrixMultiply([outputGradient], weightsHOT)[0];
        
        // Hidden gradient
        const hiddenGradient = hiddenError.map((e, i) => 
            e * this.reluDerivative(forward.hiddenOutput[i])
        );
        
        // Input to Hidden weight adjustment
        const inputT = this.matrixTranspose([input]);
        const deltaWIH = this.matrixMultiply(inputT, [hiddenGradient]);
        
        // Actualizar pesos y bias
        this.weightsIH = this.matrixAdd(
            this.weightsIH,
            this.matrixScalarMultiply(deltaWIH, this.learningRate)
        );
        this.biasH = this.matrixAdd(
            this.biasH,
            [this.matrixScalarMultiply([hiddenGradient], this.learningRate)[0]]
        );
        
        // Calcular error para el registro
        const mse = outputError.reduce((sum, e) => sum + e * e, 0) / target.length;
        this.trainingHistory.push(mse);
        
        return mse;
    }
    
    // Entrenar la red
    train(trainingData, iterations) {
        console.log(`🤖 Iniciando entrenamiento de red neuronal (${iterations} iteraciones)...`);
        
        for (let iter = 0; iter < iterations; iter++) {
            let totalError = 0;
            
            for (let data of trainingData) {
                const forward = this.forward(data.input);
                const error = this.backward(data.input, data.target, forward);
                totalError += error;
            }
            
            if ((iter + 1) % 100 === 0) {
                console.log(`✓ Iteración ${iter + 1}/${iterations} - Error promedio: ${(totalError / trainingData.length).toFixed(4)}`);
            }
        }
        
        console.log(`✅ Entrenamiento completado con ${iterations} iteraciones`);
        return this.trainingHistory;
    }
    
    // Predecir output
    predict(input) {
        const { finalOutput } = this.forward(input);
        return finalOutput;
    }
}

// ============================================
// CLASE: ASISTENTE IA
// ============================================
class FinancialAIAssistant {
    constructor() {
        this.neuralNetwork = null;
        this.trainingData = [];
        this.responseDatabase = this.initializeResponseDatabase();
        this.userHistory = [];
        this.init();
    }
    
    // Inicializar base de datos de respuestas
    initializeResponseDatabase() {
        return {
            gastos: {
                keywords: ['gasto', 'costo', 'gasto', 'dinero', 'pagar', 'categoría', 'categorizar'],
                responses: [
                    '📊 Para registrar un gasto, ve al módulo "Gastos" y completa el formulario. El sistema categoriza automáticamente según palabras clave.',
                    '💡 Consejo: Registra todos tus gastos diarios para obtener un análisis más preciso de tu situación financiera.',
                    '📈 Los gastos se categorizan en 8 tipos: Vivienda, Transporte, Alimentación, Entretenimiento, Servicios, Salud, Educación y Otros.',
                    '✅ Recomendación: Dedica 5 minutos al día para registrar tus gastos importantes.'
                ]
            },
            salud: {
                keywords: ['salud', 'financiera', 'indicador', 'ratio', 'deuda', 'ahorro', 'fondo emergencia'],
                responses: [
                    '🏥 La salud financiera se mide con 4 indicadores clave: Ratio de Ahorro, Ratio Deuda/Ingresos, Fondo de Emergencia y Tiempo para Pagar Deuda.',
                    '💰 Buen ratio de ahorro: > 20% de tus ingresos. Esto te permite invertir y construir riqueza.',
                    '⚠️ Si tu ratio deuda/ingresos es > 36%, considera reducir deudas antes de invertir.',
                    '🛡️ Fondo de emergencia ideal: 6 meses de gastos. Empieza con 3 meses si no tienes ahorros.',
                    '📊 Completa el formulario en "Salud Financiera" con tus ingresos, deudas y ahorros actuales.'
                ]
            },
            portafolio: {
                keywords: ['portafolio', 'portfolio', 'inversión', 'riesgo', 'perfil', 'activos', 'asignación'],
                responses: [
                    '📈 Conservador (60% Renta Fija / 40% Renta Variable): Ideal si eres averso al riesgo. Retorno esperado: 5%.',
                    '⚖️ Moderado (50% Renta Fija / 50% Renta Variable): Equilibrio entre seguridad y crecimiento. Retorno: 7.5%.',
                    '🚀 Agresivo (30% Renta Fija / 70% Renta Variable): Para inversores con horizonte largo. Retorno: 10%.',
                    '💡 Elige tu perfil según tu tolerancia al riesgo y horizonte de inversión (5+ años para agresivo).',
                    '📊 El simulador muestra la composición de tu portafolio y proyecciones de rentabilidad.'
                ]
            },
            libertad: {
                keywords: ['libertad', 'financiera', 'meta', 'objetivo', 'independencia', 'retiro', 'alcanzar'],
                responses: [
                    '🎯 Libertad financiera = Gastos mensuales cubiertos por inversiones sin trabajar.',
                    '📚 Principios: Aumenta ingresos, Reduce gastos, Invierte la diferencia.',
                    '📊 Regla 4%: Necesitas 25x tus gastos anuales invertidos para vivir solo de intereses.',
                    '⏰ Plazo típico: 10-20 años dependiendo de tu tasa de ahorro e inversión.',
                    '✨ Tu plan: (Ingresos - Gastos) × Retorno = Libertad Financiera'
                ]
            },
            recomendaciones: {
                keywords: ['recomendar', 'recomendación', 'sugerir', 'consejo', 'ayuda', 'qué hacer'],
                responses: [
                    '🎯 Paso 1: Registra tus gastos de los últimos 3 meses.',
                    '📊 Paso 2: Completa tu perfil financiero (ingresos, deudas, ahorros).',
                    '⚖️ Paso 3: Revisa tus indicadores de salud financiera.',
                    '📈 Paso 4: Elige un perfil de riesgo según tu situación.',
                    '💡 Paso 5: Comienza con pequeñas inversiones y aumenta gradualmente.'
                ]
            },
            ayuda: {
                keywords: ['ayuda', 'help', 'no entiendo', 'cómo usar', 'problema', 'error'],
                responses: [
                    '🆘 ¿Necesitas ayuda? Puedo asistirte con: gastos, salud financiera, portafolio, o libertad financiera.',
                    '📖 Consulta la documentación en los archivos: README.md, QUICK_START.md o FAQ.md.',
                    '❓ Hazme preguntas específicas y te daré recomendaciones personalizadas basadas en tus datos.',
                    '💬 Puedo interpretarpreguntas sobre: categorización de gastos, indicadores financieros, estrategias de inversión.'
                ]
            }
        };
    }
    
    // Inicializar el asistente
    init() {
        console.log('🤖 Inicializando Asistente IA...');
        
        // Crear red neuronal: 10 inputs, 16 neuronas ocultas, 5 outputs
        this.neuralNetwork = new NeuralNetwork(10, 16, 5);
        
        // Generar datos de entrenamiento
        this.generateTrainingData();
        
        // Entrenar la red con 1500 iteraciones
        this.neuralNetwork.train(this.trainingData, 1500);
        
        // Configurar eventos del chatbot
        this.setupEventListeners();
        
        console.log('✅ Asistente IA listo');
    }
    
    // Generar datos para entrenar la red
    generateTrainingData() {
        // Datos de ejemplo para entrenamiento
        const scenarios = [
            // [input pattern: usuario tipo], [output: tipos de respuesta]
            { input: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], target: [1, 0, 0, 0, 0] }, // Gasto
            { input: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0], target: [0, 1, 0, 0, 0] }, // Salud
            { input: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], target: [0, 0, 1, 0, 0] }, // Portafolio
            { input: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], target: [0, 0, 0, 1, 0] }, // Libertad
            { input: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 1, 1], target: [0.5, 0.5, 0.5, 0.5, 1] }, // Ayuda
            { input: [0.8, 0.2, 0.3, 0.1, 0.5, 0.4, 0.6, 0.2, 0.3, 0.1], target: [0.8, 0.2, 0.3, 0.1, 0.2] },
            { input: [0.3, 0.7, 0.8, 0.9, 0.2, 0.1, 0.3, 0.7, 0.4, 0.2], target: [0.3, 0.8, 0.2, 0.9, 0.3] },
            { input: [0.6, 0.4, 0.5, 0.5, 0.6, 0.4, 0.7, 0.3, 0.5, 0.5], target: [0.6, 0.5, 0.5, 0.4, 0.5] },
            { input: [0.2, 0.8, 0.7, 0.3, 0.4, 0.6, 0.2, 0.8, 0.6, 0.4], target: [0.2, 0.7, 0.4, 0.3, 0.6] },
            { input: [0.9, 0.1, 0.2, 0.8, 0.9, 0.1, 0.8, 0.2, 0.3, 0.7], target: [0.9, 0.2, 0.8, 0.1, 0.3] }
        ];
        
        // Aumentar conjunto de datos para mejor entrenamiento
        for (let i = 0; i < 100; i++) {
            scenarios.push({
                input: scenarios[i % scenarios.length].input.map(x => x + (Math.random() - 0.5) * 0.1),
                target: scenarios[i % scenarios.length].target.map(x => Math.max(0, Math.min(1, x + (Math.random() - 0.5) * 0.05)))
            });
        }
        
        this.trainingData = scenarios;
    }
    
    // Configurar eventos del chatbot
    setupEventListeners() {
        const sendBtn = document.getElementById('chatbotSendBtn');
        const input = document.getElementById('chatbotInput');
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        
        if (!sendBtn || !input) {
            console.warn('⚠️ Elementos del chatbot no encontrados');
            return;
        }
        
        // Enviar mensaje con botón
        sendBtn.addEventListener('click', () => this.handleUserMessage());
        
        // Enviar mensaje con Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
        
        // Toggle minificar/expandir
        toggle.addEventListener('click', () => {
            container.classList.toggle('chatbot-collapsed');
            toggle.textContent = container.classList.contains('chatbot-collapsed') ? '+' : '−';
        });
    }
    
    // Procesar mensaje del usuario
    handleUserMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Agregar mensaje del usuario
        this.addMessage(message, 'user');
        input.value = '';
        
        // Procesar y generar respuesta
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.userHistory.push({ message, response });
        }, 300);
    }
    
    // Agregar mensaje al chat
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        
        const p = document.createElement('p');
        p.textContent = text;
        
        messageDiv.appendChild(p);
        messagesContainer.appendChild(messageDiv);
        
        // Auto scroll al último mensaje
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Generar respuesta usando IA
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Análisis de palabras clave
        const scores = this.analyzeMessage(lowerMessage);
        
        // Usar red neuronal para clasificar tipo de pregunta
        const inputVector = this.messageToVector(lowerMessage);
        const prediction = this.neuralNetwork.predict(inputVector);
        
        // Determinar categoría dominante
        let category = 'ayuda';
        let maxScore = Math.max(...prediction);
        
        if (prediction[0] > 0.5) category = 'gastos';
        else if (prediction[1] > 0.5) category = 'salud';
        else if (prediction[2] > 0.5) category = 'portafolio';
        else if (prediction[3] > 0.5) category = 'libertad';
        
        // Seleccionar respuesta de la base de datos
        return this.selectResponse(category, scores);
    }
    
    // Convertir mensaje a vector numérico
    messageToVector(message) {
        const vector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        // Analizar presencia de categorías
        const categories = Object.keys(this.responseDatabase);
        
        for (let i = 0; i < categories.length && i < 10; i++) {
            const category = categories[i];
            const keywords = this.responseDatabase[category].keywords;
            
            let score = 0;
            for (let keyword of keywords) {
                if (message.includes(keyword)) {
                    score += 0.5;
                }
            }
            vector[i] = Math.min(1, score);
        }
        
        return vector;
    }
    
    // Analizar mensaje y obtener puntuaciones
    analyzeMessage(message) {
        const scores = {};
        
        for (let [category, data] of Object.entries(this.responseDatabase)) {
            let score = 0;
            for (let keyword of data.keywords) {
                if (message.includes(keyword)) {
                    score += 1;
                }
            }
            scores[category] = score;
        }
        
        return scores;
    }
    
    // Seleccionar respuesta apropiada
    selectResponse(category, scores) {
        // Buscar mejor categoría por score
        if (scores[category] === 0) {
            const bestCategory = Object.keys(scores).reduce((a, b) => 
                scores[a] > scores[b] ? a : b
            );
            category = scores[bestCategory] > 0 ? bestCategory : 'ayuda';
        }
        
        const responses = this.responseDatabase[category]?.responses || 
                         this.responseDatabase['ayuda'].responses;
        
        // Seleccionar respuesta aleatoria de la categoría
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // Agregar análisis personalizado si hay datos del usuario
        if (category === 'recomendaciones' || category === 'libertad') {
            return response + this.getPersonalizedAdvice();
        }
        
        return response;
    }
    
    // Obtener recomendaciones personalizadas basadas en datos del usuario
    getPersonalizedAdvice() {
        try {
            const data = JSON.parse(localStorage.getItem('financeAppData'));
            if (!data || !data.currentUserId || !data.users[data.currentUserId]) {
                return '';
            }
            
            const user = data.users[data.currentUserId];
            const expenses = user.expenses || [];
            const health = user.financialHealth || {};
            
            if (expenses.length === 0) {
                return '\n\n💡 Consejo: Comienza registrando tus gastos para recibir recomendaciones más personalizadas.';
            }
            
            let advice = '\n\n📊 Análisis personalizado:\n';
            
            // Análisis de gastos
            const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
            const avgExpense = totalExpenses / expenses.length;
            advice += `• Gasto promedio: $${avgExpense.toFixed(2)}\n`;
            
            // Análisis de salud financiera
            if (health.income) {
                const savingRatio = ((health.income - totalExpenses) / health.income * 100).toFixed(1);
                if (savingRatio < 10) {
                    advice += '• ⚠️ Tu ratio de ahorro es bajo. Intenta reducir gastos no esenciales.\n';
                } else if (savingRatio < 20) {
                    advice += '• 📈 Buen ratio de ahorro. Intenta llevarlo a más del 20%.\n';
                } else {
                    advice += '• ✅ Excelente ratio de ahorro. Considera invertir más.\n';
                }
            }
            
            if (health.debt) {
                advice += `• Deuda total: $${health.debt.toFixed(2)}\n`;
            }
            
            return advice;
        } catch (error) {
            console.log('Sin datos disponibles para personalización');
            return '';
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar asistente cuando el usuario esté autenticado
    const checkAuth = setInterval(() => {
        const data = JSON.parse(localStorage.getItem('financeAppData'));
        if (data && data.currentUserId) {
            const assistant = new FinancialAIAssistant();
            clearInterval(checkAuth);
        }
    }, 500);
    
    // Timeout de 5 segundos para evitar loops infinitos
    setTimeout(() => clearInterval(checkAuth), 5000);
});
