import React, { useEffect, useState, useCallback } from 'react';
import ModifyProcessColumn from './ModifyProcessColumn';
import InsertedDataView from './InsertedDataView';

export default function Main() {
  
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

  // const startingAddressCallbackRef = useCallback(inputElement => {
  //   if (inputElement) inputElement.focus();
  // }, []);

  useEffect(() => {
    // console.log(holes);
  }, [holes]);
  
  const submitMemorySize = () => {
    let parsedMemorySize = parseInt(memorySizeInputValue);
    if (!isNaN(parsedMemorySize)) {
      setMemorySize(parsedMemorySize);
    }
  }

  const submitHole = () => {
    let parsedHoleStart = parseInt(holeStartAddress);
    let parsedHoleSize = parseInt(holeSize);

    if (isNaN(parsedHoleStart) || isNaN(parsedHoleSize)) {
      alert(`You must insert a valid hole parameters`);
      return false;
    }

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
    // add the new hole to the holes array
    let newHoles = [...holes, hole];
    setHoles(newHoles);
    // empty the textboxes
    setHoleStartAddress('');
    setHoleSize('');
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
        <div className="mt-4 col-6 col-md-4">
          <div className="h3">Insert Hole</div>
          <div className="my-4">
            <label
              className="form-label"
              htmlFor="holeStart"
            >
              Starting Address
            </label>
            <input
              id="holeStart"
              className="form-control"
              type="number"
              min={0}
              value={holeStartAddress}
              ref={autoFocusCallbackRef}
              onChange={(event) => {
                if (parseInt(event.target.value) < 0) return false;
                setHoleStartAddress(event.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="form-label"
              htmlFor="holeSize"
            >
              Size
            </label>
            <input
              id="holeSize"
              className="form-control"
              type="number"
              min={1}
              value={holeSize}
              onChange={(event) => {
                if (parseInt(event.target.value) < 1) return false;
                setHoleSize(event.target.value)
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={submitHole}
          >
            Insert Hole
          </button>
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
          <InsertedDataView
            memorySize={memorySize}
            holes={holes}
            processes={processes}
            selectedProcessIndex={currentProcessIndex}
            selectProcess={(processIndex) => {setCurrentProcessIndex(processIndex)}}
          />
        </div>
      </div>
    </>
  )
}
