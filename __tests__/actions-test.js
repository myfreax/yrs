/**
 * Created by Freax on 17-2-22.
 * @blog http://www.myfreax.com
 */
import {ls,current,add,use,del} from '../src/actions'

test('ls action',function () {
    return ls().then((data) => {
        expect(data).toBe(true);
    });
});

test('current action',function () {
    return current().then((data) => {
        expect(data).toBe(true);
    });
});

test('del action',function () {
    return del().then((data) => {
        expect(data).toBe(true);
    });
});

test('add action',function () {
    return add().then((data) => {
        expect(data).toBe(true);
    });
});

test('use action',function () {
    return use().then((data) => {
        expect(data).toBe(true);
    });
});

