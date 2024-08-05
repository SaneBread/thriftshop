import { printHtml } from "kolmafia"
import { Difficulty } from "./types"

export type NonEmptyArray<T> = [T, ...T[]]

export function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0
}

export function sum(a: number, b: number): number {
  return a + b
}

export function sortAscending<T extends { year: number; difficulty: Difficulty }>(
  a: T,
  b: T
): number {
  return a.year - b.year || a.difficulty - b.difficulty
}

export function sortDescending<T extends { year: number; difficulty: Difficulty }>(
  a: T,
  b: T
): number {
  return sortAscending(b, a)
}

export function printJSON(text: unknown): void {
  printHtml(`<pre>${JSON.stringify(text, null, 2)}</pre>`, false)
}
