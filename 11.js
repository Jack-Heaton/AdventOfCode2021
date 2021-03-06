console.log("Part 1: Test swarm flashes after 100 cycles:", runSteps(parseData(testSet()), 100));
console.log("Part 1: Real swarm flashes after 100 cycles:", runSteps(parseData(realSet()), 100));

console.log("Part 2: Test swarm first synchronized flash:", findSyncedFlash(parseData(testSet())));
console.log("Part 2: Real swarm first synchronized flash:", findSyncedFlash(parseData(realSet())));

function runSteps(octo, steps) {

  for (let i = 0; i < steps; i++) {
    octo = runStep(octo);
  }

  return octo.flashCounter;

}

function findSyncedFlash(octo) {

  while (!octo.synced) {
    octo = runStep(octo);
  }

  return octo.step;

}

function runStep(octo) {
  octo.syned = false;

  //Increase all by 1
  octo.keys.forEach(k => {
    octo[k].p++
  });

  //Flash!
  let initial = true;

  while (octo.stepFlash || initial) {
    octo = flash(octo);
    initial = false;
  }

  if (octo.keys.filter(k => !octo[k].flashed).length == 0) octo.synced = true;

  //Reset

  octo.keys.forEach(k => {
    if (octo[k].flashed) {
      octo[k].flashed = false;
      octo[k].p = 0;
    }
  });


  octo.step++;


  //console.log(JSON.parse(JSON.stringify(octo)));

  return octo;

}

function flash(octo) {
  octo.stepFlash = false;

  //Flash any octopus that's powered up and hasn't flashed
  octo.keys.forEach(k => {
    const o = octo[k];
    if (o.p > 9 && !o.flashed) {
      //Flash!
      octo[k].flashed = true;
      octo[k].flashCount++;
      //Power up adjacents
      const adjactent = [
          octo[`${o.x-1}-${o.y-1}`],
          octo[`${o.x-1}-${o.y}`],
          octo[`${o.x-1}-${o.y+1}`],
          octo[`${o.x}-${o.y-1}`],
          octo[`${o.x}-${o.y+1}`],
          octo[`${o.x+1}-${o.y-1}`],
          octo[`${o.x+1}-${o.y}`],
          octo[`${o.x+1}-${o.y+1}`],
        ].filter(a => a)
        .forEach(a => {
          octo[`${a.x}-${a.y}`].p++;
        });
      //Set globals
      octo.flashCounter++;
      octo.stepFlash = true;
    }
  });

  return octo;

}


function parseData(d) {
  const swarm = d.split("\n")
    .reduce((c, l, i) => {
      l.split("").forEach((s, j) => {
        c[`${i}-${j}`] = {
          p: parseInt(s),
          x: i,
          y: j,
          flashCount: 0,
        };
      });
      return c;
    }, {})

  return {
    ...swarm,
    keys: Object.keys(swarm),
    flashCounter: 0,
    step: 0,
    stepFlash: false,
    synced: false,
  };
}

function protoSet() {
  return `11111
19991
19191
19991
11111`;
}

function testSet() {
  return `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
}

function realSet() {
  return `2138862165
2726378448
3235172758
6281242643
4256223158
1112268142
1162836182
1543525861
1882656326
8844263151`;
}
