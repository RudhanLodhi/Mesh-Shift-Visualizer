import { useEffect, useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel.jsx';
import MeshGrid from './components/MeshGrid.jsx';
import ComplexityPanel from './components/ComplexityPanel.jsx';
import { computeShiftStages } from './utils/shiftLogic.js';

const DEFAULT_P = '16';
const DEFAULT_Q = '3';

function App() {
  const [pValue, setPValue] = useState(DEFAULT_P);
  const [qValue, setQValue] = useState(DEFAULT_Q);
  const [stage, setStage] = useState(0);

  const pNumber = Number(pValue);
  const pIsInteger = Number.isInteger(pNumber);
  const pInRange = pNumber >= 4 && pNumber <= 64;
  const pIsSquare = pIsInteger && Number.isInteger(Math.sqrt(pNumber));
  const pValid = pValue !== '' && pIsInteger && pInRange && pIsSquare;
  const meshSize = pValid ? Math.sqrt(pNumber) : null;

  let pError = '';
  if (pValue === '') {
    pError = 'Enter a value between 4 and 64.';
  } else if (!pIsInteger) {
    pError = 'p must be an integer.';
  } else if (!pInRange) {
    pError = 'p must be between 4 and 64.';
  } else if (!pIsSquare) {
    pError = 'p must be a perfect square.';
  }

  const qNumber = Number(qValue);
  const qIsInteger = Number.isInteger(qNumber);
  const qMax = pValid ? pNumber - 1 : null;
  let qError = '';

  if (qValue === '') {
    qError = 'Enter a value between 1 and p-1.';
  } else if (!qIsInteger) {
    qError = 'q must be an integer.';
  } else if (!pValid) {
    qError = 'Enter a valid p first.';
  } else if (qNumber < 1 || qNumber > qMax) {
    qError = `q must be between 1 and ${qMax}.`;
  }

  const qValid = qError === '';
  const inputsValid = pValid && qValid;

  const shiftData = useMemo(() => {
    if (!inputsValid) {
      return null;
    }

    return computeShiftStages(pNumber, qNumber);
  }, [inputsValid, pNumber, qNumber]);

  useEffect(() => {
    setStage(0);
  }, [pValue, qValue]);

  const badgeText = meshSize ? `${meshSize}x${meshSize} Mesh` : 'Awaiting valid p';

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Parallel Mesh Shift</p>
          <h1>Mesh Circular Shift Visualizer</h1>
          <p className="subtitle">
            Simulate row and column shifts on a 2D mesh to visualize circular q-shift.
          </p>
        </div>
        <div className="header-badge">{badgeText}</div>
      </header>

      <main className="app-main">
        <section className="panel-stack">
          <ControlPanel
            pValue={pValue}
            qValue={qValue}
            onPChange={setPValue}
            onQChange={setQValue}
            pError={pError}
            qError={qError}
            meshSize={meshSize}
          />
          <ComplexityPanel />
        </section>
        <section className="mesh-panel">
          <MeshGrid stage={stage} shiftData={shiftData} inputsValid={inputsValid} />
        </section>
      </main>

      <footer className="app-footer">
        <span>Stage-by-stage visualization and complexity insight.</span>
      </footer>
    </div>
  );
}

export default App;
