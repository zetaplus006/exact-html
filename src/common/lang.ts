export function isFunc (fn: any): boolean {
    return typeof fn === 'function';
}

export function isObj (val: any): boolean {
    return typeof val === 'object';
}

export function isDef (o: any): boolean {
    return o !== undefined && o !== null;
}

export function isUndef (val: any) {
    return val === undefined || val === null;
}

export function isPrimitive (value: any): boolean {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    );
}

export function isSimpleType (value: any): boolean {
    return isPrimitive(value) || isUndef(value);
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn (o: any, key: string | number): boolean {
    return hasOwnProperty.call(o, key);
}

// tslint:disable-next-line:no-empty
export function noop () { }
