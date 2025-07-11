interface Props {
    children: string
}

function Title({ children }: Props) {

    return (<>
        <section className="flex gap-5">
            <img src="/Logo.svg" alt="task-logo" />
            <h1 className='text-4xl'>{children}</h1>
            <button>
                <img src="/Edit_duotone.svg"></img>
            </button>
        </section>
    </>);
}

export default Title;