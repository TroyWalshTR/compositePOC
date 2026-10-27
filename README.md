# compositePOC

Two equivalent GitHub Actions workflows demonstrate standalone steps and shared
composite actions:

- **Run tests** (`.github/workflows/run-tests.yml`) downloads the source, installs
  npm dependencies and Playwright, runs tests, writes a job summary including
  input parameters and the test outcome, and uploads test results.
- **Run tests with composite** (`.github/workflows/run-tests-with-composite.yml`)
  performs the same work using **Setup Composite** (`.github/actions/setup`) and
  **Report Composite** (`.github/actions/report`).

## Running in GitHub Actions

Select either test workflow in the Actions tab and choose **Run workflow**.
Both accept `browser` (`chromium`, `firefox`, or `webkit`, default `chromium`)
and `grep` (a test-title regular expression, empty by default).

Both also run after the **Trigger tests** push workflow completes successfully.
These `workflow_run` executions use the triggering commit, default inputs, and
only accept push runs from this repository. GitHub requires the test workflow
files to exist on the default branch before `workflow_run` events can start them.
Neither test workflow triggers the other.

Summaries and the `test-results` artifact (HTML report and failure traces) are
published even when tests fail. The job still fails if tests fail. Artifacts
expire after seven days; setup failures may leave no files to upload.

Setup Composite accepts `ref` (default: the current SHA) and `browser`.
When using it locally, check out the repository first so GitHub can load the
composite action. Report Composite accepts `browser`, `grep`, and `outcome`;
call it with `if: always()` and pass the test step's `outcome`.

## Running locally

Use Node.js 24:

```sh
npm ci
npx playwright install --with-deps chromium
npm test -- --project=chromium
```

The smoke test renders a local page without depending on an external website.
To run all three browser projects, install all browsers with
`npx playwright install --with-deps`, then run `npm test`.