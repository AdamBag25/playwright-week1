# My Playwright Day Notes

Quick notes for each day, so I can jog my memory fast.
One section per day, added at the end of each day. For general syntax help, see `playwright-cheatsheetupdated.md`.

**How to read this nicely in VS Code:** open this file, then press **Cmd + Shift + V** to see the formatted preview.

---

## ⚠️ My checklist before asking for help

1. **Did I save?** Press **Cmd + S**. A dot ● on the file tab means it isn't saved yet. Playwright runs the *saved* file, not what's on screen.
2. **Is the terminal free?** If it says `Serving HTML report…`, press **Ctrl + C** first.
3. **Read the code lines in the error output.** Is that what I meant to write?
4. **Follow the `>` arrow.** It points at the exact line that broke.
5. **"element(s) not found"** means I should compare what I *told* Playwright with what's *really* on the page.
6. **Example words aren't real.** Words like "Welcome" or "grey hint text" in a lesson are descriptions. Go and look at the real page.
7. **Ignore the `at ...` lines.** They're Playwright's internal details. The useful part is at the top.

---

## Day 1: My first test (title check)

**Big idea:** A test is a checklist for a robot: **go** somewhere, then **check** something is true. Green means true, red means false.

```typescript
import { test, expect } from '@playwright/test';

test('homepage title contains Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
```

| Piece | Plain English | Why it's there |
|---|---|---|
| `import { test, expect }` | Take the tools out of the toolbox | The file knows nothing about Playwright without it |
| `test('name', ...)` | A test needs a **name** and **steps** | The name shows in reports, so you know what broke |
| `async ({ page })` | Playwright hands me a fresh browser tab | A new tab for each test means tests can't mess each other up |
| `await` | Finish this step before the next line | Without it, the next line can run too early, and tests fail randomly |
| `toHaveTitle(...)` | Check the tab title | This is the actual check, the part that can go red |

**Quotes compared with slashes:**
- `'Playwright'` means the title must be **exactly** this. Example: "Is your name exactly Adam?" No, it's Adam B, so it **fails**.
- `/Playwright/` means the title must **contain** this. Example: "Does your name contain Adam?" Yes, so it **passes**.

**3 passed with 1 test?** The test ran once each in **Chromium, Firefox and WebKit** (Chrome, Firefox, Safari). This is set in `playwright.config.ts`. Real users use different browsers.

**Reading a red error:** Look at **Expected** (what I said) and **Received** (what the site really had) first. Then find the `>` arrow.

---

## Day 2: Finding something on the page (heading visible)

**Big idea:** A **locator** tells Playwright *which thing* on the page I mean. I describe it the way I'd describe it to a person: **what kind of thing** it is, and **what it says**.

```typescript
test('homepage says welcome', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
});
```

- `getByRole('heading', ...)` finds something by what **kind** of thing it is: a heading, link, button or checkbox.
- `{ name: '...' }` is the text it shows.
- `toBeVisible()` checks that **a user can actually see it** on screen.

**Why it's better than Day 1:** Day 1 checked the label on the tab, which users barely look at. Day 2 checks something **a user actually sees on the page**.

**Real QA lesson:** example.com removed its heading, so my old test broke. **Tests can break because the app changed, not because my code is wrong.** The first question is always: is the test wrong, or did the app change? Before deleting a test at work, ask whether the change was **on purpose** or whether it's **a bug**.

---

## Day 3: Clicking and navigating

**Big idea:** Every test follows the rhythm **go, do, check**, with **one job per line**.

```typescript
test('click get started on the homepage', async ({ page }) => {
  await page.goto('https://playwright.dev/');                                  // go
  await page.getByRole('link', { name: 'Get started' }).click();               // do
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); // check
});
```

**Why the last line proves the click worked:** The "Installation" heading **only exists on the new page**. If the click failed, I'd still be on the homepage and the test would go red.
👉 **Always check something that can only be true if my action worked.** It's like a manual test case's **steps** and **expected result**.

**`getByRole` names are forgiving:** they ignore capital letters and match "contains". `'Get Started'` still found "Get started". I still write the **real** text, so it's clear to anyone reading it.

---

## Day 4: Filling in forms

**Big idea:** Type into a box like a real user, then check that the result appeared.

```typescript
test('can add a to-do', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByPlaceholder('what needs to be done?').fill('buy milk');
  await page.getByPlaceholder('what needs to be done?').press('Enter');
  await expect(page.getByText('buy milk')).toBeVisible();
});
```

| Code | Plain English |
|---|---|
| `getByPlaceholder('...')` | Find a text box by its faint grey **hint text** |
| `.fill('buy milk')` | Type this into the box |
| `.press('Enter')` | Press a key. **Capitals matter:** `'Enter'`, not `'enter'` |
| `getByText('...')` | Find anything on the page that shows this text |

**Locator compared with action:**
```
page.getByPlaceholder('what needs to be done?')  .fill('buy milk')
└──────────── WHICH thing ───────────────┘   └── WHAT to do ──┘
```

**Mistake I made:** `getByRole('todo item')` doesn't work, because `getByRole` only knows a **fixed list** of kinds (heading, link, button, checkbox…). To find text, use `getByText`.

**The problem I spotted:** The same locator is typed **twice**. If the hint text changes, I have to fix it in two places, and if I forget one, the test is still broken. Day 5 fixes this.

---

## Day 5, Part 1: Variables

**Big idea:** A **variable** is a **saved name** for something, so I can reuse it.
👉 **Phone contact analogy:** Save the number once as "Mum", then just tap "Mum". If the number changes, update it **once**.

```typescript
test('can add a to-do with variables', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  const newTodo = page.getByPlaceholder('what needs to be done?');  // save it
  await newTodo.fill('buy milk');                                    // use it
  await newTodo.press('Enter');                                      // use it again
  await expect(page.getByText('buy milk')).toBeVisible();
});
```

- `const` means "I'm creating a saved name".
- `newTodo` is the name I chose. **camelCase**: a capital letter starts each new word.
- **Capitals matter:** `newtodo` and `newTodo` are **different names**. I have to spell it the same everywhere.

**Why line 5 has no `await`:** Saving the name doesn't **do** anything on the page, it only describes the box. It's instant, so there's nothing to wait for.
- **Doing** something (go, click, type, check) needs `await`.
- **Naming** something needs no `await`.

---

## Day 5, Part 2: Counting, and "too broad" locators

**Big idea:** Check **how many** of something there are with `toHaveCount(n)`. The number has **no quotes**.

```typescript
test('can add multiple to-dos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  const newTodo = page.getByPlaceholder('what needs to be done?');
  await newTodo.fill('buy bread');
  await newTodo.press('Enter');
  await newTodo.fill('buy eggs');
  await newTodo.press('Enter');
  await expect(page.locator('.todo-list li')).toHaveCount(2);
});
```

**What went wrong first:**

| Locator | Received | Meaning |
|---|---|---|
| `getByRole('listitem')` | **5** | **Too broad:** it also counted the All / Active / Completed filter buttons |
| `locator('listitem li')` | **0** | **Wrong address:** nothing on the page is called that |
| `locator('.todo-list li')` | **2** ✅ | **Right address:** only the to-dos |

**Reading `page.locator('.todo-list li')`:**
```
┌── .todo-list ──────┐      .todo-list = the box holding the to-dos (the dot means "box with this name")
│  li  buy bread     │  ←   li = a list item inside it (the space means "inside")
│  li  buy eggs      │
└────────────────────┘
All | Active | Completed   ← outside the box, not counted
```

**The rule:**
- **Received more than expected?** The locator is **too broad**, catching things I didn't mean. **Narrow it** to the box I actually mean.
- **Received 0?** The address is wrong. Check the name and the dot.

**Two tests in one file:** each test gets its own `test(...)` block. 2 tests × 3 browsers = **6 results**.

---

## Day 6: Debugging in UI mode

**Big idea:** Reading the terminal error is like reading a **match report**. UI mode is like watching the **replay**. I can watch my test run and **time-travel** to any step.

```bash
npx playwright test --ui
```

```
┌──────────────┬───────────────────────────────────────┐
│ TESTS (left) │  BIG PICTURE: a snapshot of the page  │
│              │  at the step I clicked                │
│ ▸ day05...   │                                       │
│   ✅ / ❌    ├───────────────────────────────────────┤
│              │ ACTIONS: goto, fill, press, expect…   │
│              │ ERRORS tab: the same error as terminal│
└──────────────┴───────────────────────────────────────┘
```

**How to use it:**
1. Open the file on the left and click **▶** next to a test.
2. Click each step in **Actions**, and the big picture shows the page **at that moment**.
3. If it's red, click the **red step** and read the **Errors** tab.
4. Fix it in VS Code, **save**, then click **▶** again.
5. Close the UI mode window when done. The terminal is busy while it's open.

**What I practised:** I broke `.todo-list` into `.todo-lists` on purpose. UI mode showed:
- **Received: 0**, so nothing was at that address.
- The step **waited about 5 seconds** and then failed.

👉 **Rule:** A step that **waited about 5 seconds and then failed** usually means **"element not found"**. Check the locator for a typo or the wrong name.

**My debugging loop:** run in `--ui`, click the test, check the actions and the snapshots, see whether it did what I told it to, adjust, save and re-run.

---

*My rule: if I can't explain every line, I don't truly know it.*
