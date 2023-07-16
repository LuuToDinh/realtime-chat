import config from '../config';
import * as Pages from '../pages';

const userInfo = JSON.parse(localStorage.getItem('user'))?.userInfo;

const routers = [
    { path: config.routes.Chat, component: Pages.Chat },
    { path: config.routes.Login, component: userInfo?.name ? Pages.Chat : Pages.Login },
    { path: config.routes.Register, component: userInfo?.name ? Pages.Chat : Pages.Register },
    { path: config.routes.Default, component: Pages.Chat },
];

export default routers;
