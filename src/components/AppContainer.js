import React, { useEffect, useState, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import InsertHoleColumn from './InsertHoleColumn';
import ModifyProcessColumn from './ModifyProcessColumn';
import InsertedDataView from './InsertedDataView';
import SortedProcessesView from './SortedProcessesView';

export default function AppContainer() {
  
  const [memorySizeInputValue, setMemorySizeInputValue] = useState('2');
  const [memorySize, setMemorySize] = useState(0);

  const [holeStartAddress, setHoleStartAddress] = useState('0');
  const [holeSize, setHoleSize] = useState('1');

  const [holes, setHoles] = useState([]);
  const [processes, setProcesses] = useState([{name: '', segments: []}]);
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);

  const autoFocusCallbackRef = useCallback(inputElement => {
    if (inputElement) inputElement.focus();
  }, []);
  
  const submitMemorySize = () => {
    let parsedMemorySize = parseInt(memorySizeInputValue);
    if (!isNaN(parsedMemorySize)) {
      setMemorySize(parsedMemorySize);
    }
  }

  const insertHole = (hole) => {
    // add the new hole to the holes array
    let newHoles = [...holes, hole];
    setHoles(newHoles);
  }

  const submitHole = (parsedHoleStart, parsedHoleSize) => {
    
    if (parsedHoleStart + parsedHoleSize > memorySize) {
      alert(`A hole can't extend outside memory`);
      return false;
    }

    let overlap = null;
    holes.forEach(([_holeStart, _holeSize]) => {
      let _holeEnd = _holeStart + _holeSize;
      let holeEnd = parsedHoleStart + parsedHoleSize;
      if (parsedHoleStart <= _holeStart && holeEnd >= _holeStart) {
        overlap = [_holeStart, _holeSize];
      }
      if (parsedHoleStart >= _holeStart && parsedHoleStart < _holeEnd) {
        overlap = [_holeStart, _holeSize];
      }
    });

    if (overlap != null) {
      alert(`Hole overlaps with hole starting at ${overlap[0]} with size ${overlap[1]}`);
      return false;
    }

    let hole = [parsedHoleStart, parsedHoleSize];

    insertHole(hole);
    return true;
  }

  const updateCurrentProcess = (newProcess) => {
    let newProcesses = [...processes];
    newProcesses[currentProcessIndex] = newProcess;
    setProcesses(newProcesses);
  }

  const removeProcess = () => {
    let newProcesses = [...processes];
    newProcesses.splice(currentProcessIndex, 1);
    setProcesses(newProcesses);
  }

  const addProcess = () => {
    let newProcesses = [...processes, {name: '', segments: []}];
    setCurrentProcessIndex(processes.length);
    setProcesses(newProcesses);
  }

  useEffect(() => {
    if (currentProcessIndex >= processes.length) {
      setCurrentProcessIndex(processes.length - 1);
    } else if (currentProcessIndex < 0) {
      setCurrentProcessIndex(0);
    }
  }, [processes, currentProcessIndex]);

  if (memorySize === 0) {
    return (
      <div className="m-4">
        <label htmlFor="memorySizeInput" className="form-label mb-4 mw-80px">Memory Size (in bytes)</label>
        <input
          id="memorySizeInput"
          className="form-control m-auto mb-4 mw-80px w-60"
          type="number" 
          ref={autoFocusCallbackRef}
          value={memorySizeInputValue}
          onChange={(event) => {setMemorySizeInputValue(event.target.value)}}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitMemorySize();
            }
          }}
        />
        <button className="btn btn-success" onClick={submitMemorySize}>
          Submit
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="row m-0 text-center justify-content-center">
        <div className="mt-4 p-0 col-1 d-flex justify-content-center align-items-start">
          <ReactTooltip backgroundColor='#dc3545'/>
          <div data-tip='Memory Size'>
            <i className="fas fa-sd-card"></i>
            <br/>
            {
            memorySize <= 10000 ? memorySize + ' B' :
              memorySize <= 10000000 ? Math.floor(memorySize/1024) + ' KB' :
                memorySize <= 10000000000 ? Math.floor(memorySize/1024/1024) + ' MB' :
                  Math.floor(memorySize/1024/1024/1024) + ' GB'
            }
          </div>
        </div>
        <div className="mt-4 col-5 col-md-3">
          <InsertHoleColumn
            submitHole={submitHole}
          />
        </div>
        <div className="mt-4 col-6 col-md-4">
          <ModifyProcessColumn
            process={(processes[currentProcessIndex] && processes[currentProcessIndex]) || {name: '', segments: []}}
            addProcess={addProcess}
            removeProcess={removeProcess}
            updateProcess={updateCurrentProcess}
            holeCount={holes.length}
            processCount={processes.length}
          />
        </div>
        <div className="mt-4 col-6 col-md-4">
          <div className="mb-2">
            <InsertedDataView
              memorySize={memorySize}
              holes={holes}
              processes={processes}
              selectedProcessIndex={currentProcessIndex}
              selectProcess={(processIndex) => {setCurrentProcessIndex(processIndex)}}
            />
          </div>
          <div className="mt-2">
            <SortedProcessesView
              insertHole={insertHole}
              memorySize={memorySize}
              processes={processes}
              holes={holes}
            />
          </div>
        </div>
      </div>
    </>
  )
}
