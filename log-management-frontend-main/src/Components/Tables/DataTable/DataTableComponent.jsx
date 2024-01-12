import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';

const DataTableComponent = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    const [data, setData] = useState(props?.data ?? []);

    const handleRowSelected = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        setData(props?.data);
    }, [props?.data]);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r) => r.title)}?`)) {
            setToggleDelet(!toggleDelet);

            setData(
                data.filter((item) => (selectedRows.filter((elem) => elem.id === item.id).length > 0 ? false : true))
            );
            setSelectedRows('');
        }
    };

    //console.log('DATA', props?.data);
    return (
        <Fragment>
            {selectedRows.length !== 0 && (
                <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Delet Selected Data..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: () => handleDelete() }}>Delete</Btn>
                </div>
            )}
            <DataTable
                data={data}
                columns={props?.tableColumns}
                striped={true}
                center={true}
                pagination
                selectableRows={props?.selectableRows}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleDelet}
                {...props}
            />
        </Fragment>
    );
};
export default DataTableComponent;
