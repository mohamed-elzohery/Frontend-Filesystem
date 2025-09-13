import { FileNode } from "./data";

// Node for doubly linked list
class CacheNode {
    key: string;
    value: FileNode;
    prev: CacheNode | null = null;
    next: CacheNode | null = null;

    constructor(key: string, value: FileNode) {
        this.key = key;
        this.value = value;
    }
}

// LRU Cache implementation using doubly linked list and hashmap
export class LRUCache {
    private capacity: number;
    private cache: Map<string, CacheNode>;
    private head: CacheNode;
    private tail: CacheNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();

        // Create dummy head and tail nodes
        this.head = new CacheNode("", {} as FileNode);
        this.tail = new CacheNode("", {} as FileNode);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Add node right after head
    private addNode(node: CacheNode): void {
        node.prev = this.head;
        node.next = this.head.next;

        if (this.head.next) {
            this.head.next.prev = node;
        }
        this.head.next = node;
    }

    // Remove an existing node
    private removeNode(node: CacheNode): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
    }

    // Move certain node to head
    private moveToHead(node: CacheNode): void {
        this.removeNode(node);
        this.addNode(node);
    }

    // Pop the current tail
    private popTail(): CacheNode | null {
        if (!this.tail.prev || this.tail.prev === this.head) {
            return null;
        }

        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
    }

    // Add or update a file in the cache
    put(key: string, value: FileNode): void {
        const existingNode = this.cache.get(key);

        if (existingNode) {
            // Element already exists - update value and move to head (most recent)
            existingNode.value = value;
            this.moveToHead(existingNode);
        } else {
            // New element - check capacity first
            if (this.cache.size >= this.capacity) {
                // Remove least recently used item (from tail)
                const lruNode = this.popTail();
                if (lruNode) {
                    this.cache.delete(lruNode.key);
                }
            }

            // Create new node and add to head (most recent)
            const newNode = new CacheNode(key, value);
            this.cache.set(key, newNode);
            this.addNode(newNode);
        }
    }

    // Get all files in order (most recent first)
    getAll(): FileNode[] {
        const result: FileNode[] = [];
        let current = this.head.next;

        while (current && current !== this.tail) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    // Get a specific file (moves it to head if found - marks as most recently used)
    get(key: string): FileNode | null {
        const node = this.cache.get(key);

        if (node) {
            // Move to head (mark as most recently used)
            this.moveToHead(node);
            return node.value;
        }

        return null;
    }

    // Get current size
    size(): number {
        return this.cache.size;
    }

    // Clear all entries
    clear(): void {
        this.cache.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
}

// Create a global cache instance
const maxCacheSize = parseInt(process.env.MAX_CACHE_SIZE || "5");

declare global {
    var __RECENT_CACHE__: LRUCache | undefined;
}

if (typeof global !== 'undefined' && !global.__RECENT_CACHE__) {
    global.__RECENT_CACHE__ = new LRUCache(maxCacheSize);
}

export function getRecentCache(): LRUCache {
    if (typeof global !== 'undefined' && global.__RECENT_CACHE__) {
        return global.__RECENT_CACHE__;
    }

    if (typeof global !== 'undefined') {
        global.__RECENT_CACHE__ = new LRUCache(maxCacheSize);
        return global.__RECENT_CACHE__;
    }

    return new LRUCache(maxCacheSize);
}