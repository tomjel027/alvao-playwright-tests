# ALVAO Playwright tests

Stručný návod pro spuštění Playwright testů v tomto repozitáři.

## Přehled
- Testy používají Playwright + TypeScript.
- Konfigurace: [playwright.config.ts](playwright.config.ts)
- Testy: adresář `tests/` (příklad: [tests/test.spec.ts](tests/test.spec.ts))

## Požadavky
- Node.js (doporučeno >=16)
- npm

## Instalace
1. Nainstalujte závislosti:

```bash
npm install
```

2. Nainstalujte Playwright prohlížeče:

```bash
npx playwright install
```

(Pokud chcete i systémové závislosti na Linuxu: `npx playwright install-deps`)

## Spuštění testů
- Spustit všechny testy:

```bash
npx playwright test
```

- Spustit testy v okně (headed):

```bash
npx playwright test --headed
```

- Spustit konkrétní soubor:

```bash
npx playwright test tests/test.spec.ts
```

- Spustit test podle názvu (grep):

```bash
npx playwright test -g "Login do ALVAO"
```

## Reporty
Po spuštění testů vygeneruje Playwright HTML report — otevřete jej takto:

```bash
npx playwright show-report
```

## Konfigurace a typy
- TypeScript konfigurace: `tsconfig.json` (obsahuje `types: ["node"]`).
- Pokud chcete spouštět testy v CI, nastavte proměnnou prostředí `CI=true`.

## Doporučené `package.json` skripty
Doporučuji přidat následující skripty do `package.json` pro pohodlné spouštění:

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:report": "playwright show-report",
  "install:browsers": "playwright install"
}
```

## Bezpečnost a citlivé údaje
Testy v tomto repozitáři obsahují přihlašovací údaje přímo v kódu — nahraďte je proměnnými prostředí nebo `dotenv` a nikdy nesahejte citlivé údaje do VCS.

Příklad použití `.env` (nezapomeňte přidat `.env` do `.gitignore`):

```
ALVAO_USER=your.user@example.com
ALVAO_PASS=supersecret
```

A v testech číst přes `process.env.ALVAO_USER`.

## Další kroky
- Přidat skripty do `package.json` (viz výše).
- Přesunout citlivé údaje do env proměnných.
- Upravit testy tak, aby byly robustní vůči více elementům se stejným locatorem (např. použít unikátní role/label nebo čekání `locator.first()`/`locator.nth()` apod.).

---

Pokud chceš, přidám ty skripty do `package.json` teď.