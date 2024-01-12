import { activeRFQListcolumns, productData } from '../../../../../Data/Table/Defaultdata';
import React, { Fragment } from 'react';
import DataTable from 'react-data-table-component';

const RequirementTableData = () => {
    return (
        <Fragment>
            <div className='table-responsive product-table'>
                <DataTable noHeader pagination paginationServer columns={activeRFQListcolumns} data={productData} highlightOnHover={true} striped={true} responsive={true} />
            </div>
        </Fragment>
    );
};
export default RequirementTableData;