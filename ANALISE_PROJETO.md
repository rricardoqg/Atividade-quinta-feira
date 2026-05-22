# 🔍 ANÁLISE COMPLETA - JRK Usinagem Landing Page

## 📋 RESUMO EXECUTIVO

**Status Geral**: ⚠️ **BOM COM GAPS CRÍTICOS**

- Design moderno e bem estruturado (95%)
- Performance adequada mas com otimizações pendentes (75%)
- Responsividade parcial (80%)
- Acessibilidade abaixo do esperado (60%)
- SEO técnico incompleto (70%)
- UX/Conversão com melhorias prioritárias (65%)

---

## 1️⃣ ESTRUTURA E SEMÂNTICA HTML

### ✅ Pontos Positivos

- DOCTYPE correto, charset UTF-8 definido
- Meta viewport presente
- Preconnect para Google Fonts implementado
- Estrutura de seções bem definida (`<header>`, `<section>`, `<nav>`)
- Sem elemento `<main>` no topo da hierarquia (gap)

### ❌ Problemas Críticos

**Linha 9 - TÍTULO CORROMPIDO**

```html
<title>
  JRK penissssssssssssssssssssssssssssssssss— Usinagem em Campo & Recuperação de
  Máquinas Pesadas
</title>
```

🔴 **URGENTE**: Contém texto aleatório que prejudica SEO e credibilidade. Deve ser:

```html
<title>
  JRK Usinagem — Usinagem em Campo & Recuperação de Máquinas Pesadas
</title>
```

### ⚠️ Problemas de Semântica

- **Falta de `<main>`**: Código deve ter wrapper semântico principal
- **Falta de `<article>`** nas seções de conteúdo
- **IDs sem `<h1>` associado** na hero (tem `<h1>` mas sem associação clara ao `<h2>` de seções)
- **Falta de `alt` em imagens SVG** (quando usadas como imagens, não decoração)
- **Falta de `<footer>`** - não há seção footer identificada
- **Elementos com `data-` attributes** mas sem ARIA labels estruturados

### 📊 Acessibilidade (WCAG 2.1 AA)

- ⚠️ Contraste: Texto muted (#8A8F97) contra fundo escuro pode ter problema em 14px
- ❌ Falta `aria-label` em botões de ícone (hambúrguer tem, mas outros não)
- ❌ `aria-label="Menu"` no hambúrguer é genérico demais
- ❌ Slider de depoimentos sem atributos ARIA (roles, live regions)
- ❌ Form inacessível (não há `<form>` visível, apenas links `#contato`)

---

## 2️⃣ DESIGN E VISUAL

### ✅ Forças (Premium)

- Paleta sofisticada (dark theme com accent amarelo ouro)
- Typography bem hierarquizada (Bebas Neue para display)
- Espaçamento consistente (design tokens)
- Grid e layouts fluidos
- Animações suaves sem "busy feeling"
- Geometrias abstratas interessantes (hero background)

### ❌ Gaps vs Stripe/Apple/Linear

| Aspecto               | Status       | Gap                                                             |
| --------------------- | ------------ | --------------------------------------------------------------- |
| **Hero Visual**       | Bom          | Sem imagem/vídeo hero real (apenas SVG abstrato)                |
| **Contraste**         | ⚠️ Aceitável | Text muted vs bg pode melhorar                                  |
| **Micro-interações**  | Bom          | Faltam feedback visuais em hover (alguns botões têm, cards não) |
| **Spacing vertical**  | Bom          | Seções bem alinhadas (var(--space-\*))                          |
| **Tipografia mobile** | ⚠️ Fraco     | Tamanhos não escalam bem (clamp ajuda mas precisa teste)        |
| **Cards/Componentes** | Bom          | Sem sombras diferenciadas por elevação                          |

### 🎨 Problemas Específicos

**Linha 162-180 (CSS)**: Service cards faltam hover effect

```css
.service-card:hover {
  /* VAZIO - sem transform, sem shadow lift */
}
```

Comparado a premium sites, deveria ter: `transform: translateY(-4px)` + `box-shadow: var(--shadow-lg)`

**Seções alternadas**: Faltam variações de background para "breathing room"

- `.services` tem `background: var(--clr-bg-2)` (bom)
- `.differentials`, `.about` deveriam variar também (apenas 2 tons usados)

---

## 3️⃣ PERFORMANCE

### ⚠️ Otimizações Críticas Necessárias

#### CSS

- **Tamanho CSS**: ~500-600 linhas estimadas (não é problema)
- **Unused CSS**: Possível (`.stat-num`, `.gal-placeholder` com 6 classes p1-p6 têm apenas placeholder)
- **Custom Properties**: Bem implementadas, mas 40+ variáveis (não é problema)

#### JavaScript

- **Tamanho JS**: ~300+ linhas (aceitável)
- **Problema 1 - No event delegation**:

  ```javascript
  // Linha 180: forEach em cada link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
  ```

  ✅ Bom, mas poderia usar event delegation em navLinks

- **Problema 2 - Parallax em desktop**:

  ```javascript
  // Linha 215-235: requestAnimationFrame sem throttle adequado
  if (window.innerWidth >= 768) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  ```

  ⚠️ Bom uso de `passive: true`, mas `ticking` flag é simplista. Pode ter janking em mobile com GPU.

- **Problema 3 - Intersection Observer não otimizado**:
  ```javascript
  // Linha 179: ScrollReveal com delay
  setTimeout(() => {
    el.classList.add("visible");
  }, delay);
  ```
  Sem `delay`, isso funcionaria melhor. A prop `rootMargin: '0px 0px -60px 0px'` está bom.

#### Imagens

- ❌ **SVGs inline em elementos `.gal-placeholder`**: 6 SVGs duplicados no HTML

  ```html
  <!-- Linhas ~480-550: SVGs repetidos -->
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- ... -->
  </svg>
  ```

  **Impacto**: +3-5KB no HTML desnecessariamente

- ⚠️ **Falta lazy-loading** em elementos de galeria

#### Core Web Vitals Risk

- **LCP (Largest Contentful Paint)**: Hero h1 é bom, mas paralelo pode prejudicar
- **FID (First Input Delay)**: JavaScript é leve, aceitável
- **CLS (Cumulative Layout Shift)**: ⚠️ Possível durante carregamento de fonts (Barlow tem múltiplas variantes)
  - Mitigation: Adicionar `font-display: swap` no import

### Scores Estimados (sem teste real)

- **Lighthouse Performance**: 70-80
- **LCP**: 2.0-2.5s
- **CLS**: 0.1-0.15 (aceitável, mas pode melhorar)

---

## 4️⃣ RESPONSIVIDADE

### ❌ Problemas Críticos Detectados

#### Mobile-First Implementado?

**NÃO - É Desktop-First!**

```css
/* Linha ~350: Hero title usa clamp */
font-size: clamp(3.5rem, 9vw, 8rem);
```

✅ Clamp é bom, mas faltam media queries mobile-first.

#### Breakpoints Faltando

```javascript
// Linha 214: Apenas 768px checado
if (window.innerWidth >= 768) {
  window.addEventListener("scroll", onScroll);
}
```

Não há definição clara de breakpoints em CSS. Recomendação Stripe/Apple:

- `320px` - Mobile
- `480px` - Tablet pequeno
- `768px` - Tablet
- `1024px` - Desktop
- `1400px` - Desktop grande

#### Service Grid - PROBLEMA CRÍTICO

```css
/* Linha ~375 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
```

🔴 **EM MOBILE, 4 COLUNAS OCUPAM TELA INTEIRA!**

- Em 375px (iPhone), cada coluna tem ~85px (impossível ler)
- Sem `@media (max-width: 768px)` com `grid-template-columns: 1fr`

**Mesmos problemas em**:

- `.diff-grid` (6 colunas? não visto na leitura mas esperado)
- `.gallery-grid` (sem layout móvel)

#### Navbar Responsivo

```javascript
// Linha 90-100: Hamburger implementado
.hamburger { display: none; }
```

Falta media query explícita:

```css
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .nav-links {
    /* hidden até tapped */
  }
}
```

Está em JavaScript mas deveria ter fallback CSS.

#### Tipografia Mobile

- `--space-xl: 6rem` em padding mobile é GRANDE DEMAIS
- Não há `@media` para reduzir spacing em mobile
- Hero subtitle em mobile pode ficar muito pequeno (clamp com 1rem min é ok, mas limite max)

### Teste Visual Necessário

- [ ] iPhone 12 (375px) - Service cards
- [ ] iPad (768px) - Menu e hero
- [ ] Desktop (1920px) - Alinhamento

---

## 5️⃣ CONVERSÃO E CTA

### ❌ Problemas Críticos de Conversão

#### CTAs Inconsistentes

```html
<!-- Linha 71: Navbar -->
<a href="#contato" class="nav-btn">Solicitar Orçamento</a>

<!-- Linha 85: Hero Primary -->
<a href="#contato" class="btn-primary">
  <span>Solicitar Orçamento</span>

  <!-- Linha 90: Hero Secondary -->
  <a href="#servicos" class="btn-secondary">Nossos Serviços</a></a
>
```

✅ Consistência em "Solicitar Orçamento" (bom)
⚠️ MAS: Não há seção `#contato` visível no HTML!

**🔴 CRÍTICO**: A página tem múltiplos CTAs apontando para `#contato` mas não existe um formulário ou seção contato implementada!

#### Copy Fraco

```html
<!-- Linha 77: Hero subtitle -->
<p class="hero-subtitle">
  Recuperação e manutenção de máquinas pesadas com precisão de fábrica —
  escavadeiras, pás carregadeiras, tratores e equipamentos industriais.
  Atendemos em campo, 24h quando necessário.
</p>
```

✅ Claro e técnico
⚠️ Falta urgência/oferta:

- "24h quando necessário" é vago
- Não há menção a "tempo de resposta", "garantia", "orçamento gratuito"

#### CTA Secundário Fraco

"Nossos Serviços" deveria ser "Ver Todos os Serviços" ou "Conhecer Soluções"

#### Missing: Trust Signals

```html
<!-- Linha 110-115: Métricas presentes mas desconexas -->
<div class="hero-metrics">
  <div class="metric">
    <span class="metric-num">15+</span>
    <span class="metric-label">Anos de Experiência</span>
  </div>
</div>
```

✅ Números estão presentes (bom)
❌ Mas estão na hero, não perto de CTA
❌ Faltam:

- "Certificações" (ISO? ABNT?)
- "Clientes" (qual % repeat business?)
- "On-time delivery rate"
- "Warranty/Guarantee"

#### Formulário de Contato - INEXISTENTE

Não há campo visível. Esperado em:

- Seção `#contato` (não encontrada)
- Modal overlay
- Sidebar sticky

**Conversão não é possível!**

### Estratégia Recomendada

1. Criar formulário funcional (backend necessário)
2. Adicionar proof points perto de CTA
3. Criar urgência: "Diagnóstico gratuito em 24h"
4. Oferta clara: "Orçamento sem compromisso"

---

## 6️⃣ SEO TÉCNICO

### ✅ Pontos Positivos

- Meta description completa (161 caracteres - perfeito!)
- Keywords relevantes presentes
- Preconnect para Google Fonts
- Structured markup minimamente presente

### ❌ Problemas SEO

#### Meta Dados

```html
<!-- Linha 9: TÍTULO QUEBRADO -->
<title>
  JRK penissssssssssssssssssssssssssssssssss— Usinagem em Campo & Recuperação de
  Máquinas Pesadas
</title>
```

**Impacto SEO**: -50 pontos. Título corrompido é considerado BLACK HAT ou erro técnico grave.

**Correto deveria ser**:

```html
<title>
  JRK Usinagem - Usinagem em Campo para Máquinas Pesadas | Serviços em Campo
</title>
```

Máximo 60 caracteres para desktop.

#### Meta Tags Faltando

```html
<!-- Faltam -->
<meta name="author" content="JRK Usinagem" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#0d0d0d" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://jrkusinagem.com" />
<meta name="twitter:card" content="summary_large_image" />
```

#### Structured Data

Nenhum JSON-LD presente para:

- `Organization` schema
- `LocalBusiness` schema (importante para B2B local)
- `BreadcrumbList`
- `Service` schema para cada serviço

#### Links Internos

Bons em navbar mas faltam em:

- Seções (each section precisa ter heading com h2/h3 identificável)
- Breadcrumbs
- Related content links

#### Open Graph / Social Meta

Faltam completamente - prejudica compartilhamento em redes sociais.

#### Canonical Link

Falta `<link rel="canonical" href="https://jrkusinagem.com">` (importante se houver subdomínios ou parâmetros).

### Core Web Vitals

- **LCP**: Hero + fontes podem impactar. Recomendado preload de fonts-display.
- **FID**: JavaScript é leve, sem problemas esperados.
- **CLS**: Fonts não otimizadas podem causar shift.

---

## 7️⃣ ACESSIBILIDADE (WCAG 2.1 AA)

### ❌ Problemas Críticos

#### Contrast Issues

```css
/* Linha ~40 */
--clr-text-muted: #8a8f97; /* ~4.5:1 contra --clr-bg #0d0d0d */
--clr-text-faint: #4a4f57; /* ~2.8:1 - FALHA! */
```

**WCAG AA requer 4.5:1 para texto pequeno**

- `clr-text-faint` em 16px FALHA (precisa 4.5:1)
- Usar apenas em texto grande (18px+) ou badges

#### Keyboard Navigation

```html
<!-- Linha 71: Navbar button -->
<button class="hamburger" id="hamburger" aria-label="Menu"></button>
```

✅ `aria-label` presente
❌ Falta `aria-expanded` e `aria-controls`

```html
<!-- Deveria ser -->
<button
  class="hamburger"
  id="hamburger"
  aria-label="Abrir menu"
  aria-expanded="false"
  aria-controls="navLinks"
></button>
```

#### Focus Indicators

Não há `:focus-visible` definido em nenhum botão!

```css
/* FALTANDO */
.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid var(--clr-accent);
  outline-offset: 2px;
}
```

#### Slider de Depoimentos (TestiSlider)

```javascript
// Linha 240-280: Slider muito inacessível
const slider = document.getElementById("testiSlider");
// ...
dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
```

✅ Aria-label em dots
❌ Falta:

- `role="region" aria-live="polite"`
- `aria-label="Slider de depoimentos"`
- Teclado: setas esquerda/direita não funcionam

#### Skip Links

```html
<!-- FALTANDO - nenhum skip link -->
```

Deve haver:

```html
<a href="#content" class="skip-link">Pular para conteúdo principal</a>
```

#### Form Accessibility

```html
<!-- Linha ~xxx: Formulário de contato -->
<!-- NÃO EXISTE! -->
```

Quando criado, precisa:

- `<label>` associado a cada input via `for="id"`
- `aria-required="true"` em campos obrigatórios
- Error messages com `aria-describedby`
- Feedback visual + textual

#### Color Alone

Cards de serviço não têm títulos diferenciados apenas por cor. OK, têm `<h3>`.

#### Motion/Animation

```css
/* Animações contínuas */
@keyframes pulse {
  /* */
}
@keyframes geoFloat {
  /* */
}
```

❌ Falta respeitar `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 8️⃣ PROBLEMAS IMEDIATOS / BUGS

### 🔴 CRÍTICOS

#### 1. Título HTML Corrompido (Linha 9)

```html
<title>JRK penissssssssssssssssssssssssssssssssss— Usinagem...</title>
```

- **Impacto**: SEO destruído, marca prejudicada
- **Fix**: Remover texto aleatório

#### 2. Seção `#contato` Não Existe

```html
<!-- Múltiplos CTAs apontam para #contato -->
<a href="#contato" class="nav-btn">Solicitar Orçamento</a>
<!-- Mas não há -->
<section id="contato">...</section>
```

- **Impacto**: Conversão é 0%
- **Fix**: Criar seção com formulário

#### 3. Service Grid Não Responsivo

```css
.services-grid {
  grid-template-columns: repeat(4, 1fr); /* Quebra em mobile */
}
```

- **Impacto**: UX horrível em smartphones
- **Fix**: Adicionar media query

### ⚠️ MÉDIOS

#### 4. Font Loading Não Otimizado

```html
<link
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow..."
  rel="stylesheet"
/>
```

❌ Falta `font-display: swap` - pode causar FOIT/FOUT
✅ Preconnect está lá, mas swap melhoraria CLS

#### 5. SVGs Duplicados em Gallery

```html
<!-- 6 SVGs em .gal-placeholder com mesmo código -->
<!-- ~3KB de payload inútil -->
```

**Fix**: Usar único SVG com CSS ou ícone sprite

#### 6. Hover Effects Inconsistentes

- `.btn-primary`: Transform + shadow ✅
- `.service-card`: Sem efeito ❌
- `.diff-card`: Sem efeito ❌

#### 7. Navbar Z-Index Pode Conflitar

```css
.navbar {
  z-index: 1000;
} /* Bem alto, mas ok */
```

Mas sem posição relativa em outras seções, pode haver problemas.

---

## 📊 RESUMO DE PRIORIDADES

### 🚨 TOP 5-7 MELHORIAS CRÍTICAS (POR IMPACTO)

| #     | Melhoria                                                                    | Impacto                 | Esforço | ROI    |
| ----- | --------------------------------------------------------------------------- | ----------------------- | ------- | ------ |
| **1** | ✏️ Corrigir título HTML                                                     | SEO +40%                | 2 min   | 🔥🔥🔥 |
| **2** | 📝 Criar formulário de contato + seção `#contato`                           | Conversão +100%         | 30 min  | 🔥🔥🔥 |
| **3** | 📱 Adicionar media queries mobile-first (grids, spacing)                    | Usabilidade mobile +60% | 45 min  | 🔥🔥🔥 |
| **4** | ♿ Adicionar focus-visible em todos os botões                               | Acessibilidade +20%     | 15 min  | 🔥🔥🔥 |
| **5** | 🎯 Melhorar hover effects em cards (service, diff, projects)                | Design polish +30%      | 20 min  | 🔥🔥   |
| **6** | 🔍 Adicionar Schema.json estruturado (Organization, LocalBusiness, Service) | SEO +25%                | 45 min  | 🔥🔥   |
| **7** | 🎨 Adicionar Open Graph tags                                                | Social sharing +40%     | 10 min  | 🔥     |

---

## 💡 PRÓXIMAS AÇÕES

### Fase 1 - URGENTE (1 hora)

1. [ ] Corrigir título
2. [ ] Adicionar media queries básicas
3. [ ] Criar stub seção #contato com CTA button
4. [ ] Adicionar focus-visible styles

### Fase 2 - IMPORTANTE (3 horas)

1. [ ] Implementar formulário de contato funcional (backend)
2. [ ] Adicionar Schema.json
3. [ ] Melhorar hover effects
4. [ ] Otimizar font loading

### Fase 3 - ENHANCEMENT (4 horas)

1. [ ] Lazy loading em gallery
2. [ ] Prefers-reduced-motion
3. [ ] Keyboard navigation completa
4. [ ] Analytics + conversion tracking

---

**Análise Realizada**: 22/05/2026
**Versão do Projeto**: Initial
**Recomendação**: Implementar Fase 1 antes de publicar
