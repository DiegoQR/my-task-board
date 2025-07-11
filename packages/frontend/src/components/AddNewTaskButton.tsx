function AddNewTaskButton() {
    return (<>
        <button className="flex items-center gap-5 bg-soft-yellow px-4 py-5">
            <img src="/Add_round_duotone.svg" alt="plus-icon" className="bg-orange p-3 rounded-xl"/>
            <p className="font-bold text-xl">Add new Task</p>
        </button>
    </>);
}

export default AddNewTaskButton;