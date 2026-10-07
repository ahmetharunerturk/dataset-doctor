import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const base = process.env.SITE_URL ?? "http://localhost:3000";
const repository = "https://github.com/ahmetharunerturk/dataset-doctor";
const projectConfig = await readFile(new URL("../lib/project.ts", import.meta.url), "utf8");
const repositoryPublished = /export const REPO_PUBLISHED = true\b/.test(projectConfig);
const locales = ["en", "de", "tr", "ar", "he", "fa"];
/** Direction + script family per locale — fa shares the Arabic complex-script set. */
const dirs = { en: "ltr", de: "ltr", tr: "ltr", ar: "rtl", he: "rtl", fa: "rtl" };
const scriptFamily = { en: "latin", de: "latin", tr: "latin", ar: "arabic", he: "hebrew", fa: "arabic" };
const catalogs = Object.fromEntries(await Promise.all(locales.map(async (locale) => [
  locale, JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8")),
])));

function leaves(value, path = "", result = {}) {
  if (typeof value === "string") result[path] = value;
  else for (const [key, child] of Object.entries(value)) leaves(child, `${path}.${key}`, result);
  return result;
}

test("translation catalogs share keys and interpolation arguments", () => {
  const english = leaves(catalogs.en);
  for (const locale of locales.slice(1)) {
    const translated = leaves(catalogs[locale]);
    assert.deepEqual(Object.keys(translated).sort(), Object.keys(english).sort(), locale);
    for (const key of Object.keys(english)) {
      const args = (text) => [...text.matchAll(/\{(\w+)(?:[,}])/g)].map((match) => match[1]).sort();
      assert.deepEqual(args(translated[key]), args(english[key]), `${locale}: ${key}`);
    }
  }
});

for (const language of ["en-US", "de-DE,de;q=0.9", "tr-TR,tr;q=0.9"]) {
  test(`unprefixed visit defaults to English with ${language}`, async () => {
    const response = await fetch(new URL("/", base), {
      redirect: "manual",
      headers: { "Accept-Language": language, Cookie: "NEXT_LOCALE=tr" },
      signal: AbortSignal.timeout(30000),
    });
    assert.equal(response.status, 307);
    assert.equal(new URL(response.headers.get("location"), base).pathname, "/en");
  });
}

for (const locale of locales) {
  test(`${locale}: localized production page and section targets`, async () => {
    const response = await fetch(new URL(`/${locale}`, base), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200);
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
    assert.match(html, new RegExp(`<html[^>]*dir="${dirs[locale]}"`), `${locale}: direction`);
    assert.match(html, new RegExp(`<html[^>]*data-script="${scriptFamily[locale]}"`), `${locale}: script family`);
    assert.ok(html.includes(`<title>${catalogs[locale].Meta.title}</title>`));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    for (const id of ["features", "how-it-works", "report", "open-source"]) {
      assert.ok(html.includes(`id="${id}"`), `${locale}: missing target ${id}`);
      assert.ok(html.includes(`href="#${id}"`), `${locale}: missing navigation ${id}`);
    }
    for (const href of [repository, `${repository}#readme`, `${repository}/issues`]) {
      assert.equal(html.includes(`href="${href}"`), repositoryPublished, `${locale}: project link visibility ${href}`);
    }
    assert.doesNotMatch(html, /href="(?:#|https:\/\/github\.com\/?)"/);
    assert.doesNotMatch(html, /GITHUB_USERNAME|NEXT_INTL_MESSAGE|MISSING_MESSAGE|v0\.4|pip install dataset-doctor/);
    assert.doesNotMatch(html, /&lt;br\s*\/?&gt;/, `${locale}: escaped line-break tag`);
    assert.ok(html.includes("[data-reveal]{opacity:1!important"), "No-JavaScript content fallback missing");
  });
}

test("unknown pages return a real 404", async () => {
  const response = await fetch(new URL("/en/missing-page", base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 404);
});
