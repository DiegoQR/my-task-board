interface Props {
    icon: string,
    children: string,
    status: string,
    description: string
}

function Task({ icon, children, status, description }: Props) {
    const colorStatus: any =  {
        'IN_PROGRESS': { primaryColor: 'bg-yellow', secondaryColor: 'bg-orange', icon: 'Time_atack_duotone.svg'},
        'COMPLETED': { primaryColor: 'bg-soft-green', secondaryColor: 'bg-green', icon: 'Done_round_duotone.svg'},
        'WONT_DO': { primaryColor: 'bg-soft-red', secondaryColor: 'bg-red', icon: 'close_ring_duotone.svg'},
        'TO_DO': { primaryColor: 'bg-soft-gray',},
    }

    return (<>
        <section className={`flex justify-between rounded-xl px-4 py-5 ${colorStatus[status].primaryColor}`}>
            <article className="flex gap-5 items-center">
                <p className="text-3xl bg-soft-white aspect-square rounded-xl">{icon}</p>
                <div>
                    <p className="font-bold text-2xl">{children}</p>
                    { status == 'TO_DO' ? <p>{description}</p> : <></> }
                </div>
            </article> 
            {colorStatus[status].icon ? <img src={`/${colorStatus[status].icon}`} alt="task-status" className={`p-3 rounded-xl ${colorStatus[status].secondaryColor}`} /> : <></>}
        </section>
    </>);
}

export default Task;