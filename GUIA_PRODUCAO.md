# 🚀 Guia de Produção - JRK Usinagem

## Antes de Colocar Online

Este guia detalha os passos necessários para colocar o site em produção com segurança, performance e conformidade.

---

## 1. 🌐 Registrar Domínio

### Registradores Recomendados (Brasil):

- **Registro.br** - Domínios `.com.br` (https://registro.br)
- **GoDaddy** - Domínios internacionais (https://godaddy.com)
- **Hostinger** - Hospedagem + domínio (https://hostinger.com.br)
- **Namecheap** - Domínios baratos (https://namecheap.com)

### Passo a Passo:

1. Escolha um nome de domínio único (ex: `jrkusinagem.com.br`)
2. Verifique disponibilidade
3. Registre por pelo menos 1 ano
4. Configure DNS apontando para seu host

**Custo Estimado:** R$ 20-80/ano

---

## 2. 🔒 Certificado SSL (HTTPS)

### Opções Gratuitas:

- **Let's Encrypt** (Recomendado - Grátis)
- **Cloudflare Free SSL**
- **AWS Certificate Manager** (para EC2)

### Opções Pagas (Mais Segurança):

- **Comodo/Sectigo** - R$ 50-200/ano
- **DigiCert** - R$ 200-500/ano

### Como Obter (Let's Encrypt via Certbot):

**Linux/Mac:**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --standalone -d jrkusinagem.com.br -d www.jrkusinagem.com.br

# Auto-renovação (automático)
sudo systemctl enable certbot.timer
```

**Windows/Hosting compartilhado:**

- Solicite ao provedor para ativar SSL automático (maioria oferece grátis)
- Se usar Cloudflare: ative SSL gratuito no painel

### Verificar SSL:

- Acesse https://www.ssllabs.com/ssltest/
- Seu domínio deve ter nota A ou A+

**Custo:** Grátis (Let's Encrypt) até R$ 500/ano (Premium)

---

## 3. 🔑 Configurar Integrations

### A. FormSpree (Emails de Contato)

1. Acesse https://formspree.io/
2. Crie uma conta
3. Adicione seu domínio
4. Copie o ID do formulário (ex: `mygzorpj`)
5. Substitua em `index.html` action do form:
   ```html
   <form action="https://formspree.io/f/SEU_ID_AQUI" method="POST"></form>
   ```

**Custo:** Grátis (até 50 formulários/mês) → R$ 10/mês (ilimitado)

### B. Google Analytics 4

1. Acesse https://analytics.google.com/
2. Crie uma nova propriedade para seu domínio
3. Copie o ID (formato: `G-XXXXXXXXXX`)
4. Substitua em `index.html`:
   ```html
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
   ></script>
   <script>
     gtag("config", "G-XXXXXXXXXX");
   </script>
   ```
5. Verifique se está rastreando em Tempo Real

**Custo:** Grátis

### C. Google reCAPTCHA v3

1. Acesse https://www.google.com/recaptcha/admin
2. Registre seu site
3. Selecione reCAPTCHA v3
4. Copie a chave pública
5. Substitua em `index.html`:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=SUA_CHAVE_PUBLICA"></script>
   <script>
     window.grecaptcha.execute("SUA_CHAVE_PUBLICA", { action: "contact_form" });
   </script>
   ```

**Custo:** Grátis (até 1M requisições/mês)

### D. Cloudflare (CDN + DDoS Protection)

1. Acesse https://cloudflare.com/
2. Adicione seu domínio
3. Atualize nameservers no registrador
4. Ative:
   - SSL/TLS: Flexible ou Full
   - Minification: JS, CSS, HTML
   - Caching: Standard

**Custo:** Grátis (com opções pagas)

---

## 4. 📊 Configurar Monitoramento

### Uptime Monitoring:

- **UptimeRobot** (grátis) - https://uptimerobot.com/
- **Ping-Tree** (grátis) - https://ping-tree.com/

### Performance Monitoring:

- **Google PageSpeed Insights** - https://pagespeed.web.dev/
- **GTmetrix** - https://gtmetrix.com/

### Logs e Erros:

- **Sentry** (Logging JavaScript) - https://sentry.io/
- **LogRocket** (Sessões de usuário) - https://logrocket.com/

---

## 5. 🏗️ Hosting Recomendado

### Opções Baratas (R$ 20-50/mês):

| Provedor  | Plano    | Recursos                  | SSL    | Suporte |
| --------- | -------- | ------------------------- | ------ | ------- |
| Hostinger | Eco      | 25GB SSD, 100GB bandwidth | Grátis | 24/7    |
| NameCheap | Stellar  | 30GB SSD, unlimited       | Grátis | 24/7    |
| GoDaddy   | Business | 100GB SSD, unlimited      | Grátis | 24/7    |

### Opções Modernas (Node.js/JAM Stack):

| Provedor | Tipo       | Custo       | Vantagens                |
| -------- | ---------- | ----------- | ------------------------ |
| Vercel   | Serverless | Grátis/$20+ | Próximo, GA4, CI/CD      |
| Netlify  | Serverless | Grátis/$19+ | Deploy automático, Forms |
| Render   | Cloud      | Grátis/$7+  | PostgreSQL, APIs         |
| Railway  | Cloud      | Pague o uso | Simples, sem cartão      |

### Para este projeto (HTML/CSS/JS puro):

**Recomendação:** Hostinger ou Netlify (mais fácil, suporte automático)

---

## 6. ✅ Checklist Pré-Lançamento

- [ ] Domínio registrado e DNS configurado
- [ ] Certificado SSL instalado (HTTPS funcionando)
- [ ] FormSpree ID atualizado no formulário
- [ ] Google Analytics ID instalado
- [ ] reCAPTCHA keys configuradas
- [ ] og-image.png enviada para raiz do site (1200x630px)
- [ ] robots.txt configurado
- [ ] sitemap.xml criado
- [ ] Google Search Console verificado
- [ ] Facebook Pixel instalado (opcional)
- [ ] Testes em mobile (iPhone + Android)
- [ ] Testes de performance (PageSpeed > 80)
- [ ] Testes de segurança (SSL Labs A+)
- [ ] Backup automático ativado
- [ ] Monitoramento de uptime ativado

---

## 7. 📝 Arquivos Necessários na Raiz

Crie estes arquivos na raiz do seu hosting:

### `robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://jrkusinagem.com.br/sitemap.xml
```

### `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jrkusinagem.com.br/</loc>
    <priority>1.0</priority>
    <lastmod>2026-05-22</lastmod>
  </url>
  <url>
    <loc>https://jrkusinagem.com.br/#servicos</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://jrkusinagem.com.br/#contato</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

### `.htaccess` (se usando Apache)

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remover www (opcional)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Comprimir
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

---

## 8. 🔍 SEO Pré-Lançamento

### Google Search Console:

1. Acesse https://search.google.com/search-console/
2. Adicione propriedade com seu domínio
3. Verifique com DNS ou arquivo HTML
4. Envie sitemap.xml
5. Monitore erros de crawl

### Bing Webmaster Tools:

1. Acesse https://www.bing.com/webmasters/
2. Adicione seu site
3. Importe dados do Google Search Console

### Local SEO (para empresa local):

1. Google My Business - https://mybusiness.google.com/
2. Preencha completamente: foto, horários, telefone, endereço
3. Adicione fotos de trabalhos
4. Responda avaliações

---

## 9. 📞 Contato e Suporte Pós-Lançamento

Após colocar online:

### Monitorar Diariamente:

- Acessos ao site (Google Analytics)
- Submissões de formulário
- Mensagens no WhatsApp
- Erros em browser console (abra DevTools)

### Manutenção Semanal:

- Backup dos arquivos
- Verificação de SSL (renovação)
- Atualizar conteúdo (depoimentos, projetos)

### Manutenção Mensal:

- Análise de tráfego
- Otimização de conversão
- Atualizar meta tags com keywords
- Verificar links quebrados

---

## 10. 💰 Custo Total Anual (Estimado)

| Item                    | Custo              |
| ----------------------- | ------------------ |
| Domínio `.com.br`       | R$ 50              |
| Hosting (Hostinger)     | R$ 240             |
| Email profissional      | Grátis-R$100       |
| FormSpree Plus          | R$ 120             |
| Analytics/Monitoramento | Grátis             |
| Backup Premium          | R$ 50              |
| **TOTAL**               | **R$ 460-610/ano** |

---

## 📞 Precisa de Ajuda?

Para dúvidas sobre:

- **Domínio/DNS** → Suporte do Registro.br ou GoDaddy
- **Hosting/SSL** → Suporte do seu provedor (Hostinger, etc)
- **Analytics/FormSpree** → Documentação oficial
- **Performance** → Google PageSpeed Insights

---

**Última atualização:** 22 de maio de 2026  
**Status:** ✅ Pronto para produção
