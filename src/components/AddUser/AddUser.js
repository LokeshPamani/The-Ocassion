import React, { Component } from 'react';
import {EditableTable} from './Table'

class AddUser extends Component {
    render() {
        return (
            <div className='adduseragemain' >
                <div className='adduserdiv'>
                    <EditableTable />
                </div>
            </div>
        );
    }
}

export default AddUser;