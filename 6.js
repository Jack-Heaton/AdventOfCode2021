function createCohorts(school) {
  return school.reduce((c, s) => {
      c[s]++;
      return c;
    },
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);

}


function cycle(school) {

  const spawn = school.shift();

  school[8] = spawn;
  school[6] += spawn;

  return school;
}

function runCycles(n, school) {

  for (let i = 0; i < n; i++) {
    school = cycle(school);
  }

  return school.reduce((c, f) => c + f, 0);
}

console.log("Test school of fish, 18 days: ", runCycles(18, createCohorts(testSchool())));
console.log("Test school of fish, 80 days: ", runCycles(80, createCohorts(testSchool())));

console.log("Real school of fish, 80 days: ", runCycles(80, createCohorts(school())));
console.log("Real school of fish, 256 days: ", runCycles(256, createCohorts(school())));

function testSchool() {
  return `3,4,3,1,2`.split(",").map(s => parseInt(s));
}

function school() {
  return `3,3,5,1,1,3,4,2,3,4,3,1,1,3,3,1,5,4,4,1,4,1,1,1,3,3,2,3,3,4,2,5,1,4,1,2,2,4,2,5,1,2,2,1,1,1,1,4,5,4,3,1,4,4,4,5,1,1,4,3,4,2,1,1,1,1,5,2,1,4,2,4,2,5,5,5,3,3,5,4,5,1,1,5,5,5,2,1,3,1,1,2,2,2,2,1,1,2,1,5,1,2,1,2,5,5,2,1,1,4,2,1,4,2,1,1,1,4,2,5,1,5,1,1,3,1,4,3,1,3,2,1,3,1,4,1,2,1,5,1,2,1,4,4,1,3,1,1,1,1,1,5,2,1,5,5,5,3,3,1,2,4,3,2,2,2,2,2,4,3,4,4,4,1,2,2,3,1,1,4,1,1,1,2,1,4,2,1,2,1,1,2,1,5,1,1,3,1,4,3,2,1,1,1,5,4,1,2,5,2,2,1,1,1,1,2,3,3,2,5,1,2,1,2,3,4,3,2,1,1,2,4,3,3,1,1,2,5,1,3,3,4,2,3,1,2,1,4,3,2,2,1,1,2,1,4,2,4,1,4,1,4,4,1,4,4,5,4,1,1,1,3,1,1,1,4,3,5,1,1,1,3,4,1,1,4,3,1,4,1,1,5,1,2,2,5,5,2,1,5`.split(",").map(s => parseInt(s));
}
