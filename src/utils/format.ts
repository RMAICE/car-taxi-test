import { Data } from '../types';

export function toStringData(data: Data): string {
    return `id: ${data.id}; name: ${data.name};`;
}
