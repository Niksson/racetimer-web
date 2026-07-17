## Plan: Conventional Commit Versioning

Adopt `semantic-release` as the single source of truth for version calculation because it fits GitHub Actions, conventional commits, prereleases from `dev`, stable releases from `main`, and automatic Git tags/GitHub Releases. Seed the repo with the current manually displayed app version (`0.3.2`), then inject the computed package version into the Vite build so the About modal renders the release/prerelease version automatically.

**Steps**
1. Establish the version source of truth by updating `/Users/nikolaimasson/source/repos/racetimer-web/package.json` from `0.0.0` to `0.3.2` so it matches the current About modal version. This is the migration anchor for semantic-release and avoids a first release starting from the placeholder version.
2. Add release automation dependencies and configuration for semantic-release. Create a repo-root `release.config.mjs` file and install the packages needed to support the full flow: `semantic-release`, `@semantic-release/commit-analyzer`, `@semantic-release/release-notes-generator`, `@semantic-release/github`, `@semantic-release/npm`, and `@semantic-release/git`. Configure the file so it:
- uses conventional commits to determine `major` / `minor` / `patch`
- overrides release rules so `ci` and `chore` commits do not trigger any version bump
- publishes stable releases from `main`
- publishes prereleases from `dev` with explicit prerelease naming such as `dev`
- updates `package.json` to the released version during the release flow
- commits the versioned release artifacts back to the branch when needed
- creates Git tags and GitHub Releases with generated notes
3. Add a dedicated GitHub Actions release workflow under `/Users/nikolaimasson/source/repos/racetimer-web/.github/workflows/` that runs on pushes to `dev` and `main`, installs pnpm/node, checks out with `fetch-depth: 0`, and executes semantic-release using `GITHUB_TOKEN` permissions for `contents: write`. This workflow should be the only place where version calculation, tagging, and GitHub Release publication happen.
4. Change the deployment trigger strategy so deployment runs immediately after a successful release workflow. Recommended approach: keep `/Users/nikolaimasson/source/repos/racetimer-web/.github/workflows/deploy.yaml` as the build-and-deploy workflow, but trigger it with `workflow_run` after the release workflow completes successfully. That guarantees Cloudflare Pages builds from the released repository state and avoids branch-push races where the app deploys before the version/tag exists.
5. Expose the app version to the frontend at build time. Reuse the existing Vite config in `/Users/nikolaimasson/source/repos/racetimer-web/vite.config.ts` to inject the version from `package.json` or `process.env.npm_package_version` via `define` or an env constant. Add the corresponding TypeScript typing in `/Users/nikolaimasson/source/repos/racetimer-web/env.d.ts` or a dedicated app env typing file.
6. Replace the hardcoded About modal version in `/Users/nikolaimasson/source/repos/racetimer-web/src/components/AppMenu.vue` with the injected app version constant. Keep formatting local to the component or a small helper if needed so the displayed value is always based on the release/prerelease version.
7. Handle prerelease semantics for `dev` explicitly. The plan should use semantic-release branch config so `dev` produces prereleases such as `0.3.3-dev.1`, while `main` produces stable tags such as `0.3.3`. This ensures dev deployments show a forward-looking prerelease version in the About modal, matching the requested branch model.
8. Backfill the initial git tag so semantic-release starts from the correct baseline. Recommended sequence: after `package.json` is set to `0.3.2`, create and push tag `v0.3.2` if that version has already been deployed/released conceptually. If you do not want to create a historical tag, document that the first automated release may recalculate from repository history and could produce an unexpected first version.
9. Add verification for both release automation and in-app rendering. At minimum, validate that the build uses the injected version locally, and dry-run semantic-release in CI or locally against sample conventional commits before enabling writes.

**Relevant files**
- `/Users/nikolaimasson/source/repos/racetimer-web/package.json` — update the starting version to `0.3.2`; add `semantic-release` and the required plugins as dev dependencies.
- `/Users/nikolaimasson/source/repos/racetimer-web/release.config.mjs` — define semantic-release branches, plugins, tag/release behavior, and release commit behavior.
- `/Users/nikolaimasson/source/repos/racetimer-web/.github/workflows/deploy.yaml` — convert this to run after the release workflow succeeds so deployment follows release creation.
- `/Users/nikolaimasson/source/repos/racetimer-web/.github/workflows/` — add a new release workflow that publishes the version and triggers the deployment chain.
- `/Users/nikolaimasson/source/repos/racetimer-web/src/components/AppMenu.vue` — replace the hardcoded `v0.3.2` in the About modal.
- `/Users/nikolaimasson/source/repos/racetimer-web/vite.config.ts` — inject the build-time app version for frontend use.
- `/Users/nikolaimasson/source/repos/racetimer-web/env.d.ts` — declare any custom injected env/global typing used by the app.
- `/Users/nikolaimasson/source/repos/racetimer-web/README.md` — optionally document the conventional commit and release flow for contributors.

**Verification**
1. Run a release dry run with full git history available: semantic-release dry-run using `release.config.mjs` on both the `dev` and `main` branch models to confirm prerelease/stable calculation.
	Also verify that sample `ci:` and `chore:` commits produce no release.
2. Run the existing build command (`pnpm build`) and confirm the generated app bundle renders the injected version in the About modal instead of the former hardcoded string.
3. Push a test conventional commit to `dev` and verify the workflow creates a prerelease tag/GitHub Release and that the deployed About modal shows the prerelease version.
4. Merge or cherry-pick a conventional commit to `main` and verify the workflow creates a stable tag/GitHub Release and that the deployed About modal shows the stable semver.
5. Confirm the deployment workflow starts only after a successful release workflow and that Cloudflare Pages deploys the released repository state.

**Decisions**
- Included: automatic semantic versioning from conventional commits, prereleases on `dev`, stable releases on `main`, Git tags, GitHub Releases, and in-app version display.
- Included: custom release rules so `ci` and `chore` commits are ignored for version calculation.
- Included: use the current manually displayed version (`0.3.2`) as the initial automated version baseline.
- Excluded: changelog rendering inside the app, multi-package release management, and rewriting the deploy target away from Cloudflare Pages.
- Recommended tooling: `semantic-release` over ad hoc scripts because it already solves branch-aware prereleases, tagging, and GitHub release notes cleanly.

**Further Considerations**
1. The release workflow should be the gatekeeper for deployment. If a commit does not produce a release under semantic-release rules, decide whether deploy should be skipped entirely or whether a second non-release deployment workflow is needed for preview-only changes.
2. If you prefer not to commit version bumps back to the repo, keep `package.json` as the semantic-release-managed artifact only when needed and inject version from git/tag metadata instead; this is a valid alternative but adds build coupling to git state.
3. If contributors do not already follow conventional commits, add commit linting or a lightweight PR guideline later; release automation quality depends on commit message discipline.