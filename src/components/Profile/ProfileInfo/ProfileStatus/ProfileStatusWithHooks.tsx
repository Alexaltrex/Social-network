import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className='status'>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{status || '---------'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true}
                       onChange={onChange}
                       onBlur={deactivateEditMode}
                       value={status}
                />
            </div>
            }
        </div>
    );

};

export default ProfileStatusWithHooks;