import {
  FIRST_FIT,
  BEST_FIT,
  WORST_FIT,
  OLD_PROCESS,
  HOLE,
  NEW_PROCESS,
} from '../helpers/constants';

const segmentProcessesAndHoles = (memorySize, height, processes, holes, sortingMethod) => {
  let segments = [];
  let holeSegments = [];
  let oldProcesses = [];
  let newSegments = [];
  let result = [true, [], []];

  // Create segments
  processes.forEach((process, processIndex) => {
    process.segments.forEach((segment) => {
      segments.push({
        processIndex: processIndex,
        name: `${process.name} - ${segment.name}`,
        size: segment.size
      });
    });
  });

  // Insert holes
  holes.forEach((hole, index) => {
    holeSegments.push({
      type: HOLE,
      name: `Hole ${index}`,
      start: hole[0],
      end: hole[0] + hole[1]
    });
  });
  holeSegments.sort((a, b) => (a.start - b.start));

  // Insert old processes between holes
  for (let i = 1; i < holeSegments.length; i++) {
    let previousSegment = holeSegments[i-1];
    let segment = holeSegments[i];
    if (segment.start > previousSegment.end) {
      oldProcesses.push({
        type: OLD_PROCESS,
        name: 'Old Process',
        start: previousSegment.end,
        end: segment.start,
        unfactoredStart: previousSegment.end,
        unfactoredSize: segment.start - previousSegment.end
      });
    }
  }

  // Insert old process to the start if first hole doesn't start at 0
  let firstSegment = holeSegments[0];
  if (firstSegment && firstSegment.start > 0) {
    oldProcesses.push({
      type: OLD_PROCESS,
      name: 'Old Process',
      start: 0,
      end: firstSegment.start,
      unfactoredStart: 0,
      unfactoredSize: firstSegment.start,
    });
  }

  // Add old process to the end if last hole doesn't end at memory size
  let lastSegment = holeSegments[holeSegments.length - 1];
  if (lastSegment && lastSegment.end < memorySize) {
    oldProcesses.push({
      type: OLD_PROCESS,
      name: 'Old Process',
      start: lastSegment.end,
      end: memorySize,
      unfactoredStart: lastSegment.end,
      unfactoredSize: memorySize - lastSegment.end,
    });
  }

  let useFirstFit = () => {
    for (let i=0; i<processes.length; i++) {
      let processAllocationResult = true;
      let segmentAllocationResult = false;

      let updatedHoles = JSON.parse(JSON.stringify(holeSegments));
      let updatedSegments = JSON.parse(JSON.stringify(newSegments));
      let process = processes[i];

      for (let j=0; j<process.segments.length; j++) {
        let segment = process.segments[j];
        let segmentSize = segment.size;
        for (let k=0; k<updatedHoles.length; k++) {
          let hole = updatedHoles[k];
          let holeSize = hole.end - hole.start;
          if (segmentSize <= holeSize) {
            updatedSegments.push({
              type: NEW_PROCESS,
              name: `${process.name} - ${segment.name}`,
              start: hole.start,
              end: hole.start + segmentSize
            });
            if (segmentSize === holeSize) {
              updatedHoles.splice(k, 1);
            } else {
              updatedHoles[k].start += segmentSize;
            }
            segmentAllocationResult = true;
            break;
          }
        }
        if (segmentAllocationResult === false) {
          processAllocationResult = false;
          result[2].push(process.name);
          break;
        }
      }

      if (processAllocationResult === true) {
        holeSegments = JSON.parse(JSON.stringify(updatedHoles));
        newSegments = JSON.parse(JSON.stringify(updatedSegments));
      } else {
        result[0] = false;
      }
    }
  }

  let useBestFit = () => {
    for (let i=0; i<processes.length; i++) {
      let processAllocationResult = true;
      let segmentAllocationResult;

      let updatedHoles = JSON.parse(JSON.stringify(holeSegments));
      let updatedSegments = JSON.parse(JSON.stringify(newSegments));
      let process = processes[i];

      for (let j=0; j<process.segments.length; j++) {
        segmentAllocationResult = false;
        let segment = process.segments[j];
        let segmentSize = segment.size;
        let bestFitSegmentIndex = null;
        for (let k=0; k<updatedHoles.length; k++) {
          let hole = updatedHoles[k];
          let holeSize = hole.end - hole.start;
          if (segmentSize <= holeSize) {
            if (bestFitSegmentIndex === null) {
              bestFitSegmentIndex = k;
              segmentAllocationResult = true;
              continue;
            }
            let bestFitHole = updatedHoles[bestFitSegmentIndex];
            let bestFitHoleSize = bestFitHole.end - bestFitHole.start;
            if (holeSize < bestFitHoleSize) {
              bestFitSegmentIndex = k;
              segmentAllocationResult = true;
              continue;
            }
          }
        }

        if (segmentAllocationResult === false) {
          processAllocationResult = false;
          result[2].push(process.name);
          break;
        }
        let bestFitHole = updatedHoles[bestFitSegmentIndex];
        let bestFitHoleSize = bestFitHole.end - bestFitHole.start;
        updatedSegments.push({
          type: NEW_PROCESS,
          name: `${process.name} - ${segment.name}`,
          start: bestFitHole.start,
          end: bestFitHole.start + segmentSize
        });

        if (bestFitHoleSize === segmentSize) {
          updatedHoles.splice(bestFitSegmentIndex, 1);
        } else if (bestFitHoleSize > segmentSize) {
          updatedHoles[bestFitSegmentIndex].start += segmentSize;
        }
      }

      if (processAllocationResult === true) {
        holeSegments = JSON.parse(JSON.stringify(updatedHoles));
        newSegments = JSON.parse(JSON.stringify(updatedSegments));
      } else {
        result[0] = false;
      }
    }
  }

  let useWorstFit = () => {
    for (let i=0; i<processes.length; i++) {
      let processAllocationResult = true;
      let segmentAllocationResult;

      let updatedHoles = JSON.parse(JSON.stringify(holeSegments));
      let updatedSegments = JSON.parse(JSON.stringify(newSegments));
      let process = processes[i];

      for (let j=0; j<process.segments.length; j++) {
        segmentAllocationResult = false;
        let segment = process.segments[j];
        let segmentSize = segment.size;
        let worstFitSegmentIndex = null;
        for (let k=0; k<updatedHoles.length; k++) {
          let hole = updatedHoles[k];
          let holeSize = hole.end - hole.start;
          if (segmentSize <= holeSize) {
            if (worstFitSegmentIndex === null) {
              worstFitSegmentIndex = k;
              segmentAllocationResult = true;
              continue;
            }
            let worstFitHole = updatedHoles[worstFitSegmentIndex];
            let worstFitHoleSize = worstFitHole.end - worstFitHole.start;
            if (holeSize > worstFitHoleSize) {
              worstFitSegmentIndex = k;
              segmentAllocationResult = true;
              continue;
            }
          }
        }

        if (segmentAllocationResult === false) {
          processAllocationResult = false;
          result[2].push(process.name);
          break;
        }

        let worstFitHole = updatedHoles[worstFitSegmentIndex];
        let worstFitHoleSize = worstFitHole.end - worstFitHole.start;
        updatedSegments.push({
          type: NEW_PROCESS,
          name: `${process.name} - ${segment.name}`,
          start: worstFitHole.start,
          end: worstFitHole.start + segmentSize
        });

        if (worstFitHoleSize === segmentSize) {
          updatedHoles.splice(worstFitSegmentIndex, 1);
        } else if (worstFitHoleSize > segmentSize) {
          updatedHoles[worstFitSegmentIndex].start += segmentSize;
        }
      }

      if (processAllocationResult === true) {
        holeSegments = JSON.parse(JSON.stringify(updatedHoles));
        newSegments = JSON.parse(JSON.stringify(updatedSegments));
      } else {
        result[0] = false;
      }
    }
  }

  let sortingFunctions = {
    [FIRST_FIT]: useFirstFit,
    [BEST_FIT]: useBestFit,
    [WORST_FIT]: useWorstFit
  }

  sortingFunctions[sortingMethod]();

  console.log(oldProcesses, holeSegments, newSegments);

  let factor = height / memorySize;

  result[1] = [...oldProcesses, ...holeSegments, ...newSegments].map(s => ({
    ...s,
    start: s.start * factor,
    end: s.end * factor
  }));

  return result;
}

export default segmentProcessesAndHoles;