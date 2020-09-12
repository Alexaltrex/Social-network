import React, {useState} from 'react';
import style from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);// число страниц
    let pages: Array<number> = [];
    for (let i = 1; i < pagesCount + 1; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize); // число порций (блоков) страниц
    let [portionNumber, setPortionNumber] = useState(1);// текущий номер порции (начинается с 1)
    let startPortionNumber = (portionNumber - 1) * portionSize + 1; // номер первого элемента в порции
    let endPortionNumber = portionNumber * portionSize; // номер последнего элемента в порции

    const setPrevPortion = () => {
        setPortionNumber(portionNumber - 1);
        onPageChanged((portionNumber - 2) * portionSize + 1);
    };

    const setNextPortion = () => {
        setPortionNumber(portionNumber + 1);
        onPageChanged((portionNumber) * portionSize + 1);
    };

    const setFirstPortion = () => {
        setPortionNumber(1);
        onPageChanged(1);
    };

    const setLastPortion = () => {
        setPortionNumber(portionCount);
        onPageChanged((portionCount - 1) * portionSize + 1);
    }


    const elements = pages
        .filter(p => p >= startPortionNumber && p <= endPortionNumber)
        .map(p => {
                return <div
                    key={p}
                    className={cn(style.paginationItem, {[style.selected]: p === currentPage})}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}>{p}</div>
            }
        );

    return (<div className={style.pagination}>
        {portionNumber > 1 && <button onClick={setFirstPortion}>{'<<'}</button>}
        {portionNumber > 1 && <button onClick={setPrevPortion}>PREV</button>}
        {elements}
        {portionNumber < portionCount && <button onClick={setNextPortion}>NEXT</button>}
        {portionNumber < portionCount && <button onClick={setLastPortion}>{'>>'}</button>}
    </div>)
};

export default Paginator;