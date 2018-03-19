

const str = "[download]  45.2% of 11.36MiB at  1.04MiB/s ETA 00:06"

const pattern='(\\[download\\])(\\s*)(\\d*\\.\\d*)(% of )(\\d*\.\\d*)(.*B)(.*at\\s*)(\\d*\.\\d*)(.*B/s)(.*ETA )(\\d*:\\d*)(.*)'
const re = RegExp(pattern);

let found = str.match(re);

if (found) console.log('found', found, 'len', found.length);
