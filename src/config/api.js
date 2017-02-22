// @flow
/**
 * Created by Freax on 16-11-24.
 * @Blog http://www.myfreax.com/
 */
type mapString = { [key: string]: string };
const api: mapString = {
    current: 'yarn config get registry',
    use: 'yarn config set registry'
};
export default api;