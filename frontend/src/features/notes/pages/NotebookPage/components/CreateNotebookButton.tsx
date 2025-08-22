function CreateNotebookButton() {
	return (
		<DialogTrigger asChild>
			<button className="flex flex-row gap-1 items-center pl-2.5 pr-3 py-2 bg-sky-500 rounded-md shadow-xl text-white font-semibold hover:cursor-pointer">
				<AddIcon />
				<p className="text-white font-semibold">Create</p>
			</button>
		</DialogTrigger>
	);
}


export default CreateNotebookButton;