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

  return (
    <section className="mesh-panel">
      <div className="mesh-header">
        <div>
          <h2>Mesh Grid</h2>
          <p>{stageLabels[stageIndex]}</p>
        </div>
        <div className="mesh-stage-pill">Stage {stageIndex} / 2</div>
      </div>

      <div
        className="mesh-grid"
        style={{ gridTemplateColumns: `repeat(${shiftData.size}, minmax(0, 1fr))` }}
      >
        {currentData.map((value, index) => (
          <div className="mesh-node" key={index}>
            <span className="node-index">Node {index}</span>
            <span className="node-data">{value}</span>
          </div>
        ))}
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
