const stageLabels = ['Initial State', 'Stage 1 (Row Shift)', 'Stage 2 (Column Shift)'];
const snapshotLabels = ['Before', 'After Stage 1', 'After Stage 2'];

function MeshGrid({ stage, shiftData, inputsValid }) {
  if (!inputsValid || !shiftData) {
    return (
      <section className="mesh-panel">
        <h2>Mesh Grid</h2>
        <div className="mesh-placeholder">Enter valid p and q to render the mesh.</div>
      </section>
    );
  }

  const stageIndex = Math.min(Math.max(stage, 0), 2);
  const stageSets = [shiftData.initial, shiftData.afterRow, shiftData.afterColumn];
  const currentData = stageSets[stageIndex];
  const arrowMode = stageIndex === 1 ? 'row' : stageIndex === 2 ? 'col' : null;
  const gridStageClass = stageIndex === 1 ? 'stage-row' : stageIndex === 2 ? 'stage-col' : 'stage-initial';
  const stagePill = stageIndex === 0 ? 'Initial' : `Stage ${stageIndex} of 2`;

  return (
    <section className="mesh-panel">
      <div className="mesh-header">
        <div>
          <h2>Mesh Grid</h2>
          <p>{stageLabels[stageIndex]}</p>
        </div>
        <div className="mesh-stage-pill">{stagePill}</div>
      </div>

      <div className="mesh-grid-wrap">
        <div
          className={`mesh-grid ${gridStageClass}`}
          style={{ gridTemplateColumns: `repeat(${shiftData.size}, minmax(0, 1fr))` }}
        >
          {currentData.map((value, index) => (
            <div className="mesh-node" key={index}>
              <span className="node-index">Node {index}</span>
              <span className="node-data">{value}</span>
            </div>
          ))}
        </div>
        {arrowMode && (
          <svg
            className={`mesh-arrow ${arrowMode}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
              </marker>
            </defs>
            {arrowMode === 'row' ? (
              <line x1="8" y1="50" x2="92" y2="50" markerEnd="url(#arrowhead)" />
            ) : (
              <line x1="50" y1="8" x2="50" y2="92" markerEnd="url(#arrowhead)" />
            )}
          </svg>
        )}
      </div>

      <div className="mesh-snapshots">
        {stageSets.map((dataSet, index) => (
          <div
            className={`mesh-snapshot${index === stageIndex ? ' active' : ''}`}
            key={snapshotLabels[index]}
          >
            <div className="snapshot-title">{snapshotLabels[index]}</div>
            <div
              className="snapshot-grid"
              style={{ gridTemplateColumns: `repeat(${shiftData.size}, minmax(0, 1fr))` }}
            >
              {dataSet.map((value, cellIndex) => (
                <div className="snapshot-cell" key={cellIndex}>
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MeshGrid;
