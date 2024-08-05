import { print, printHtml } from "kolmafia"

export enum Verbosity {
  always = -1,
  error = 0,
  info = 1,
  debug = 2,
}

export class Logger {
  public verbosity

  constructor(verbosity: Verbosity) {
    this.verbosity = verbosity
  }

  log(level: Verbosity, text: string, color?: string): void {
    if (this.verbosity >= level) {
      print(text, color)
    }
  }
  logHtml(level: Verbosity, text: string): void {
    if (this.verbosity >= level) {
      printHtml(text, false)
    }
  }
  logJSON(level: Verbosity, text: unknown): void {
    if (this.verbosity >= level) {
      printHtml(`<pre>${JSON.stringify(text, null, 2)}</pre>`, false)
    }
  }
}
