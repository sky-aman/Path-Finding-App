export default function MinHeap(initialArr = []) {
    this.arr = [...initialArr];
    this.heappify = function (pos) {
        while (pos < this.arr.length) {
            let minPos = pos;
            let lChild = pos*2 + 1;
            let rChild = pos*2 + 2;
            if (lChild < this.arr.length && this.arr[lChild][0] < this.arr[minPos][0])
                minPos = lChild;
            if (rChild < this.arr.length && this.arr[rChild][0] < this.arr[minPos][0])
                minPos = rChild;

            if (minPos === pos)
                break;
            const tmp = this.arr[pos];
            this.arr[pos] = this.arr[minPos];
            this.arr[minPos] = tmp;
        }
    }

    this.heappush = function(val) {
        this.arr.push(val);
        let curr = this.arr.length-1;
        while (curr>0) {
            let parent = Math.floor((curr-1)/2);
            if (this.arr[parent][0] < this.arr[curr][0]) {
                const tmp = this.arr[curr];
                this.arr[curr] = this.arr[parent];
                this.arr[parent] = tmp;
            } else {
                break;
            }
        }
    }

    this.heappop = function () {
        const top = this.arr[0];
        this.arr[0] = this.arr.pop();
        this.heappify(0);
        return top;
    }

    this.length = function() {
        return this.arr.length;
    }
}