import ControlPanel from './components/ControlPanel.jsx';
import MeshGrid from './components/MeshGrid.jsx';
import ComplexityPanel from './components/ComplexityPanel.jsx';

function App() {
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
        <div className="header-badge">4x4 Mesh Ready</div>
      </header>

      <main className="app-main">
        <section className="panel-stack">
          <ControlPanel />
          <ComplexityPanel />
        </section>
        <section className="mesh-panel">
          <MeshGrid />
        </section>
      </main>

      <footer className="app-footer">
        <span>Stage-by-stage visualization and complexity insight.</span>
      </footer>
    </div>
  );
}

export default App;
