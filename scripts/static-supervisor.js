import { execSync } from "child_process";
import fs from "fs";
import "./static-server.js";
import { startGitPoll } from "./git-poll.js";

const BRANCH = process.env.PREVIEW_BRANCH || "main";
const REPO_URL = process.env.REPO_URL;

process.chdir("/app"); // 🔑 FORCE cwd
process.env.GIT_TERMINAL_PROMPT = "0"; // avoid hanging for creds

const run = (cmd) => execSync(cmd, { stdio: "inherit", cwd: "/app" });

if (!REPO_URL) {
  console.error("[supervisor] missing REPO_URL env var");
  process.exit(1);
}

console.log("[supervisor] ensuring git repo");

if (!fs.existsSync(".git")) {
  run("git init");
  run(`git remote add origin ${REPO_URL}`);
} else {
  const remotes = execSync("git remote", { cwd: "/app" }).toString().split("\n");
  if (!remotes.includes("origin")) run(`git remote add origin ${REPO_URL}`);

  // keep origin URL in sync with env
  const current = execSync("git remote get-url origin", { cwd: "/app" })
    .toString()
    .trim();
  if (current !== REPO_URL) run(`git remote set-url origin ${REPO_URL}`);
}

run(`git fetch origin ${BRANCH} --depth=1`);
run(`git reset --hard origin/${BRANCH}`);
run("git clean -fd");

const initialSha = execSync("git rev-parse HEAD", { cwd: "/app" }).toString().trim();

console.log("[supervisor] static preview running");

// 🔑 start polling ONLY after git is ready
startGitPoll(initialSha);
