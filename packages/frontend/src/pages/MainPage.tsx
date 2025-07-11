import Title from '../components/Title';
import Description from '../components/Description';
import type { Board } from '../models/boardEntity';
import Task from '../components/Task';
import AddNewTask from '../components/AddNewTaskButton';
import { useEffect } from 'react';

const board: Board = {
    name: "My Task Board",
    description: 'Task to keep organized',
    tasks: [
        {
            name: 'Task in Progress',
            description: 'This is a task in progress',
            icon: '⏰',
            status: 'IN_PROGRESS'
        }, {
            name: 'Task Completed',
            description: 'This is a task completed',
            icon: '🏋️',
            status: 'COMPLETED'
        }, {
            name: 'Task Won\'t Do',
            description: 'This is a task i won\'t do',
            icon: '☕',
            status: 'WONT_DO'
        }, {
            name: 'Task To Do',
            description: 'Work on a challenge on devChallenges.io, Learn Typescript',
            icon: '📚',
            status: 'TO_DO'
        }
    ]
}

function MainPage() {
    useEffect(() => {
        document.title = board.name
    });
    return (<>
        <main className='mx-[6%] lg:mx-[20%] my-10 flex flex-col gap-8'>
            <Title>{board.name}</Title>
            <Description>{board.description}</Description>
            {board.tasks.map((task) => {
                return (
                    <Task key={crypto.randomUUID()} icon={task.icon} status={task.status} description={task.description}>{task.name}</Task>
                );
            })}
            <AddNewTask />
        </main>
    </>);
}

export default MainPage;