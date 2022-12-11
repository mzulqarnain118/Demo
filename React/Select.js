import React from 'react';
import DropDownBox from 'devextreme-react/drop-down-box';
import TreeView from 'devextreme-react/tree-view';

import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';


export default function Select ({treeView= null,treeView,treeDataSource,treeBoxValue,treeViewItemSelectionChanged,syncTreeViewSelection,treeViewRender})  {
  

//   makeAsyncDataSource(jsonFile) {
//     return new CustomStore({
//       loadMode: 'raw',
//       key: 'ID',
//       load() {
//         return fetch(`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/data/${jsonFile}`)
//           .then((response) => response.json());
//       },
//     });
//   }

 function syncTreeViewSelection(e) {
    const treeView = (e.component.selectItem && e.component)
      || (treeView && treeView.instance);

    if (treeView) {
      if (e.value === null) {
        treeView.unselectAll();
      } else {
        const values = e.value || treeBoxValue;
        values && values.forEach((value) => {
          treeView.selectItem(value);
        });
      }
    }

    if (e.value !== undefined) {
        treeBoxValue= e.value,
    }
  }

  

  function treeViewItemSelectionChanged(e) {
      treeBoxValue= e.component.getSelectedNodeKeys(),
  }
    return (
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-label">DropDownBox with embedded TreeView</div>
          <div className="dx-field-value">
            <DropDownBox
              value={state.treeBoxValue}
              valueExpr="ID"
              displayExpr="name"
              placeholder="Select a value..."
              showClearButton={true}
              dataSource={treeDataSource}
              onValueChanged={syncTreeViewSelection(e)}
              contentRender={treeViewRender}
            />
          </div>
        </div>
       
      </div>
    );
  
const 
    return (
      <TreeView dataSource={treeDataSource}
        ref={(ref) => { treeView = ref; }}
        dataStructure="plain"
        keyExpr="ID"
        parentIdExpr="categoryId"
        selectionMode="multiple"
        showCheckBoxesMode="normal"
        selectNodesRecursive={false}
        displayExpr="name"
        selectByClick={true}
        onContentReady={syncTreeViewSelection}
        onItemSelectionChanged={treeViewItemSelectionChanged}
      />
    );
  

 


  
}

