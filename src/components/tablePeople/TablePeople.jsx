import { useEffect, useState } from 'react';
import styles from './TablePeople.module.scss';
import LineTablePeople from './LineTablePeople/LineTablePeople';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import CustomButton from '../../UI/CustomButton/CustomButton';
import CardEditPerson from './CardEditPerson/CardEditPerson';
import { CustomWindow } from '../../common/CustomWindow';

export default function TablePeople(props) {
    const [customHeight, setCustomHeight] = useState(250);
    const [isAlertDelete, setIsAlertDelete] = useState(false);
    const [isCardEdit, setIsCardEdit] = useState(false);
    const [chooseUser, setChooseUser] = useState({});
    const closeCardEdit = () => {
        setIsCardEdit(false);
        setChooseUser({});
    };
    const openCardEdit = (user) => {
        setChooseUser(user);
        setIsCardEdit(true);
    };
    useEffect(() => {
        if (props.visibleSearch) {
            setCustomHeight(270);
        } else {
            //-60
            setCustomHeight(210);
        }
    }, [props.visibleSearch]);
    return (
        <div className={styles.container}>
            {props.textAlert !== '' && (
                <CustomWindow
                    text={props.textAlert}
                    setTextAlert={props.setTextAlert}
                />
            )}
            {/* <div className={styles.btns}>
                <CustomButton
                    width={'130px'}
                    height={'50px'}
                    color={'#FFFFFF'}
                    text={'Удалить'}
                />
                <CustomButton
                    width={'130px'}
                    height={'50px'}
                    color={'yellow'}
                    text={'Изменить'}
                />
            </div> */}
            {isCardEdit && (
                <CardEditPerson
                    setTextAlert={props.setTextAlert}
                    closeCard={closeCardEdit}
                    person={chooseUser}
                    editPerson={props.editPerson}
                />
            )}
            <div className={styles.content}>
                <LineTablePeople
                    // setIsAlertDelete={setIsAlertDelete}
                    titleSortListInventory={props.titleSortListInventory}
                    id='№'
                    num='Индивидуальный номер'
                    name='ФИО'
                />
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.peopleList.length}
                            itemData={{
                                peopleList: props.peopleList,
                                openCardEdit: openCardEdit,
                                deletePeople: props.deletePeople,
                                setIsAlertDelete: setIsAlertDelete,
                            }}
                            itemSize={50}
                            width={width}
                        >
                            {Row}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        </div>
    );
}

const Row = (props) => {
    const { data, index, style } = props;
    const { peopleList, openCardEdit, deletePeople, setIsAlertDelete } = data;
    const el = peopleList[index];
    const nameUser = `${el.lastname} ${el.firstname} ${el.middlename}`;
    return (
        <div style={style} onDoubleClick={() => openCardEdit(el)}>
            <LineTablePeople
                setIsAlertDelete={setIsAlertDelete}
                key={el.people_id}
                el={el}
                elId={index}
                nameUser={nameUser}
                deletePeople={deletePeople}
            />
        </div>
    );
};
