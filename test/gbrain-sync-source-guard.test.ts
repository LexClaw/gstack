import { describe, expect, test } from 'bun:test';
import { execFileSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dir, '..');

function trackedFiles(): string[] {
  return execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
}

describe('gbrain sync source guard', () => {
  test('no executable surface calls sync with repo but without source', () => {
    const unsafe = new RegExp('gbrain\\s+sync(?=[^\\n]*--repo)(?![^\\n]*--source)');
    const offenders: string[] = [];

    for (const file of trackedFiles()) {
      if (file.startsWith('tasks/artifacts/')) continue;
      const absolute = join(ROOT, file);
      if (!existsSync(absolute) || !statSync(absolute).isFile()) continue;
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) continue;
      const text = readFileSync(absolute, 'utf-8');
      const lines = text.split('\n');
      lines.forEach((line, index) => {
        if (unsafe.test(line)) offenders.push(`${file}:${index + 1}:${line.trim()}`);
      });
    }

    expect(offenders).toEqual([]);
  });
});
