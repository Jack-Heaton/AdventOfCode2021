console.log("Part 1, test data, valid path count: ", processData(testSet()));
console.log("Part 1, real data, valid path count: ", processData(realSet()));

console.log("Part 2, test data, valid path count: ", processData(testSet(), true));
console.log("Part 2, real data, valid path count: ", processData(realSet(), true));

function processData(data, allowRevisit) {

  let map = parseData(data, allowRevisit);

  let step = 0;

  //Continue running if any paths are not ended, else, we're done
  while (map.paths.find(p => p.path.slice(-1)[0] !== "end")) {
    map = runPaths(map);
    step++;
  }

  return map.paths.length;

}

function runPaths(map) {

  let newPaths = []

  //Run though paths, adding on leg
  map.paths.forEach(p => {
    //Get last leg
    const last = p.path.slice(-1)[0];

    //If the path is already ended, we can just stash it and move on
    if (last === "end") {
      newPaths.push(p);
      return;
    }

    //get neighbors
    const neighbors = map.caves[last].neighbors;

    //Consider neighbors: If cave is large or not previously visited, add it as a path
    neighbors
      .filter(n => {
        if (n === "start") {
          return false;
        } else if (map.caves[n].isBig) {
          return true;
        } else if (p.path.includes(n) && p.allowRevisit) {
          return true;
        } else if (!p.path.includes(n)) {
          return true;
        } else {
          return false;
        }
      })
      .forEach(n => {
        newPaths.push({
          path: [...p.path, n],
          allowRevisit: p.allowRevisit
        })
      });

  });

  newPaths = newPaths.map(p => {

    return {
      ...p,
      allowRevisit: p.allowRevisit && p.path.filter(c => !map.caves[c].isBig &&
        p.path.filter(d => d === c).length > 1).length === 0,

    }

  })


  map.paths = newPaths;

  return map;

}


function parseData(d, allowRevisit) {

  const lines = d.split("\n");

  //Build caves
  const caves = lines
    .reduce((c, l, i) => {
      l.split("-").forEach((s, j) => {
        c[s] = {
          isBig: /[A-Z]/.test(s.substring(0, 1)),
          neighbors: [],
        };
      });
      return c;
    }, {});

  //Assign neighbors
  lines.forEach(l => {
    l.split("-").forEach((s, j) => {
      caves[s].neighbors = [
        ...new Set([
          ...caves[s].neighbors,
          ...l.split("-"),
        ])
      ].filter(n => n !== s);
    });
  });

  return {
    caves: caves,
    paths: [{
      path: ["start"],
      allowRevisit: allowRevisit,
    }],
  }
}

function testSet() {
  return `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
}

function realSet() {
  return `pg-CH
pg-yd
yd-start
fe-hv
bi-CH
CH-yd
end-bi
fe-RY
ng-CH
fe-CH
ng-pg
hv-FL
FL-fe
hv-pg
bi-hv
CH-end
hv-ng
yd-ng
pg-fe
start-ng
end-FL
fe-bi
FL-ks
pg-start`;
}
