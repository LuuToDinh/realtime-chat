import config from '../config';
import * as Pages from '../pages';

const routers = [
    { path: config.routes.Chat, component: Pages.Chat },
    { path: config.routes.Login, component: Pages.Login },
    { path: config.routes.Register, component: Pages.Register },
    { path: config.routes.Default, component: Pages.Chat },
];

export default routers;
