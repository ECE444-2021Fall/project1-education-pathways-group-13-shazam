import styles from './scheduler.module.css';
import NavBar from '../components/navbar';
import api from '../services/index';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

function Scheduler() {
    const [results, setResults] = useState([]);
    const [sem1,setSem1] = useState({
        first: [],
        second: [],
        third: [],
        fourth: [],
        fifth: []
    })
    const [sem2,setSem2] = useState({
        firstB: [],
        secondB: [],
        thirdB: [],
        fourthB: [],
        fifthB: []
    })

    useEffect(async () => {
        const res = await api.getUserCart();
        console.log(`res: ${res}`);
        setResults(res);

    },[]);

    const complete = useMemo(() => {
        return sem1.first?.length && sem1.second?.length &&
            sem1.third?.length && sem1.fourth?.length && sem1.fifth?.length &&
            sem2.firstB?.length && sem2.secondB?.length && sem2.thirdB?.length &&
            sem2.fourthB?.length && sem2.fifthB?.length;
    },[sem1,sem2])

    const onDragEnd = useCallback((res) => {
        console.log(res);

        //if undefined or null - leave as card is being dropped
        //outside droppable zone
        if(!res?.destination) return;
        const destID = res?.destination?.droppableId;
        const destIndex = res?.destination?.index;
        const srcID = res?.source?.droppableId;
        const srcIndex = res?.source?.index;
        console.log(destID,destIndex,srcIndex,srcID);
        if (destID === srcID) {
            if(srcID === '0'){
                const newResults = [...results];
                const [reorderedItem] = newResults.splice(srcIndex, 1);
                newResults.splice(destIndex, 0, reorderedItem);
                setResults(newResults);
            }
        }
        else {
            console.log("tracking");
            if(srcID === '0'){
                const check = destID[destID.length-1] === 'B';
                const temp = check ? [...sem2[destID]] : [...sem1[destID]];
                if (temp.length > 0) return;
                // console.log("whre")
                const newResults = [...results];
                const [reorderedItem] = newResults.splice(srcIndex, 1);
                temp.splice(destIndex, 0, reorderedItem);
                setResults(newResults);
                if(check) {
                    const obj = {...sem2};
                    obj[destID] = temp;
                    setSem2(obj);
                } else {
                    const obj = {...sem1};
                    obj[destID] = temp;
                    setSem1(obj);
                }
                
            }
            else if(destID === '0'){
                const check = srcID[srcID.length-1] === 'B';
                const temp = check ? [...sem2[srcID]] : [...sem1[srcID]];
                // if (temp.length > 0) return;
                // console.log("jere")
                const newResults = [...results];
                const [reorderedItem] = temp.splice(srcIndex, 1);
                newResults.splice(destIndex, 0, reorderedItem);

                setResults(newResults);
                if(check) {
                    const obj = {...sem2};
                    obj[srcID] = temp;
                    setSem2(obj);
                } else {
                    const obj = {...sem1};
                    obj[srcID] = temp;
                    console.log(obj);
                    setSem1(obj);
                }

            } else if(srcID[srcID.length-1] === 'B' && srcID[srcID.length-1] === destID[destID.length-1]) {

                const src =  [...sem2[srcID]];
                const dest =  [...sem2[destID]];

                const [reorderedItem] = src.splice(srcIndex, 1);
                dest.splice(destIndex, 0, reorderedItem);

                const obj = {...sem2};
                obj[srcID] = src;
                obj[destID] = dest;
                setSem2(obj);

            } else if (srcID[srcID.length-1] !== 'B' && destID[destID.length-1] !== 'B') {
                const src =  [...sem1[srcID]];
                const dest =  [...sem1[destID]];

                const [reorderedItem] = src.splice(srcIndex, 1);
                dest.splice(destIndex, 0, reorderedItem);

                const obj = {...sem1};
                obj[srcID] = src;
                obj[destID] = dest;
                setSem1(obj);

            } else {
                const check = srcID[srcID.length-1] === 'B';
                const src = check ? [...sem2[srcID]] : [...sem1[srcID]];
                const dest = !check ? [...sem2[destID]] : [...sem1[destID]];

                const [reorderedItem] = src.splice(srcIndex, 1);
                dest.splice(destIndex, 0, reorderedItem);

                if(check) {
                    const obj = {...sem2};
                    const objb = {...sem1};
                    obj[srcID] = src;
                    objb[destID] = dest;
                    setSem2(obj);
                    setSem1(objb);
                } else {
                    const obj = {...sem1};
                    const objb = {...sem2};
                    obj[srcID] = src;
                    objb[destID] = dest;
                    setSem1(obj);
                    setSem2(objb);
                }
            }

        }

    },[results, sem2, sem1]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.schedulerText}>
                        Scheduler
                    </div>
                    <div className={styles.schedulerBody}>
                        The scheduler works in the following way:
                    </div>
                    <ul>
                        <li className={styles.listText}>
                            1. Identify a saved course you want to take
                        </li>
                        <li className={styles.listText}>
                            2. Drag and drop respective course from the saved tab into the semester of your choice
                        </li>
                        <li className={styles.listText}>
                            3. Repeat until all slots are filed and check status to make sure you are on track to <b>graduate</b>!
                        </li>
                    </ul>
                    <div className={styles.eligibility}>
                        <b>Graduation Eligibility:</b> 
                        { complete ? (<div className={styles.success}>Passing</div>) 
                        : (<div className={styles.fail}>Fail</div>) }
                    </div>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.containerA}>
                    <div className={styles.containerA1}>
                        <div className={styles.a1Text}>
                            Saved Courses:
                        </div>
                    </div>
                    <Droppable droppableId={"0"}>
                                {
                                    provided => (
                                    <div className={styles.containerA2}
                                    {...provided.droppableProps}
                                            ref={provided.innerRef}
                                    >
                                        {results.map((v,index,_) => (

                                                <Draggable draggableId={`${index}`} index={index} key={`${index}`} >
                                                    {
                                                        (providede) => (
                                                            <div className={styles.card}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                    </div>
                                    )
                                }
                            </Droppable>
                </div>
                <div className={styles.containerB}>
                    <div className={styles.containerB1}>
                        <div className={styles.containerB1A}>
                            <div className={styles.B1Atext}>
                                Semester 1
                            </div>
                        </div>
                        <div className={styles.containerB1B}>
                            <Droppable droppableId={"first"} isDropDisabled={sem1.first.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem1.first.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-firstA`} index={index} key={`${index}`} >
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"second"} isDropDisabled={sem1.second.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem1.second.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-secondA`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"third"} isDropDisabled={sem1.third.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem1.third.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-thirdA`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"fourth"} isDropDisabled={sem1.fourth.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem1.fourth.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-fourthA`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"fifth"} isDropDisabled={sem1.fifth.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem1.fifth.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-fifthA`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                        </div>
                    </div>
                    <div className={styles.containerB2}>
                        <div className={styles.containerB1A}>
                                <div className={styles.B1Atext}>
                                    Semester 2
                                </div>
                            </div>
                            <div className={styles.containerB1B}>
                            <Droppable droppableId={"firstB"} isDropDisabled={sem2.firstB.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem2.firstB.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-firstB`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"secondB"} isDropDisabled={sem2.secondB.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem2.secondB.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-secondB`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"thirdB"} isDropDisabled={sem2.thirdB.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem2.thirdB.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-thirdB`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"fourthB"} isDropDisabled={sem2.fourthB.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem2.fourthB.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-fourthB`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId={"fifthB"} isDropDisabled={sem2.fifthB.length > 0}>
                                {
                                    provided => (
                                        <div className={styles.cardPlace}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {sem2.fifthB.map((v,index,_) => (

                                                <Draggable draggableId={`${index}-fifthB`} index={index} key={`${index}`}>
                                                    {
                                                        (providede) => (
                                                            <div className={styles.minicard}
                                                                ref={providede.innerRef} {...providede.draggableProps} {...providede.dragHandleProps}>
                                                                <div className={styles.name}>
                                                                    {v?.name}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {v?.title?.slice(0,20).concat("...")}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            </div>
                        </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Scheduler; 
