# 🔧 JRK Usinagem - Instruções de Integração

Bem-vindo! Este documento explica como configurar todos os serviços opcionais que foram implementados no site.

---

## 📋 O que foi implementado?

✅ **FormSpree** - Receba emails de formulários  
✅ **reCAPTCHA v3** - Proteção contra spam  
✅ **Google Analytics 4** - Rastreamento de visitantes  
✅ **Open Graph** - Compartilhamento em redes sociais  
✅ **Imagem OG** - `og-image.svg` incluída

---

## 🚀 Como Configurar Cada Serviço

### 1️⃣ FormSpree - Receber Emails de Contato

#### Passo 1: Criar conta

1. Acesse https://formspree.io/
2. Clique em "Sign Up"
3. Use email e crie senha

#### Passo 2: Criar novo formulário

1. Após login, clique em "New Form"
2. Escolha "Email Form"
3. Selecione seu domínio (ex: `jrkusinagem.com.br`)
4. Copie o ID (será algo como: `mygzorpj`)

#### Passo 3: Atualizar no site

No arquivo `index.html`, linha ~1862, atualize:

```html
<!-- Antes -->
<form action="https://formspree.io/f/mygzorpj" method="POST">
  <!-- Seu ID aqui (copie do FormSpree) -->
  <form action="https://formspree.io/f/SEU_ID_AQUI" method="POST"></form>
</form>
```

#### Teste:

- Envie um email de teste através do formulário
- Verifique sua caixa de entrada
- Respostas automáticas devem aparecer em 24h

---

### 2️⃣ Google Analytics 4 - Rastreamento

#### Passo 1: Criar propriedade

1. Acesse https://analytics.google.com/
2. Clique em "Administração" (engrenagem)
3. Clique em "Criar propriedade"
4. Nome: "JRK Usinagem"
5. Timezone: "America/Sao_Paulo"
6. Moeda: "BRL"

#### Passo 2: Obter ID

1. Clique em "Web stream"
2. Digite seu domínio: `jrkusinagem.com.br`
3. Copie o "Measurement ID" (formato: `G-XXXXXXXXXX`)

#### Passo 3: Atualizar no site

No arquivo `index.html`, linha ~54-66, substitua:

```javascript
gtag("config", "G-XXXXXXXXXX", {  // Seu ID aqui
```

#### Passo 4: Verificar instalação

1. Acesse seu site em um navegador novo
2. No Google Analytics, vá para "Tempo real"
3. Você deve aparecer como 1 visitante ativo

---

### 3️⃣ Google reCAPTCHA v3 - Proteção contra Spam

#### Passo 1: Registrar domínio

1. Acesse https://www.google.com/recaptcha/admin/
2. Clique em "+Create" ou "Admin console"
3. Label: "JRK Usinagem"
4. reCAPTCHA type: **v3**
5. Domains: `jrkusinagem.com.br` e `www.jrkusinagem.com.br`

#### Passo 2: Obter chaves

- **Site Key** (pública) - Use no HTML
- **Secret Key** (privada) - Use apenas no backend

#### Passo 3: Atualizar no site

No arquivo `index.html`, linha ~74, substitua:

```html
<!-- Antes -->
<script src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></script>

<!-- Sua Site Key aqui -->
<script src="https://www.google.com/recaptcha/api.js?render=SUA_SITE_KEY_AQUI"></script>
```

No arquivo `script.js`, linha ~38, substitua:

```javascript
// Antes
window.grecaptcha.execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {

// Sua Site Key aqui
window.grecaptcha.execute("SUA_SITE_KEY_AQUI", {
```

#### Teste:

- Envie um formulário
- No reCAPTCHA dashboard, clique na propriedade
- Você deve ver eventos em "Analytics"

---

### 4️⃣ Open Graph & Imagem de Compartilhamento

#### O que foi feito:

- ✅ Meta tags Open Graph adicionadas em `index.html`
- ✅ Meta tags Twitter Card adicionadas
- ✅ Arquivo `og-image.svg` criado

#### Para usar imagem PNG em produção:

1. Abra `og-image.svg` em um navegador
2. Salve como PNG (1200x630px) - use Figma ou convertsor online
3. Renomeie para `og-image.png`
4. Faça upload para raiz do site: `https://jrkusinagem.com.br/og-image.png`

#### Teste o compartilhamento:

1. Acesse https://www.opengraph.xyz/
2. Digite sua URL: `https://jrkusinagem.com.br`
3. Verifique se imagem, título e descrição aparecem

---

### 5️⃣ Email Profissional (Bônus)

Para enviar respostas profissionais, configure email:

#### Opção A: Gmail (Simples)

1. Use `seu_email@gmail.com` no FormSpree
2. Respostas virão de lá

#### Opção B: Email Corporativo (Profissional)

1. Configure em seu hosting (cPanel, Plesk, etc)
2. Crie `contato@jrkusinagem.com.br`
3. Configure no FormSpree como "Reply-To"

#### Opção C: Sendgrid/Mailgun

- Use para envios automáticos em massa
- Integre com FormSpree Pro

---

## 🧪 Testando Tudo Junto

### Checklist de Testes:

- [ ] Acessar site e verificar carregamento
- [ ] Abrir DevTools (F12) > Console - sem erros?
- [ ] Clicar em CTAs - aparecem em GA4 Tempo Real?
- [ ] Enviar formulário - email chega?
- [ ] Compartilhar no WhatsApp/Facebook - imagem e título aparecem?
- [ ] Acessar em mobile - responsividade OK?
- [ ] Testar reCAPTCHA - está bloqueando bots?

---

## 📊 Acompanhar Métricas

### Google Analytics:

- **Relatórios > Público > Visão Geral** - Visitantes e sessões
- **Relatórios > Aquisição > Canais** - De onde vêm os visitantes
- **Eventos > Eventos** - Cliques, formulários enviados

### FormSpree:

- **Painel > Submissions** - Ver todos os formulários recebidos
- **Settings > Notifications** - Configurar notificações

### Ranking de prioridade:

1. **Conversões (Forms enviados)** - O mais importante!
2. **Tráfego (Visitantes únicos)** - Volume
3. **Engajamento (Tempo na página)** - Qualidade

---

## 🔒 Segurança

### O que foi feito:

✅ reCAPTCHA v3 contra bots  
✅ Validação de formulário no frontend  
✅ HTTPS (certificado SSL necessário)  
✅ Sanitização de dados

### Adicionar mais segurança:

1. Use HTTPS (certificado Let's Encrypt)
2. Configure CSP (Content Security Policy)
3. Adicione WAF (Cloudflare grátis)
4. Backup automático semanal

---

## 🚀 Próximos Passos

1. **Hoje:** Configure FormSpree e GA4
2. **Semana 1:** Configure reCAPTCHA e hospedagem
3. **Semana 2:** Teste tudo completamente
4. **Semana 3:** Coloque online com domínio próprio
5. **Depois:** Monitore métricas e otimize

---

## ❓ FAQs

**P: Preciso pagar por FormSpree?**  
R: Grátis até 50 formulários/mês. Depois R$ 10-100/mês.

**P: reCAPTCHA é invisível para usuários?**  
R: Sim! v3 funciona em background, sem "Não sou robô".

**P: Quanto custa colocar online?**  
R: De R$ 30-100/mês (hosting + domínio).

**P: Como faço backup?**  
R: Baixe os arquivos HTML/CSS/JS regularmente ou use Git.

**P: Posso migrar depois?**  
R: Sim! É um site estático, funciona em qualquer host.

---

## 📞 Suporte

Para dúvidas:

- **FormSpree** → https://formspree.io/support/
- **Google Analytics** → https://support.google.com/analytics/
- **reCAPTCHA** → https://www.google.com/recaptcha/contact

---

**Versão:** 1.0  
**Data:** 22 de maio de 2026  
**Status:** ✅ Pronto para usar
