import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import indigo from "@material-ui/core/colors/indigo";

const Paginator: React.FC<PropsType> = (props) => {
    const {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10} = props;
    const classes = useStyles();
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
        //onPageChanged((portionCount - 1) * portionSize + 1);
        onPageChanged(pagesCount);
    };

    const elements = pages
        .filter(p => p >= startPortionNumber && p <= endPortionNumber)
        .map(p => (
                <Button
                    className={classes.buttonRoot}
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}
                    size='small'
                    color='primary'
                    disableElevation
                    variant={p === currentPage ? 'contained' : "outlined"}
                >
                    {p}
                </Button>
            )
        );

    const prevPortionLabelStart = (portionNumber - 2) * pageSize + 1;
    const prevPortionLabelEnd = (portionNumber - 1) * pageSize;
    const prevPortionLabel = `${prevPortionLabelStart}...${prevPortionLabelEnd}`;

    const nextPortionLabelStart = portionNumber * pageSize + 1;
    const nextPortionLabelEnd = (portionNumber < portionCount - 1) ? (portionNumber + 1) * pageSize : pagesCount;
    const nextPortionLabel = `${nextPortionLabelStart}...${nextPortionLabelEnd}`;

    return (
        <div>

            {portionNumber > 1 &&
            <IconButton onClick={setFirstPortion}
                        className={classes.iconButtonRoot}
                        size='small'>
                <FirstPageIcon className={classes.icon}/>
            </IconButton>}

            {portionNumber > 1 && <Button
                className={classes.buttonRoot}
                onClick={setPrevPortion}
                size='small'
                color='primary'
                disableElevation
                variant="outlined">
                {prevPortionLabel}
            </Button>}

            {elements}

            {portionNumber < portionCount && <Button
                className={classes.buttonRoot}
                onClick={setNextPortion}
                size='small'
                color='primary'
                disableElevation
                variant="outlined">
                {nextPortionLabel}
            </Button>}

            {portionNumber < portionCount &&
            <IconButton onClick={setLastPortion}
                        className={classes.iconButtonRoot}
                        size='small'>
                <LastPageIcon className={classes.icon}/>
            </IconButton>}

        </div>)
};

export default Paginator;

//=========================== TYPES =======================================================
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    buttonRoot: {
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        paddingBottom: 0,
        minWidth: 24
    },
    iconButtonRoot: {
        borderRadius: 4,
        border: '1px solid rgba(63, 81, 181, 0.5)',
        marginRight: 5,
        padding: 0,
        color: indigo[500]
    },
    icon: {
        width: 22.4,
        height: 22.4
    }
})
