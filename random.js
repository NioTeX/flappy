var RandomSeed = 1;
function SeededRandom() {
    var x = Math.sin(RandomSeed++) * 413;
    return x - Math.floor(x);
}
