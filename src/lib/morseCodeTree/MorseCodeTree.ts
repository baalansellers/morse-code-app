const DIT = true;
const DAH = false;

export interface MorseCodeTreeNodePayload {
  id: string;
  value: string;
  offset: number;
}

export interface MorseCodeTreeNodeDictionary {
  [key: string]: MorseCodeTreeNode;
}

export class MorseCodeTreeNode {
  public ref: React.RefObject<SVGAElement>;

  constructor(
    //Payload
    public payload: MorseCodeTreeNodePayload,

    //Method to generate a reference to latch to when drawing lines later
    public refGen: () => React.RefObject<SVGAElement>,

    //Structure
    public left?: MorseCodeTreeNode,
    public right?: MorseCodeTreeNode
  ) {
    this.ref = refGen();
  }
}

class MorseCodeTree {
  private _rootNode: MorseCodeTreeNode;
  private _currentNode: MorseCodeTreeNode;
  private _cacheDictionary: MorseCodeTreeNodeDictionary | null;
  private _cacheArray: MorseCodeTreeNode[] | null;
  private _refGen: () => React.RefObject<SVGAElement>;

  constructor(refGen: () => React.RefObject<SVGAElement>, init?: boolean) {
    this._rootNode = new MorseCodeTreeNode({id: "start", value: "start", offset: 0 }, refGen);
    this._currentNode = this._rootNode;
    this._cacheDictionary = null;
    this._cacheArray = null;
    this._refGen = refGen;

    if (init) {
      this.initMorseCodeTree();
    }
  }

  get value(): string {
    return this._currentNode.payload.value;
  }

  get offset(): number {
    return this._currentNode.payload.offset;
  }

  set offset(offset: number) {
    this._currentNode.payload.offset = offset;
  }

  get current(): MorseCodeTreeNode {
    return this._currentNode;
  }

  get dit(): MorseCodeTree {
    this._currentNode = this._currentNode.left
      ? this._currentNode.left
      : this._currentNode;
    return this;
  }

  get dah(): MorseCodeTree {
    this._currentNode = this._currentNode.right
      ? this._currentNode.right
      : this._currentNode;
    return this;
  }

  get dict(): MorseCodeTreeNodeDictionary {
    this._cacheDictionary = this._cacheDictionary
      ? this._cacheDictionary
      : this.breadthFirstDictionary();
    return this._cacheDictionary ? this._cacheDictionary : {};
  }

  get array(): MorseCodeTreeNode[] {
    this._cacheArray = this._cacheArray
      ? this._cacheArray
      : this.breadthFirstArray();
    return this._cacheArray ? this._cacheArray : [];
  }

  restart(): void {
    this.offset = 0;
    this._currentNode = this._rootNode;
  }

  tick(unit: number): MorseCodeTree {
    this._currentNode.payload.offset += unit;
    return this;
  }

  insert(payload: MorseCodeTreeNodePayload, code: boolean[]): void {
    let pt = this._rootNode;

    //Setup
    if (!pt) {
      this._rootNode = new MorseCodeTreeNode({ id: "start", value: "start", offset: 0 }, this._refGen);
    }

    //Initialize
    if (!code.length) {
      this._rootNode.payload = payload;
    }

    //Constructive Traverse
    // eslint-disable-next-line
    code.map((isDit): void => {
      if (isDit) {
        //Dit = Left
        if (!pt.left) {
          pt.left = new MorseCodeTreeNode({ id: "", value: "", offset: 0 }, this._refGen);
        }
        pt = pt.left;
      } else {
        //Dah = Right
        if (!pt.right) {
          pt.right = new MorseCodeTreeNode({ id: "", value: "", offset: 0 }, this._refGen);
        }
        pt = pt.right;
      }
    });

    pt.payload = payload;
  }

  printAllDFT(): void {
    this.depthFirstPrint(this._rootNode);
  }

  printAllBFT(): void {
    this.breadthFirstPrint(this._rootNode);
  }

  private breadthFirstArray(): MorseCodeTreeNode[] | null {
    if (!this._rootNode) {
      return null;
    }

    const queue: MorseCodeTreeNode[] = [this._rootNode];
    const visited: { [key: string]: string | undefined | null } = {};
    const result: MorseCodeTreeNode[] = [];

    while (queue) {
      const current = queue.shift();

      if (!current) {
        return result;
      }

      result.push(current);

      if (current.left && !visited[current.left.payload.id]) {
        queue.push(current.left);
        visited[current.left.payload.id] = current.left.payload.id;
      }

      if (current.right && !visited[current.right.payload.id]) {
        queue.push(current.right);
        visited[current.right.payload.id] = current.right.payload.id;
      }
    }

    return result;
  }

  private breadthFirstDictionary(): MorseCodeTreeNodeDictionary | null {
    if (!this._rootNode) {
      return null;
    }

    const queue: MorseCodeTreeNode[] = [this._rootNode];
    const visited: { [key: string]: string | undefined | null } = {};
    const result: MorseCodeTreeNodeDictionary = {};

    while (queue) {
      const current = queue.shift();

      if (!current) {
        return result;
      }

      result[current.payload.id] = current;

      if (current.left && !visited[current.left.payload.id]) {
        queue.push(current.left);
        visited[current.left.payload.id] = current.left.payload.id;
      }

      if (current.right && !visited[current.right.payload.id]) {
        queue.push(current.right);
        visited[current.right.payload.id] = current.right.payload.id;
      }
    }

    return result;
  }

  private breadthFirstPrint(targetNode?: MorseCodeTreeNode): void {
    if (!targetNode) {
      return;
    }

    const queue: MorseCodeTreeNode[] = [targetNode];
    const visited: { [key: string]: string | undefined | null } = {};

    while (queue) {
      const current = queue.shift();

      if (!current) {
        return;
      }

      console.log(current.payload.value);

      if (current.left && !visited[current.left.payload.id]) {
        queue.push(current.left);
        visited[current.left.payload.id] = current.left.payload.id;
      }

      if (current.right && !visited[current.right.payload.id]) {
        queue.push(current.right);
        visited[current.right.payload.id] = current.right.payload.id;
      }
    }
  }

  private depthFirstPrint(targetNode?: MorseCodeTreeNode): void {
    if (!targetNode) {
      return;
    }

    this.depthFirstPrint(targetNode.left);
    console.log(targetNode.payload.value);
    this.depthFirstPrint(targetNode.right);
  }

  initMorseCodeTree(): void {
    this.insert({ id: "root", value: "start", offset: 0 }, []);
    this.insert({ id: "E", value: "E", offset: 0 }, [DIT]);
    this.insert({ id: "I", value: "I", offset: 0 }, [DIT, DIT]);
    this.insert({ id: "S", value: "S", offset: 0 }, [DIT, DIT, DIT]);
    this.insert({ id: "H", value: "H", offset: 0 }, [DIT, DIT, DIT, DIT]);
    this.insert({ id: "5", value: "5", offset: 0 }, [DIT, DIT, DIT, DIT, DIT]);
    this.insert({ id: "4", value: "4", offset: 0 }, [DIT, DIT, DIT, DIT, DAH]);
    this.insert({ id: "V", value: "V", offset: 0 }, [DIT, DIT, DIT, DAH]);
    this.insert({ id: "Understood", value: "Understood", offset: 0 }, [DIT, DIT, DIT, DAH, DIT]);
    this.insert({ id: "3", value: "3", offset: 0 }, [DIT, DIT, DIT, DAH, DAH]);
    this.insert({ id: "U", value: "U", offset: 0 }, [DIT, DIT, DAH]);
    this.insert({ id: "F", value: "F", offset: 0 }, [DIT, DIT, DAH, DIT]);
    this.insert({ id: "_1", value: " ", offset: 0 }, [DIT, DIT, DAH, DAH]);
    this.insert({ id: "_2", value: " ", offset: 0 }, [DIT, DAH, DIT, DAH]);
    this.insert({ id: "_3", value: " ", offset: 0 }, [DAH, DAH, DAH, DIT]);
    this.insert({ id: "_4", value: " ", offset: 0 }, [DAH, DAH, DAH, DAH]);
    this.insert({ id: "2", value: "2", offset: 0 }, [DIT, DIT, DAH, DAH, DAH]);

    this.insert({ id: "A", value: "A", offset: 0 }, [DIT, DAH]);
    this.insert({ id: "R", value: "R", offset: 0 }, [DIT, DAH, DIT]);
    this.insert({ id: "L", value: "L", offset: 0 }, [DIT, DAH, DIT, DIT]);
    this.insert({ id: "Wait", value: "Wait", offset: 0 }, [DIT, DAH, DIT, DIT, DIT]);
    this.insert({ id: "_5", value: " ", offset: 0 }, [DIT, DIT, DIT, DAH, DIT]);
    this.insert({ id: "_6", value: " ", offset: 0 }, [DIT, DIT, DAH, DIT, DIT]);
    this.insert({ id: "plus", value: "+", offset: 0 }, [DIT, DAH, DIT, DAH, DIT]);
    this.insert({ id: "_7", value: " ", offset: 0 }, [DIT, DIT, DAH, DIT, DAH]);
    this.insert({ id: "W", value: "W", offset: 0 }, [DIT, DAH, DAH]);
    this.insert({ id: "P", value: "P", offset: 0 }, [DIT, DAH, DAH, DIT]);
    this.insert({ id: "_8", value: " ", offset: 0 }, [DIT, DIT, DAH, DAH, DIT]);
    this.insert({ id: "_9", value: " ", offset: 0 }, [DIT, DAH, DIT, DIT, DIT]);
    this.insert({ id: "J", value: "J", offset: 0 }, [DIT, DAH, DAH, DAH]);
    this.insert({ id: "_10", value: " ", offset: 0 }, [DIT, DAH, DIT, DIT, DAH]);
    this.insert({ id: "1", value: "1", offset: 0 }, [DIT, DAH, DAH, DAH, DAH]);

    this.insert({ id: "T", value: "T", offset: 0 }, [DAH]);
    this.insert({ id: "N", value: "N", offset: 0 }, [DAH, DIT]);
    this.insert({ id: "D", value: "D", offset: 0 }, [DAH, DIT, DIT]);
    this.insert({ id: "B", value: "B", offset: 0 }, [DAH, DIT, DIT, DIT]);
    this.insert({ id: "6", value: "6", offset: 0 }, [DAH, DIT, DIT, DIT, DIT]);
    this.insert({ id: "equal", value: "=", offset: 0 }, [DAH, DIT, DIT, DIT, DAH]);
    this.insert({ id: "X", value: "X", offset: 0 }, [DAH, DIT, DIT, DAH]);
    this.insert({ id: "stroke", value: "/", offset: 0 }, [DAH, DIT, DIT, DAH, DIT]);
    this.insert({ id: "_11", value: " ", offset: 0 }, [DIT, DAH, DIT, DAH, DAH]);
    this.insert({ id: "K", value: "K", offset: 0 }, [DAH, DIT, DAH]);
    this.insert({ id: "C", value: "C", offset: 0 }, [DAH, DIT, DAH, DIT]);
    this.insert({ id: "_12", value: " ", offset: 0 }, [DIT, DAH, DAH, DIT, DIT]);
    this.insert({ id: "Start", value: "Signal Start", offset: 0 }, [
      DAH,
      DIT,
      DAH,
      DIT,
      DAH
    ]);
    this.insert({ id: "Y", value: "Y", offset: 0 }, [DAH, DIT, DAH, DAH]);
    this.insert({ id: "l-par", value: "(", offset: 0 }, [DAH, DIT, DAH, DAH, DIT]);
    this.insert({ id: "_13", value: " ", offset: 0 }, [DIT, DAH, DAH, DIT, DAH]);

    this.insert({ id: "M", value: "M", offset: 0 }, [DAH, DAH]);
    this.insert({ id: "G", value: "G", offset: 0 }, [DAH, DAH, DIT]);
    this.insert({ id: "Z", value: "Z", offset: 0 }, [DAH, DAH, DIT, DIT]);
    this.insert({ id: "7", value: "7", offset: 0 }, [DAH, DAH, DIT, DIT, DIT]);
    this.insert({ id: "_14", value: " ", offset: 0 }, [DIT, DAH, DAH, DAH, DIT]);
    this.insert({ id: "Q", value: "Q", offset: 0 }, [DAH, DAH, DIT, DAH]);
    this.insert({ id: "_15", value: " ", offset: 0 }, [DAH, DIT, DIT, DAH, DAH]);
    this.insert({ id: "_16", value: " ", offset: 0 }, [DAH, DIT, DAH, DIT, DIT]);
    this.insert({ id: "O", value: "O", offset: 0 }, [DAH, DAH, DAH]);
    this.insert({ id: "_17", value: " ", offset: 0 }, [DAH, DIT, DAH, DIT, DAH]);
    this.insert({ id: "8", value: "8", offset: 0 }, [DAH, DAH, DAH, DIT, DIT]);
    this.insert({ id: "_18", value: " ", offset: 0 }, [DAH, DIT, DAH, DAH, DIT]);
    this.insert({ id: "_19", value: " ", offset: 0 }, [DAH, DIT, DAH, DAH, DAH]);
    this.insert({ id: "9", value: "9", offset: 0 }, [DAH, DAH, DAH, DAH, DIT]);
    this.insert({ id: "0", value: "0", offset: 0 }, [DAH, DAH, DAH, DAH, DAH]);

    this.insert({ id: "_20", value: " ", offset: 0 }, [DAH, DAH, DIT, DIT, DAH]);
    this.insert({ id: "_21", value: " ", offset: 0 }, [DAH, DAH, DIT, DAH, DIT]);
    this.insert({ id: "_22", value: " ", offset: 0 }, [DAH, DAH, DIT, DAH, DAH]);
    this.insert({ id: "_23", value: " ", offset: 0 }, [DAH, DAH, DAH, DIT, DAH]);
  }
}

export default MorseCodeTree;
