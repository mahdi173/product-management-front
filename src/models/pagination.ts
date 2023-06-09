export interface PaginationLink {
    url: null | string;
    label: string;
    active: boolean;
}

export interface PaginationProperties {
    currentPage: number
    perPage: null | number
    to: null | number
    from: null | number
    total: null | number
    lastPage: null | number
    firstPageUrl: null | string
    lastPageUrl: null | string
    prevPageUrl: null | string
    nextPageUrl: null | string
    links: PaginationLink[]
}
// response from Axios
export function setPaginationProperties(res: any): PaginationProperties {
    return {
        currentPage: res.current_page,
        perPage: res.per_page,
        to: res.to,
        from: res.from,
        total: res.total,
        lastPage: res.last_page,
        firstPageUrl: res.first_page_url,
        lastPageUrl: res.last_page_url,
        prevPageUrl: res.prev_page_url,
        nextPageUrl: res.next_page_url,
        links: res.links
    };
}