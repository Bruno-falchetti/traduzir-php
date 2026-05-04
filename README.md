#  Plataforma de Tradução

> Ferramenta de tradução corporativa gratuita, construída em PHP puro, sem dependências externas e sem necessidade de API key.

![PHP](https://img.shields.io/badge/PHP-8.0%2B-777BB4?style=flat-square&logo=php&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![API](https://img.shields.io/badge/API-MyMemory-green?style=flat-square)
![XAMPP](https://img.shields.io/badge/XAMPP-compatible-orange?style=flat-square)

---

## Sobre o Projeto

É uma aplicação web de tradução de textos com interface empresarial, desenvolvida em um único arquivo PHP. Utiliza a API pública **MyMemory** para realizar traduções entre 10 idiomas sem exigir cadastro ou chave de API.

### Funcionalidades

- Tradução entre **10 idiomas** (EN, PT, ES, FR, DE, IT, RU, ZH, JA, AR)
- Interface profissional com tema claro e tipografia refinada
- **Inversão de idiomas** com troca automática dos textos
- **Contador de caracteres** em tempo real com aviso de limite
- **Copiar tradução** com um clique
- **Pares frequentes** de idiomas no painel lateral
- Atalho de teclado **Ctrl+Enter** para traduzir
- Feedback visual de loading, sucesso e erro
- 100% responsivo para desktop e mobile
- **Zero dependências** — sem Composer, sem npm, sem frameworks

---

##  Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | PHP 8.0+ (puro) |
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| API | [MyMemory Translated](https://mymemory.translated.net) |
| Tipografia | Google Fonts (Playfair Display + Outfit) |
| Ambiente | XAMPP / Apache / qualquer servidor PHP |

---

## Como Rodar Localmente

### Pré-requisitos

- [XAMPP](https://www.apachefriends.org/) instalado (ou qualquer servidor com PHP 8.0+)
- Conexão com a internet (para chamar a API MyMemory)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/linguaflow.git

# 2. Mova para a pasta do XAMPP
cp -r linguaflow/ C:/xampp/htdocs/linguaflow   # Windows
# ou
cp -r linguaflow/ /opt/lampp/htdocs/linguaflow  # Linux

# 3. Inicie o Apache no painel do XAMPP

# 4. Acesse no navegador
http://localhost/linguaflow/tradutor.php
```

> **Windows:** copie a pasta diretamente para `C:\xampp\htdocs\` usando o Explorer se preferir.

---

## ⚙️ Configuração

Abra o arquivo `tradutor.php` e localize o bloco de configurações no topo:

```php
const MYMEMORY_URL   = 'https://api.mymemory.translated.net/get';
const MYMEMORY_EMAIL = '';   // Opcional — veja abaixo
const MAX_CHARS      = 500;
const TIMEOUT        = 10;
```

### Aumentar o limite diário

A API MyMemory oferece:

| Modo | Limite diário |
|---|---|
| Anônimo (padrão) | 5.000 caracteres |
| Com e-mail informado | 50.000 caracteres |

Para usar o limite estendido, basta preencher a constante:

```php
const MYMEMORY_EMAIL = 'seu@email.com';
```

Nenhum cadastro é necessário — o e-mail é usado apenas como identificador de cota.

---

## Estrutura do Projeto

```
linguaflow/
└── tradutor.php       # Aplicação completa (backend + frontend em um arquivo)
└── README.md          # Documentação
```

---

## Idiomas Suportados

| Código | Idioma |
|---|---|
| `en` | Inglês 🇺🇸 |
| `pt` | Português 🇧🇷 |
| `es` | Espanhol 🇪🇸 |
| `fr` | Francês 🇫🇷 |
| `de` | Alemão 🇩🇪 |
| `it` | Italiano 🇮🇹 |
| `ru` | Russo 🇷🇺 |
| `zh` | Chinês 🇨🇳 |
| `ja` | Japonês 🇯🇵 |
| `ar` | Árabe 🇸🇦 |

---

##  Segurança

- Todas as entradas do usuário são sanitizadas com `htmlspecialchars()` antes de renderizar
- Validação de idiomas contra lista de permissões (`allowlist`) no backend
- Limite de caracteres aplicado tanto no frontend (`maxlength`) quanto no backend
- Nenhum dado do usuário é armazenado — a aplicação é completamente stateless

---

##  Limitações Conhecidas

- **500 caracteres por requisição** — limite da API MyMemory por chamada
- Textos maiores precisam ser divididos manualmente em blocos
- Qualidade da tradução depende da API MyMemory (resultado pode variar para textos técnicos)
- Requer conexão com a internet para funcionar

---

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

```bash
# Fork o repositório
# Crie uma branch para sua feature
git checkout -b feature/minha-melhoria

# Commit suas alterações
git commit -m "feat: adiciona suporte a novos idiomas"

# Envie para o repositório remoto
git push origin feature/minha-melhoria

# Abra um Pull Request
```

---

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Créditos

- API de tradução: [MyMemory](https://mymemory.translated.net) — serviço gratuito da Translated
- Tipografia: [Google Fonts](https://fonts.google.com) — Playfair Display & Outfit

---

<p align="center">Feito com PHP puro · Nenhuma dependência · Pronto para produção</p>
