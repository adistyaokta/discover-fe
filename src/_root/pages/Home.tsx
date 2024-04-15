import { Loader } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import React from "react";

export const Home = () => {
	const {
		data: posts,
		isPending: isLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();

	return (
		<div>
			<div>
				<h2>Home Feed</h2>
				{isLoading && !posts ? <Loader /> : <p>wuihhh</p>}
			</div>
		</div>
	);
};
