console.log("Part 1, test data, valid path count: ", processData( testSet()));
console.log("Part 1, real data, valid path count: ", processData( realSet()));

function processData(data) {

	let map = parseData(data);

	let step = 0;

  //Continue running if any paths are not ended, else, we're done
  while( map.paths.find( p => p.slice(-1)[0] !== "end" )) {
  	map = runPaths( map );
    step++;
  }
  
	return map.paths.length;

}

function runPaths(map) {
  
  let newPaths = []
  
  //Run though paths, adding on leg
	map.paths.forEach( p => {
  	//Get last leg
    const last = p.slice(-1)[0];
    
    //If the path is already ended, we can just stash it and move on
    if( last === "end" ) {
    	newPaths.push(p);
    	return;
    }
    
    //get neighbors
    const neighbors = map.caves[last].neighbors;
    
    //Consider neighbors: If cave is large or not previously visited, add it as a path
    neighbors
    	.filter( n =>  map.caves[n].isBig || !p.includes(n))
    	.forEach( n => {
      	newPaths.push([ ...p, n])
    	});
  
  });
  
  map.paths = newPaths;
  
  return map;

}


function parseData(d) {

	const lines = d.split("\n");

	//Build caves
  const caves = lines
    .reduce((c, l, i) => {
      l.split("-").forEach((s, j) => {
        c[s] = {
          isBig: /[A-Z]/.test(s.substring(0,1)),
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
       ].filter( n => n !== s);
    });
   });
   
   return {
   	caves: caves,
    paths: [ ["start"] ],
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
