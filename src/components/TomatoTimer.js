import { createTimer } from './timer.template';
import audioPlay from '@/assets/sound.mp3';

export class TomatoTimer {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.workTime= parseInt(options.workTime);
        this.status = 'stopped';
        this.timeRemining = null;
        this.timer = null;
    }

    render() {
      this.timeRemining = this.workTime * 60;
      const template = createTimer(this.timeRemining);
      this.$el.append(template);
      this.init();
    }

    init() {
        this.updateDom();
        document.getElementById('startTimer').addEventListener('click', () => {
            if (this.status !== 'started') {
                this.timer = setInterval(() => {
                    this.status = 'started';
                    this.timerCounter();
                }, 1000);
            }
        });

        document.getElementById('pauseTimer').addEventListener('click', () => this.pauseTimer());
        document.getElementById('stopTimer').addEventListener('click', () => this.stopTimer());
    }

    timerCounter() {
        if (this.timeRemining === 0) {
            this.pauseTimer();
            this.alarm();
            alert('Таймер завершён!');
            return;
        }
        this.timeRemining -= 1;
        this.updateDom();
    }

    pauseTimer() {
        if (this.status === 'started') {
            clearInterval(this.timer);
            this.timer = null;
            this.status = 'paused';
        }
    }

    stopTimer() {
        if (this.status !== 'stoped') {
            this.pauseTimer();
            this.timeRemining = this.workTime * 60;
            this.status = 'stopped';
            this.updateDom();
        }
    }

    alarm() {
        const audio = new Audio(audioPlay);
        audio.play();
        setTimeout(() => {
            audio.pause()
        }, 10000);
    }

    updateDom() {
        const time =  this.timeRemining;
        const timeInMinutes = parseInt(time / 60) >= 10 ? parseInt(time / 60) : '0' + parseInt(time / 60);
        const timeInSeconds = time % 60 >= 10 ? time % 60 : '0' + time % 60;
        document.getElementById('timerMinutes').innerHTML = timeInMinutes;
        document.getElementById('timerSeconds').innerHTML = timeInSeconds;
    }
}