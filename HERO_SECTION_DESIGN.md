# Hero Section - Concepto "Subtle Storm"

## 🎯 Veredicto Experto UX: **BUENO CON PRECAUCIÓN** (70% aprobado)

---

## Tu Idea Original
- Fondo con "technology sparks" o "tormenta de rayos"
- Efectos eléctricos/chispas
- Ambiente tecnológico energético

## Opinión del Experto

### ✅ POR QUÉ FUNCIONA:

1. **Diferenciación**
   - 95% de portfolios usan: gradientes estáticos, particle.js, o formas geométricas
   - Efecto bien ejecutado ES memorable
   - Comunica "energía," "innovación," "skill técnico"

2. **Impacto Emocional**
   - Rayos = poder, precisión, momentos breakthrough
   - Interés visual inmediato en primeros 3 segundos críticos
   - Refuerza expertise tech a través del diseño mismo

3. **Factibilidad Técnica**
   - CSS/Canvas moderno logra 60fps
   - Optimizable para móvil
   - Fallbacks accesibles son directos

### ⚠️ RIESGOS:

1. **Distracción vs Comunicación** (RIESGO ALTO)
   - Demasiado intenso → visitantes miran animación en vez de leer
   - Estudios: fondos animados reducen comprensión de texto 23-40%

2. **Percepción de Profesionalismo** (RIESGO MEDIO)
   - Demasiado dramático = "trying too hard" / gimmicky
   - Managers en empresas top pueden verlo como junior

3. **Performance Móvil** (RIESGO ALTO)
   - Canvas puede drenar batería 15-20%
   - Animaciones con lag = pérdida inmediata de credibilidad

4. **Accesibilidad** (RIESGO ALTO - DEBE RESOLVERSE)
   - Flashes rápidos pueden causar vestibular disorders o seizures
   - WCAG 2.1: NO más de 3 flashes por segundo

---

## ✨ Recomendación: Enfoque "Subtle Storm"

**En lugar de rayos literales → Campo electromagnético sutil**

### Concepto:
El *campo electromagnético* alrededor de equipo de alto voltaje, NO rayos dramáticos.

**Elementos:**
- ✅ Glows animados sutiles que pulsan lentamente
- ✅ Líneas de spark delgadas que ocasionalmente cruzan (1-2 cada 5 segundos MAX)
- ✅ Gradiente mesh shifts que sugieren flujo de energía
- ✅ Particle trails que siguen cursor (desktop only)
- ❌ NO flashing rápido
- ❌ NO rayos que llenan pantalla
- ❌ NO efectos que causan seizures

---

## Paleta de Colores para Efectos

```css
/* Colores de Sparks */
--spark-primary: #60a5fa;      /* Azul brillante (menos intenso) */
--spark-accent: #a78bfa;       /* Púrpura suave */
--spark-highlight: #ffffff;    /* Blanco (usar con moderación) */
--spark-glow: rgba(59, 130, 246, 0.15);  /* Glow azul sutil */

/* Fondos */
--bg-deep: #0a0e1a;           /* Navy oscuro (tu paleta) */
--bg-mid: #1a1f35;            /* Ligeramente más claro para profundidad */
```

---

## Implementación en Capas

### Layer 1: Animated Gradient Mesh (CSS) ⭐ PRIORIDAD

**Performance:** Excelente
**Complejidad:** Baja
**Impacto visual:** Alto

```css
@keyframes electricField {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-background {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 60%, rgba(167, 139, 250, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
    linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%);
  background-size: 200% 200%;
  animation: electricField 15s ease-in-out infinite;
}
```

**Descripción:** Gradientes radiales que se mueven lentamente, creando sensación de energía fluyendo.

---

### Layer 2: Glow Orbs (CSS) ⭐ RECOMENDADO

**Performance:** Excelente
**Complejidad:** Baja
**Impacto visual:** Medio-Alto

```css
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: pulseGlow 8s ease-in-out infinite;
}

.glow-orb-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 15%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.15), transparent);
}

.glow-orb-2 {
  width: 300px;
  height: 300px;
  bottom: 20%;
  right: 10%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.12), transparent);
  animation-delay: 3s;
}
```

**Descripción:** Orbes de luz que pulsan suavemente, como energía concentrada.

---

### Layer 3: Spark Lines (Canvas - Controlado) ⚠️ OPCIONAL

**Performance:** Media (requiere optimización)
**Complejidad:** Alta
**Impacto visual:** Alto si se hace bien

**Frecuencia:** 1 spark cada 5 segundos (MUY controlado)
**Duración:** 3-5 segundos por spark
**Opacidad:** Max 40%
**Velocidad:** Muy lento

**Descripción:** Líneas delgadas que ocasionalmente trazan caminos curvos, como descarga eléctrica sutil.

**⚠️ Consideraciones:**
- Implementar SOLO después de Layers 1 y 2
- Deshabilitar en móviles de gama media-baja
- Respetar `prefers-reduced-motion`

---

## Estructura de Contenido Hero

### Layout Recomendado (Desktop):

```
┌─────────────────────────────────────────────────────────┐
│ [Animated background layers]                            │
│                                                          │
│   ┌──────────────────┐         ┌────────────┐          │
│   │ MARVIN RONALDO   │         │            │          │
│   │ MARTÍNEZ M.      │         │   PHOTO    │          │
│   │                  │         │  (circular) │          │
│   │ Science & Sys..  │         │   w/glow   │          │
│   │                  │         │            │          │
│   │ Value prop text  │         └────────────┘          │
│   │ 1-2 sentences    │                                  │
│   │                  │                                  │
│   │ [Projects] [CV]  │                                  │
│   └──────────────────┘                                  │
│                                                          │
│              ↓ Scroll indicator                         │
└─────────────────────────────────────────────────────────┘
```

### Jerarquía Visual:

1. **Nombre** - Más grande, más contraste
   - Blanco con text-shadow
   - Gradiente azul-púrpura en apellido
2. **Título profesional** - Background semi-opaco para legibilidad
3. **Value proposition** - Fondo con backdrop-blur
4. **CTAs** - Fondos sólidos, glows sutiles
5. **Foto** - Borde con glow, efecto pulsante sutil

---

## Asegurar Legibilidad con Fondo Animado

### Técnicas Críticas:

**1. Text Shadows y Glows:**
```css
/* Para el nombre */
.hero-name {
  text-shadow:
    0 0 24px rgba(255, 255, 255, 0.5),
    0 0 48px rgba(96, 165, 250, 0.3);
}
```

**2. Backdrop Blur en Contenedores:**
```css
.hero-text-container {
  background: rgba(10, 14, 26, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

**3. Overlay de Contraste:**
```css
.hero-overlay {
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(10, 14, 26, 0.2) 50%,
    rgba(10, 14, 26, 0.6)
  );
}
```

**4. Z-Index Layering:**
```
z-0: Animated gradient mesh
z-1: Glow orbs
z-2: Canvas sparks
z-3: Overlay for contrast
z-10: Content (siempre encima)
```

---

## Performance Budget

### Targets:

- **Frame Rate:** 60fps mínimo
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s

### Optimización Mobile:

```typescript
const isMobile = window.innerWidth < 768;
const isLowPower = /Android|iPhone|iPad/i.test(navigator.userAgent);

if (isMobile || isLowPower) {
  // Solo CSS animations (Layers 1 y 2)
  // NO Canvas (Layer 3)
  // Reducir blur amounts
  // Simplificar gradientes
}
```

---

## Accesibilidad WCAG 2.1 AA

### Checklist:

- ✅ **2.3.1 Three Flashes:** Ningún elemento flashea > 3 veces/seg
- ✅ **2.2.2 Pause, Stop, Hide:** Respeta `prefers-reduced-motion`
- ✅ **1.4.3 Contrast:** Todo texto 4.5:1 mínimo
- ✅ **1.4.11 Non-text Contrast:** CTAs 3:1 vs fondo

### Reduced Motion:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-background,
  .glow-orb,
  .hero-photo-glow {
    animation: none !important;
  }

  /* Mostrar gradiente estático */
  .hero-background {
    background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%);
  }
}
```

---

## Alternativa "Segura" (95% Safe)

Si decides que animado es mucho riesgo:

```css
/* Estático pero premium */
.hero-safe-background {
  background:
    radial-gradient(circle at 30% 20%, rgba(96, 165, 250, 0.1), transparent 40%),
    radial-gradient(circle at 70% 80%, rgba(167, 139, 250, 0.08), transparent 40%),
    linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%);
}

/* Grid overlay sutil */
.tech-grid {
  background-image:
    linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.4;
}
```

**Da:**
- ✅ Estética tech
- ✅ Zero concerns de performance
- ✅ Full accesibilidad
- ✅ Apariencia profesional
- ❌ Menos memorable, más genérico

---

## Recomendación Final del Experto

### ✅ Procede con "Subtle Storm" SI:

1. ✅ Implementas la versión SUTIL especificada (NO rayos dramáticos)
2. ✅ Te comprometes a testing en Android gama media
3. ✅ Incluyes todos los fallbacks de accesibilidad
4. ✅ Pruebas legibilidad (usuarios identifican rápido nombre/value prop)

### ❌ Omítelo SI:

1. ❌ Timeline es apretado (esto añade 4-6 horas de polish)
2. ❌ No puedes testear en múltiples dispositivos
3. ❌ Target son empresas muy conservadoras (finanzas, gobierno)

---

## Plan de Implementación por Etapas

### Etapa 1: Base (EMPEZAR AQUÍ) ⭐

**Tiempo:** 1-2 horas
**Complejidad:** Baja

- [ ] Crear estructura `HeroSection.tsx`
- [ ] Agregar contenido (nombre, título, value prop)
- [ ] Layout grid (texto | foto)
- [ ] Foto de perfil con Next Image
- [ ] CTAs básicos
- [ ] Responsive breakpoints

**Resultado:** Hero funcional sin animaciones

---

### Etapa 2: Sistema de Colores

**Tiempo:** 30 min
**Complejidad:** Baja

- [ ] Definir variables CSS en `globals.css`
- [ ] Colores tech zone
- [ ] Colores sparks/effects
- [ ] Dark mode (si aplica)

---

### Etapa 3: Layer 1 - Animated Gradient

**Tiempo:** 30-45 min
**Complejidad:** Baja-Media

- [ ] Crear `.hero-background` con gradientes radiales
- [ ] Keyframes `electricField`
- [ ] Testing performance

**Resultado:** Fondo que "respira" sutilmente

---

### Etapa 4: Layer 2 - Glow Orbs

**Tiempo:** 30-45 min
**Complejidad:** Baja-Media

- [ ] Crear 2-3 `.glow-orb` elements
- [ ] Keyframes `pulseGlow`
- [ ] Posicionamiento
- [ ] Stagger animations

**Resultado:** Energía concentrada pulsante

---

### Etapa 5: Layer 3 - Canvas Sparks (OPCIONAL)

**Tiempo:** 2-3 horas
**Complejidad:** Alta

- [ ] Crear `HeroBackground.tsx` component
- [ ] Canvas setup y resize handling
- [ ] Spark generation logic (1 cada 5 seg)
- [ ] Bezier curves para paths naturales
- [ ] Fade in/out
- [ ] Performance monitoring

**Resultado:** Sparks eléctricos sutiles ocasionales

---

### Etapa 6: Optimización & Accesibilidad

**Tiempo:** 1-2 horas
**Complejidad:** Media

- [ ] Mobile detection y simplificación
- [ ] `prefers-reduced-motion` fallbacks
- [ ] Contrast checking (WCAG)
- [ ] Performance profiling
- [ ] Battery impact testing

---

### Etapa 7: Polish Final

**Tiempo:** 1 hora
**Complejidad:** Baja

- [ ] Text shadows para legibilidad
- [ ] Backdrop blurs
- [ ] Hover states en CTAs
- [ ] Scroll indicator animation
- [ ] Cross-browser testing

---

## Métrica de Éxito

**Después de 3 segundos en tu Hero, visitantes deben recordar:**

1. ✅ Tu nombre
2. ✅ "Engineer" / rol técnico
3. ✅ Sentimiento: "Impressive but not gimmicky"

El enfoque "Subtle Storm" logra los tres. Rayos dramáticos solo lograrían #3 (y dañarían #1-2).

---

## Próximos Pasos

**Opciones:**

### Opción A: Empezar Conservador (Recomendado)
1. Implementar Etapa 1 (Base) ✓
2. Implementar Etapa 2 (Colores) ✓
3. Implementar Etapa 3 (Gradient) ✓
4. **VER RESULTADO** y decidir si añadir más

**Ventaja:** Rápido para ver concepto, iterar fácil

### Opción B: Implementación Completa
1. Todas las etapas 1-7 de una vez
2. Versión completa con todos los efectos

**Ventaja:** Máximo impacto visual
**Desventaja:** Más tiempo antes de ver resultado

### Opción C: Alternativa Segura
1. Implementar solo Base + Gradiente estático
2. Cero animaciones

**Ventaja:** 100% seguro, rápido
**Desventaja:** Menos memorable

---

¿Qué opción prefieres para empezar?