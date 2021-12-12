console.log( runPaths( protoSet()))

function runPaths(data, inProgress) {

	const map = inProgress || parseData(data);
  
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
    
    //Consider neighbors
    neighbors.forEach( n => {
    	//If cave is large or not previously visited, add it as a path
    	if( map.caves[n].isBig ||  )
    
    });
  
  });
  
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

function protoSet() {
  return `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
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
