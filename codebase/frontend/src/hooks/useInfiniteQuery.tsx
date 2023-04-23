import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TPageRequest } from "../store/apis/types/request-types";
import { IPageDTO } from "../store/apis/types/response-types";
import { IPageRequest } from "../types";

type Props = {
	useSearchDataMutation: UseMutation<
		MutationDefinition<
			TPageRequest<any>,
			BaseQueryFn<
				string | FetchArgs,
				unknown,
				FetchBaseQueryError,
				{},
				FetchBaseQueryMeta
			>,
			never,
			IPageDTO<any>,
			"api"
		>
	>;
	sortCol?: string;
	sortDir?: IPageRequest["sortDir"];
	search?: string;
	searchOptions?: {
		[key: string]: string;
	};
};

const useInfiniteQuery = ({
	search,
	sortCol,
	sortDir,
	useSearchDataMutation,
	searchOptions,
}: Props) => {
	const pageSize = 20;
	const [crntSortCol, setCrntSortCol] = useState<string>();
	const [crntSortDir, setCrntSortDir] = useState<string>("asc");
	const [pageNum, setPageNum] = useState<number>(1);
	const [getData, { isLoading, isError }] = useSearchDataMutation();
	const [isFinished, setIsFinished] = useState<boolean>();
	const [data, setData] = useState<any[]>();
	const loaderRef = useRef(null);

	const handleObserver = useCallback((entries: any[]) => {
		const target = entries[0];
		if (target.isIntersecting && !isFinished) {
			setPageNum((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loaderRef.current) observer.observe(loaderRef.current);
	}, [handleObserver]);

	useEffect(() => {
		console.log({ crntSortCol, sortCol }, { crntSortDir, sortDir });
		const doGetData = async () => {
			const data = await getData({
				pageNum: pageNum || 1,
				pageSize: pageSize || 20,
				search,
				sortCol: sortCol || "_id",
				sortDir: sortDir || "asc",
				...searchOptions,
			}).unwrap();
			if ((data.content && data.content.length === 0) || data.isLast)
				setIsFinished(true);
			if (crntSortCol === sortCol && crntSortDir === sortDir) {
				setData((prev) => [...(prev || []), ...data.content]);
			} else {
				setCrntSortCol(sortCol);
				setCrntSortDir(sortDir || "asc");
				setData([...data.content]);
			}
		};
		doGetData();
	}, [sortCol, sortDir, pageNum, search]);

	return {
		data,
		loaderRef,
		isError,
		isLoading,
	};
};

export default useInfiniteQuery;
