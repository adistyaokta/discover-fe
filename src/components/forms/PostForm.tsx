import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";

type PostFormProps = {
	post?: Models.Document;
};

export const PostForm = ({ post }: PostFormProps) => {
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();
	const { user } = useUserContext();
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post?.caption : "",
			file: [],
			location: post ? post?.location : "",
			tags: post ? post?.tags.join(",") : "",
		},
	});

	const onSubmit = async (values: z.infer<typeof PostValidation>) => {
		const newPost = await createPost({
			...values,
			userId: user.id,
		});

		if (!newPost) {
			toast({
				title: "Unable to create post, please try again.",
			});
		} else {
			navigate("/");
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-9 w-full max-w-5xl"
			>
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Caption</FormLabel>
							<FormControl>
								<Textarea placeholder="Add caption" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Add Photos</FormLabel>
							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.mediaUrl}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Add Location</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Add Tags{" "}
								<span className="font-thin">(*Use comma to separate)</span>
							</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Music, Art, Games" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row gap-2 items-center justify-end">
					<Button
						type="submit"
						variant="secondary"
						className="hover:bg-primary hover:text-secondary transition-all ease-in delay-75"
					>
						Cancel
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};
