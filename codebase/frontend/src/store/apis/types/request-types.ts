interface IBasicPageRequest<T> {
	pageNum?: number;
	pageSize?: number;
	sortCol?: keyof T;
	sortDir?: "asc" | "desc";
	search?: string;
}

type TPageSearchOptions<T> = {
	[Property in keyof T]?: T[Property];
};

export type TPageRequest<T> = IBasicPageRequest<T> & TPageSearchOptions<T>;
