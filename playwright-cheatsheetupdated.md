# Playwright Cheat-Sheet — Adam's Foundations

A quick reference for when you're mid-test and can't remember which bracket, quote, or word to use. Keep this open in VS Code while you work.

---

## 1. The punctuation guide

The big one. When you're stuck, ask: *"Am I writing words, doing something, opening a box, or matching a pattern?"*

| Symbol | Name | Job | Example |
|--------|------|-----|---------|
| `' '` | single quotes | Wrap **TEXT** — names, URLs, any words | `'homepage has the right title'`, `'https://example.com'` |
| `( )` | round brackets | **DO** something / hand it inputs (comes after an action word) | `test(...)`, `page.goto(...)`, `expect(...)` |
| `{ }` | curly braces | A **BOX / block** that holds steps; also grabs what you're handed | `async ({ page }) => { ... }` |
| `/ /` | forward slashes | A **PATTERN** — loose text matching | `/Playwright/` = "contains Playwright" |

**Memory hook:** quotes = words · round = do it · curly = the box · slashes = pattern

---

## 2. The shape of a test (the "box")

Every test has a lid, a body, and a floor. Your actions live *inside* the box, indented.

```typescript
import { test, expect } from '@playwright/test';   // grab your tools

test('a clear name for the test', async ({ page }) => {   // the lid opens the box
  await page.goto('https://example.com');                 // your steps go inside
  await expect(page).toHaveTitle(/Example/);              // indented within the box
});                                                        // });  closes the box
```

The closing `});` is three characters doing three jobs: `}` ends the box, `)` closes the `test(` call, `;` ends the line.

---

## 3. What each word means

- **`import { test, expect }`** — reach into the Playwright toolbox and pull out the tools you need. Instant, so no `await`.
- **`test('name', async (...) => { })`** — defines one test. First a name (text, in quotes), then the function that does the work.
- **`async`** — "this function has steps that take time." Required whenever you use `await` inside.
- **`await`** — "wait until *this exact action* is finished, then go to the next line." Not a fixed pause — waits for *done*.
- **`page`** — the fresh browser tab Playwright hands you. Every `page.something` is an instruction to that tab.
- **`page.goto('url')`** — navigate the tab to a web address.
- **`expect(...)`** — start an assertion: a claim that must be true or the test fails.
- **`getByRole('heading', { name: 'X' })`** — a **locator**: how you point at a thing on the page (a link, button, heading). Locating by *role* is the robust, accessible way.

---

## 4. The 4-part rhythm

Almost every UI test is just these four moves, in some order:

1. **Go** somewhere → `page.goto(...)`
2. **Find** something → `page.getByRole(...)`, `page.getByText(...)`
3. **Do** something → `.click()`, `.fill('text')`
4. **Assert** something's true → `expect(...).toHaveTitle(...)`, `expect(...).toBeVisible()`

---

## 5. Two kinds of errors (know the difference)

- **Syntax error** — grammar is broken, the code can't even start. (Missing quote, extra bracket, a stray word.) The message points at the exact spot with a `^`.
- **Assertion failure** — the code ran fine, but the thing you *claimed* wasn't true. Look for **Expected** vs **Received** and compare them.

Reading the error message *is* the debugging skill. It almost always tells you the line, the spot, and the reason.

---

## 6. Handy terminal commands

```bash
npx playwright test              # run all tests
npx playwright test my-first     # run just files matching "my-first"
npx playwright test --ui         # open the visual test runner
npx playwright show-report       # open the last HTML report

git add .                        # stage your changes
git commit -m "message"          # save a snapshot
git push                         # upload to GitHub
```

---

## 7. Debugging playbook (when a test fails, do THIS before asking anyone)

1. **Reproduce it in UI mode:** `npx playwright test --ui` — opens the visual runner.
2. **Click the red step** in the Actions list — that's exactly where it broke.
3. **Read the error (the *what*)** and **look at the snapshot (the *why*)** — does the page actually match what you expected?
4. **Read the timing:** a step that took ~5 seconds and then failed almost always means "element not found."
5. **One theory, one change, save, re-run.** Change one thing at a time so you know what fixed it.

Golden rule of debugging: **look before you guess.** The snapshot shows you the truth — you rarely need to guess at all.

---

*Rule to live by: if you can't explain every line of your test, you don't truly know it yet. Understand before memorising.*
