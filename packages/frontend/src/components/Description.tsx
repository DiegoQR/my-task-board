interface Props {
    children: string
}

function Description({ children }: Props) {
    return (<>
        <p className="text-lg">{children}</p>
    </>);
}

export default Description;