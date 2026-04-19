import { computeMeshSteps, computeRingSteps } from '../utils/shiftLogic.js';

function ComplexityPanel({ pValue, qValue, inputsValid, shiftData }) {
  if (!inputsValid || !shiftData) {
    return (
      <section className="panel complexity-panel">
        <h2>Complexity</h2>
        <p>Enter valid p and q to compare mesh and ring communication steps.</p>
      </section>
    );
  }

  const pNumber = Number(pValue);
  const qNumber = Number(qValue);
  const ringSteps = computeRingSteps(pNumber, qNumber);
  const meshSteps = computeMeshSteps(pNumber, qNumber);
  const qMod = qNumber % shiftData.size;
  const qDiv = Math.floor(qNumber / shiftData.size);
  const maxSteps = Math.max(ringSteps, meshSteps, 1);
  const ringWidth = (ringSteps / maxSteps) * 100;
  const meshWidth = (meshSteps / maxSteps) * 100;

  return (
    <section className="panel complexity-panel">
      <h2>Complexity</h2>
      <p>Compare the communication steps for ring vs mesh shifts.</p>

      <div className="complexity-metrics">
        <div className="metric-card">
          <span>Row shift</span>
          <strong>{shiftData.rowShift}</strong>
        </div>
        <div className="metric-card">
          <span>Column shift</span>
          <strong>{shiftData.columnShift}</strong>
        </div>
        <div className="metric-card">
          <span>Mesh steps</span>
          <strong>{meshSteps}</strong>
        </div>
        <div className="metric-card">
          <span>Ring steps</span>
          <strong>{ringSteps}</strong>
        </div>
      </div>

      <div className="formula-block">
        <div className="formula-row">
          <span>Ring steps</span>
          <span className="formula">min({qNumber}, {pNumber} - {qNumber}) = {ringSteps}</span>
        </div>
        <div className="formula-row">
          <span>Mesh steps</span>
          <span className="formula">({qNumber} mod {shiftData.size}) + floor({qNumber} / {shiftData.size}) = {qMod} + {qDiv} = {meshSteps}</span>
        </div>
      </div>

      <div className="comparison-bars">
        <div className="bar-row">
          <span>Ring</span>
          <div className="bar-track">
            <div className="bar-fill ring" style={{ width: `${ringWidth}%` }} />
          </div>
          <span>{ringSteps}</span>
        </div>
        <div className="bar-row">
          <span>Mesh</span>
          <div className="bar-track">
            <div className="bar-fill mesh" style={{ width: `${meshWidth}%` }} />
          </div>
          <span>{meshSteps}</span>
        </div>
      </div>
    </section>
  );
}

export default ComplexityPanel;
