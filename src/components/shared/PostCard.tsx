import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import type { Models } from "appwrite";
import { Edit2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { PostStats } from "./PostStats";

interface PostCardProps {
	post: Models.Document;
}

export const PostCard = ({ post }: PostCardProps) => {
	const { user } = useUserContext();

	return (
		<div className="w-full p-2 flex flex-col">
			<div className="flex items-center px-2 gap-2">
				<img
					src={post.creator.imageUrl}
					alt="photo-avatar"
					className="rounded-full w-10 h-10"
				/>
				<div>
					<p>{post.creator.name}</p>
					<p>{multiFormatDateString(post.$createdAt)}</p>
					<p>-</p>
					<p>{post.location}</p>
				</div>

				<Link
					to={`/update-post/${post.$id}`}
					className={`${user.id !== post.creator.$id && "hidden"}`}
				>
					<Edit2Icon />
				</Link>
			</div>

			<Link to={`/posts/${post.$id}`}>
				<div className="flex flex-col justify-center">
					<img src={post.imageUrl} alt="" className="rounded-md max-w-60" />
					<p>{post.caption}</p>
					<div className="flex gap-2">
						{post.tags.map((tag: string) => (
							<p>#{tag}</p>
						))}
					</div>
				</div>
			</Link>

			<PostStats post={post} userId={user.id} />
		</div>
	);
};
