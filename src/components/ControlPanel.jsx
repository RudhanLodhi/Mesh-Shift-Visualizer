function ControlPanel({
  pValue,
  qValue,
  onPChange,
  onQChange,
  pError,
  qError,
  meshSize,
  stage,
  inputsValid,
  onNextStage,
  onResetStage
}) {
  const stageLabel = stage === 0 ? 'Initial' : stage === 1 ? 'Row shift' : 'Column shift';
  const nextDisabled = !inputsValid || stage >= 2;
  const resetDisabled = !inputsValid || stage === 0;

  return (
    <section className="panel control-panel">
      <h2>Controls</h2>
      <p>Set the mesh size and shift distance to begin the simulation.</p>

      <div className="control-fields">
        <div className="control-field">
          <label htmlFor="mesh-size">Mesh size p</label>
          <input
            id="mesh-size"
            className={`control-input${pError ? ' invalid' : ''}`}
            type="number"
            inputMode="numeric"
            step="1"
            min="4"
            max="64"
            value={pValue}
            onChange={(event) => onPChange(event.target.value)}
            aria-invalid={Boolean(pError)}
            aria-describedby="mesh-size-help"
          />
          <span
            id="mesh-size-help"
            className={`helper-text${pError ? ' error' : ''}`}
          >
            {pError || 'Perfect square between 4 and 64.'}
          </span>
        </div>

        <div className="control-field">
          <label htmlFor="shift-amount">Shift amount q</label>
          <input
            id="shift-amount"
            className={`control-input${qError ? ' invalid' : ''}`}
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            value={qValue}
            onChange={(event) => onQChange(event.target.value)}
            aria-invalid={Boolean(qError)}
            aria-describedby="shift-amount-help"
          />
          <span
            id="shift-amount-help"
            className={`helper-text${qError ? ' error' : ''}`}
          >
            {qError || 'Choose a value between 1 and p-1.'}
          </span>
        </div>
      </div>

      <div className="mesh-meta">
        {meshSize ? `${meshSize} x ${meshSize} grid ready` : 'Awaiting valid mesh size'}
      </div>

      <div className="stage-controls">
        <div className="stage-status">
          <span className="stage-label">Current stage</span>
          <strong>{stageLabel}</strong>
        </div>
        <div className="control-actions">
          <button className="btn primary" type="button" onClick={onNextStage} disabled={nextDisabled}>
            Next stage
          </button>
          <button className="btn ghost" type="button" onClick={onResetStage} disabled={resetDisabled}>
            Reset
          </button>
        </div>
        {!inputsValid && <p className="helper-text">Fix inputs to enable stage controls.</p>}
      </div>
    </section>
  );
}

export default ControlPanel;
