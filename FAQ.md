# ❓ FAQ - Preguntas Frecuentes

## Control Financiero y Portafolio de Inversión

---

## 🔐 Autenticación y Cuenta

### ¿Cuáles son las credenciales de demo?

**Email:** `demo@test.com`
**Contraseña:** `demo123`

Esta cuenta tiene datos de ejemplo para explorar la aplicación.

---

### ¿Mis contraseñas son seguras?

⚠️ **Importante:** Esta aplicación es educativa. Las contraseñas se guardan en texto plano en localStorage.

**Para producción:**
- Usar hashing bcrypt
- Implementar HTTPS
- Usar JWT tokens
- Base de datos encriptada

---

### ¿Puedo recuperar mi contraseña?

No hay función de recuperación en esta versión. Usa una contraseña que recuerdes o

 limpia el caché y crea una nueva cuenta.

---

### ¿Cómo cambio de usuario?

Haz clic en "Cerrar Sesión" en la esquina superior derecha. Luego inicia sesión con otra cuenta.

---

## 💾 Datos y Almacenamiento

### ¿Dónde se guardan mis datos?

En **localStorage** de tu navegador:
- ✅ Localmente en tu computadora
- ✅ No se envían a servidores
- ✅ Privados y seguros
- ⚠️ Se pierden si limpias el caché

---

### ¿Puedo sincronizar mis datos entre dispositivos?

No en esta versión. Cada navegador/dispositivo es independiente.

**Solución futura:** Backend en la nube con sincronización.

---

### ¿Cómo hago backup de mis datos?

Abre las DevTools (F12) → Storage → LocalStorage → Copia el contenido de `financeAppData`

Guárdalo en un archivo de texto o JSON.

---

### ¿Qué pasa si borro el caché del navegador?

Se pierden todos los datos. Por eso es importante hacer backup.

**Para limpiar selectivamente:**
1. DevTools (F12)
2. Storage → LocalStorage
3. Click derecho en `financeAppData`
4. Delete

---

### ¿Puedo exportar un reporte?

Actualmente no. Es una mejora planeada para versiones futuras.

**Alternativa temporal:** Toma screenshots de cada sección.

---

## 📊 Gastos y Categorización

### ¿Cómo se categorizan automáticamente los gastos?

Por palabras clave en la descripción:

| Palabra clave | Categoría |
|--------------|-----------|
| gasolina, uber, taxi, bus | Transporte |
| supermercado, restaurante, pan | Alimentación |
| netflix, cine, viaje | Entretenimiento |
| doctor, farmacia | Salud |
| renta, luz, agua, internet | Vivienda |

---

### ¿Puedo cambiar la categoría manualmente?

Sí. Si la categorización automática es incorrecta, selecciona la correcta del dropdown.

---

### ¿Puedo editar un gasto después de registrarlo?

Actualmente solo puedes eliminar y reregistrarlo. La edición es una mejora futura.

---

### ¿Puedo registrar gastos pasados?

Sí. En el campo "Fecha" puedes seleccionar cualquier fecha pasada.

---

### ¿Hay límite de gastos registrados?

No hay límite técnico, pero localStorage tiene ~5-10MB de espacio.

---

## 💰 Salud Financiera

### ¿Qué es el Ratio de Ahorro?

Es el porcentaje de tus ingresos que no gastas:

```
Ratio Ahorro = (Ingresos - Gastos) / Ingresos × 100
```

**Interpretación:**
- 20%+ = Excelente
- 15-20% = Bueno
- 5-15% = Aceptable
- <5% = Crítico

---

### ¿Qué es el Ratio Deuda/Ingresos?

Es el porcentaje que tu deuda representa de tus ingresos mensuales:

```
Ratio = Deuda Total / Ingresos Mensuales × 100
```

**Interpretación:**
- <20% = Excelente
- 20-36% = Aceptable
- >36% = Preocupante

---

### ¿Cuál debe ser mi Fondo de Emergencia?

Ideal: 6 meses de gastos promedio

**Mínimo recomendado:** 3 meses

**Beneficios:**
- Protección ante despidos
- Gastos médicos inesperados
- Reparaciones de emergencia

---

### ¿Cómo calculo el tiempo para pagar mi deuda?

Si ahorras dinero cada mes:

```
Meses = Deuda Total / Ahorro Mensual
```

Ejemplo: $5,000 deuda ÷ $250 ahorro/mes = 20 meses

---

### ¿Cuáles son las recomendaciones automáticas?

Se generan según tus indicadores:

| Si Ratio Ahorro <20% | → Intenta aumentar ahorro |
| Si Deuda/Ingresos >36% | → Prioriza pagar deuda |
| Si Fondo <3 meses | → Acumula fondo de emergencia |
| Si Todo es óptimo | → Felicidades, invierte |

---

## 📈 Portafolio de Inversión

### ¿Cuál es la diferencia entre Renta Fija y Variable?

**Renta Fija:**
- Ejemplo: Bonos, depósitos a plazo
- Retorno: Fijo y predecible (~4%)
- Riesgo: Bajo
- Volatilidad: Baja

**Renta Variable:**
- Ejemplo: Acciones, ETFs, fondos
- Retorno: Variable (~10%)
- Riesgo: Alto
- Volatilidad: Alta

---

### ¿Qué perfil de riesgo debo elegir?

**Conservador (🛡️)** si:
- Estás cerca de jubilarte
- No toleras pérdidas
- Necesitas estabilidad
- Horizonte: < 5 años

**Moderado (⚖️)** si:
- Tienes edad media laboral
- Quieres balance
- Puedes tolerar algo de volatilidad
- Horizonte: 5-15 años

**Agresivo (🚀)** si:
- Eres joven
- Toleran riesgo
- Buscan máximo crecimiento
- Horizonte: 15+ años

---

### ¿Puedo cambiar mi perfil después?

Sí, puedes cambiar cuando lo desees. Solo selecciona un nuevo perfil y guarda.

---

### ¿Qué significa "Rentabilidad Esperada"?

Es el retorno promedio anual histórico de ese perfil:

- Conservador: 4.5-5.5% anual
- Moderado: 6.5-7.5% anual
- Agresivo: 8.5-10% anual

⚠️ Estos son promedios históricos, no garantizados.

---

### ¿Qué es la Volatilidad?

Es cuánto cambia el valor de tu inversión:

- **Baja:** Cambios pequeños y predecibles
- **Media:** Cambios moderados
- **Alta:** Cambios grandes, puede bajar 20% en un mes

---

### ¿Puedo perder mi dinero?

Con **Renta Fija:** Muy poco probable

Con **Renta Variable:** Sí, es posible perder en el corto plazo, pero históricamentente gana en el largo plazo.

---

### ¿Cuándo debo invertir?

Recomendaciones:

✅ **Primero:** Fondo de emergencia 3-6 meses
✅ **Después:** Pagar deudas de alto interés
✅ **Luego:** Invertir lo que ahorres regularmente
✅ **Siempre:** Invertir a largo plazo

---

## 🎯 Objetivos y Metas

### ¿Cuál es un buen objetivo financiero?

**SMART:**
- **S**pecífico: "Tener $10,000 ahorrados"
- **M**edible: Cantidad exacta
- **A**lcanzable: Realista para ti
- **R**elevante: Importante para tu vida
- **T**emporal: Plazo específico (ej: 12 meses)

---

### Ejemplo de Plan Financiero

**Situación:** Juan gana $3,000/mes

**Mes 1-3:**
- Registra todos sus gastos
- Identifica categorías de gasto alto
- Objetivo: Ratio ahorro de 15%

**Mes 4-9:**
- Reduce gastos innecesarios
- Ahorra $450/mes (15% de $3,000)
- Acumula fondo emergencia: $2,700

**Mes 10-12:**
- Fondo completo (6 meses): $18,000
- Paga deuda de $5,000
- Comienza a invertir $250/mes

---

## 🐛 Solución de Problemas

### La página no carga

**Posibles causas:**
- Archivo index.html no está en la ruta correcta
- Navegador no compatible
- Caché corrupto

**Soluciones:**
1. Limpia caché (Ctrl+F5)
2. Abre en navegador diferente
3. Verifica la ruta del archivo

---

### Los datos no se guardan

**Causas:**
- localStorage deshabilitado
- Navegador en modo incógnito
- Sesión expirada

**Soluciones:**
1. Abre DevTools (F12)
2. Verifica console por errores
3. Habilita localStorage en configuración
4. No uses modo incógnito

---

### Los gráficos no aparecen

**Causa:** Chart.js no cargó

**Soluciones:**
1. Verifica conexión a internet
2. Limpia caché
3. Recarga la página
4. En FireFox: Comprueba que JavaScript esté habilitado

---

### La categorización es incorrecta

**Solución:** Selecciona la categoría correcta del dropdown

Las palabras clave se pueden mejorar en futuras versiones.

---

### Mi sesión se cerró inesperadamente

**Causa:** Limpiaste el caché del navegador

**Prevención:**
- No limpies todo el caché
- O haz backup de tus datos
- En futuras versiones habrá sincronización

---

### ¿Por qué no puedo editar gastos?

Esta es una limitación de la versión 1.0. Debes eliminar y reregistrar.

**Mejora futura:** Función de edición en v1.1.

---

## 💡 Consejos y Trucos

### Tip 1: Usa descripciones claras
```
❌ Malo: "Pago"
✅ Bueno: "Gasolina Petrox"
```

Esto mejora la categorización automática.

---

### Tip 2: Registra gastos diarios

No esperes a fin de mes. Hazlo diariamente para mejor precisión.

---

### Tip 3: Actualiza tu perfil mensualmente

Cambia ingresos/deuda cuando haya cambios significativos.

---

### Tip 4: Revisa recomendaciones regularmente

La app genera sugerencias basadas en tus datos.

---

### Tip 5: Prueba todos los perfiles

Experimenta con Conservador/Moderado/Agresivo para ver diferencias.

---

## 🚀 Mejoras Solicitadas

- 📱 App móvil
- 💾 Sincronización en la nube
- 📊 Más gráficos avanzados
- 🤖 IA para predicciones
- 📧 Alertas por email
- 🏦 Integración bancaria

---

## 📞 Contacto y Soporte

**¿Encontraste un error?**
Documenta:
- Qué hiciste
- Qué esperabas
- Qué pasó

**¿Sugerencias?**
Describe tu idea detalladamente.

---

## 📖 Recursos Externos

**Educación Financiera:**
- [Investopedia](https://www.investopedia.com)
- [The Balance](https://www.thebalance.com)
- [Khan Academy - Finance](https://www.khanacademy.org)

**Portafolio de Inversión:**
- [Vanguard](https://www.vanguard.com)
- [Bogleheads](https://www.bogleheads.org)
- [CNBC](https://www.cnbc.com)

---

## 🎓 Certificaciones Relacionadas

- 📜 CFA (Chartered Financial Analyst)
- 📜 CFP (Certified Financial Planner)
- 📜 ChFC (Chartered Financial Consultant)

---

**¿No encuentras respuesta?**
Revisa los archivos:
- `README.md` - Documentación completa
- `QUICK_START.md` - Guía rápida
- `ARCHITECTURE.md` - Detalles técnicos

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
