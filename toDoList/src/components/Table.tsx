type TableProps = {
    listOfTasks: {
        taskName: string;
        taskContent: string;
        taskEnd: string;
    }[];
    button: string;
};


const Table = ({ listOfTasks, button }: TableProps) => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task name</th>
                        <th>Job</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfTasks.map((task, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{task.taskName}</td>
                            <td className="lg:tooltip" data-tip="Click me for more info">
                                <label htmlFor={`my_modal_${index}`} className="truncate w-24 inline-block whitespace-nowrap">
                                    {task.taskContent}
                                </label>
                                <input type="checkbox" id={`my_modal_${index}`} className="modal-toggle hidden" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box break-all">
                                        <h3 className="text-lg font-bold">To do:</h3>
                                        <p className="py-4">{task.taskContent}</p>
                                    </div>
                                    <label className="modal-backdrop" htmlFor={`my_modal_${index}`}>Close</label>
                                </div>
                            </td>
                            <td>{task.taskEnd}</td>
                            <td>
                                <button className="btn btn-sm">{button}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};



export default Table;