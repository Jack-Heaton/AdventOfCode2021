console.log("Part 1, test data, single fold: ", parseData(testSet()));


function parseData(d) {
	const p = d.split("\n\n")
  	.map( l => l.split("\n"));
  
  return {
  	holes: p[0].map( h => {
    	return {
      	initial: h.split(",").map( n => parseInt(n) ),
        afterFolds: [],
      };
    }),
  	folds: p[1].map( f => {
    	const fl = f.replace("fold along ","").split("=");
      console.log(fl[1])
      return [ fl[0], parseInt(fl[1]) ];
     }),
  };
}

function testSet() {
  return `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
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
