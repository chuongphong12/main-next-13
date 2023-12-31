import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import * as go from 'gojs';

import GoJSWrapper from './GoJSWrapper';
import SelectionInspector from './SelectionInspector';

export default function DrawDiagram() {
  // state variables
  const [readOnly, setReadOnly] = useState(false);
  const [diagramData, updateDiagramData] = useImmer({
    nodeDataArray: [
      { key: 1, text: 'Alpha', color: 'lightblue' },
      { key: 2, text: 'Beta', color: 'orange' },
      { key: 3, text: 'Gamma', color: 'lightgreen' },
      { key: 4, text: 'Delta', color: 'pink' },
    ],
    linkDataArray: [
      { key: -1, from: 1, to: 2 },
      { key: -2, from: 1, to: 3 },
      { key: -3, from: 2, to: 2 },
      { key: -4, from: 3, to: 4 },
      { key: -5, from: 4, to: 1 },
    ],
    modelData: { canRelink: true },
    selectedData: null,
    skipsDiagramUpdate: false,
  });
  console.log(diagramData);

  // maps for faster state modification
  const mapNodeKeyIdx = new Map();
  const mapLinkKeyIdx = new Map();
  refreshNodeIndex(diagramData.nodeDataArray);
  refreshLinkIndex(diagramData.linkDataArray);

  function refreshNodeIndex(nodeArr: any) {
    mapNodeKeyIdx.clear();
    nodeArr.forEach((n: any, idx: any) => {
      mapNodeKeyIdx.set(n.key, idx);
    });
  }

  function refreshLinkIndex(linkArr: any) {
    mapLinkKeyIdx.clear();
    linkArr.forEach((l: any, idx: number) => {
      mapLinkKeyIdx.set(l.key, idx);
    });
  }

  function handleDiagramEvent(e: any) {
    const name = e.name;
    switch (name) {
      case 'ChangedSelection': {
        const sel = e.subject.first();
        updateDiagramData((draft: any) => {
          if (sel) {
            if (sel instanceof go.Node) {
              const idx = mapNodeKeyIdx.get(sel.key);
              if (idx !== undefined && idx >= 0) {
                const nd = draft.nodeDataArray[idx];
                draft.selectedData = nd;
              }
            } else if (sel instanceof go.Link) {
              const idx = mapLinkKeyIdx.get(sel.key);
              if (idx !== undefined && idx >= 0) {
                const ld = draft.linkDataArray[idx];
                draft.selectedData = ld;
              }
            }
          } else {
            draft.selectedData = null;
          }
        });
        break;
      }
      default:
        break;
    }
  }

  function handleModelChange(obj: any) {
    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;
    const modifiedModelData = obj.modelData;

    // maintain maps of modified data so insertions don't need slow lookups
    const modifiedNodeMap = new Map();
    const modifiedLinkMap = new Map();
    updateDiagramData((draft: any) => {
      let narr = draft.nodeDataArray;
      if (modifiedNodeData) {
        modifiedNodeData.forEach((nd: any) => {
          modifiedNodeMap.set(nd.key, nd);
          const idx = mapNodeKeyIdx.get(nd.key);
          if (idx !== undefined && idx >= 0) {
            narr[idx] = nd;
            if (draft.selectedData && draft.selectedData.key === nd.key) {
              draft.selectedData = nd;
            }
          }
        });
      }
      if (insertedNodeKeys) {
        insertedNodeKeys.forEach((key: any) => {
          const nd = modifiedNodeMap.get(key);
          const idx = mapNodeKeyIdx.get(key);
          if (nd && idx === undefined) {
            // nodes won't be added if they already exist
            mapNodeKeyIdx.set(nd.key, narr.length);
            narr.push(nd);
          }
        });
      }
      if (removedNodeKeys) {
        narr = narr.filter((nd: any) => {
          if (removedNodeKeys.includes(nd.key)) {
            return false;
          }
          return true;
        });
        draft.nodeDataArray = narr;
        refreshNodeIndex(narr);
      }

      let larr = draft.linkDataArray;
      if (modifiedLinkData) {
        modifiedLinkData.forEach((ld: any) => {
          modifiedLinkMap.set(ld.key, ld);
          const idx = mapLinkKeyIdx.get(ld.key);
          if (idx !== undefined && idx >= 0) {
            larr[idx] = ld;
            if (draft.selectedData && draft.selectedData.key === ld.key) {
              draft.selectedData = ld;
            }
          }
        });
      }
      if (insertedLinkKeys) {
        insertedLinkKeys.forEach((key: any) => {
          const ld = modifiedLinkMap.get(key);
          const idx = mapLinkKeyIdx.get(key);
          if (ld && idx === undefined) {
            // links won't be added if they already exist
            mapLinkKeyIdx.set(ld.key, larr.length);
            larr.push(ld);
          }
        });
      }
      if (removedLinkKeys) {
        larr = larr.filter((ld: any) => {
          if (removedLinkKeys.includes(ld.key)) {
            return false;
          }
          return true;
        });
        draft.linkDataArray = larr;
        refreshLinkIndex(larr);
      }
      // handle model data changes, for now just replacing with the supplied object
      if (modifiedModelData) {
        draft.modelData = modifiedModelData;
      }
      draft.skipsDiagramUpdate = true; // the GoJS model already knows about these updates
    });
  }

  function handleInputChange(path: any, value: any, isBlur: any) {
    updateDiagramData((draft: any) => {
      const data = draft.selectedData; // only reached if selectedData isn't null
      data[path] = value;
      if (isBlur) {
        const key = data.key;
        if (key < 0) {
          // negative keys are links
          const idx = mapLinkKeyIdx.get(key);
          if (idx !== undefined && idx >= 0) {
            draft.linkDataArray[idx] = data;
            draft.skipsDiagramUpdate = false;
          }
        } else {
          const idx = mapNodeKeyIdx.get(key);
          if (idx !== undefined && idx >= 0) {
            draft.nodeDataArray[idx] = data;
            draft.skipsDiagramUpdate = false;
          }
        }
      }
    });
  }

  function handleReadOnlyChange(e: any) {
    const target = e.target;
    const value = target.checked;
    setReadOnly(!readOnly);
  }

  function handleRelinkChange(e: any) {
    const target = e.target;
    const value = target.checked;
    updateDiagramData((draft) => {
      draft.modelData = { canRelink: value };
      draft.skipsDiagramUpdate = false;
    });
  }

  const selectedData = diagramData.selectedData;
  let inspector;
  if (selectedData !== null) {
    inspector = (
      <SelectionInspector
        selectedData={diagramData.selectedData}
        onInputChange={handleInputChange}
      />
    );
  }

  return (
    <div>
      <GoJSWrapper
        nodeDataArray={diagramData.nodeDataArray}
        linkDataArray={diagramData.linkDataArray}
        modelData={diagramData.modelData}
        skipsDiagramUpdate={diagramData.skipsDiagramUpdate}
        onDiagramEvent={handleDiagramEvent}
        onModelChange={handleModelChange}
        readOnly={readOnly}
      />
      <label>
        Read only?
        <input
          type="checkbox"
          id="readOnly"
          checked={readOnly}
          onChange={handleReadOnlyChange}
        />
      </label>
      <label>
        Allow Relinking?
        <input
          type="checkbox"
          id="relink"
          checked={diagramData.modelData.canRelink}
          onChange={handleRelinkChange}
        />
      </label>
      {inspector}
    </div>
  );
}
