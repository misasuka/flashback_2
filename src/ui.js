import { formatDate } from './utils.js';

export class GameUI {
  constructor({ onInsert, onRestart }) {
    this.onInsert = onInsert;
    this.onRestart = onRestart;

    this.scoreValue = document.querySelector('[data-score]');
    this.progressValue = document.querySelector('[data-progress]');
    this.timelineList = document.querySelector('[data-timeline]');
    this.currentCard = document.querySelector('[data-current-card]');
    this.feedbackBox = document.querySelector('[data-feedback]');
    this.resultPanel = document.querySelector('[data-result]');
    this.resultText = document.querySelector('[data-result-text]');
    this.restartBtn = document.querySelector('[data-restart]');

    this.restartBtn.addEventListener('click', () => this.onRestart());
  }

  render(state) {
    this.scoreValue.textContent = String(state.score);
    this.progressValue.textContent = `${state.completed} / ${state.total}`;
    this.renderTimeline(state.timeline, state.isOver);
    this.renderCurrentCard(state.current, state.isOver);
    this.renderFeedback(state.feedback);
    this.renderResult(state);
  }

  renderTimeline(timeline, isOver) {
    this.timelineList.innerHTML = '';

    timeline.forEach((event, index) => {
      this.timelineList.appendChild(this.createInsertButton(index, isOver));
      this.timelineList.appendChild(this.createTimelineItem(event));
    });

    this.timelineList.appendChild(this.createInsertButton(timeline.length, isOver));
  }

  createInsertButton(index, disabled) {
    const wrapper = document.createElement('li');
    wrapper.className = 'timeline-insert';

    const btn = document.createElement('button');
    btn.className = 'insert-btn';
    btn.type = 'button';
    btn.textContent = '插入到这里';
    btn.disabled = disabled;
    btn.addEventListener('click', () => this.onInsert(index));

    wrapper.appendChild(btn);
    return wrapper;
  }

  createTimelineItem(event) {
    const item = document.createElement('li');
    item.className = 'timeline-event';

    item.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <span>${formatDate(event.date)}</span>
    `;

    return item;
  }

  renderCurrentCard(current, isOver) {
    if (isOver || !current) {
      this.currentCard.innerHTML = '<p class="muted">本轮已结束，查看结果后可重新开始。</p>';
      return;
    }

    this.currentCard.innerHTML = `
      <h2>${current.title}</h2>
      <p>${current.description}</p>
      <small>点击时间轴中的“插入到这里”进行作答</small>
    `;
  }

  renderFeedback(feedback) {
    if (!feedback) {
      this.feedbackBox.textContent = '准备好了就开始吧！';
      this.feedbackBox.className = 'feedback';
      return;
    }

    this.feedbackBox.textContent = feedback.isCorrect
      ? `✅ 放置正确！当前分数：${feedback.score}`
      : `❌ 放置错误。正确日期：${formatDate(feedback.event.date)}。当前分数：${feedback.score}`;
    this.feedbackBox.className = `feedback ${feedback.isCorrect ? 'ok' : 'bad'}`;
  }

  renderResult(state) {
    if (!state.isOver) {
      this.resultPanel.hidden = true;
      return;
    }

    this.resultPanel.hidden = false;
    this.resultText.textContent = `你本轮答对 ${state.score} / ${state.total} 题。`;
  }
}
