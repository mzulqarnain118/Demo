import React from 'react';

const Table = (props) => {
    console.log(props)
    return (
        <div>
            <table className="table table-striped text-center table-responsive table-responsive-sm table-responsive-lg">
                <thead>
                    <tr>
                        {props?.tableHeader && props?.tableHeader.map((ele) => {
                            return <th key={ele} className="td-width">{ele}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props?.tableRows && props?.tableRows.map((element, index) => {

                        return <tr key={index}>
                            {props?.tableHeader && props?.tableHeader.map((ind, i) => {
                                return <td key={i}>{props?.tableRows[index][props?.tableHeader[i]]}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    );
}
export default Table;

       // <Table tableHeader={ProductionModelTableHeader} tableRows={ProductionModelTableData} />

