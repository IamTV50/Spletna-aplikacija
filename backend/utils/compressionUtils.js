function gen9BitAbsDict() {
    const bitDict = new Map();
    let num = 255;
    let i = 1;

    while (num >= -255) {
        bitDict.set(num, i.toString(2).padStart(9, '0'));
        i++;
        num--;
    }

    bitDict.delete(0);
    return bitDict;
}

const repetitions = {
    1: "000",
    2: "001",
    3: "010",
    4: "011",
    5: "100",
    6: "101",
    7: "110",
    8: "111"
};

const differences = {
    "-2": "00", "-1": "01", "1": "10", "2": "11",
    "-6": "000", "-5": "001", "-4": "010", "-3": "011",
    "3": "100", "4": "101", "5": "110", "6": "111",
    "-14": "0000", "-13": "0001", "-12": "0010", "-11": "0011",
    "-10": "0100", "-9": "0101", "-8": "0110", "-7": "0111",
    "7": "1000", "8": "1001", "9": "1010", "10": "1011",
    "11": "1100", "12": "1101", "13": "1110", "14": "1111",
    "-30": "00000", "-29": "00001", "-28": "00010", "-27": "00011",
    "-26": "00100", "-25": "00101", "-24": "00110", "-23": "00111",
    "-22": "01000", "-21": "01001", "-20": "01010", "-19": "01011",
    "-18": "01100", "-17": "01101", "-16": "01110", "-15": "01111",
    "15": "10000", "16": "10001", "17": "10010", "18": "10011",
    "19": "10100", "20": "10101", "21": "10110", "22": "10111",
    "23": "11000", "24": "11001", "25": "11010", "26": "11011",
    "27": "11100", "28": "11101", "29": "11110", "30": "11111"
};

const absDict = gen9BitAbsDict();

function compress(numArray) {
    const difs = [numArray[0]];
    let binString = "";

    for (let i = 1; i < numArray.length; i++) {
        difs.push(numArray[i] - numArray[i - 1]);
    }

    binString += difs[0].toString(2).padStart(8, '0');

    let indx = 1;
    while (indx < difs.length) {
        if (Math.abs(difs[indx]) > 30) {
            binString += "10" + absDict.get(difs[indx]);
            indx++;
        } else if (difs[indx] === 0) {
            binString += "01";
            const numRepeated = Math.min(difs.slice(indx).filter(v => v === 0).length, 8);
            binString += repetitions[numRepeated];
            indx += numRepeated;
        } else {
            binString += "00";
            const absDif = Math.abs(difs[indx]);
            const sizePrefix = absDif <= 2 ? "00" : absDif <= 6 ? "01" : absDif <= 14 ? "10" : "11";
            binString += sizePrefix + differences[difs[indx]];
            indx++;
        }
    }

    binString += "11";
    return binString;
}

function decompress(binString) {
    const numArray = [parseInt(binString.substring(0, 8), 2)];
    let i = 8;

    while (i < binString.length - 2) {
        const prefix = binString.substring(i, i + 2);
        if (prefix === "10") {
            i += 2;
            const absValue = binString.substring(i, i + 9);
            numArray.push([...absDict.entries()].find(([key, value]) => value === absValue)[0]);
            i += 9;
        } else if (prefix === "01") {
            i += 2;
            const repeatCount = parseInt(Object.entries(repetitions).find(([, value]) => value === binString.substring(i, i + 3))[0]);
            for (let j = 0; j < repeatCount; j++) numArray.push(0);
            i += 3;
        } else if (prefix === "00") {
            i += 2;
            const diffSize = binString.substring(i, i + 2);
            i += 2;
            const bitLength = diffSize === "00" ? 2 : diffSize === "01" ? 3 : diffSize === "10" ? 4 : 5;
            const diffValue = binString.substring(i, i + bitLength);
            numArray.push(parseInt(Object.entries(differences).find(([, value]) => value === diffValue)[0]));
            i += bitLength;
        }
    }

    for (let j = 1; j < numArray.length; j++) {
        numArray[j] += numArray[j - 1];
    }

    return numArray;
}

module.exports = { compress, decompress };
