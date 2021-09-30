
export function Paginate (items: any, size: number, pageNumbar: number)  {
    const startIndex = pageNumbar * size - size;
    const endIndex = startIndex + size;
    return items.slice(startIndex, endIndex);
}
