import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectsSourcePath = join(repositoryRoot, "data/projects.ts");
const projectsSource = readFileSync(projectsSourcePath, "utf8");
const compiledProjects = ts.transpileModule(projectsSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022
  },
  fileName: projectsSourcePath
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiledProjects).toString("base64")}`;
const { projects } = await import(moduleUrl);

const errors = [];
const slugs = new Set();

function requireText(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${label} must be a non-empty string`);
  }
}

function requirePublicAsset(url, label) {
  requireText(url, label);
  if (typeof url !== "string" || !url.startsWith("/")) {
    errors.push(`${label} must be a root-relative URL`);
    return;
  }

  const assetPath = join(repositoryRoot, "public", url);
  if (!existsSync(assetPath)) errors.push(`${label} is missing: ${url}`);
}

for (const project of projects) {
  const label = `Project "${project.slug}"`;
  requireText(project.slug, `${label} slug`);
  requireText(project.title, `${label} title`);
  requireText(project.summary, `${label} summary`);
  requireText(project.detail, `${label} detail`);

  if (slugs.has(project.slug)) errors.push(`${label} has a duplicate slug`);
  slugs.add(project.slug);

  if (!Array.isArray(project.services) || project.services.length === 0) {
    errors.push(`${label} must define at least one service`);
  } else {
    project.services.forEach((service, index) => requireText(service, `${label} service ${index + 1}`));
  }

  requirePublicAsset(project.image?.src, `${label} cover`);
  requireText(project.image?.alt, `${label} cover alt text`);

  for (const [index, media] of (project.gallery ?? []).entries()) {
    requirePublicAsset(media.src, `${label} gallery item ${index + 1}`);
    requireText(media.alt, `${label} gallery item ${index + 1} alt text`);
  }

  if (!project.documentPreview) continue;

  const { pageCount, pageLabels, path } = project.documentPreview;
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    errors.push(`${label} document pageCount must be a positive integer`);
    continue;
  }

  const documentDirectory = join(repositoryRoot, "public", path);
  if (!existsSync(documentDirectory)) {
    errors.push(`${label} document directory is missing: ${path}`);
    continue;
  }

  for (let page = 1; page <= pageCount; page += 1) {
    const pageUrl = `${path}/page-${String(page).padStart(2, "0")}.jpg`;
    requirePublicAsset(pageUrl, `${label} document page ${page}`);
  }

  const documentFiles = readdirSync(documentDirectory).filter((file) => /^page-\d{2}\.jpg$/i.test(file));
  if (documentFiles.length !== pageCount) {
    errors.push(`${label} declares ${pageCount} document pages but ${documentFiles.length} padded page files exist`);
  }

  for (const [page, pageLabel] of Object.entries(pageLabels ?? {})) {
    const pageNumber = Number(page);
    if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > pageCount) {
      errors.push(`${label} document label references invalid page ${page}`);
    }
    requireText(pageLabel, `${label} document page ${page} label`);
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Content validation passed for ${projects.length} projects.`);
}
