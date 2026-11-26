/**
 * The One-Line Excuse Championship — entry program.
 *
 * Prints exactly one line: a single, self-contained excuse for being late.
 * The joke is built from three beats, assembled by small pure helpers so the
 * final string is easy to audit against the competition gate:
 *
 *   1. The apology      — "Sorry I'm late"
 *   2. The confession   — the snooze button was abused beyond reason
 *   3. The consequence  — the alarm clock took legal action
 *
 * Gate rules enforced before anything is printed:
 *   - the excuse is a single line (no newline characters inside it),
 *   - it stays within the championship's character budget,
 *   - it is fully deterministic: no clock, no randomness, no input.
 */

/** Maximum number of characters allowed for the excuse line. */
export const MAX_EXCUSE_CHARS = 280;

/** The apology that opens every championship-grade excuse. */
const APOLOGY = "Sorry I'm late";

/**
 * The confession: the snooze button was pressed so many times that the
 * alarm clock stopped being an appliance and became a plaintiff.
 */
const CONFESSION =
  "I hit snooze so often my alarm clock filed a restraining order";

/**
 * Join the beats of the excuse with an em dash after the apology and a
 * comma before the consequence, the way a person blurts it out in one
 * breath at the office door.
 */
export function assembleExcuse(
  apology: string,
  confession: string,
  consequence: string,
): string {
  return `${apology} — ${confession}, and now ${consequence}`;
}

/**
 * The legal consequence of abusing the snooze button. A restraining order
 * is only funny if it is enforced, so the distance is spelled out: the
 * narrator now has to wake up five hundred feet away from the plaintiff,
 * which is, of course, why they were late again today.
 */
export function legalConsequence(): string {
  const feet = 500;
  return `I'm legally required to wake up ${feet} feet away from it`;
}

/**
 * Validate a candidate excuse against the gate. Returns a list of
 * problems; an empty list means the line may be printed.
 */
export function gateProblems(line: string): string[] {
  const problems: string[] = [];
  if (line.length === 0) {
    problems.push("the excuse is empty");
  }
  if (line.length > MAX_EXCUSE_CHARS) {
    problems.push(
      `the excuse is ${line.length} characters, over the ${MAX_EXCUSE_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("the excuse must be exactly one line");
  }
  if (line.trim() !== line) {
    problems.push("the excuse has leading or trailing whitespace");
  }
  return problems;
}

/** Build the excuse from its beats. */
export function buildExcuse(): string {
  return assembleExcuse(APOLOGY, CONFESSION, legalConsequence());
}

/**
 * Entrypoint: build the excuse, check it against the gate, and print it
 * as exactly one line. If the line ever failed the gate, the program
 * exits non-zero without printing, rather than handing in a bad excuse —
 * which would be the one excuse with no excuse at all.
 */
export function main(): void {
  const line = buildExcuse();
  const problems = gateProblems(line);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`gate: ${problem}`);
    }
    process.exit(1);
  }
  console.log(line);
}

main();
