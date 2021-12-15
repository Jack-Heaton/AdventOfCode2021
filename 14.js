//console.log("Part 1: greatest and least from test data: ", doFold(parseData(testSet())).holeCount)


console.log("Part 1: max minus min quanity base in test data, 10 steps: ", getPartOne( parseData( testSet() ), 10 ))
console.log("Part 1: max minus min quanity base in real data, 10 steps: ", getPartOne( parseData( realSet() ), 10 ))
//console.log("Part 1: max minus min quanity base in real data: ", getPartOne( parseData( realSet() ), 10 ))

function getPartOne (data, stepCount) {
	
 poly = runSteps( data, stepCount ); 
  
 const counts = {};
  
  poly.split('').forEach( b => {
  	counts[b] = ( counts[b] || 0 ) + 1;
  })
  
  let max = "nope";
  
  for( const k in counts ) {
  	max = counts[k] > (counts[max] || 0) ? k : max;
  }
  
  let min = max;
  
  for( const k in counts ) {
  	min = counts[k] < counts[min] ? k : min;
  }
  
  return counts[max] - counts[min];
  
}

function runSteps( data, stepCount ) {

	let stepNum = 0;
  let poly = data.poly;
  const inst = data.inst;
  
  while( stepNum < stepCount ) {
  	poly = runStep( poly, inst);
  	stepNum++;
  }
  
  return poly;
}

function runStep( poly,inst) {

	return poly.split("")
  	.map( (b,i) => [b, poly[i+1]].join("") )
    .map( p => [ p[0], inst[p] || '', p[1] || ''].join(""))
    .reduce((p,e, i) =>  p.concat( i === 0 ? e : e.slice(1)),'');

}

function parseData(d) {
	const data = d.split("\n\n");
  
  const inst = data[1].split("\n")
  	.reduce((c,i) => {
    	const parts = i.split(" -> ");
      c[parts[0]] = parts[1];
      return c;
    },{})
    
 return {
 	poly: data[0],
  inst: inst,
 };
  
}

function testSet() {
  return `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
}

function realSet() {
  return `BSONBHNSSCFPSFOPHKPK

PF -> P
KO -> H
CH -> K
KN -> S
SS -> K
KB -> B
VS -> V
KV -> O
KP -> B
OF -> C
HB -> C
NP -> O
NS -> V
VO -> P
VF -> H
CK -> B
PC -> O
SK -> O
KF -> H
FV -> V
PP -> H
KS -> B
FP -> N
BV -> V
SB -> F
PB -> B
ON -> F
SF -> P
VH -> F
FC -> N
CB -> H
HP -> B
NC -> B
FH -> K
BF -> P
CN -> N
NK -> H
SC -> S
PK -> V
PV -> C
KC -> H
HN -> K
NO -> H
NN -> S
VC -> P
FF -> N
OO -> H
BK -> N
FS -> V
BO -> F
SH -> S
VK -> F
OC -> F
FN -> V
OV -> K
CF -> F
NV -> V
OP -> K
PN -> K
SO -> P
PS -> S
KK -> H
HH -> K
NH -> O
FB -> K
HS -> B
BB -> V
VB -> O
BH -> H
OK -> C
CC -> B
FK -> N
SN -> V
HK -> N
KH -> F
OS -> O
FO -> P
OH -> B
CP -> S
BN -> H
OB -> B
BP -> B
CO -> K
SP -> K
BS -> P
VV -> N
VN -> O
NF -> F
CV -> B
HC -> B
HV -> S
BC -> O
HO -> H
PO -> P
CS -> B
PH -> S
SV -> V
VP -> C
NB -> K
HF -> C`;
}
