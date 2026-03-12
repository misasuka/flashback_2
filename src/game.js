import { EVENT_BANK } from '../data/events.js';
import { compareEvents, shuffle, TOTAL_ROUND_EVENTS } from './utils.js';

export class TimelineGame {
  constructor() {
    this.reset();
  }

  reset() {
    this.score = 0;
    this.step = 0;
    this.feedback = null;

    const picked = shuffle(EVENT_BANK).slice(0, TOTAL_ROUND_EVENTS);
    this.roundEvents = picked;

    const [baseEvent, ...pending] = shuffle(picked);
    this.timeline = [baseEvent];
    this.pending = pending;
    this.current = this.pending.shift() ?? null;
  }

  getState() {
    return {
      score: this.score,
      completed: this.step,
      total: TOTAL_ROUND_EVENTS - 1,
      timeline: [...this.timeline],
      current: this.current,
      feedback: this.feedback,
      isOver: this.current === null
    };
  }

  placeCurrent(insertIndex) {
    if (!this.current) {
      return this.getState();
    }

    const candidate = [...this.timeline];
    candidate.splice(insertIndex, 0, this.current);

    const correctlySorted = [...candidate].sort(compareEvents);
    const isCorrect = candidate.every((event, index) => event.id === correctlySorted[index].id);

    this.timeline = correctlySorted;
    this.step += 1;
    if (isCorrect) {
      this.score += 1;
    }

    const insertedEvent = this.current;
    this.current = this.pending.shift() ?? null;

    this.feedback = {
      isCorrect,
      event: insertedEvent,
      score: this.score
    };

    return this.getState();
  }
}
