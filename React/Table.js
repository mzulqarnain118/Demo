import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = (props) => {
  const navigate = useNavigate();
  let IdsArray = [];
  let individualCheckboxArray = [];
  const [checkedAll, setCheckedAll] = useState(false);
  
  const getCheckedModelsId = (e, ModelId) => {
    if (e.target.checked) {
      IdsArray.push(ModelId);
    } else {
      const indexData = IdsArray.indexOf(ModelId);
      IdsArray.splice(indexData, 1);
    }
  };
  const getUniqueCheckedCheckbox = (e, fstElement) => {
    if (e.target.checked) {
      IdsArray.push(fstElement);
    } else {
      const indexData = IdsArray.indexOf(fstElement);
      IdsArray.splice(indexData, 1);
    }
  };
  console.log(props,"heeeeee1111");
  return (
    <div className={props.scroll && "container-fluid table-horizontal-scroll"}>
      <table className="table table-striped text-center table-responsive table-responsive-sm table-responsive-lg">
        <thead>
          <tr>
            {props.checkEachRow && (
              <th title="select for export all listed model data">
                <input
                  className="form-check-input"
                  value={checkedAll}
                  onChange={() => setCheckedAll(!checkedAll)}
                  type="checkbox"
                  id="gridCheck1"
                />
              </th>
            )}
            {props?.tableHeader &&
              props?.tableHeader.map((ele) => {
                return (
                  <th key={ele} className="td-width">
                    {ele}
                  </th>
                );
              })}
            {props?.RowIcon && (
              <th>
                <img
                  src={`/assets/img/${props?.RowIcon}`}
                  alt=""
                  width={props?.RowIcon==="play-button.png" && "40px"}

                />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props?.tableRows &&
            props?.tableRows.map((element, index) => {
              return (
                <tr key={index}>
                  {props.checkEachRow && (
                    <td
                      title={
                        "select for export" +
                        " " +
                        element[0] +
                        " " +
                        "model data"
                      }
                    >
                      {checkedAll ? (
                        <input
                          className="form-check-input"
                          checked={checkedAll}
                          type="checkbox"
                          id="gridCheck1"
                        />
                      ) : (
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck1"
                          onChange={(e) => getCheckedModelsId(e, element[0])}
                        />
                      )}
                    </td>
                  )}
                  {props?.tableHeader &&
                    props?.tableHeader.map((ind, i) => {
                      return (
                        <td key={i}>
                          {props?.tableRows[index][props?.tableHeader[i]]}
                        </td>
                      );
                    })}
                  {props?.RowIcon && (
                    <td
                      onClick={() => {
                        props?.ActionOnRowIcon &&
                          navigate(props?.ActionOnRowIcon==="/DeployedModel/DeployedResults"?`/DeployedModel/DeployedResults/${element.id}`:props?.ActionOnRowIcon);
                      }}
                    >
                      <img
                        src={`/assets/img/${props?.RowIcon}`}
                        width={props?.RowIcon==="play-button.png" && "40px"}
                        alt=""
                       
                      />
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
