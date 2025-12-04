import { crc32 as nodeCrc32 } from "node:zlib";
import { crc32 as nodeRsCrc32 } from "@node-rs/crc32";
import { Bench } from "tinybench";

const nodeNativeTask = "node:zlib/crc32";
const nodeRsTask = "@node-rs/crc32";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const bench = new Bench({
  name: `${nodeNativeTask} vs ${nodeRsTask}`,
  time: 100,
});

const testBuffer = generateBuffer(16 * 1024); // 16KB, a common chunk size

bench
  .add(nodeNativeTask, () => {
    nodeCrc32(testBuffer);
  })
  .add(nodeRsTask, async () => {
    nodeRsCrc32(testBuffer);
  });

await bench.run();

console.log(bench.name);
console.table(bench.table());
