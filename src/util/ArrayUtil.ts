/**
 * 
 */
module ArrayUtil {
    export function add(list: any[], item: any) {
        if (list.indexOf(item) === -1) {
            list.push(item);
        }
    }

    export function remove(list: any[], item: any) {
        let index = list.indexOf(item);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }

    export function random(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }
}