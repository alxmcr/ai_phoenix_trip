export interface TimingResult {
  duration: number;
  startTime: number;
  endTime: number;
}

export class TimingUtils {
  private static timers: Map<string, number> = new Map();
  private static results: Map<string, TimingResult[]> = new Map();

  static start(label: string): void {
    if (this.timers.has(label)) {
      console.warn(`Timer "${label}" already exists. Overwriting...`);
    }
    this.timers.set(label, performance.now());
  }

  static end(label: string): TimingResult {
    const startTime = this.timers.get(label);
    if (!startTime) {
      throw new Error(`Timer "${label}" not found`);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    const result: TimingResult = {
      duration,
      startTime,
      endTime
    };

    // Store the result
    if (!this.results.has(label)) {
      this.results.set(label, []);
    }
    this.results.get(label)?.push(result);

    // Clean up the timer
    this.timers.delete(label);

    return result;
  }

  static log(label: string, message?: string): void {
    const result = this.end(label);
    const formattedMessage = message ? `: ${message}` : '';
    console.log(`[${label}]${formattedMessage} (${this.formatDuration(result.duration)})`);
  }

  static getResults(label?: string): TimingResult[] | Map<string, TimingResult[]> {
    if (label) {
      return this.results.get(label) || [];
    }
    return this.results;
  }

  static getAverageDuration(label: string): number {
    const results = this.results.get(label);
    if (!results || results.length === 0) {
      return 0;
    }
    return results.reduce((sum, result) => sum + result.duration, 0) / results.length;
  }

  static getTotalDuration(label: string): number {
    const results = this.results.get(label);
    if (!results || results.length === 0) {
      return 0;
    }
    return results.reduce((sum, result) => sum + result.duration, 0);
  }

  static reset(label?: string): void {
    if (label) {
      this.timers.delete(label);
      this.results.delete(label);
    } else {
      this.timers.clear();
      this.results.clear();
    }
  }

  private static formatDuration(duration: number): string {
    if (duration < 1000) {
      return `${duration.toFixed(2)}ms`;
    }
    return `${(duration / 1000).toFixed(2)}s`;
  }
}