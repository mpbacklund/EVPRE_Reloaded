import React, { useContext } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
const RightSideBar = (props) => {
  const editorCtx = useContext(EditorContext);

  if (editorCtx.blockData) {
    return (
      <aside>
        {editorCtx.blockData.destinationNode ? (
          <div>
            <h4>Inputs</h4>
            {editorCtx.blockData.input}
            <h4>Output</h4>
            {editorCtx.blockData.output}
            <h4>Examples:</h4>
            <ul>
              <li>City/State: {editorCtx.blockData.logan}</li>
              <li>Aggie Icecream: <br/> {editorCtx.blockData.aggieicecream}</li>
              <li>Tandori Oven: <br/> {editorCtx.blockData.tandorioven}</li>
              <li>Salt Lake Airport: <br/> {editorCtx.blockData.slcairport}</li>
            </ul>

          </div>
        ) : ""}
        {editorCtx.blockData.getRouteNode ? (
          <div>
            <h4>Instructions</h4>
            {editorCtx.blockData.instructions}
            <h4>Description</h4>
            {editorCtx.blockData.description}
          </div>
        ) : ""}
        {editorCtx.blockData.carNode ? (
          <div>
            <h4>Instructions</h4>
            {editorCtx.blockData.instructions}
          </div>
        ): ""}
      </aside>
    );
  }
};

export default RightSideBar;
