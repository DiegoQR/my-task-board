interface Props {
    icon: string,
    children: string,
    status: string,
    description: string
}

function Task({ icon, children, status, description }: Props) {
    const colorStatus: any =  {
        'IN_PROGRESS': { primaryColor: 'yellow', secondaryColor: 'orange', icon: 'Time_atack_duotone.svg'},
        'COMPLETED': { primaryColor: 'soft-green', secondaryColor: 'green', icon: 'Done_round_duotone.svg'},
        'WONT_DO': { primaryColor: 'soft-red', secondaryColor: 'red', icon: 'close_ring_duotone.svg'},
        'TO_DO': { primaryColor: 'light-gray',},
    }

    return (<>
        <section className={`flex justify-between rounded-xl px-4 py-5 bg-${colorStatus[status].primaryColor}`}>
            <article className="flex gap-5 items-center">
                <p className="text-3xl bg-soft-white p-1.5 rounded-xl">{icon}</p>
                <div>
                    <p className="font-bold text-2xl">{children}</p>
                    { status == 'TO_DO' ? <p>{description}</p> : <></> }
                </div>
            </article> 
            {colorStatus[status].icon ? <img src={`/${colorStatus[status].icon}`} alt="task-status" className={`p-3 rounded-xl bg-${colorStatus[status].secondaryColor}`} /> : <></>}
        </section>
    </>);
}

export default Task;