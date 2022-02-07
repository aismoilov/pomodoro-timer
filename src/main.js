import { TomatoTimer } from '@/components/TomatoTimer';
import './assets/scss/index.scss';

const timer = new TomatoTimer('#app', {
    workTime: '25',
});

timer.render();