import { Loader } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import type { Models } from "appwrite";
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
				{isLoading && !posts ? (
					<Loader />
				) : (
					<ul>
						{posts?.documents.map((post: Models.Document) => (
							<li>{post.caption}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
